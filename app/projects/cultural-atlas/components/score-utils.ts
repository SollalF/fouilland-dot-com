import type { Country } from "../data/country-scores";
import { getPoleLabel, type ScoreEntry, type ScaleId } from "../data/scales";
export function getCountryScore(
  country: Country,
  scaleId: ScaleId,
): ScoreEntry | undefined {
  return (country.scores as Partial<Record<ScaleId, ScoreEntry>>)[scaleId];
}

export function scoreLabel(country: Country, scaleId: ScaleId): string {
  const score = getCountryScore(country, scaleId)?.sources[0].value;
  if (typeof score !== "number") {
    return `${country.name}: no cited data for this scale`;
  }
  return `${country.name}: ${score} (${getPoleLabel(scaleId, score)})`;
}
