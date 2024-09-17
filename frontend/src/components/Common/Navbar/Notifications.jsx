import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RiNotificationLine } from "react-icons/ri";
import { Separator } from "@/components/ui/separator";
import TestNotification from "./TestNotification";
import { useAuthContext } from "@/hooks/useAuthContext";
import axios from "axios";

const Notifications = () => {
  const { user } = useAuthContext();
  const [notifications, setNotifications] = useState([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user?.userName); // Pre-fill username from context
      setUserId(user?.userId);
    }
  }, [user]);

  useEffect(() => {
    if (userId) {
      // Fetch notifications based on user ID
      axios
        .get(`http://localhost:4000/api/exchange/user/recieved/${userId}`)
        .then((response) => {
          console.log(response.data); // Log the full response for debugging
          setNotifications(response.data); // Assuming response.data contains the notifications array
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });
    } else {
      console.log("User not found");
    }
  }, [userId]);

  return (
    <Popover>
      <PopoverTrigger>
        <RiNotificationLine size={24} />
      </PopoverTrigger>
      <PopoverContent className="w-[500px] mt-8 rounded-xl shadow-md">
        <div className="p-2">
          <h1 className="font-medium font-inter text-[18px] pb-8 ">
            Notifications
          </h1>
          <ScrollArea className="h-[600px]">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div key={index}>
                  <TestNotification notification={notification} />
                  {index < notifications.length - 1 && (
                    <Separator className="bg-gray-100" />
                  )}
                </div>
              ))
            ) : (
              <p>No notifications available</p>
            )}
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
