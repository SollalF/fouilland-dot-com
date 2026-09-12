"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { COUNTRY_SCORES, type CountryId } from "./data/country-scores";
import { SCALES, type ScaleId } from "./data/scales";
import { CountrySelect } from "./components/country-select";
import { CultureRadarChart } from "./components/culture-radar-chart";
import { ScaleComparisonGrid } from "./components/scale-comparison-grid";
import { ScaleMap } from "./components/scale-map";
import { SourcesSection } from "./components/sources-section";
import {
  DEFAULT_COUNTRY_A,
  DEFAULT_COUNTRY_B,
  DEFAULT_MAP_SCALE,
} from "./components/constants";
import { getCountryScore } from "./components/score-utils";

export default function CultureMapDemo() {
  const [countryAId, setCountryAId] = useState<CountryId>(DEFAULT_COUNTRY_A);
  const [countryBId, setCountryBId] = useState<CountryId>(DEFAULT_COUNTRY_B);
  const [mapScaleId, setMapScaleId] = useState<ScaleId>(DEFAULT_MAP_SCALE);

  const countryA = COUNTRY_SCORES[countryAId];
  const countryB = COUNTRY_SCORES[countryBId];

  const chartData = useMemo(
    () =>
      SCALES.map((scale) => ({
        scale: scale.label,
        countryA: getCountryScore(countryA, scale.id)?.sources[0].value ?? null,
        countryB: getCountryScore(countryB, scale.id)?.sources[0].value ?? null,
      })),
    [countryA, countryB],
  );

  return (
    <Card className="border-0 bg-transparent py-0 shadow-none">
      <CardHeader className="px-0">
        <CardTitle>Culture Map Comparison</CardTitle>
        <CardDescription>
          Compare two countries across eight behavioral scales.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8 px-0">
        <div className="flex flex-col gap-4 sm:flex-row">
          <CountrySelect
            id="country-a"
            label="Country A"
            value={countryAId}
            excludedId={countryBId}
            onChange={setCountryAId}
          />
          <CountrySelect
            id="country-b"
            label="Country B"
            value={countryBId}
            excludedId={countryAId}
            onChange={setCountryBId}
          />
        </div>

        <CultureRadarChart
          chartData={chartData}
          countryAName={countryA.name}
          countryBName={countryB.name}
        />

        <ScaleMap mapScaleId={mapScaleId} onMapScaleChange={setMapScaleId} />

        <ScaleComparisonGrid countryA={countryA} countryB={countryB} />

        <SourcesSection />
      </CardContent>
    </Card>
  );
}
