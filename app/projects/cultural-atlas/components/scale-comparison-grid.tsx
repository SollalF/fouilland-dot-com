"use client";

import type { Country } from "../data/country-scores";
import { SCALES } from "../data/scales";
import { CitedScore, MissingScore } from "./cited-score";
import { ScaleGradientBar } from "./scale-gradient-bar";
import { getCountryScore } from "./score-utils";

const COUNTRY_A_COLOR = "var(--chart-1)";
const COUNTRY_B_COLOR = "var(--chart-2)";

export function ScaleComparisonGrid({
  countryA,
  countryB,
}: {
  countryA: Country;
  countryB: Country;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {SCALES.map((scale) => {
        const entryA = getCountryScore(countryA, scale.id);
        const entryB = getCountryScore(countryB, scale.id);
        const scoreA = entryA?.sources[0].value;
        const scoreB = entryB?.sources[0].value;
        const delta =
          typeof scoreA === "number" && typeof scoreB === "number"
            ? Math.abs(scoreA - scoreB)
            : null;

        const markers = [
          ...(typeof scoreA === "number"
            ? [
                {
                  value: scoreA,
                  color: COUNTRY_A_COLOR,
                  label: `${countryA.name}: ${scoreA}`,
                },
              ]
            : []),
          ...(typeof scoreB === "number"
            ? [
                {
                  value: scoreB,
                  color: COUNTRY_B_COLOR,
                  label: `${countryB.name}: ${scoreB}`,
                },
              ]
            : []),
        ];

        return (
          <div
            key={scale.id}
            className="rounded-lg border bg-background/60 p-4"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold">{scale.label}</h3>
              <span className="text-xs text-muted-foreground">
                Δ {delta ?? "n/a"}
              </span>
            </div>

            <div className="mb-3">
              <ScaleGradientBar
                low={scale.low}
                high={scale.high}
                markers={markers}
                showLabels
              />
            </div>

            <div className="space-y-3">
              {entryA ? (
                <CitedScore
                  entry={entryA}
                  scaleId={scale.id}
                  color={COUNTRY_A_COLOR}
                  countryName={countryA.name}
                  showBar={false}
                />
              ) : (
                <MissingScore
                  color={COUNTRY_A_COLOR}
                  countryName={countryA.name}
                  showBar={false}
                />
              )}
              {entryB ? (
                <CitedScore
                  entry={entryB}
                  scaleId={scale.id}
                  color={COUNTRY_B_COLOR}
                  countryName={countryB.name}
                  showBar={false}
                />
              ) : (
                <MissingScore
                  color={COUNTRY_B_COLOR}
                  countryName={countryB.name}
                  showBar={false}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
