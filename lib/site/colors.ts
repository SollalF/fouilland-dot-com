import { toHex } from "color2k";

export type SiteColorRole = "primary" | "text" | "background";

export type SiteColorValues = Record<SiteColorRole, string>;

export type RoleColorPreset = {
  label: string;
  color: string;
};

export const ROLE_COLOR_PRESETS: Record<SiteColorRole, RoleColorPreset[]> = {
  primary: [
    { label: "Cherry Bomb", color: "#E11D48" },
    { label: "Grape Soda", color: "#A855F7" },
    { label: "Lagoon", color: "#06B6D4" },
    { label: "Mango Sunset", color: "#FB923C" },
    { label: "Laser Lime", color: "#84CC16" },
  ],
  text: [
    { label: "Midnight Ink", color: "#1E1B4B" },
    { label: "Espresso", color: "#292524" },
    { label: "Storm Cloud", color: "#475569" },
    { label: "Moonbeam", color: "#E2E8F0" },
    { label: "Starlight", color: "#FEF9C3" },
  ],
  background: [
    { label: "Vanilla Sky", color: "#FFFBEB" },
    { label: "Blush Petal", color: "#FFF1F2" },
    { label: "Mint Fizz", color: "#ECFDF5" },
    { label: "Midnight", color: "#0F172A" },
    { label: "Deep Forest", color: "#14532D" },
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

const STORAGE_KEY = "site-theme-colors";

export type SiteColorChangeDetail = {
  colors: SiteColorValues;
};

/** Normalize site colors to lowercase #rrggbb. */
export function normalizeHex(color: string, fallback = "#000000"): string {
  try {
    return toHex(color.trim());
  } catch {
    return fallback;
  }
}

export function colorsMatch(a: string, b: string) {
  return normalizeHex(a) === normalizeHex(b);
}

export function colorsMatchValues(a: SiteColorValues, b: SiteColorValues) {
  return SITE_COLOR_ROLES.every((role) => colorsMatch(a[role], b[role]));
}

/** Whether a color reads as dark based on relative luminance. */
export function isDarkColor(color: string): boolean {
  const hex = normalizeHex(color);
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

function normalizeSiteColors(colors: SiteColorValues): SiteColorValues {
  return SITE_COLOR_ROLES.reduce((acc, role) => {
    acc[role] = normalizeHex(colors[role]);
    return acc;
  }, {} as SiteColorValues);
}

export function applySiteColors(colors: SiteColorValues): void {
  if (typeof document === "undefined") return;

  const normalized = normalizeSiteColors(colors);
  const root = document.documentElement;

  for (const role of SITE_COLOR_ROLES) {
    root.style.setProperty(`--site-${role}`, normalized[role]);
  }
  root.style.removeProperty("--site-secondary");
  root.style.colorScheme = "light";
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

export function loadSiteColorConfig(): SiteColorValues | null {
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

export function saveSiteColorConfig(config: SiteColorValues): void {
  const normalized = normalizeSiteColors(config);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));

  window.dispatchEvent(
    new CustomEvent<SiteColorChangeDetail>("site-color-change", {
      detail: { colors: normalized },
    }),
  );
}
