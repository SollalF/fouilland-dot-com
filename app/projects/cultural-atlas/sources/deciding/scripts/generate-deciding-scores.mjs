import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv } from "../../lib/parse-csv.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const decidingDir = join(scriptDir, "..");
const atlasDir = join(decidingDir, "..", "..");
const repoDataDir = join(atlasDir, "data");

const csvPath = join(
  decidingDir,
  "data",
  "hofstede-6-dimensions-2015-12-08-0-100.csv",
);
const countryScoresPath = join(repoDataDir, "country-scores.ts");
const derivedTablePath = join(
  decidingDir,
  "hofstede-pdi-derived-deciding-scores.csv",
);

const sourceId = "hofstede-2015";

const countryNameOverrides = new Map([
  ["Slovakia", "Slovak Rep"],
  ["South Korea", "Korea South"],
  ["United Kingdom", "Great Britain"],
  ["United States", "U.S.A."],
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

function sourceCountryName(countryName) {
  return countryNameOverrides.get(countryName) ?? countryName;
}

function decidingScoreFromPdi(pdi) {
  return Math.round((pdi / 100) * 99);
}

function buildDecidingEntry({ pdi, decidingScore }) {
  return `\n      deciding: {\n        sources: [\n          {\n            sourceId: "${sourceId}",\n            value: ${decidingScore},\n            label: "Power distance proxy: PDI ${pdi}",\n          },\n        ],\n      },`;
}

function upsertDecidingEntry(source, country, score) {
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
  const decidingEntry = buildDecidingEntry(score);

  if (block.includes("\n      deciding: {")) {
    return `${beforeBlock}${block.replace(
      /\n      deciding: \{\r?\n        sources: \[\r?\n          \{\r?\n            sourceId: "hofstede-2015",\r?\n            value: \d+,\r?\n            label: "Power distance proxy: PDI \d+",\r?\n          \},\r?\n        \],\r?\n      \},/,
      decidingEntry,
    )}${afterBlock}`;
  }

  const communicatingEnd =
    /(\r?\n      communicating: \{\r?\n        sources: \[\r?\n          \{ sourceId: "shen-2022", value: \d+, label: "Context rank \d+" \},\r?\n        \],\r?\n      \},)/;

  return `${beforeBlock}${block.replace(
    communicatingEnd,
    `$1${decidingEntry}`,
  )}${afterBlock}`;
}

const csvRows = parseCsv(readFileSync(csvPath, "utf8"), { delimiter: ";" });
const pdiByCountry = new Map(
  csvRows
    .filter((row) => row.pdi && row.pdi !== "#NULL!")
    .map((row) => [row.country, Number(row.pdi)]),
);

let countryScoresSource = readFileSync(countryScoresPath, "utf8");
const derivedRows = [];
const missingRows = [];

for (const country of getCountryEntries(countryScoresSource)) {
  const hofstedeCountry = sourceCountryName(country.name);
  const pdi = pdiByCountry.get(hofstedeCountry);

  if (pdi === undefined) {
    missingRows.push({
      countryId: country.id,
      countryName: country.name,
      hofstedeCountry,
    });
    continue;
  }

  const decidingScore = decidingScoreFromPdi(pdi);
  const score = { pdi, decidingScore };

  derivedRows.push({
    countryId: country.id,
    countryName: country.name,
    hofstedeCountry,
    pdi,
    decidingScore,
  });
  countryScoresSource = upsertDecidingEntry(
    countryScoresSource,
    country,
    score,
  );
}

const derivedCsv = [
  "countryId,countryName,hofstedeCountry,pdi,decidingScore",
  ...derivedRows.map((row) =>
    [
      row.countryId,
      row.countryName,
      row.hofstedeCountry,
      row.pdi,
      row.decidingScore,
    ].join(","),
  ),
  "",
].join("\n");

writeFileSync(countryScoresPath, countryScoresSource);
writeFileSync(derivedTablePath, derivedCsv);

console.log(`Wrote ${derivedRows.length} deciding scores to country-scores.ts`);
console.log(`Saved derived table to ${derivedTablePath}`);

if (missingRows.length > 0) {
  console.log("Missing Hofstede PDI rows:");
  for (const row of missingRows) {
    console.log(`- ${row.countryName} (${row.countryId})`);
  }
}
