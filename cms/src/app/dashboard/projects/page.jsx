"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";

// components
import ProfileSkeleton from "@/components/skeletons/skeleton-profile-hero";
import AddProject from "@/components/projects/AddProject";

import ProjectsList from "@/components/projects/ProjectsList";

const Page = () => {
  const { professional } = useAuthContext();
  const [projects, setProjects] = useState(null);

  const [isLoading, setLoading] = useState(true);

  const id = professional?.professionalId;

  // fetch all projects for a professional

  useEffect(() => {
    if (id) {
      fetch(`/api/projects/user/${id}`)
        .then((res) => res.json())
        .then((projects) => {
          setProjects(projects);
        })
        .catch((error) => {
          console.error("Error fetching projects data:", error);
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
      <AddProject />
      <ProjectsList projectsList={projects} />
    </main>
  );
};

export default Page;
