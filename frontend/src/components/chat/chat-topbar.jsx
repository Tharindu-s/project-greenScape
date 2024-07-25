"use client";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

export default function ChatTopbar({ userId }) {
  return (
    <div className="flex items-center justify-between w-full h-20 p-4 border-b">
      <div className="flex items-center gap-2">
        {/* <Avatar className="flex items-center justify-center">
          <AvatarImage
            src={selectedUser.avatar}
            alt={selectedUser.name}
            width={6}
            height={6}
            className="w-10 h-10"
          />
        </Avatar> */}
        <div className="flex flex-col">
          <span className="font-medium">{userId}</span>
          {console.log({ topbar: userId })}
          <span className="text-xs">Active 2 mins ago</span>
        </div>
      </div>
    </div>
  );
}
