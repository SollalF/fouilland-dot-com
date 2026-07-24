"use client";

import Image from "next/image";
import { ViewTransition } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TransitionLink } from "@/components/transition-link";
import { ProjectCardData } from "@/app/projects/types";
import { cn } from "@/lib/utils";

interface Props {
  project: ProjectCardData;
  className?: string;
}

export function ProjectCard({ project, className }: Props) {
  const {
    title,
    description,
    tags,
    imageUrl,
    projectSlug,
    liveUrl,
    githubUrl,
  } = project;

  let cardActionHref = "#";
  let cardActionTarget: string | undefined = undefined;
  let cardAriaLabel = `View project ${title}`;
  let transitionTypes: string[] | undefined;

  if (projectSlug) {
    cardActionHref = `/projects/${projectSlug}`;
    cardActionTarget = undefined;
    cardAriaLabel = `View details for ${title}`;
    transitionTypes = ["nav-forward"];
  } else if (liveUrl) {
    cardActionHref = liveUrl;
    cardActionTarget = "_blank";
    cardAriaLabel = `View live demo for ${title}`;
  } else if (githubUrl) {
    cardActionHref = githubUrl;
    cardActionTarget = "_blank";
    cardAriaLabel = `View source code for ${title}`;
  }

  return (
    <Card
      className={cn(
        "relative h-[400px] group overflow-hidden cursor-pointer flex flex-col",
        className,
      )}
    >
      {projectSlug ? (
        <ViewTransition
          name={`project-image-${projectSlug}`}
          share="morph"
          default="none"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        </ViewTransition>
      ) : (
        <div className="absolute inset-0 z-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      <div className="relative z-10 flex flex-col flex-grow justify-end p-6 text-white">
        <CardHeader className="p-0 mb-2">
          <CardTitle className="text-2xl font-bold mb-1">{title}</CardTitle>
          <CardDescription className="text-muted-foreground line-clamp-3 text-sm">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 flex-grow">
          {tags && tags.length > 0 ? (
            <div className="flex flex-wrap gap-1 mt-3">
              {tags.map((tag, tagIndex) => (
                <Badge
                  key={tagIndex}
                  variant="onDark"
                  className="text-[10px] px-1.5 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
        </CardContent>
      </div>

      <TransitionLink
        href={cardActionHref}
        target={cardActionTarget}
        transitionTypes={transitionTypes}
        className="absolute inset-0 z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        aria-label={cardAriaLabel}
        rel={cardActionTarget === "_blank" ? "noopener noreferrer" : undefined}
      >
        <span className="sr-only">{cardAriaLabel}</span>
      </TransitionLink>
    </Card>
  );
}
