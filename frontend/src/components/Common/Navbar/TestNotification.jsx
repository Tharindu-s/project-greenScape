import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TestNotification = () => {
  return (
    <div className="flex my-4">
      <Avatar className="w-16 h-16 mr-4">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="font-inter">
        <h2>
          <span className="font-semibold">A new exchange request </span> from
          Tharindu S. Sandaruwan
        </h2>
        <p className="text-[14px] py-2 ">13.30 PM</p>
      </div>
    </div>
  );
};

export default TestNotification;
