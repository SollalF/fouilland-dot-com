export type SiteRadiusId = "none" | "sm" | "md" | "lg" | "xl";

export type SiteBorderWidthId = "none" | "thin" | "medium" | "thick";

export type SiteShapeValues = {
  radius: SiteRadiusId;
  borderWidth: SiteBorderWidthId;
};

export type SiteRadiusDefinition = {
  id: SiteRadiusId;
  label: string;
  value: string;
};

export type SiteBorderWidthDefinition = {
  id: SiteBorderWidthId;
  label: string;
  value: string;
};

export const SITE_RADIUS: Record<SiteRadiusId, SiteRadiusDefinition> = {
  none: { id: "none", label: "None", value: "0px" },
  sm: { id: "sm", label: "Small", value: "0.25rem" },
  md: { id: "md", label: "Medium", value: "0.625rem" },
  lg: { id: "lg", label: "Large", value: "1rem" },
  xl: { id: "xl", label: "Extra large", value: "1.5rem" },
};

export const SITE_BORDER_WIDTH: Record<
  SiteBorderWidthId,
  SiteBorderWidthDefinition
> = {
  none: { id: "none", label: "None", value: "0px" },
  thin: { id: "thin", label: "Thin", value: "1px" },
  medium: { id: "medium", label: "Medium", value: "2px" },
  thick: { id: "thick", label: "Thick", value: "3px" },
};

export const SITE_RADIUS_ORDER = Object.keys(SITE_RADIUS) as SiteRadiusId[];
export const SITE_BORDER_WIDTH_ORDER = Object.keys(
  SITE_BORDER_WIDTH,
) as SiteBorderWidthId[];

export const DEFAULT_SITE_SHAPE: SiteShapeValues = {
  radius: "md",
  borderWidth: "thin",
};

const STORAGE_KEY = "site-theme-shape";

export type SiteShapeChangeDetail = {
  shape: SiteShapeValues;
};

export function shapesMatch(a: SiteShapeValues, b: SiteShapeValues) {
  return a.radius === b.radius && a.borderWidth === b.borderWidth;
}

export function applySiteShape(shape: SiteShapeValues): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.style.setProperty("--site-radius", SITE_RADIUS[shape.radius].value);
  root.style.setProperty(
    "--site-border-width",
    SITE_BORDER_WIDTH[shape.borderWidth].value,
  );
}

function parseStoredShape(raw: string): SiteShapeValues | null {
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;

    if (
      typeof parsed.radius !== "string" ||
      typeof parsed.borderWidth !== "string" ||
      !(parsed.borderWidth in SITE_BORDER_WIDTH)
    ) {
      return null;
    }

    const radius =
      parsed.radius === "full" || !(parsed.radius in SITE_RADIUS)
        ? DEFAULT_SITE_SHAPE.radius
        : (parsed.radius as SiteRadiusId);

    return {
      radius,
      borderWidth: parsed.borderWidth as SiteBorderWidthId,
    };
  } catch {
    return null;
  }
}

function loadSiteShapeConfig(): SiteShapeValues | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return parseStoredShape(raw);
    return null;
  } catch {
    return null;
  }
}

export function saveSiteShapeConfig(config: SiteShapeValues): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));

  window.dispatchEvent(
    new CustomEvent<SiteShapeChangeDetail>("site-shape-change", {
      detail: { shape: config },
    }),
  );
}

export function getSiteShapeConfig(): SiteShapeValues {
  return loadSiteShapeConfig() ?? DEFAULT_SITE_SHAPE;
}
