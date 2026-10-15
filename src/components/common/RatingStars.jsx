import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating = 5.0, count, size = "sm", showNumber = true }) {
  const numRating = Number(rating) || 0;
  const starSize = size === "lg" ? "w-5 h-5" : size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";

  return (
    <div className="inline-flex items-center gap-1.5 font-medium">
      <div className="flex items-center text-amber-500">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= Math.round(numRating) ? "fill-amber-400 text-amber-500" : "text-slate-300"
            }`}
          />
        ))}
      </div>
      {showNumber && (
        <span className={`text-slate-700 font-semibold ${size === "lg" ? "text-base" : "text-xs"}`}>
          {numRating.toFixed(1)}
        </span>
      )}
      {count !== undefined && (
        <span className={`text-slate-400 font-normal ${size === "lg" ? "text-sm" : "text-xs"}`}>
          ({count})
        </span>
      )}
    </div>
  );
}
