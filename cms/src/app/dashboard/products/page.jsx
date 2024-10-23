"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";

// components
import ProfileSkeleton from "@/components/skeletons/skeleton-profile-hero";

import ProjectsList from "@/components/projects/ProjectsList";
import AddProduct from "@/components/products/AddProduct";
import ProductsList from "@/components/products/ProductsList";

const page = () => {
  const { professional } = useAuthContext();
  const [projects, setProjects] = useState(null);

  const [isLoading, setLoading] = useState(true);

  const id = professional?.professionalId;

  // fetch all projects for a professional

  useEffect(() => {
    if (id) {
      fetch(`/api/products/user/${id}`)
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
      <AddProduct />
      <ProductsList productsList={projects} />
    </main>
  );
};

export default page;
