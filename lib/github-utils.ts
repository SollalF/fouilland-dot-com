// Function to fetch README content from GitHub
export async function fetchReadmeFromGitHub(
  owner: string,
  repo: string,
  branch = "main",
): Promise<string> {
  const base = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}`;
  const fetchOptions = { next: { revalidate: 3600 } } as const;

  const tryFetch = async (filename: string) => {
    const response = await fetch(`${base}/${filename}`, fetchOptions);
    if (!response.ok) {
      throw new Error(`README not found: ${filename}`);
    }
    return response.text();
  };

  try {
    // Race both casings in parallel so a missing README.md does not
    // waterfall into a second sequential request (async-parallel).
    return await Promise.any([tryFetch("README.md"), tryFetch("readme.md")]);
  } catch (error) {
    if (
      error instanceof AggregateError ||
      (error instanceof Error && error.message.includes("README not found"))
    ) {
      console.warn(`README not found for ${owner}/${repo} on branch ${branch}`);
      return "README content could not be loaded from the repository.";
    }
    console.error(`Error fetching README for ${owner}/${repo}:`, error);
    return "Error loading README content from the repository.";
  }
}
