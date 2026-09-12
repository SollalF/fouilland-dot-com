import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  getPoleLabel,
  getScoreSourceCitation,
  getScoreSourceSummary,
  type ScoreEntry,
  type ScaleId,
} from "../data/scales";
import { ScaleGradientBar } from "./scale-gradient-bar";

export function CitedScore({
  entry,
  scaleId,
  color,
  countryName,
  showBar = true,
}: {
  entry: ScoreEntry;
  scaleId: ScaleId;
  color: string;
  countryName: string;
  showBar?: boolean;
}) {
  const primary = entry.sources[0];
  const value = primary.value;
  const pole = getPoleLabel(scaleId, value);
  const secondary = entry.sources.slice(1);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span style={{ color }}>{countryName}</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="cursor-help text-muted-foreground underline decoration-dotted underline-offset-2"
            >
              {value} · {pole}
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs space-y-1">
            <p>{getScoreSourceCitation(primary)}</p>
            {secondary.map((source) => (
              <p
                key={getScoreSourceCitation(source)}
                className="text-muted-foreground"
              >
                {getScoreSourceCitation(source)}
              </p>
            ))}
          </TooltipContent>
        </Tooltip>
      </div>
      {showBar && (
        <ScaleGradientBar
          markers={[{ value, color, label: `${countryName}: ${value}` }]}
        />
      )}
      {secondary.length > 0 && (
        <ul className="space-y-0.5 pt-1 text-[10px] text-muted-foreground">
          {secondary.map((source) => (
            <li key={getScoreSourceSummary(source)}>
              {getScoreSourceSummary(source)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function MissingScore({
  color,
  countryName,
  showBar = true,
}: {
  color: string;
  countryName: string;
  showBar?: boolean;
}) {
  return (
    <div className="space-y-1 text-xs text-muted-foreground">
      <span style={{ color }}>{countryName}</span>
      {showBar && <ScaleGradientBar />}
      <p>No cited data yet for this scale.</p>
    </div>
  );
}
