import {
  applySiteColors,
  colorsMatchValues,
  DARK_SITE_COLORS,
  getSiteColorConfig,
  LIGHT_SITE_COLORS,
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

export type SitePresetThemeId = "light" | "dark";
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
    colors: LIGHT_SITE_COLORS,
    font: "inter",
    shape: { radius: "md", borderWidth: "thin" },
  },
  dark: {
    id: "dark",
    label: "Dark",
    colors: DARK_SITE_COLORS,
    font: "inter",
    shape: { radius: "lg", borderWidth: "thin" },
  },
};

export const SITE_THEME_ORDER = Object.keys(SITE_THEMES) as SitePresetThemeId[];

const THEME_ID_STORAGE_KEY = "site-theme-palette-id";

function isSiteThemeId(value: string | null): value is SiteThemeId {
  return value === "light" || value === "dark" || value === "custom";
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
  return SITE_CUSTOM_THEME_ID;
}

export function setActiveThemeId(themeId: SiteThemeId): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(THEME_ID_STORAGE_KEY, themeId);

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
}
