import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { projectDetails } from "./project-details";
import { ProjectReadmeSection } from "@/components/project-readme-section";
import { DirectionalTransition } from "@/components/directional-transition";
import { ProjectHeroImage } from "@/components/project-hero-image";

export const metadata: Metadata = {
  title: projectDetails?.title || "AI Newsletter",
  description:
    projectDetails?.description ||
    "A personalized AI-powered newsletter platform",
};

export default function AINewsletter() {
  const safeDetails = projectDetails || {
    title: "AI Newsletter",
    projectSlug: "ai-newsletter",
    description: "A personalized AI-powered newsletter platform",
    longDescription: "",
    imageUrl: "/placeholder.jpg",
    tags: [] as string[],
    githubUrl: "",
    liveUrl: "",
  };

  return (
    <DirectionalTransition>
      <article className="container mx-auto px-4 py-8 max-w-4xl relative">
        <div className="flex flex-col items-center space-y-8 relative">
          <h1 className="text-4xl font-bold text-center text-balance">
            {safeDetails.title}
          </h1>

          <ProjectHeroImage
            projectSlug={safeDetails.projectSlug}
            imageUrl={safeDetails.imageUrl}
            alt={safeDetails.title}
            className="w-full h-[400px] rounded-lg"
          />

          <div className="flex flex-wrap gap-2 justify-center">
            {(safeDetails.tags || []).map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="prose-site">
            <p className="text-center text-lg text-muted-foreground">
              {safeDetails.description}
            </p>
            <p className="whitespace-pre-line">{safeDetails.longDescription}</p>
          </div>

          <div className="flex gap-4 justify-center">
            {safeDetails.githubUrl ? (
              <a
                href={safeDetails.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link hover:text-link-hover inline-block"
              >
                View Source →
              </a>
            ) : null}
            {safeDetails.liveUrl ? (
              <a
                href={safeDetails.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-success hover:text-success-hover inline-block"
              >
                Live Demo →
              </a>
            ) : null}
          </div>
        </div>

        <ProjectReadmeSection githubUrl={safeDetails.githubUrl} />
      </article>
    </DirectionalTransition>
  );
}
