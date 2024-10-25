"use client";
import React, { useEffect, useState } from "react";
import WriteBlog from "../../../components/blog/WriteBlog";
import { useAuthContext } from "@/hooks/useAuthContext";
import BlogsLists from "@/components/blog/BlogsList";
import Loader from "@/components/common/Loader";
import { tailChase } from "ldrs";

tailChase.register();

const Blogs = () => {
  const { professional } = useAuthContext();
  const [blogs, setBlogs] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const id = professional?.professionalId;

  // fetch all blogs for a professional

  useEffect(() => {
    if (id) {
      fetch(`/api/blogs/user/${id}`)
        .then((res) => res.json())
        .then((blogs) => {
          setBlogs(blogs);
          console.log(blogs);
        })
        .catch((error) => {
          console.error("Error fetching blogs data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* <Loader /> */}
        <p>loading</p>
      </div>
    );
  }
  return (
    <main className="p-4 lg:p-6">
      <WriteBlog />
      <BlogsLists blogsList={blogs} />
    </main>
  );
};

export default Blogs;
