import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv } from "../../lib/parse-csv.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourceDir = join(scriptDir, "..");
const dataPath = join(sourceDir, "data", "shen-2022-table-1-context-ranks.csv");
const outputPath = join(sourceDir, "communication-context-scores.csv");

const SOURCE_ID = "shen-2022";
const SOURCE_NOTE =
  "Shen (2022), Table 1, reproduces context ranks where 1 is highest context and 16 is lowest context. Scores normalize those ordinal ranks to 0-99, where 99 is highest context.";

const countries = parseCsv(readFileSync(dataPath, "utf8")).map((row) => [
  row.country_id,
  row.country,
  Number(row.context_rank),
]);

function normalizeContextRank(rank) {
  return Math.round(((16 - rank) / 15) * 99);
}

function escapeCsv(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

const rows = [
  [
    "country_id",
    "country",
    "source_id",
    "shen_table_1_context_rank",
    "communicating_score_0_low_context_99_high_context",
    "derivation_note",
  ],
  ...countries.map(([id, country, rank]) => [
    id,
    country,
    SOURCE_ID,
    rank,
    normalizeContextRank(rank),
    SOURCE_NOTE,
  ]),
];

writeFileSync(
  outputPath,
  `${rows.map((row) => row.map(escapeCsv).join(",")).join("\n")}\n`,
);

console.log(`Wrote ${countries.length} communication scores to ${outputPath}`);
