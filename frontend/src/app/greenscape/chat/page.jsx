"use client";
import "./messenger.css";
import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Conversation from "@/components/messenger/conversations/Conversation";
import Message from "@/components/messenger/message/Message";
import { useAuthContext } from "@/hooks/useAuthContext";
import { BASE_URL } from "@/components/Constants/server";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [userId, setUserId] = useState("");
  const socket = useRef();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user?.userId) {
      setUserId(user.userId);
    }
  }, [user]);

  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user?.userId);
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      if (userId) {
        try {
          const res = await fetch(`${BASE_URL}/api/conversation/${userId}`);
          const data = await res.json(); // Added .json() to parse response
          console.log(data);
          setConversations(data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getConversations();
  }, [userId]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat?._id) {
        try {
          const res = await fetch(
            `${BASE_URL}/api/messages/${currentChat._id}`
          );
          const data = await res.json(); // Added .json() to parse response
          setMessages(data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.userId || !currentChat?._id) return; // Added checks

    const message = {
      sender: user.userId,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user.userId
    );

    socket.current.emit("sendMessage", {
      senderId: user.userId,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await fetch(`${BASE_URL}/api/messages`, {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message), // Stringify the message
      });
      const data = await res.json(); // Added .json() to parse response
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="justify-center mx-auto my-32 border border-gray-300 messenger rounded-xl">
        <div className="chatMenu">
          <div className="p-8 chatMenuWrapper">
            <h1 className="text-2xl font-bold">Chats</h1>
            {conversations.map((conversation) => (
              <div
                onClick={() => setCurrentChat(conversation)}
                key={conversation._id}
              >
                <Conversation
                  conversation={conversation}
                  currentUser={user}
                  loggedInUser={user.userId}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="p-8 chatBox ">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef} key={m._id}>
                      <Message message={m} own={m.sender === user?.userId} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <input
                    className="border border-gray-200 rounded-xl chatMessageInput focus:outline-gray-300"
                    placeholder="Send a message..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></input>
                  <button
                    className="px-6 py-3 text-white bg-accent rounded-xl"
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
