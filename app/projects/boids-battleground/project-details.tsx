import { Project } from "../page";

export const projectDetails: Project = {
  title: "Boids Battleground",
  description: "A simulation of flocking behavior with competitive elements",
  longDescription: `
    Boids Battleground is an interactive simulation that demonstrates emergent behavior
    through the implementation of Craig Reynolds' Boids algorithm. The project adds a
    competitive element to the traditional flocking simulation, where different groups
    of boids compete for resources while maintaining their flocking behavior.
  `,
  imageUrl: "/projects/boids-battleground.png", // Add your image to the public/projects folder
  tags: ["TypeScript", "Canvas API", "Algorithm", "Simulation"],
  githubUrl: "https://github.com/yourusername/boids-battleground",
  liveUrl: "/projects/boids-battleground",
};
