import { writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv } from "../../lib/parse-csv.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const disagreeingDir = join(scriptDir, "..");
const dataDir = join(disagreeingDir, "data");
const atlasDir = join(disagreeingDir, "..", "..");
const repoDataDir = join(atlasDir, "data");

const countryScoresPath = join(repoDataDir, "country-scores.ts");
const derivedTablePath = join(
  disagreeingDir,
  "derived-disagreeing-scores.csv",
);

const globeSourceId = "globe-phase-2";
const erikssonSourceId = "eriksson-2021";

const assertivenessBySourceCountry = new Map(
  parseCsv(
    readFileSync(
      join(dataDir, "globe-phase-2-assertiveness-practices.csv"),
      "utf8",
    ),
  ).map((row) => [row.country, Number(row.assertiveness_practices)]),
);

const erikssonVerbalConfrontationByCountry = new Map(
  parseCsv(
    readFileSync(
      join(dataDir, "eriksson-2021-verbal-confrontation-metanorms.csv"),
      "utf8",
    ),
  ).map((row) => [row.country, Number(row.verbal_confrontation_metanorm)]),
);

const countryNameOverrides = new Map([
  ["Canada", ["Canada (English-speaking)"]],
  ["Germany", ["Germany (EAST)", "Germany (WEST)"]],
  ["United Kingdom", ["England"]],
  ["United States", ["USA"]],
]);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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

function sourceCountryNames(countryName) {
  return countryNameOverrides.get(countryName) ?? [countryName];
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function disagreeingScoreFromAssertiveness(assertiveness) {
  return Math.round(((7 - assertiveness) / 6) * 99);
}

function disagreeingScoreFromVerbalConfrontation(verbalConfrontation) {
  const values = [...erikssonVerbalConfrontationByCountry.values()];
  const min = Math.min(...values);
  const max = Math.max(...values);

  return Math.round(((max - verbalConfrontation) / (max - min)) * 99);
}

function displayNumber(value) {
  return Number(value.toFixed(2)).toString();
}

function buildDisagreeingEntry({
  sourceId,
  sourceLabel,
  sourceValue,
  disagreeingScore,
}) {
  return `\n      disagreeing: {\n        sources: [\n          {\n            sourceId: "${sourceId}",\n            value: ${disagreeingScore},\n            label: "${sourceLabel}: ${displayNumber(sourceValue)}",\n          },\n        ],\n      },`;
}

function upsertDisagreeingEntry(source, country, score) {
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
  const disagreeingEntry = buildDisagreeingEntry(score);

  if (block.includes("\n      disagreeing: {")) {
    return `${beforeBlock}${block.replace(
      /\n      disagreeing: \{\r?\n        sources: \[\r?\n          \{\r?\n            sourceId: "[^"]+",\r?\n            value: \d+,\r?\n            label: "[^"]+",\r?\n          \},\r?\n        \],\r?\n      \},/,
      disagreeingEntry,
    )}${afterBlock}`;
  }

  const decidingEntry =
    /(\r?\n      deciding: \{\r?\n        sources: \[\r?\n          \{\r?\n            sourceId: "hofstede-2015",\r?\n            value: \d+,\r?\n            label: "Power distance proxy: PDI \d+",\r?\n          \},\r?\n        \],\r?\n      \},)/;

  if (decidingEntry.test(block)) {
    return `${beforeBlock}${block.replace(
      decidingEntry,
      `$1${disagreeingEntry}`,
    )}${afterBlock}`;
  }

  const communicatingEntry =
    /(\r?\n      communicating: \{\r?\n        sources: \[\r?\n          \{ sourceId: "shen-2022", value: \d+, label: "Context rank \d+" \},\r?\n        \],\r?\n      \},)/;

  return `${beforeBlock}${block.replace(
    communicatingEntry,
    `$1${disagreeingEntry}`,
  )}${afterBlock}`;
}

function escapeCsv(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

let countryScoresSource = readFileSync(countryScoresPath, "utf8");
const countryEntries = getCountryEntries(countryScoresSource);
const derivedRows = [];
const missingRows = [];

for (const country of countryEntries) {
  const sourceCountries = sourceCountryNames(country.name);
  const assertivenessValues = sourceCountries
    .map((sourceCountry) => assertivenessBySourceCountry.get(sourceCountry))
    .filter((value) => value !== undefined);

  if (assertivenessValues.length === sourceCountries.length) {
    const assertiveness = mean(assertivenessValues);
    const disagreeingScore = disagreeingScoreFromAssertiveness(assertiveness);

    derivedRows.push({
      countryId: country.id,
      countryName: country.name,
      method: "GLOBE assertiveness practices",
      sourceId: globeSourceId,
      sourceCountries,
      sourceValue: assertiveness,
      disagreeingScore,
      derivationNote:
        "GLOBE Phase 2 assertiveness practices reversed with round((7 - assertiveness) / 6 * 99) because the atlas disagreeing scale uses 99 for avoids confrontation.",
    });
    countryScoresSource = upsertDisagreeingEntry(countryScoresSource, country, {
      sourceId: globeSourceId,
      sourceLabel: "GLOBE assertiveness practices",
      sourceValue: assertiveness,
      disagreeingScore,
    });
    continue;
  }

  const verbalConfrontation =
    erikssonVerbalConfrontationByCountry.get(country.name);

  if (verbalConfrontation === undefined) {
    missingRows.push({
      countryId: country.id,
      countryName: country.name,
      globeSourceCountries: sourceCountries,
    });
    continue;
  }

  const disagreeingScore =
    disagreeingScoreFromVerbalConfrontation(verbalConfrontation);

  derivedRows.push({
    countryId: country.id,
    countryName: country.name,
    method: "Eriksson verbal confrontation metanorm",
    sourceId: erikssonSourceId,
    sourceCountries: [country.name],
    sourceValue: verbalConfrontation,
    disagreeingScore,
    derivationNote:
      "Eriksson et al. Supplementary Table 2 verbal confrontation metanorm reversed and min-max normalized across the 57-society table, because lower verbal-confrontation appropriateness maps to avoids confrontation.",
  });
  countryScoresSource = upsertDisagreeingEntry(countryScoresSource, country, {
    sourceId: erikssonSourceId,
    sourceLabel: "Eriksson verbal confrontation metanorm",
    sourceValue: verbalConfrontation,
    disagreeingScore,
  });
}

const derivedCsv = [
  [
    "countryId",
    "countryName",
    "method",
    "sourceId",
    "sourceCountry",
    "sourceValue",
    "disagreeingScore_0_confrontational_99_avoids_confrontation",
    "derivationNote",
  ],
  ...derivedRows.map((row) => [
    row.countryId,
    row.countryName,
    row.method,
    row.sourceId,
    row.sourceCountries.join(" + "),
    displayNumber(row.sourceValue),
    row.disagreeingScore,
    row.derivationNote,
  ]),
]
  .map((row) => row.map(escapeCsv).join(","))
  .join("\n");

writeFileSync(countryScoresPath, countryScoresSource);
writeFileSync(derivedTablePath, `${derivedCsv}\n`);

console.log(
  `Wrote ${derivedRows.length} disagreeing scores to country-scores.ts`,
);
console.log(`Saved derived table to ${derivedTablePath}`);

if (missingRows.length > 0) {
  console.log("Missing GLOBE assertiveness and Eriksson verbal confrontation rows:");
  for (const row of missingRows) {
    console.log(`- ${row.countryName} (${row.countryId})`);
  }
}
