import { projectDetails as boidsBattleground } from "./boids-battleground/project-details";
import { projectDetails as aiNewsletter } from "./ai-newsletter/project-details";
import { projectDetails as crtSubpixel } from "./crt-subpixel/project-details";
import { Project } from "./types";

// Centralized projects list - import all project details here
export const projects: Project[] = [
  boidsBattleground,
  aiNewsletter,
  crtSubpixel,
];
