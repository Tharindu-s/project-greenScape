"use client";
import { useEffect, useState } from "react";
import "./conversation.css";
import { BASE_URL } from "@/components/Constants/server";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const otherPartyId = conversation.members.find(
      (m) => m !== currentUser._id
    );

    const getUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/user/${otherPartyId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      {/* <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
      /> */}
      <span className="conversationName">{user?.name}</span>
    </div>
  );
}
