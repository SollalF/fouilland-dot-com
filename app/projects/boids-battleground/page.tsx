import { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import BoidsSimulation from "./boids";
import { projectDetails } from "./project-details";

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
