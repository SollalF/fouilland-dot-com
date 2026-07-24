import { Suspense } from "react";
import { SiteMarkdown } from "@/components/site-markdown";
import { fetchReadmeFromGitHub } from "@/lib/github-utils";

function ReadmeSkeleton() {
  return (
    <div className="py-8 space-y-3 animate-pulse" aria-busy="true">
      <div className="h-4 w-3/4 rounded bg-muted" />
      <div className="h-4 w-full rounded bg-muted" />
      <div className="h-4 w-5/6 rounded bg-muted" />
      <div className="h-4 w-2/3 rounded bg-muted" />
    </div>
  );
}

async function ProjectReadme({ githubUrl }: { githubUrl: string }) {
  let readmeContent = "README content could not be loaded from the repository.";

  try {
    const urlParts = githubUrl.split("/");
    if (urlParts.length >= 2) {
      const owner = urlParts[urlParts.length - 2] || "SollalF";
      const repo =
        urlParts[urlParts.length - 1]?.replace(".git", "") || "daily-news";
      readmeContent = await fetchReadmeFromGitHub(owner, repo);
    }
  } catch (error) {
    console.error("Error loading project README:", error);
    readmeContent = "Error loading README content. Please try again later.";
  }

  return <SiteMarkdown className="py-8">{readmeContent}</SiteMarkdown>;
}

type ProjectReadmeSectionProps = {
  githubUrl?: string;
};

/**
 * Streams README content behind Suspense so the project shell can paint first
 * (async-suspense-boundaries).
 */
export function ProjectReadmeSection({ githubUrl }: ProjectReadmeSectionProps) {
  if (!githubUrl) {
    return (
      <SiteMarkdown className="py-8">
        README content could not be loaded from the repository.
      </SiteMarkdown>
    );
  }

  return (
    <Suspense fallback={<ReadmeSkeleton />}>
      <ProjectReadme githubUrl={githubUrl} />
    </Suspense>
  );
}
