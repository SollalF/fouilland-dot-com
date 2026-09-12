import type { CountryId } from "../data/country-scores";
import type { ScaleId } from "../data/scales";
import type { SourceId } from "../data/sources";

export const DEFAULT_COUNTRY_A: CountryId = "united-states";
export const DEFAULT_COUNTRY_B: CountryId = "japan";
export const DEFAULT_MAP_SCALE: ScaleId = "communicating";

export const SCALE_REFERENCE_SOURCE_IDS: Record<ScaleId, SourceId[]> = {
  communicating: ["shen-2022"],
  evaluating: ["globe-phase-2"],
  persuading: ["ralston-2011"],
  leading: ["ralston-2011"],
  deciding: ["hofstede-2015"],
  trusting: ["pelham-2022"],
  disagreeing: ["globe-phase-2", "eriksson-2021"],
  scheduling: [
    "levine-norenzayan-1999",
    "wang-2016",
    "white-2011",
    "van-eerde-azar-2019",
    "krupka-2022",
  ],
};

export const MAP_WIDTH = 920;
export const MAP_HEIGHT = 500;
export const WORLD_GEOJSON_URL =
  "https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/DATA/world.geojson";

export const COUNTRY_NAME_ALIASES: Record<string, CountryId> = {
  "bosnia and herzegovina": "bosnia-and-herzegovina",
  bolivia: "bolivia",
  "burkina faso": "burkina-faso",
  "costa rica": "costa-rica",
  czechia: "czech-republic",
  "czech republic": "czech-republic",
  "dominican republic": "dominican-republic",
  "el salvador": "el-salvador",
  "hong kong": "hong-kong",
  iran: "iran",
  "iran islamic republic of": "iran",
  macao: "macao",
  macau: "macao",
  moldova: "moldova",
  "north macedonia": "north-macedonia",
  palestine: "palestine",
  "puerto rico": "puerto-rico",
  russia: "russia",
  "russian federation": "russia",
  serbia: "serbia",
  slovakia: "slovakia",
  "south africa": "south-africa",
  "south korea": "south-korea",
  "korea republic of": "south-korea",
  syria: "syria",
  "syrian arab republic": "syria",
  tanzania: "tanzania",
  "united kingdom": "united-kingdom",
  "united states": "united-states",
  "united states of america": "united-states",
  venezuela: "venezuela",
  vietnam: "vietnam",
  "viet nam": "vietnam",
};
