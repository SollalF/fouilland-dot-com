"use client";

import { projects } from "./index";
import { ProjectCard } from "@/components/project-card";

export default function Projects() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.projectSlug} project={project} />
        ))}
      </div>
    </main>
  );
}
