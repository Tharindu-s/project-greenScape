import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RiNotificationLine } from "react-icons/ri";
import { Separator } from "@/components/ui/separator";
import TestNotification from "./TestNotification";

const Notifications = () => {
  return (
    <Popover>
      <PopoverTrigger>
        {" "}
        <RiNotificationLine size={24} />
      </PopoverTrigger>
      <PopoverContent className="w-[500px] mt-8 rounded-xl shadow-md">
        <div className="p-2">
          <h1 className="font-medium font-inter text-[18px] pb-8 ">
            Notifications
          </h1>
          <ScrollArea className="h-[600px]">
            {" "}
            <TestNotification />
            <Separator className="bg-gray-100" />
            <TestNotification />
            <Separator className="bg-gray-100" />
            <TestNotification />
            <Separator className="bg-gray-100" />
            <TestNotification />
            <Separator className="bg-gray-100" />
            <TestNotification />
            <Separator className="bg-gray-100" />
            <TestNotification />
            <Separator className="bg-gray-100" />
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
