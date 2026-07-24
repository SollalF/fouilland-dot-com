"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded((expanded) => !expanded);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (!description) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsExpanded((expanded) => !expanded);
    }
  };

  return (
    <Link
      href={href || "#"}
      className="block cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-expanded={description ? isExpanded : undefined}
    >
      <Card className="flex flex-row p-4">
        <div className="flex-none">
          <Avatar className="border size-12 m-auto bg-muted-background">
            <AvatarImage
              src={logoUrl}
              alt={altText}
              className="object-contain"
            />
            <AvatarFallback>{altText[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="min-w-0 flex-grow ml-4 items-center flex-col group">
          <CardHeader>
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex min-w-0 items-center justify-center font-semibold leading-none text-xs sm:text-sm text-balance">
                <span className="truncate">{title}</span>
                {badges && (
                  <span className="inline-flex gap-x-1">
                    {badges.map((badge, index) => (
                      <Badge
                        variant="secondary"
                        className="align-middle text-xs"
                        key={index}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </span>
                )}
                <ChevronRightIcon
                  aria-hidden="true"
                  className={cn(
                    "size-4 shrink-0 translate-x-0 transform opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 motion-reduce:transition-none",
                    isExpanded ? "rotate-90" : "rotate-0",
                  )}
                />
              </h3>
              <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right shrink-0">
                {period}
              </div>
            </div>
            {subtitle ? (
              <div className="font-sans text-xs truncate">{subtitle}</div>
            ) : null}
          </CardHeader>
          {description ? (
            <motion.div
              initial={false}
              animate={{
                opacity: isExpanded ? 1 : 0,
                height: isExpanded ? "auto" : 0,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-2 text-xs sm:text-sm overflow-hidden"
            >
              {description}
            </motion.div>
          ) : null}
        </div>
      </Card>
    </Link>
  );
};
