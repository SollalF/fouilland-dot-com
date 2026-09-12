"use client";

import {
  useEffect,
  useMemo,
  useState,
  type FocusEvent,
  type MouseEvent,
} from "react";
import {
  COUNTRY_SCORES,
  countries,
  type Country,
} from "../data/country-scores";
import { getPoleLabel, SCALES, type ScaleId } from "../data/scales";
import { getNeutralScoreColor } from "../data/scale-gradient";
import {
  COUNTRY_NAME_ALIASES,
  MAP_HEIGHT,
  MAP_WIDTH,
  WORLD_GEOJSON_URL,
} from "./constants";
import {
  geometryToPath,
  normalizeCountryName,
  type MapHover,
  type WorldFeature,
  type WorldGeoJson,
} from "./map-utils";
import { ScaleGradientBar } from "./scale-gradient-bar";
import { ScaleSelect } from "./scale-select";
import { getCountryScore } from "./score-utils";

export function ScaleMap({
  mapScaleId,
  onMapScaleChange,
}: {
  mapScaleId: ScaleId;
  onMapScaleChange: (scaleId: ScaleId) => void;
}) {
  const [worldFeatures, setWorldFeatures] = useState<WorldFeature[]>([]);
  const [mapLoadFailed, setMapLoadFailed] = useState(false);
  const [mapHover, setMapHover] = useState<MapHover | null>(null);

  const mapScale = SCALES.find((scale) => scale.id === mapScaleId) ?? SCALES[0];

  useEffect(() => {
    let cancelled = false;

    async function loadWorldMap() {
      try {
        const response = await fetch(WORLD_GEOJSON_URL);
        if (!response.ok) {
          throw new Error("World map request failed");
        }

        const geoJson = (await response.json()) as WorldGeoJson;
        if (!cancelled) {
          setWorldFeatures(geoJson.features);
          setMapLoadFailed(false);
        }
      } catch {
        if (!cancelled) {
          setMapLoadFailed(true);
        }
      }
    }

    loadWorldMap();

    return () => {
      cancelled = true;
    };
  }, []);

  const countryByName = useMemo(() => {
    const byName = new Map<string, Country>();
    for (const country of countries) {
      byName.set(normalizeCountryName(country.name), country);
    }
    return byName;
  }, []);

  const mapScores = useMemo(
    () =>
      countries
        .map((country) => ({
          country,
          score: getCountryScore(country, mapScaleId)?.sources[0].value,
        }))
        .filter(
          (entry): entry is { country: Country; score: number } =>
            typeof entry.score === "number",
        )
        .sort((a, b) => b.score - a.score),
    [mapScaleId],
  );

  function getCountryFromFeature(feature: WorldFeature): Country | undefined {
    const featureName = feature.properties.name;
    if (!featureName) return undefined;

    const normalizedName = normalizeCountryName(featureName);
    const alias = COUNTRY_NAME_ALIASES[normalizedName];
    return alias ? COUNTRY_SCORES[alias] : countryByName.get(normalizedName);
  }

  function getMapHoverLabel(
    country: Country | undefined,
    featureName: string,
  ): string {
    const score = country
      ? getCountryScore(country, mapScaleId)?.sources[0].value
      : undefined;
    return country && typeof score === "number"
      ? `${country.name}: ${score} (${getPoleLabel(mapScaleId, score)})`
      : `${country?.name ?? featureName}: no cited data for this scale`;
  }

  function showMapHover(
    event: MouseEvent<SVGPathElement>,
    country: Country | undefined,
    featureName: string,
  ) {
    setMapHover({
      label: getMapHoverLabel(country, featureName),
      left: event.clientX + 12,
      top: event.clientY + 12,
    });
  }

  function showMapFocus(
    event: FocusEvent<SVGPathElement>,
    country: Country | undefined,
    featureName: string,
  ) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setMapHover({
      label: getMapHoverLabel(country, featureName),
      left: bounds.left + bounds.width / 2,
      top: bounds.top + 12,
    });
  }

  return (
    <div className="rounded-lg border bg-background/60 p-4">
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-sm font-semibold">Scale Map</h3>
          <p className="mt-1 max-w-2xl text-xs text-muted-foreground">
            Select a scale to see every country with cited data shaded on a
            balanced turquoise-to-purple gradient. The colors mark position on
            the scale without implying better or worse.
          </p>
        </div>
        <ScaleSelect
          id="map-scale"
          label="Map scale"
          value={mapScaleId}
          onChange={onMapScaleChange}
        />
      </div>

      <ScaleGradientBar
        className="mb-3"
        low={mapScale.low}
        high={mapScale.high}
        showLabels
      />

      <div className="relative overflow-x-auto rounded-lg border bg-background p-3">
        {mapLoadFailed ? (
          <div className="flex min-h-[320px] items-center justify-center text-sm text-muted-foreground">
            Could not load the country map. The score list below is still
            available.
          </div>
        ) : worldFeatures.length === 0 ? (
          <div className="flex min-h-[320px] items-center justify-center text-sm text-muted-foreground">
            Loading country map…
          </div>
        ) : (
          <svg
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            role="img"
            aria-label={`${mapScale.label} country score map`}
            className="min-w-[760px]"
            onMouseLeave={() => setMapHover(null)}
          >
            <rect
              width={MAP_WIDTH}
              height={MAP_HEIGHT}
              rx="24"
              fill="var(--background)"
            />
            {worldFeatures.map((feature) => {
              const featureName = feature.properties.name ?? "Unknown country";
              const country = getCountryFromFeature(feature);
              const score = country
                ? getCountryScore(country, mapScaleId)?.sources[0].value
                : undefined;
              const hasScore = typeof score === "number";

              return (
                <path
                  key={featureName}
                  d={geometryToPath(feature.geometry)}
                  fill={
                    hasScore ? getNeutralScoreColor(score) : "var(--muted)"
                  }
                  fillOpacity={hasScore ? 1 : 0.35}
                  stroke="var(--border)"
                  strokeWidth={0.75}
                  className="transition-opacity hover:opacity-80"
                  onMouseMove={(event) =>
                    showMapHover(event, country, featureName)
                  }
                  onFocus={(event) =>
                    showMapFocus(event, country, featureName)
                  }
                  onBlur={() => setMapHover(null)}
                  tabIndex={0}
                />
              );
            })}
          </svg>
        )}

        {mapHover ? (
          <div
            className="pointer-events-none fixed z-50 max-w-64 rounded-md border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md"
            style={{ left: mapHover.left, top: mapHover.top }}
          >
            {mapHover.label}
          </div>
        ) : null}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-md bg-muted/30 p-3">
          <h4 className="text-xs font-semibold">Closest to {mapScale.low}</h4>
          <ol className="mt-2 space-y-1 text-xs text-muted-foreground">
            {mapScores
              .slice(-5)
              .reverse()
              .map(({ country, score }) => (
                <li key={country.id} className="flex justify-between gap-3">
                  <span>{country.name}</span>
                  <span>{score}</span>
                </li>
              ))}
          </ol>
        </div>
        <div className="rounded-md bg-muted/30 p-3">
          <h4 className="text-xs font-semibold">Closest to {mapScale.high}</h4>
          <ol className="mt-2 space-y-1 text-xs text-muted-foreground">
            {mapScores.slice(0, 5).map(({ country, score }) => (
              <li key={country.id} className="flex justify-between gap-3">
                <span>{country.name}</span>
                <span>{score}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
