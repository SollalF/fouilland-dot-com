import { toHex } from "color2k";

export type SiteColorRole = "primary" | "text" | "background";

export type SiteColorValues = Record<SiteColorRole, string>;

export type ThemePaletteId = "light" | "dark";

export type ThemePalette = {
  id: ThemePaletteId;
  label: string;
  colors: SiteColorValues;
};

export const THEME_PALETTES: Record<ThemePaletteId, ThemePalette> = {
  light: {
    id: "light",
    label: "Light",
    colors: {
      primary: "#3538CD",
      text: "#1E1B4B",
      background: "#FFFFFF",
    },
  },
  dark: {
    id: "dark",
    label: "Dark",
    colors: {
      primary: "#818CF8",
      text: "#E0E7FF",
      background: "#1E1B4B",
    },
  },
};

export const THEME_PALETTE_ORDER = Object.keys(
  THEME_PALETTES,
) as ThemePaletteId[];

export type RoleColorPreset = {
  label: string;
  color: string;
};

export const ROLE_COLOR_PRESETS: Record<SiteColorRole, RoleColorPreset[]> = {
  primary: [
    { label: "Teal", color: "#0891B2" },
    { label: "Rose", color: "#E11D48" },
  ],
  text: [
    { label: "Charcoal", color: "#171717" },
    { label: "Slate", color: "#475569" },
  ],
  background: [
    { label: "Cream", color: "#FFFBEB" },
    { label: "Mist", color: "#F1F5F9" },
  ],
};

export const SITE_COLOR_ROLES: SiteColorRole[] = [
  "primary",
  "text",
  "background",
];

export const SITE_COLOR_LABELS: Record<SiteColorRole, string> = {
  primary: "Primary",
  text: "Text",
  background: "Background",
};

export function colorsMatch(a: string, b: string) {
  return normalizeHex(a) === normalizeHex(b);
}

export function colorsMatchValues(a: SiteColorValues, b: SiteColorValues) {
  return SITE_COLOR_ROLES.every((role) => colorsMatch(a[role], b[role]));
}

export function paletteSelected(
  config: SiteColorValues,
  palette: ThemePalette,
  activePaletteId: string | null,
) {
  if (activePaletteId) return activePaletteId === palette.id;
  return colorsMatchValues(config, palette.colors);
}

export function getActivePaletteId(): string | null {
  if (typeof window === "undefined") return null;

  try {
    return localStorage.getItem(PALETTE_ID_KEY);
  } catch {
    return null;
  }
}

const STORAGE_KEY = "site-theme-colors";
const PALETTE_ID_KEY = "site-theme-palette-id";

export type SiteThemeChangeDetail = {
  colors: SiteColorValues;
  paletteId: string | null;
};

/** Normalize site colors to lowercase #rrggbb. */
export function normalizeHex(color: string, fallback = "#000000"): string {
  try {
    return toHex(color.trim());
  } catch {
    return fallback;
  }
}

function normalizeSiteColors(colors: SiteColorValues): SiteColorValues {
  return SITE_COLOR_ROLES.reduce((acc, role) => {
    acc[role] = normalizeHex(colors[role]);
    return acc;
  }, {} as SiteColorValues);
}

export const DEFAULT_SITE_THEME: SiteColorValues = {
  ...THEME_PALETTES.light.colors,
};

export function applySiteTheme(colors: SiteColorValues): void {
  if (typeof document === "undefined") return;

  const normalized = normalizeSiteColors(colors);
  const root = document.documentElement;

  for (const role of SITE_COLOR_ROLES) {
    root.style.setProperty(`--site-${role}`, normalized[role]);
  }
  root.style.removeProperty("--site-secondary");
  root.style.colorScheme = "light";
  root.dataset.theme = "light";
  root.classList.remove("dark");
}

function normalizeStoredColors(
  parsed: Record<string, unknown>,
): SiteColorValues | null {
  if (
    typeof parsed.primary !== "string" ||
    typeof parsed.background !== "string"
  ) {
    return null;
  }

  const text =
    typeof parsed.text === "string"
      ? parsed.text
      : typeof parsed.secondary === "string"
        ? parsed.secondary
        : null;

  if (!text) return null;

  return normalizeSiteColors({
    primary: parsed.primary,
    text,
    background: parsed.background,
  });
}

function parseStoredColors(raw: string): SiteColorValues | null {
  try {
    const parsed = JSON.parse(raw) as
      | Record<string, unknown>
      | { light?: Record<string, unknown>; dark?: Record<string, unknown> };

    if (parsed && "primary" in parsed) {
      const normalized = normalizeStoredColors(parsed);
      if (normalized) return normalized;
    }

    if (parsed && "light" in parsed && parsed.light) {
      return normalizeStoredColors(parsed.light as Record<string, unknown>);
    }

    return null;
  } catch {
    return null;
  }
}

function loadSiteThemeConfig(): SiteColorValues | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = parseStoredColors(raw);
      if (parsed) return parsed;
    }

    return null;
  } catch {
    return null;
  }
}

export function saveSiteThemeConfig(
  config: SiteColorValues,
  paletteId: string | null = null,
): void {
  const normalized = normalizeSiteColors(config);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));

  if (paletteId) {
    localStorage.setItem(PALETTE_ID_KEY, paletteId);
  } else {
    localStorage.removeItem(PALETTE_ID_KEY);
  }

  window.dispatchEvent(
    new CustomEvent<SiteThemeChangeDetail>("site-theme-change", {
      detail: { colors: normalized, paletteId },
    }),
  );
}

export function applyThemePalette(palette: ThemePalette): SiteColorValues {
  const next = { ...palette.colors };
  saveSiteThemeConfig(next, palette.id);
  applySiteTheme(next);
  return next;
}

export function getSiteThemeConfig(): SiteColorValues {
  return loadSiteThemeConfig() ?? DEFAULT_SITE_THEME;
}
