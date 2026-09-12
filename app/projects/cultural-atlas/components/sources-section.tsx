import { SCALES } from "../data/scales";
import { sourceById } from "../data/sources";
import { SCALE_REFERENCE_SOURCE_IDS } from "./constants";
import { SourceCitationItem } from "./source-citation-item";

export function SourcesSection() {
  return (
    <div className="rounded-lg border bg-background/60 p-4">
      <h3 className="mb-3 text-sm font-semibold">Sources</h3>
      <div className="space-y-4">
        {SCALES.map((scale) => (
          <div key={scale.id}>
            <h4 className="mb-2 text-xs font-semibold text-foreground">
              {scale.label} scale
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {SCALE_REFERENCE_SOURCE_IDS[scale.id].map((sourceId) => (
                <SourceCitationItem
                  key={`${scale.id}-${sourceId}`}
                  source={sourceById[sourceId]}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">
        Hover any score to see its citation chain — primary first, then
        secondary sources.
      </p>
    </div>
  );
}
