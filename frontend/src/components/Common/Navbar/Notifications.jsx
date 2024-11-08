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
import SystemNotifications from "./SystemNotifications";
import Link from "next/link";

const Notifications = () => {
  const { user } = useAuthContext();
  const [notifications, setNotifications] = useState([]);
  const [systemNotifications, setSystemNotifications] = useState([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user?.userName);
      setUserId(user?.userId);
    }
  }, [user]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:4000/api/exchange/user/recieved/${userId}`)
        .then((response) => {
          console.log(response.data);
          setNotifications(response.data);
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });
    } else {
      console.log("User not found");
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:4000/api/notifications`)
        .then((response) => {
          console.log(response.data);
          setSystemNotifications(response.data);
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
            {systemNotifications.length > 0 ? (
              systemNotifications.map((notification, index) => (
                <div key={index}>
                  <SystemNotifications notification={notification} />
                  {index < systemNotifications.length - 1 && (
                    <Separator className="bg-gray-100" />
                  )}
                </div>
              ))
            ) : (
              <p>No system notifications</p>
            )}
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div key={index}>
                  <Link href="/greenscape/exchange">
                    <TestNotification notification={notification} />
                  </Link>
                  {index < notifications.length - 1 && (
                    <Separator className="bg-gray-100" />
                  )}
                </div>
              ))
            ) : (
              <p>No other notifications</p>
            )}
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
