import React from "react";
import { Star } from "lucide-react";

export default function StarRating({ rating = 0, maxRating = 5 }) {
  // Ensure rating is within valid range
  const validRating = Math.max(0, Math.min(rating, maxRating));

  return (
    <div className="flex items-center space-x-1">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          className={`w-6 h-6 ${
            index < validRating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">
        {validRating.toFixed(1)} out of {maxRating}
      </span>
    </div>
  );
}
