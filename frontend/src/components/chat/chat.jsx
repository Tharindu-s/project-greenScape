"use client";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React, { useEffect, useState } from "react";

export function Chat({ messages, selectedUser, userId, isMobile }) {
  // console.log("user", user);
  const [messagesState, setMessages] = useState(messages ?? []);
  // console.log("messagesState", messagesState);

  const sendMessage = (newMessage) => {
    setMessages([...messagesState, newMessage]);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedUser={userId} />
      {console.log({ chat: userId })}
      <ChatList
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
