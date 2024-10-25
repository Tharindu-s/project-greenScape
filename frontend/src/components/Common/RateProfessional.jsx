"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/hooks/useAuthContext";
import { toast } from "react-hot-toast";

export default function RateProfessional({ professionalId }) {
  const { user } = useAuthContext();

  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const userId = user?.userId;
  console.log(userId);

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleRatingHover = (hoveredRating) => {
    setHoveredRating(hoveredRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!rating) {
      setError("Please select a rating.");
      toast.error("Please select a rating.");
      return;
    }

    if (!user) {
      setError("You must be logged in to rate a professional.");
      toast.error("You must be logged in to rate a professional.");
      return;
    }

    const rate = {
      rating,
      professionalId,
      userId,
    };

    try {
      const response = await fetch("/api/professionalrating", {
        method: "POST",
        body: JSON.stringify(rate),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        const err = json.error || "An error occurred while adding the rating.";
        setError(err);
        console.error("Server error:", json.error || json); // Log for
        toast.error("An error occurred while adding the rating.");
      } else {
        setError(null);
        setRating(0);
        console.log("New rating added", json);
        toast.success("Rating added successfully!");
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error("Network error:", error); // Log for debugging
      setError("Network error. Please try again later.");
      toast.error(`Network error: ${error.message}`);
    }
  };

  return (
    <div className="items-center my-6 space-y-4 ">
      <h2 className="text-2xl font-semibold text-gray-800 font-poppins">
        Rate your experience
      </h2>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={24}
            onClick={() => handleRatingClick(star)}
            onMouseEnter={() => handleRatingHover(star)}
            onMouseLeave={() => handleRatingHover(0)}
            className={`cursor-pointer transition-colors ${
              star <= (hoveredRating || rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
            aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
          />
        ))}
      </div>
      <p className="text-sm text-gray-600">
        {rating
          ? `You've selected ${rating} star${rating !== 1 ? "s" : ""}`
          : "Select a rating"}
      </p>
      <Button
        onClick={handleSubmit}
        disabled={!rating}
        className="mt-2 bg-accent hover:bg-accentdark"
      >
        Submit Rating
      </Button>
    </div>
  );
}
