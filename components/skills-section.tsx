"use client";

import React from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SkillCategory } from "./skill-category";
import { SKILLS_DATA, SKILL_RATINGS_EXPLANATION } from "@/data/resume";

interface SkillsSectionProps {
  delayStart?: number;
}

export function SkillsSection({ delayStart = 0 }: SkillsSectionProps) {
  const categories = Object.keys(SKILLS_DATA);

  return (
    <section id="skills" className="m-auto max-w-5xl pb-4">
      <BlurFade delay={delayStart}>
        <h1 className="relative pb-6 pt-6 text-4xl font-bold md:text-5xl">
          Skills
        </h1>
      </BlurFade>

      <BlurFade delay={delayStart + 0.05}>
        <div className="prose prose-lg prose-stone max-w-none text-stone-950 prose-p:leading-snug prose-ul:list-none prose-ul:p-0 prose-li:p-0 prose-li:leading-snug md:prose-xl dark:prose-invert dark:text-stone-50">
          <p>
            Here&apos;s a list of my technical skills. As you can see, I
            specialize in Web and AI technologies, but I&apos;ve learned other
            tools and techniques in various domains.
          </p>
          <p>
            I&apos;m aware rating skills on a scale of 1 to 5 is subjective and
            skills are not really measurable that way, but since this isn&apos;t
            a CV and long explanations don&apos;t make pretty layouts like this
            one, here&apos;s the general idea of what each rating means (how I
            subjectively chose them!):
          </p>
          <ul>
            {SKILL_RATINGS_EXPLANATION.map((level) => (
              <li key={level.level}>
                <strong>{level.level}</strong> - {level.description}
              </li>
            ))}
          </ul>
        </div>
      </BlurFade>

      <div className="grid grid-cols-1 gap-4 pt-4 lg:grid-cols-2">
        {categories.map((category, index) => (
          <BlurFade key={category} delay={delayStart + 0.1 + index * 0.05}>
            <SkillCategory title={category} skills={SKILLS_DATA[category]} />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
