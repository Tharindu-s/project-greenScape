"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";

// components
import ProfileSkeleton from "@/components/skeletons/skeleton-profile-hero";

import SearchBar from "@/components/common/SearchBar";
import BlogsList from "@/components/blogs/BlogsList";

const ReportedProducts = () => {
  const { admin } = useAuthContext();
  const [blogs, setBlogs] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const id = admin?.adminId;

  useEffect(() => {
    fetch(`/api/reportblog`)
      .then((res) => res.json())
      .then((blogs) => {
        console.log(blogs);
        setBlogs(blogs);
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
      <SearchBar />
      <h1 className="py-8 text-2xl font-semibold">Reported Blogs</h1>
      <BlogsList blogsList={blogs} />
    </main>
  );
};

export default ReportedProducts;
