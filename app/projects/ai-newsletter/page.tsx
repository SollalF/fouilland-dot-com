import { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { projectDetails } from "./project-details";
import { ProjectReadmeSection } from "@/components/project-readme-section";

export const metadata: Metadata = {
  title: projectDetails?.title || "AI Newsletter",
  description:
    projectDetails?.description ||
    "A personalized AI-powered newsletter platform",
};

export default function AINewsletter() {
  const safeDetails = projectDetails || {
    title: "AI Newsletter",
    description: "A personalized AI-powered newsletter platform",
    longDescription: "",
    imageUrl: "/placeholder.jpg",
    tags: [],
    githubUrl: "",
    liveUrl: "",
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl relative">
      <div className="flex flex-col items-center space-y-8 relative">
        <h1 className="text-4xl font-bold text-center">{safeDetails.title}</h1>

        {/* Image Section */}
        <div className="w-full relative h-[400px]">
          <Image
            src={safeDetails.imageUrl}
            alt={safeDetails.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 justify-center">
          {(safeDetails.tags || []).map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Description Section */}
        <div className="prose-site">
          <p className="text-center text-lg text-muted-foreground">
            {safeDetails.description}
          </p>
          <p className="whitespace-pre-line">{safeDetails.longDescription}</p>
        </div>

        {/* Links Section */}
        <div className="flex gap-4 justify-center">
          {safeDetails.githubUrl && (
            <a
              href={safeDetails.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link hover:text-link-hover inline-block"
            >
              View Source →
            </a>
          )}
          {safeDetails.liveUrl && (
            <a
              href={safeDetails.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-success hover:text-success-hover inline-block"
            >
              Live Demo →
            </a>
          )}
        </div>
      </div>

      <ProjectReadmeSection githubUrl={safeDetails.githubUrl} />
    </main>
  );
}
