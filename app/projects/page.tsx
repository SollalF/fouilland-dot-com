"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { projects } from "./index";

export default function Projects() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => {
          const projectDetailsUrl = `/projects/${project.projectSlug}`;

          return (
            <Card
              key={index}
              className="relative h-[400px] group overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/60" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 text-white">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl font-bold mb-2">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-200">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="bg-white/10 hover:bg-white/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-300 transition-colors inline-block"
                      >
                        View Source →
                      </Link>
                    )}
                    <Link
                      href={projectDetailsUrl}
                      className="text-white hover:text-yellow-300 transition-colors inline-block"
                    >
                      View Details →
                    </Link>
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-green-300 transition-colors inline-block"
                      >
                        Live Demo →
                      </Link>
                    )}
                  </div>
                </CardContent>
              </div>

              {/* Make the entire card clickable for details */}
              <Link
                href={projectDetailsUrl}
                className="absolute inset-0 z-10 cursor-pointer"
                aria-label={`View details for ${project.title}`}
                onClick={(e) => {
                  // Stop propagation if any of the specific links are clicked
                  if (
                    e.target instanceof HTMLElement &&
                    (e.target.tagName === "A" || e.target.closest("a"))
                  )
                    e.stopPropagation();
                }}
              >
                <span className="sr-only">View project details</span>
              </Link>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
