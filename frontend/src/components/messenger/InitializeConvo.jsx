"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/hooks/useAuthContext";
import { toast } from "react-hot-toast"; // Import the toast library

const InitializeConvo = ({ product, itemId }) => {
  const { user } = useAuthContext();
  const [senderId, setSenderId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const receiverId = product.userId;

  useEffect(() => {
    if (user) {
      setSenderId(user.userId); // Pre-fill userID from context
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to add an exchange request");
      toast.error("You must be logged in to send a message."); // Show toast for error
      return;
    }

    try {
      // Step 1: Create a conversation
      const exchangeRequest = { senderId, receiverId };
      const convoResponse = await fetch("/api/conversation", {
        method: "POST",
        body: JSON.stringify(exchangeRequest),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!convoResponse.ok) {
        const convoError = await convoResponse.json();
        throw new Error(convoError.error);
      }

      const convoData = await convoResponse.json();
      const conversationId = convoData._id; // Get the conversation ID from response

      // Step 2: Send the first message
      const messagePayload = {
        conversationId,
        sender: senderId,
        text: message,
        item: itemId,
      };

      const messageResponse = await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify(messagePayload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!messageResponse.ok) {
        const messageError = await messageResponse.json();
        throw new Error(messageError.error);
      }

      // Message sent successfully
      const messageData = await messageResponse.json();
      setError(null);
      setMessage(""); // Clear the textarea after sending the message
      toast.success("Message sent successfully!"); // Show success toast
      console.log("Message sent:", messageData);
    } catch (err) {
      setError(err.message);
      toast.error(`Error: ${err.message}`); // Show error toast
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="px-4 py-2 rounded-md font-inter text-accent bg-background hover:bg-[#DADBDA]">
        Message
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send a message</DialogTitle>
          <DialogDescription>
            <div className="flex my-8">
              <div>
                <p className="font-bold"> {product.name}</p>
                <p>{product.username}</p>
                <p className="pt-4">
                  {product.description.split(" ").slice(0, 20).join(" ")}...
                </p>
              </div>
              <img
                src={product.image[0]}
                alt="Product image"
                className="w-[150px] h-[150px] md:h-[150px] object-cover max-lg:mx-auto lg:ml-auto rounded-xl"
              />
            </div>
            <form onSubmit={handleSubmit}>
              <Textarea
                placeholder="Type a message..."
                className="mb-4"
                value={message}
                onChange={(e) => setMessage(e.target.value)} // Capture message text
              />
              <Button className="w-full bg-accent">Send</Button>
            </form>
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InitializeConvo;
