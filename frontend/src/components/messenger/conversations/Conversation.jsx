"use client";
import { useEffect, useState } from "react";
import "./conversation.css";
import { BASE_URL } from "@/components/Constants/server";

export default function Conversation({ conversation, currentUser }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        // Get the member at index 1
        const otherPartyId = conversation.members[1];
        const res = await fetch(`${BASE_URL}/api/user/${otherPartyId}`);
        const data = await res.json();
        setUserName(data.name); // Assuming the API returns an object with the name field
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserName();
  }, [conversation]);

  return (
    <div className="conversation">
      <div>
        {/* Display the name of the member at index 1 */}
        <p>{userName}</p>
      </div>

      {/* <span className="conversationName">{userName}</span> */}
    </div>
  );
}
