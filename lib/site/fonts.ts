export type SiteFontId =
  | "inter"
  | "dm-sans"
  | "outfit"
  | "source-sans-3"
  | "lora"
  | "playfair-display"
  | "ibm-plex-mono";

export type SiteFontDefinition = {
  id: SiteFontId;
  label: string;
  family: string;
  category: "sans" | "serif" | "mono";
  googleFonts: string | null;
  fallback: string;
};

export const SITE_FONTS: Record<SiteFontId, SiteFontDefinition> = {
  inter: {
    id: "inter",
    label: "Inter",
    family: "Inter",
    category: "sans",
    googleFonts: null,
    fallback: "ui-sans-serif, system-ui, sans-serif",
  },
  "dm-sans": {
    id: "dm-sans",
    label: "DM Sans",
    family: "DM Sans",
    category: "sans",
    googleFonts:
      "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
    fallback: "ui-sans-serif, system-ui, sans-serif",
  },
  outfit: {
    id: "outfit",
    label: "Outfit",
    family: "Outfit",
    category: "sans",
    googleFonts:
      "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap",
    fallback: "ui-sans-serif, system-ui, sans-serif",
  },
  "source-sans-3": {
    id: "source-sans-3",
    label: "Source Sans 3",
    family: "Source Sans 3",
    category: "sans",
    googleFonts:
      "https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
    fallback: "ui-sans-serif, system-ui, sans-serif",
  },
  lora: {
    id: "lora",
    label: "Lora",
    family: "Lora",
    category: "serif",
    googleFonts:
      "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
    fallback: "ui-serif, Georgia, serif",
  },
  "playfair-display": {
    id: "playfair-display",
    label: "Playfair Display",
    family: "Playfair Display",
    category: "serif",
    googleFonts:
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
    fallback: "ui-serif, Georgia, serif",
  },
  "ibm-plex-mono": {
    id: "ibm-plex-mono",
    label: "IBM Plex Mono",
    family: "IBM Plex Mono",
    category: "mono",
    googleFonts:
      "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
    fallback: "ui-monospace, monospace",
  },
};

export const SITE_FONT_ORDER = Object.keys(SITE_FONTS) as SiteFontId[];

export const DEFAULT_SITE_FONT: SiteFontId = "inter";

const STORAGE_KEY = "site-theme-font";

export type SiteFontChangeDetail = {
  font: SiteFontId;
};

export function fontFamilyValue(font: SiteFontDefinition) {
  return `"${font.family}", ${font.fallback}`;
}

function ensureFontLoaded(font: SiteFontDefinition) {
  if (typeof document === "undefined" || !font.googleFonts) return;

  const linkId = `site-font-${font.id}`;
  if (document.getElementById(linkId)) return;

  const link = document.createElement("link");
  link.id = linkId;
  link.rel = "stylesheet";
  link.href = font.googleFonts;
  document.head.appendChild(link);
}

export function preloadSiteFont(fontId: SiteFontId) {
  ensureFontLoaded(SITE_FONTS[fontId]);
}

export function applySiteFonts(fontId: SiteFontId): void {
  if (typeof document === "undefined") return;

  preloadSiteFont(fontId);

  const family = fontFamilyValue(SITE_FONTS[fontId]);
  const root = document.documentElement;
  root.style.setProperty("--site-font-body", family);
  root.style.setProperty("--site-font-heading", family);
}

function parseStoredFont(raw: string): SiteFontId | null {
  try {
    const parsed = JSON.parse(raw) as unknown;

    if (typeof parsed === "string" && parsed in SITE_FONTS) {
      return parsed as SiteFontId;
    }

    if (
      parsed &&
      typeof parsed === "object" &&
      "font" in parsed &&
      typeof (parsed as { font: unknown }).font === "string" &&
      (parsed as { font: string }).font in SITE_FONTS
    ) {
      return (parsed as { font: SiteFontId }).font;
    }

    if (
      parsed &&
      typeof parsed === "object" &&
      "body" in parsed &&
      typeof (parsed as { body: unknown }).body === "string" &&
      (parsed as { body: string }).body in SITE_FONTS
    ) {
      return (parsed as { body: SiteFontId }).body;
    }

    return null;
  } catch {
    return null;
  }
}

function loadSiteFontConfig(): SiteFontId | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return parseStoredFont(raw);
    return null;
  } catch {
    return null;
  }
}

export function saveSiteFontConfig(fontId: SiteFontId): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fontId));

  window.dispatchEvent(
    new CustomEvent<SiteFontChangeDetail>("site-font-change", {
      detail: { font: fontId },
    }),
  );
}

export function getSiteFontConfig(): SiteFontId {
  return loadSiteFontConfig() ?? DEFAULT_SITE_FONT;
}
