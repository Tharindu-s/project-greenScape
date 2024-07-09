"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";

const WriteReview = ({ productId }) => {
  const { toast } = useToast();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setUsername(user.userName); // Pre-fill username from context
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to add a review");
      return;
    }

    const review = {
      title,
      content,
      username,
      productId,
    };

    const response = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      setTitle("");
      setContent("");
      console.log("Review added:", json);
    }
  };

  return (
    <div className="my-8">
      <form onSubmit={handleSubmit}>
        <h1 className="font-poppins text-[24px] font-semibold text-textmain mt-16 mb-10">
          Write a Review
        </h1>
        <div className="my-4">
          <label className="font-inter text-[16px] text-textmain">
            Review title
          </label>
          <Input
            className="mt-3 mb-6"
            type="text"
            placeholder="Title for your review"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label className="font-inter text-[16px] text-textmain">
            Review content
          </label>
          <Textarea
            className="mt-3 mb-6"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            name="content"
          />
        </div>
        <Input
          className="hidden"
          id="username"
          type="text"
          value={username}
          disabled
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          className="hidden"
          id="productId"
          type="text"
          value={productId}
          disabled
        />
        <Button
          type="submit"
          className="py-6 px-7 rounded-3xl bg-accent hover:bg-accentdark"
          onClick={() => {
            toast({
              title: "Review posted succesfully",
              description: `Thank you for your review!`,
            });
          }}
        >
          Submit review
        </Button>
        {/* <button type="submit">Add product</button> */}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default WriteReview;