import { SCALE_GRADIENT } from "../data/scale-gradient";

export type ScaleMarker = {
  value: number;
  color: string;
  label?: string;
};

function ScaleBarTrack({
  markers,
  className,
}: {
  markers: ScaleMarker[];
  className?: string;
}) {
  return (
    <div
      className={`relative h-3 rounded-full ${className ?? "w-full"}`}
      style={{ background: SCALE_GRADIENT }}
    >
      {markers.map((marker, index) => (
        <div
          key={`${marker.value}-${marker.color}-${index}`}
          className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background shadow-sm"
          style={{
            left: `${marker.value}%`,
            backgroundColor: marker.color,
          }}
          title={marker.label}
        />
      ))}
    </div>
  );
}

export function ScaleGradientBar({
  low,
  high,
  markers = [],
  showLabels = false,
  className,
}: {
  low?: string;
  high?: string;
  markers?: ScaleMarker[];
  showLabels?: boolean;
  className?: string;
}) {
  if (showLabels && low && high) {
    return (
      <div className={`space-y-1.5 ${className ?? ""}`}>
        <div className="flex items-start justify-between gap-3 text-[11px] text-muted-foreground">
          <span className="max-w-[45%] text-left">{low}</span>
          <span className="max-w-[45%] text-right">{high}</span>
        </div>
        <ScaleBarTrack markers={markers} />
      </div>
    );
  }

  return (
    <div className={className}>
      <ScaleBarTrack markers={markers} />
    </div>
  );
}
