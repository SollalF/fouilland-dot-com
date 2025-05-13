import { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { projectDetails } from "./project-details";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchReadmeFromGitHub } from "@/lib/github-utils";

export const metadata: Metadata = {
  title: projectDetails?.title || "AI Newsletter",
  description:
    projectDetails?.description ||
    "A personalized AI-powered newsletter platform",
};

export default async function AINewsletter() {
  // Default content in case anything fails
  let readmeContent = "Loading README content...";
  const safeDetails = projectDetails || {
    title: "AI Newsletter",
    description: "A personalized AI-powered newsletter platform",
    longDescription: "",
    imageUrl: "/placeholder.jpg",
    tags: [],
    githubUrl: "",
    liveUrl: "",
  };

  try {
    // Extract owner and repo from GitHub URL
    if (safeDetails.githubUrl) {
      const urlParts = safeDetails.githubUrl.split("/");
      if (urlParts.length >= 2) {
        const owner = urlParts[urlParts.length - 2] || "SollalF";
        const repo =
          urlParts[urlParts.length - 1]?.replace(".git", "") || "daily-news";
        // Fetch README content
        readmeContent = await fetchReadmeFromGitHub(owner, repo);
      }
    }
  } catch (error) {
    console.error("Error in AINewsletter component:", error);
    readmeContent = "Error loading README content. Please try again later.";
  }

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
        <div className="prose dark:prose-invert max-w-none">
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
              className="text-blue-500 hover:text-blue-700 inline-block"
            >
              View Source →
            </a>
          )}
          {safeDetails.liveUrl && (
            <a
              href={safeDetails.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-700 inline-block"
            >
              Live Demo →
            </a>
          )}
        </div>
      </div>

      {/* README Content Section */}
      <div className="prose dark:prose-invert max-w-none w-full py-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {readmeContent}
        </ReactMarkdown>
      </div>
    </main>
  );
}
