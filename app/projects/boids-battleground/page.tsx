import { Metadata } from "next";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "../page";
import BoidsSimulation from "./boids";

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

export const metadata: Metadata = {
  title: projectDetails.title,
  description: projectDetails.description,
};

export default function BoidsBattleground() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl relative">
      <div className="flex flex-col items-center space-y-8 relative">
        <h1 className="text-4xl font-bold text-center">
          {projectDetails.title}
        </h1>

        {/* Image Section */}
        <div className="w-full relative h-[400px]">
          <Image
            src={projectDetails.imageUrl}
            alt={projectDetails.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 justify-center">
          {projectDetails.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Description Section */}
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-center text-lg text-muted-foreground">
            {projectDetails.description}
          </p>
          <p className="whitespace-pre-line">
            {projectDetails.longDescription}
          </p>
        </div>

        {/* Links Section */}
        <div className="flex gap-4 justify-center">
          {projectDetails.githubUrl && (
            <a
              href={projectDetails.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 inline-block"
            >
              View Source →
            </a>
          )}
          {projectDetails.liveUrl && (
            <a
              href={projectDetails.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-700 inline-block"
            >
              Live Demo →
            </a>
          )}
        </div>
      </div>
      <BoidsSimulation />
    </main>
  );
}
