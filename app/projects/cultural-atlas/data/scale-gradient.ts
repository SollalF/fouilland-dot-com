export const SCALE_MAX = 99;

export const SCALE_GRADIENT_STOPS = {
  low: { hue: 178, saturation: 76, lightness: 38 },
  mid: { hue: 0, saturation: 0, lightness: 100 },
  high: { hue: 285, saturation: 76, lightness: 38 },
} as const;

type HslStop = (typeof SCALE_GRADIENT_STOPS)[keyof typeof SCALE_GRADIENT_STOPS];

function toHsl({ hue, saturation, lightness }: HslStop): string {
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
}

function fadePoleToWhite(pole: HslStop, t: number): string {
  const saturation = pole.saturation * (1 - t);
  const lightness = pole.lightness + (100 - pole.lightness) * t;
  return `hsl(${pole.hue} ${saturation}% ${lightness}%)`;
}

function fadeWhiteToPole(pole: HslStop, t: number): string {
  const saturation = pole.saturation * t;
  const lightness = 100 + (pole.lightness - 100) * t;
  return `hsl(${pole.hue} ${saturation}% ${lightness}%)`;
}

export const SCALE_GRADIENT = `linear-gradient(90deg, ${toHsl(SCALE_GRADIENT_STOPS.low)} 0%, ${toHsl(SCALE_GRADIENT_STOPS.mid)} 50%, ${toHsl(SCALE_GRADIENT_STOPS.high)} 100%)`;

export function getNeutralScoreColor(score: number): string {
  const normalized = Math.max(0, Math.min(SCALE_MAX, score)) / SCALE_MAX;
  const midpoint = 0.5;

  if (normalized <= midpoint) {
    return fadePoleToWhite(
      SCALE_GRADIENT_STOPS.low,
      normalized / midpoint,
    );
  }

  return fadeWhiteToPole(
    SCALE_GRADIENT_STOPS.high,
    (normalized - midpoint) / midpoint,
  );
}
