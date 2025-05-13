// Function to fetch README content from GitHub
export async function fetchReadmeFromGitHub(
  owner: string,
  repo: string,
  branch = "main",
): Promise<string> {
  try {
    // Try to fetch README.md first
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`;
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour

    if (response.ok) {
      return await response.text();
    }

    // If README.md doesn't exist, try readme.md (lowercase)
    const lowercaseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/readme.md`;
    const lowercaseResponse = await fetch(lowercaseUrl, {
      next: { revalidate: 3600 },
    });

    if (lowercaseResponse.ok) {
      return await lowercaseResponse.text();
    }

    console.warn(`README not found for ${owner}/${repo} on branch ${branch}`);
    return "README content could not be loaded from the repository.";
  } catch (error) {
    console.error(`Error fetching README for ${owner}/${repo}:`, error);
    return "Error loading README content from the repository.";
  }
}
