import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv } from "../../lib/parse-csv.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const leadingDir = join(scriptDir, "..");
const atlasDir = join(leadingDir, "..", "..");
const repoDataDir = join(atlasDir, "data");

const countryScoresPath = join(repoDataDir, "country-scores.ts");
const sourceTablePath = join(
  leadingDir,
  "data",
  "ralston-2011-svs-hierarchy-table15.csv",
);
const derivedTablePath = join(leadingDir, "derived-leading-scores.csv");

const sourceId = "ralston-2011";

const sourceRows = parseCsv(readFileSync(sourceTablePath, "utf8")).map((row) => ({
  society: row.ralstonSociety,
  hierarchyRaw: Number(row.hierarchyRaw),
  cronbachAlpha: Number(row.cronbachAlpha),
  hierarchyStdScore: Number(row.hierarchyStdScore),
  rank: Number(row.hierarchyRank),
}));

const countryNameOverrides = new Map([
  ["United Kingdom", "UK"],
  ["United States", "US"],
]);

const hierarchyStdScores = sourceRows.map((row) => row.hierarchyStdScore);
const minHierarchyStdScore = Math.min(...hierarchyStdScores);
const maxHierarchyStdScore = Math.max(...hierarchyStdScores);

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

function sourceSocietyName(countryName) {
  return countryNameOverrides.get(countryName) ?? countryName;
}

function leadingScoreFromHierarchyStdScore(hierarchyStdScore) {
  return Math.round(
    ((hierarchyStdScore - minHierarchyStdScore) /
      (maxHierarchyStdScore - minHierarchyStdScore)) *
      99,
  );
}

function displayNumber(value) {
  return Number(value.toFixed(2)).toString();
}

function buildLeadingEntry({ hierarchyStdScore, leadingScore }) {
  return `\n      leading: {\n        sources: [\n          {\n            sourceId: "${sourceId}",\n            value: ${leadingScore},\n            label: "SVS hierarchy std. score: ${displayNumber(hierarchyStdScore)}",\n          },\n        ],\n      },`;
}

function upsertLeadingEntry(source, country, score) {
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
  const leadingEntry = buildLeadingEntry(score);

  if (block.includes("\n      leading: {")) {
    return `${beforeBlock}${block.replace(
      /\n      leading: \{\r?\n        sources: \[\r?\n          \{\r?\n            sourceId: "[^"]+",\r?\n            value: \d+,\r?\n            label: "[^"]+",\r?\n          \},\r?\n        \],\r?\n      \},/,
      leadingEntry,
    )}${afterBlock}`;
  }

  const decidingEntry =
    /(\r?\n      deciding: \{\r?\n        sources: \[\r?\n          \{\r?\n            sourceId: "hofstede-2015",\r?\n            value: \d+,\r?\n            label: "Power distance proxy: PDI \d+",\r?\n          \},\r?\n        \],\r?\n      \},)/;

  if (decidingEntry.test(block)) {
    return `${beforeBlock}${block.replace(decidingEntry, `${leadingEntry}$1`)}${afterBlock}`;
  }

  const communicatingEntry =
    /(\r?\n      communicating: \{\r?\n        sources: \[\r?\n          \{ sourceId: "shen-2022", value: \d+, label: "Context rank \d+" \},\r?\n        \],\r?\n      \},)/;

  if (communicatingEntry.test(block)) {
    return `${beforeBlock}${block.replace(
      communicatingEntry,
      `$1${leadingEntry}`,
    )}${afterBlock}`;
  }

  return `${beforeBlock}${block.replace(
    /(\r?\n    scores: \{)/,
    `$1${leadingEntry}`,
  )}${afterBlock}`;
}

function escapeCsv(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function toCsv(rows) {
  return `${rows.map((row) => row.map(escapeCsv).join(",")).join("\n")}\n`;
}

const rowBySociety = new Map(sourceRows.map((row) => [row.society, row]));
let countryScoresSource = readFileSync(countryScoresPath, "utf8");
const countryEntries = getCountryEntries(countryScoresSource);
const derivedRows = [];
const missingRows = [];

for (const country of countryEntries) {
  const society = sourceSocietyName(country.name);
  const row = rowBySociety.get(society);

  if (!row) {
    missingRows.push({
      countryId: country.id,
      countryName: country.name,
      ralstonSociety: society,
    });
    continue;
  }

  const leadingScore = leadingScoreFromHierarchyStdScore(
    row.hierarchyStdScore,
  );

  derivedRows.push({
    countryId: country.id,
    countryName: country.name,
    ralstonSociety: row.society,
    hierarchyRaw: row.hierarchyRaw,
    cronbachAlpha: row.cronbachAlpha,
    hierarchyStdScore: row.hierarchyStdScore,
    hierarchyRank: row.rank,
    leadingScore,
    derivationNote:
      "Ralston et al. Table 15 hierarchy within-subject standardized scores min-max normalized to 0-99, where 0 is most egalitarian and 99 is most hierarchical.",
  });

  countryScoresSource = upsertLeadingEntry(countryScoresSource, country, {
    hierarchyStdScore: row.hierarchyStdScore,
    leadingScore,
  });
}

const derivedCsv = toCsv([
  [
    "countryId",
    "countryName",
    "ralstonSociety",
    "sourceId",
    "hierarchyRaw",
    "cronbachAlpha",
    "hierarchyStdScore",
    "hierarchyRank",
    "leadingScore_0_egalitarian_99_hierarchical",
    "derivationNote",
  ],
  ...derivedRows.map((row) => [
    row.countryId,
    row.countryName,
    row.ralstonSociety,
    sourceId,
    row.hierarchyRaw,
    row.cronbachAlpha,
    row.hierarchyStdScore,
    row.hierarchyRank,
    row.leadingScore,
    row.derivationNote,
  ]),
]);

writeFileSync(countryScoresPath, countryScoresSource);
writeFileSync(derivedTablePath, derivedCsv);

console.log(`Loaded source table from ${sourceTablePath}`);
console.log(`Wrote ${derivedRows.length} leading scores to country-scores.ts`);
console.log(`Saved derived table to ${derivedTablePath}`);

if (missingRows.length > 0) {
  console.log("Missing Ralston Table 15 hierarchy rows:");
  for (const row of missingRows) {
    console.log(`- ${row.countryName} (${row.countryId})`);
  }
}
