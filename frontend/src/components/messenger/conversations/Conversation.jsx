"use client";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({
  conversation,
  currentUser,
  loggedInUser,
}) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const otherPartyId = conversation.members.find(
          (member) => member !== loggedInUser
        );

        if (!otherPartyId) return;

        let res = await fetch(`http://localhost:4000/api/user/${otherPartyId}`);

        if (!res.ok) {
          res = await fetch(
            `http://localhost:4000/api/professional/${otherPartyId}`
          );

          if (!res.ok) {
            console.log(
              "User not found in both user and professional endpoints"
            );
            return;
          }
        }

        const data = await res.json();
        setUserName(data.name);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserName();
  }, [conversation, loggedInUser]);

  return (
    <div className="conversation">
      <div>
        <p>{userName}</p>
      </div>
    </div>
  );
}
