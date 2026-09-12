import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv } from "../../lib/parse-csv.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const trustingDir = join(scriptDir, "..");
const atlasDir = join(trustingDir, "..", "..");
const countryScoresPath = join(atlasDir, "data", "country-scores.ts");
const sourceTablePath = join(
  trustingDir,
  "data",
  "pelham-2022-global-collectivism-index-table4.csv",
);
const derivedTablePath = join(trustingDir, "trusting-scores-extracted.csv");

const sourceId = "pelham-2022";
const derivationNote =
  "Pelham et al. (2022), Table 4, reports standardized Global Collectivism Index scores. Scores normalize the Table 4 z-scores from the full extracted table with (gci - min) / (max - min) * 99, where higher values mean more relationship-based trusting.";

const sourceNameOverrides = new Map([
  ["Myanmar", "Burma"],
  ["North Korea", "Korea, North"],
  ["South Korea", "Korea, South"],
]);

const gciRows = parseCsv(readFileSync(sourceTablePath, "utf8")).map((row) => [
  Number(row.rank),
  row.country,
  Number(row.gci_collectivism_z),
]);

const gciByCountry = new Map(
  gciRows.map(([rank, country, gci]) => [country, { rank, country, gci }]),
);
const gciValues = gciRows.map(([, , gci]) => gci);
const gciMin = Math.min(...gciValues);
const gciMax = Math.max(...gciValues);

function trustingScoreFromGci(gci) {
  return Math.round(((gci - gciMin) / (gciMax - gciMin)) * 99);
}

function csvEscape(value) {
  if (value === undefined || value === null) return "";
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function writeCsv(path, headers, rows) {
  writeFileSync(
    path,
    [
      headers.join(","),
      ...rows.map((row) =>
        headers.map((header) => csvEscape(row[header])).join(","),
      ),
      "",
    ].join("\n"),
  );
}

function getCountryEntries(countryScoresSource) {
  const entryPattern =
    /(?:^|\n)  (?<key>"[^"]+"|[a-z][a-z-]*): {\r?\n    id: "(?<id>[^"]+)",\r?\n    name: "(?<name>[^"]+)"/g;

  return [...countryScoresSource.matchAll(entryPattern)].map(({ groups }) => ({
    key: groups.key,
    id: groups.id,
    name: groups.name,
  }));
}

function sourceCountryName(countryName) {
  return sourceNameOverrides.get(countryName) ?? countryName;
}

function buildTrustingEntry({ gci, trustingScore }) {
  return `\n      trusting: {\n        sources: [\n          {\n            sourceId: "${sourceId}",\n            value: ${trustingScore},\n            label: "GCI collectivism z-score: ${gci.toFixed(2)}",\n          },\n        ],\n      },`;
}

function replaceScaleEntry(block, scaleId, entry) {
  const scaleEntry = new RegExp(
    `\\n      ${scaleId}: \\{\\r?\\n        sources: \\[\\r?\\n[\\s\\S]*?\\r?\\n        \\],\\r?\\n      \\},`,
  );

  return block.replace(scaleEntry, `$&${entry}`);
}

function upsertTrustingEntry(source, country, score) {
  const escapedKey = escapeRegExp(country.key);
  const escapedId = escapeRegExp(country.id);
  const escapedName = escapeRegExp(country.name);
  const entryStart = new RegExp(
    `  ${escapedKey}: \\{\\r?\\n    id: "${escapedId}",\\r?\\n    name: "${escapedName}",\\r?\\n    scores: \\{`,
  );
  const startMatch = source.match(entryStart);

  if (!startMatch || startMatch.index === undefined) {
    throw new Error(`Could not find country entry for ${country.name}`);
  }

  const nextEntryMatch = source
    .slice(startMatch.index + 1)
    .match(/\n  (?:"[^"]+"|[a-z][a-z-]*): \{/);
  const blockEnd =
    nextEntryMatch?.index === undefined
      ? source.length
      : startMatch.index + 1 + nextEntryMatch.index;
  const beforeBlock = source.slice(0, startMatch.index);
  const block = source.slice(startMatch.index, blockEnd);
  const afterBlock = source.slice(blockEnd);
  const trustingEntry = buildTrustingEntry(score);

  if (block.includes("\n      trusting: {")) {
    return `${beforeBlock}${block.replace(
      /\n      trusting: \{\r?\n        sources: \[\r?\n[\s\S]*?\r?\n        \],\r?\n      \},/,
      trustingEntry,
    )}${afterBlock}`;
  }

  const preferredAnchors = [
    "evaluating",
    "deciding",
    "leading",
    "persuading",
    "communicating",
  ];

  for (const scaleId of preferredAnchors) {
    if (block.includes(`\n      ${scaleId}: {`)) {
      return `${beforeBlock}${replaceScaleEntry(
        block,
        scaleId,
        trustingEntry,
      )}${afterBlock}`;
    }
  }

  return `${beforeBlock}${block.replace(
    /(\r?\n    scores: \{)/,
    `$1${trustingEntry}`,
  )}${afterBlock}`;
}

let countryScoresSource = readFileSync(countryScoresPath, "utf8");
const derivedRows = [];
const missingRows = [];

for (const country of getCountryEntries(countryScoresSource)) {
  const pelhamCountry = sourceCountryName(country.name);
  const sourceRow = gciByCountry.get(pelhamCountry);

  if (!sourceRow) {
    missingRows.push({
      country_id: country.id,
      country_name: country.name,
      pelham_table_country: pelhamCountry,
    });
    continue;
  }

  const trustingScore = trustingScoreFromGci(sourceRow.gci);
  const derivedRow = {
    country_id: country.id,
    country_name: country.name,
    pelham_table_rank: sourceRow.rank,
    pelham_table_country: sourceRow.country,
    source_id: sourceId,
    gci_collectivism_z: sourceRow.gci.toFixed(2),
    trusting_score_0_task_based_99_relationship_based: trustingScore,
    derivation_note: derivationNote,
  };

  derivedRows.push(derivedRow);
  countryScoresSource = upsertTrustingEntry(countryScoresSource, country, {
    gci: sourceRow.gci,
    trustingScore,
  });
}

writeCsv(
  derivedTablePath,
  [
    "country_id",
    "country_name",
    "pelham_table_rank",
    "pelham_table_country",
    "source_id",
    "gci_collectivism_z",
    "trusting_score_0_task_based_99_relationship_based",
    "derivation_note",
  ],
  derivedRows,
);
writeFileSync(countryScoresPath, countryScoresSource);

console.log(`Loaded GCI table from ${sourceTablePath}`);
console.log(`Wrote ${derivedRows.length} trusting scores to country-scores.ts`);
console.log(`Saved derived table to ${derivedTablePath}`);

if (missingRows.length > 0) {
  console.log("Missing Pelham GCI rows:");
  for (const row of missingRows) {
    console.log(`- ${row.country_name} (${row.country_id})`);
  }
}
