import { MAP_HEIGHT, MAP_WIDTH } from "./constants";

export type MapHover = {
  label: string;
  left: number;
  top: number;
};

export type WorldGeometry =
  | {
      type: "Polygon";
      coordinates: number[][][];
    }
  | {
      type: "MultiPolygon";
      coordinates: number[][][][];
    };

export interface WorldFeature {
  type: "Feature";
  properties: {
    name?: string;
  };
  geometry: WorldGeometry;
}

export interface WorldGeoJson {
  type: "FeatureCollection";
  features: WorldFeature[];
}

export function normalizeCountryName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();
}

function projectPoint([longitude, latitude]: number[]): [number, number] {
  return [
    ((longitude + 180) / 360) * MAP_WIDTH,
    ((90 - latitude) / 180) * MAP_HEIGHT,
  ];
}

function ringToPath(ring: number[][]): string {
  return `${ring
    .map((point, index) => {
      const [x, y] = projectPoint(point);
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ")} Z`;
}

export function geometryToPath(geometry: WorldGeometry): string {
  if (geometry.type === "Polygon") {
    return geometry.coordinates.map(ringToPath).join(" ");
  }

  return geometry.coordinates
    .flatMap((polygon) => polygon.map(ringToPath))
    .join(" ");
}
