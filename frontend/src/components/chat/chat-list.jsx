"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useEffect } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import ChatBottombar from "./chat-bottombar";
import { AnimatePresence, motion } from "framer-motion";

export function ChatList({ messages, selectedUser, sendMessage, isMobile }) {
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-full overflow-x-hidden overflow-y-auto">
      <div
        ref={messagesContainerRef}
        className="flex flex-col w-full h-full overflow-x-hidden overflow-y-auto"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                message.name !== selectedUser.name ? "items-end" : "items-start"
              )}
            >
              <div className="flex items-center gap-3">
                {message.name === selectedUser.name && (
                  <Avatar className="flex items-center justify-center">
                    <AvatarImage alt={message.name} width={6} height={6} />
                  </Avatar>
                )}
                <span className="max-w-xs p-3 bg-gray-100 rounded-md">
                  {message.message}
                </span>
                {message.name !== selectedUser.name && (
                  <Avatar className="flex items-center justify-center">
                    <AvatarImage alt={message.name} width={6} height={6} />
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottombar sendMessage={sendMessage} isMobile={isMobile} />
    </div>
  );
}
