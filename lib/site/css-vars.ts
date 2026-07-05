/** Read a CSS custom property from :root (for canvas/WebGL etc.) */
export function getThemeColor(name: string, fallback?: string): string {
  if (typeof window === "undefined") {
    return fallback ?? "";
  }

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();

  return value || fallback || "";
}

export function getPrimaryColor(fallback = ""): string {
  return (
    getThemeColor("--site-primary", fallback) ||
    getThemeColor("--primary", fallback)
  );
}
