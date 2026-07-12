import {
  applySiteColors,
  colorsMatchValues,
  isDarkColor,
  loadSiteColorConfig,
  saveSiteColorConfig,
  type SiteColorValues,
} from "./colors";
import {
  applySiteFonts,
  getSiteFontConfig,
  saveSiteFontConfig,
  type SiteFontId,
} from "./fonts";
import {
  applySiteShape,
  getSiteShapeConfig,
  saveSiteShapeConfig,
  shapesMatch,
  type SiteShapeValues,
} from "./shape";

export type SitePresetThemeId =
  | "light"
  | "dark"
  | "hacker"
  | "polyu"
  | "lgbt";
export type SiteThemeId = SitePresetThemeId | "custom";

export const SITE_CUSTOM_THEME_ID = "custom" as const satisfies SiteThemeId;

export const SITE_CUSTOM_THEME = {
  id: SITE_CUSTOM_THEME_ID,
  label: "Custom",
} as const;

export type SiteThemeChangeDetail = {
  themeId: SiteThemeId;
};

export type SiteTheme = {
  id: SitePresetThemeId;
  label: string;
  colors: SiteColorValues;
  font: SiteFontId;
  shape: SiteShapeValues;
};

export const SITE_THEMES: Record<SitePresetThemeId, SiteTheme> = {
  light: {
    id: "light",
    label: "Light",
    colors: {
      primary: "#3538CD",
      text: "#1E1B4B",
      background: "#FFFFFF",
    },
    font: "inter",
    shape: { radius: "md", borderWidth: "thin" },
  },
  dark: {
    id: "dark",
    label: "Dark",
    colors: {
      primary: "#CBD5E1",
      text: "#E2E8F0",
      background: "#0F172A",
    },
    font: "inter",
    shape: { radius: "lg", borderWidth: "thin" },
  },
  hacker: {
    id: "hacker",
    label: "Hacker",
    colors: {
      primary: "#00FF41",
      text: "#33FF33",
      background: "#0A0F0A",
    },
    font: "ibm-plex-mono",
    shape: { radius: "none", borderWidth: "medium" },
  },
  polyu: {
    id: "polyu",
    label: "PolyU",
    colors: {
      primary: "#A02337",
      text: "#E8E0D8",
      background: "#1A1210",
    },
    font: "inter",
    shape: { radius: "md", borderWidth: "thin" },
  },
  lgbt: {
    id: "lgbt",
    label: "LGBT",
    colors: {
      primary: "#750787",
      text: "#F8F5FF",
      background: "#14061C",
    },
    font: "inter",
    shape: { radius: "lg", borderWidth: "thin" },
  },
};

export const DEFAULT_SITE_COLORS = SITE_THEMES.light.colors;

export function getSiteColorConfig(): SiteColorValues {
  return loadSiteColorConfig() ?? SITE_THEMES.light.colors;
}

export const SITE_THEME_ORDER = Object.keys(SITE_THEMES) as SitePresetThemeId[];

const THEME_ID_STORAGE_KEY = "site-theme-palette-id";

function isSiteThemeId(value: string | null): value is SiteThemeId {
  return (
    value === "light" ||
    value === "dark" ||
    value === "hacker" ||
    value === "polyu" ||
    value === "lgbt" ||
    value === "custom"
  );
}

function applySitePresetDataAttribute(themeId: SiteThemeId): void {
  if (typeof document === "undefined") return;

  if (themeId === SITE_CUSTOM_THEME_ID) {
    delete document.documentElement.dataset.sitePreset;
    return;
  }

  document.documentElement.dataset.sitePreset = themeId;
}

function presetMatches(
  colors: SiteColorValues,
  font: SiteFontId,
  shape: SiteShapeValues,
  theme: SiteTheme,
) {
  return (
    colorsMatchValues(colors, theme.colors) &&
    font === theme.font &&
    shapesMatch(shape, theme.shape)
  );
}

export function getActiveThemeId(): SiteThemeId | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(THEME_ID_STORAGE_KEY);
    return isSiteThemeId(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function resolveActiveThemeId(): SiteThemeId {
  const stored = getActiveThemeId();
  if (stored) return stored;

  const colors = getSiteColorConfig();
  const font = getSiteFontConfig();
  const shape = getSiteShapeConfig();

  if (presetMatches(colors, font, shape, SITE_THEMES.light)) return "light";
  if (presetMatches(colors, font, shape, SITE_THEMES.dark)) return "dark";
  if (presetMatches(colors, font, shape, SITE_THEMES.hacker)) return "hacker";
  if (presetMatches(colors, font, shape, SITE_THEMES.polyu)) return "polyu";
  if (presetMatches(colors, font, shape, SITE_THEMES.lgbt)) return "lgbt";
  return SITE_CUSTOM_THEME_ID;
}

export function setActiveThemeId(themeId: SiteThemeId): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(THEME_ID_STORAGE_KEY, themeId);
  applySitePresetDataAttribute(themeId);

  window.dispatchEvent(
    new CustomEvent<SiteThemeChangeDetail>("site-theme-change", {
      detail: { themeId },
    }),
  );
}

export function themeSelected(
  activeThemeId: SiteThemeId,
  themeId: SitePresetThemeId,
) {
  return activeThemeId === themeId;
}

export function isDarkLikeTheme(themeId: SiteThemeId): boolean {
  if (themeId === SITE_CUSTOM_THEME_ID) {
    return isDarkColor(getSiteColorConfig().background);
  }

  return isDarkColor(SITE_THEMES[themeId].colors.background);
}

export function applySiteThemePreset(theme: SiteTheme): SiteTheme {
  applySiteColors(theme.colors);
  applySiteFonts(theme.font);
  applySiteShape(theme.shape);
  saveSiteColorConfig(theme.colors);
  saveSiteFontConfig(theme.font);
  saveSiteShapeConfig(theme.shape);
  setActiveThemeId(theme.id);
  return theme;
}

export function applySiteFromStorage(): void {
  applySiteColors(getSiteColorConfig());
  applySiteFonts(getSiteFontConfig());
  applySiteShape(getSiteShapeConfig());
  applySitePresetDataAttribute(resolveActiveThemeId());
}
