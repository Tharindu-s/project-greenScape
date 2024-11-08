"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";

// components
import ProfileSkeleton from "@/components/skeletons/skeleton-profile-hero";

import UsersList from "@/components/users/UsersList";
import { SendNotification } from "../../../components/notifications/SendNotification";
import NotificationsList from "@/components/notifications/NotificationsList";

const Page = () => {
  const { admin } = useAuthContext();
  const [notifications, setNotifications] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const id = admin?.adminId;

  useEffect(() => {
    fetch(`/api/notifications`)
      .then((res) => res.json())
      .then((users) => {
        console.log(users);
        setNotifications(users);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }
  return (
    <main className="p-4 lg:p-6">
      <h1 className="py-8 text-2xl font-semibold">User management</h1>
      <SendNotification />
      <NotificationsList notifications={notifications} />
    </main>
  );
};

export default Page;
