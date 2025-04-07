import { LucideIcon } from "lucide-react";
import { projectDetails as boidsBattleground } from "./boids-battleground/project-details";

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  icon: LucideIcon;
}

// Centralized projects list - import all project details here
export const projects: Project[] = [
  boidsBattleground,
  // Add more projects as you create them:
  // projectDetails as projectName from "./project-name/project-details"
];
