"use client";

import { useMemo } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { getPoleLabel, SCALES } from "../data/scales";

type RadarChartPoint = {
  scale: string;
  countryA: number | null;
  countryB: number | null;
};

export function CultureRadarChart({
  chartData,
  countryAName,
  countryBName,
}: {
  chartData: RadarChartPoint[];
  countryAName: string;
  countryBName: string;
}) {
  const chartConfig = useMemo(
    () =>
      ({
        countryA: {
          label: countryAName,
          color: "var(--chart-1)",
        },
        countryB: {
          label: countryBName,
          color: "var(--chart-2)",
        },
      }) satisfies ChartConfig,
    [countryAName, countryBName],
  );

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square min-h-[420px] w-full max-w-2xl"
      initialDimension={{ width: 480, height: 480 }}
    >
      <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="78%">
        <PolarGrid />
        <PolarAngleAxis dataKey="scale" tick={{ fontSize: 11 }} />
        <PolarRadiusAxis domain={[0, 99]} tickCount={5} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(label) => String(label)}
              formatter={(value, name, item) => {
                const scale = SCALES.find(
                  (entry) => entry.label === item?.payload?.scale,
                );
                const countryLabel =
                  chartConfig[name as keyof typeof chartConfig]?.label ?? name;
                if (!scale || typeof value !== "number") {
                  return [value, countryLabel];
                }
                const pole = getPoleLabel(scale.id, value);
                return [`${value} (${pole})`, countryLabel];
              }}
            />
          }
        />
        <Radar
          name="countryA"
          dataKey="countryA"
          stroke="var(--color-countryA)"
          fill="var(--color-countryA)"
          fillOpacity={0.25}
          strokeWidth={2}
        />
        <Radar
          name="countryB"
          dataKey="countryB"
          stroke="var(--color-countryB)"
          fill="var(--color-countryB)"
          fillOpacity={0.25}
          strokeWidth={2}
        />
        <ChartLegend content={<ChartLegendContent nameKey="name" />} />
      </RadarChart>
    </ChartContainer>
  );
}
