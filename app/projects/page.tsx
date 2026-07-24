import { ViewTransition } from "react";
import { projects } from "./index";
import { ProjectCard } from "@/components/project-card";
import { toProjectCardData } from "./types";
import { DirectionalTransition } from "@/components/directional-transition";

export default function Projects() {
  return (
    <DirectionalTransition>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-balance">
          My Projects
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ViewTransition key={project.projectSlug}>
              <ProjectCard project={toProjectCardData(project)} />
            </ViewTransition>
          ))}
        </div>
      </div>
    </DirectionalTransition>
  );
}
