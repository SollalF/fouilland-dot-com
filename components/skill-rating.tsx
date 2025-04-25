"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkillRatingProps {
  name: string;
  rating: number;
  maxRating?: number;
  icon?: React.ReactNode;
}

export function SkillRating({
  name,
  rating,
  maxRating = 5,
  icon,
}: SkillRatingProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-md" title={name}>
        {name}
      </span>
      <div className="flex items-center gap-1">
        {Array.from({ length: maxRating }).map((_, i) => {
          // Create a wrapper div with conditional classes
          return (
            <div key={i} className={cn(i >= rating && "opacity-25 grayscale")}>
              <div className="size-5">{icon}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
