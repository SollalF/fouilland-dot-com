"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SkillRating } from "./skill-rating";

export interface Skill {
  name: string;
  rating: number;
  icon?: React.ReactNode;
}

interface SkillCategoryProps {
  title: string;
  skills: Skill[];
  icon?: React.ReactNode;
}

export function SkillCategory({ title, skills, icon }: SkillCategoryProps) {
  return (
    <Card className="rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      <CardHeader className="flex flex-col space-y-1.5 p-6 pb-2">
        <h3 className="tracking-tight text-2xl font-bold uppercase md:text-3xl">
          {title}
        </h3>
        <hr className="h-1 w-full bg-stone-300 dark:bg-stone-700" />
      </CardHeader>
      <CardContent className="p-6 pt-4">
        <div className="flex flex-col gap-5">
          {skills.map((skill) => (
            <SkillRating
              key={skill.name}
              name={skill.name}
              rating={skill.rating}
              icon={skill.icon || icon}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
