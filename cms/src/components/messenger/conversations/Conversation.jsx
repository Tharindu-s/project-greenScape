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
        // Find the member ID that is not equal to loggedInUser
        const otherPartyId = conversation.members.find(
          (member) => member !== loggedInUser
        );

        if (!otherPartyId) return;

        // Fetch user details from the API using the other member's ID
        const res = await fetch(
          `http://localhost:4000/api/user/${otherPartyId}`
        );
        const data = await res.json();
        setUserName(data.name); // Assuming the API returns an object with a 'name' field
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserName();
  }, [conversation, loggedInUser]);

  return (
    <div className="conversation">
      <div>
        {/* Display the name of the other member in the conversation */}
        <p>{userName}</p>
      </div>
    </div>
  );
}
