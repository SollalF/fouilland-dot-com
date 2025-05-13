"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Project } from "@/app/projects/types";
import { cn } from "@/lib/utils";
import { InfoIcon, GlobeIcon } from "lucide-react";
import { CIcon } from "@coreui/icons-react";
import { cibGithub } from "@coreui/icons";

interface Props {
  project: Project;
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

  if (projectSlug) {
    cardActionHref = `/projects/${projectSlug}`;
    cardActionTarget = undefined;
    cardAriaLabel = `View details for ${title}`;
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
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 flex flex-col flex-grow justify-end p-6 text-white">
        <CardHeader className="p-0 mb-2">
          <CardTitle className="text-2xl font-bold mb-1">{title}</CardTitle>
          <CardDescription className="text-gray-200 line-clamp-3 text-sm">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 flex-grow">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {tags.map((tag, tagIndex) => (
                <Badge
                  key={tagIndex}
                  variant="secondary"
                  className="bg-white/10 hover:bg-white/20 text-[10px] px-1.5 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </div>

      <Link
        href={cardActionHref}
        target={cardActionTarget}
        className="absolute inset-0 z-20"
        aria-label={cardAriaLabel}
        rel={cardActionTarget === "_blank" ? "noopener noreferrer" : undefined}
      >
        <span className="sr-only">{cardAriaLabel}</span>
      </Link>
    </Card>
  );
}
