import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SystemNotifications = ({ notification }) => {
  return (
    <div className={`flex py-2 rounded-lg ${notification.read ? "" : ""}`}>
      <Avatar className="w-16 h-16 mr-4 ">
        <AvatarImage src="#" alt="" />
        <AvatarFallback className="text-2xl">G</AvatarFallback>
      </Avatar>
      <div className="font-inter">
        <h2>{notification.content}</h2>
        <div className="flex justify-between">
          {/* <p className="text-[14px] py-2 font-semibold">
            {notification.createdAt.slice(5, 10)}
          </p> */}
          <p className="text-[14px] py-2 font-semibold">
            {notification.createdAt.slice(11, 16)} •{" "}
            <span className="text-accent">GreenScape</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemNotifications;
