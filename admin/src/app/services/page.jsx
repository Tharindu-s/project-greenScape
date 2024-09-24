"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";

// components
import ProfileSkeleton from "@/components/skeletons/skeleton-profile-hero";
import AddService from "@/components/services/AddService";

import ServicesList from "@/components/services/ServicesList";

const page = () => {
  const { professional } = useAuthContext();
  const [services, setServices] = useState(null);

  const [isLoading, setLoading] = useState(true);

  const id = professional?.professionalId;

  // fetch all services for a professional

  useEffect(() => {
    if (id) {
      fetch(`/api/service/professional/${id}`)
        .then((res) => res.json())
        .then((services) => {
          setServices(services);
        })
        .catch((error) => {
          console.error("Error fetching services data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }
  return (
    <main className="p-4 lg:p-6">
      {" "}
      <AddService />
      <ServicesList services={services} />
    </main>
  );
};

export default page;
