import { projectDetails as boidsBattleground } from "./boids-battleground/project-details";
import { Project } from "./types";

// Centralized projects list - import all project details here
export const projects: Project[] = [
  boidsBattleground,
  // Add more projects as you create them:
  // projectDetails as projectName from "./project-name/project-details"
];
