import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TestNotification = ({ notification }) => {
  return (
    <div className={`flex rounded-lg ${notification.read ? "" : ""}`}>
      <Avatar className="w-16 h-16 mr-4">
        <AvatarImage src="#" alt="" />
        <AvatarFallback className="text-2xl">
          {notification.senderName
            .split(" ")
            .slice(0, 1)
            .map((part) => part.charAt(0))
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="font-inter">
        <h2>
          <span className="font-semibold">A new exchange request </span> from{" "}
          {notification.senderName}
        </h2>
        <div className="flex justify-between">
          {/* <p className="text-[14px] py-2 font-semibold">
            {notification.createdAt.slice(5, 10)}
          </p> */}
          <p className="text-[14px] py-2 font-semibold">
            {notification.createdAt.slice(11, 16)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestNotification;
