import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv } from "../../lib/parse-csv.mjs";

const __filename = fileURLToPath(import.meta.url);
const scriptsDir = path.dirname(__filename);
const schedulingDir = path.dirname(scriptsDir);
const dataDir = path.join(schedulingDir, "data");
const repoRoot = path.resolve(schedulingDir, "../../../../..");
const countryScoresPath = path.join(
  repoRoot,
  "app/projects/cultural-atlas/data/country-scores.ts",
);
const extractedCsvPath = path.join(
  schedulingDir,
  "scheduling-scores-extracted.csv",
);

const round = (value) => Math.round(value);
const normalize = (value, min, max) =>
  round(((value - min) / (max - min)) * 99);
const normalizeReversed = (value, min, max) =>
  round(((max - value) / (max - min)) * 99);

function loadNumericRows(filename, valueKey) {
  return parseCsv(fs.readFileSync(path.join(dataDir, filename), "utf8")).map(
    (row) => [row.country_id, row.country, Number(row[valueKey])],
  );
}

const levinePace = loadNumericRows(
  "levine-norenzayan-1999-pace-of-life.csv",
  "pace_index",
);
const wangWait = loadNumericRows(
  "wang-2016-wait-option-share.csv",
  "wait_option_share",
);
const whiteOnTimeWindow = loadNumericRows(
  "white-2011-on-time-window.csv",
  "on_time_window_minutes",
);
const vanEerdeLateness = loadNumericRows(
  "van-eerde-azar-2019-acceptable-lateness.csv",
  "acceptable_lateness_minutes",
);

const krupkaPunctualityGroups = Object.fromEntries(
  parseCsv(
    fs.readFileSync(
      path.join(dataDir, "krupka-2022-punctuality-groupings.csv"),
      "utf8",
    ),
  ).map((row) => [row.country_id, row.punctuality_grouping]),
);

const evidenceRows = [];
const scoreByCountry = new Map();

function addEvidence(id, row) {
  if (!scoreByCountry.has(id)) scoreByCountry.set(id, []);
  scoreByCountry.get(id).push(row);
  evidenceRows.push({ countryId: id, ...row });
}

const levineValues = levinePace.map(([, , raw]) => raw);
const levineMin = Math.min(...levineValues);
const levineMax = Math.max(...levineValues);
for (const [id, country, raw] of levinePace) {
  addEvidence(id, {
    country,
    sourceId: "levine-norenzayan-1999",
    value: normalize(raw, levineMin, levineMax),
    label: `Pace-of-life index: ${raw.toFixed(2)}`,
    tier: 1,
    rawMeasure: "Overall pace index; lower means faster and more punctual",
    rawValue: raw,
  });
}

const wangValues = wangWait.map(([, , raw]) => raw);
const wangMin = Math.min(...wangValues);
const wangMax = Math.max(...wangValues);
for (const [id, country, raw] of wangWait) {
  addEvidence(id, {
    country,
    sourceId: "wang-2016",
    value: normalizeReversed(raw, wangMin, wangMax),
    label: `Wait option share: ${round(raw * 100)}%`,
    tier: 3,
    rawMeasure:
      "Share choosing delayed larger payoff; higher patience treated as more linear-time proxy",
    rawValue: raw,
  });
}

const whiteValues = whiteOnTimeWindow.map(([, , raw]) => raw);
const whiteMin = Math.min(...whiteValues);
const whiteMax = Math.max(...whiteValues);
for (const [id, country, raw] of whiteOnTimeWindow) {
  addEvidence(id, {
    country,
    sourceId: "white-2011",
    value: normalize(raw, whiteMin, whiteMax),
    label: `On-time window: ${raw.toFixed(1)} min`,
    tier: 2,
    rawMeasure:
      "Average on-time window; larger windows mean more flexible time",
    rawValue: raw,
  });
}

const vanEerdeValues = vanEerdeLateness.map(([, , raw]) => raw);
const vanEerdeMin = Math.min(...vanEerdeValues);
const vanEerdeMax = Math.max(...vanEerdeValues);
for (const [id, country, raw] of vanEerdeLateness) {
  addEvidence(id, {
    country,
    sourceId: "van-eerde-azar-2019",
    value: normalize(raw, vanEerdeMin, vanEerdeMax),
    label: `Acceptable lateness: ${raw.toFixed(2)} min`,
    tier: 2,
    rawMeasure:
      "Average acceptable lateness; larger intervals mean more flexible time",
    rawValue: raw,
  });
}

for (const [id, label] of Object.entries(krupkaPunctualityGroups)) {
  addEvidence(id, {
    country: id,
    sourceId: "krupka-2022",
    label,
    tier: 2,
    rawMeasure: "Ordinal punctuality grouping relative to U.S. norm",
    rawValue: label,
  });
}

function csvEscape(value) {
  if (value === undefined || value === null) return "";
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

const csvHeaders = [
  "countryId",
  "country",
  "sourceId",
  "tier",
  "rawMeasure",
  "rawValue",
  "atlasValue",
  "label",
];

const csvLines = [
  csvHeaders.join(","),
  ...evidenceRows.map((row) =>
    [
      row.countryId,
      row.country,
      row.sourceId,
      row.tier,
      row.rawMeasure,
      row.rawValue,
      row.value,
      row.label,
    ]
      .map(csvEscape)
      .join(","),
  ),
];
fs.writeFileSync(extractedCsvPath, `${csvLines.join("\n")}\n`);

function findMatchingBrace(text, openIndex) {
  let depth = 0;
  let inString = false;
  let stringQuote = "";
  let escaped = false;

  for (let index = openIndex; index < text.length; index += 1) {
    const char = text[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === stringQuote) {
        inString = false;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      inString = true;
      stringQuote = char;
      continue;
    }

    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }

  throw new Error(`No matching brace at ${openIndex}`);
}

function chooseSources(id) {
  const rows = scoreByCountry.get(id) ?? [];
  const numericRows = rows.filter((row) => row.value !== undefined);
  numericRows.sort((left, right) => left.tier - right.tier);
  const supportingRows = rows.filter((row) => row.value === undefined);

  if (numericRows.length === 0) return [];
  return [...numericRows, ...supportingRows];
}

function formatSchedulingEntry(id) {
  const rows = chooseSources(id);
  if (rows.length === 0) return "";

  const sourceLines = rows.map((row) => {
    const valueLine =
      row.value === undefined ? "" : `\n            value: ${row.value},`;
    return `          {
            sourceId: "${row.sourceId}",${valueLine}
            label: "${row.label}",
          }`;
  });

  return `      scheduling: {
        sources: [
${sourceLines.join(",\n")}
        ],
      },
`;
}

let countryScoresText = fs.readFileSync(countryScoresPath, "utf8");
const countryMatches = [
  ...countryScoresText.matchAll(
    /\n  (?:"([^"]+)"|([a-z][a-z-]*)): \{\n    id: "([^"]+)"/g,
  ),
];

for (const match of countryMatches.reverse()) {
  const countryId = match[3];
  const schedulingEntry = formatSchedulingEntry(countryId);
  if (!schedulingEntry) continue;

  const countryOpen = countryScoresText.indexOf("{", match.index);
  const countryClose = findMatchingBrace(countryScoresText, countryOpen);
  const countryBlock = countryScoresText.slice(countryOpen, countryClose + 1);
  if (/\n      scheduling: \{/.test(countryBlock)) continue;

  const scoresIndex = countryScoresText.indexOf("    scores: {", match.index);
  if (scoresIndex === -1 || scoresIndex > countryClose) {
    throw new Error(`Could not find scores block for ${countryId}`);
  }

  const scoresOpen = countryScoresText.indexOf("{", scoresIndex);
  const scoresClose = findMatchingBrace(countryScoresText, scoresOpen);
  const insertAt = countryScoresText.lastIndexOf("\n", scoresClose) + 1;
  countryScoresText =
    countryScoresText.slice(0, insertAt) +
    schedulingEntry +
    countryScoresText.slice(insertAt);
}

fs.writeFileSync(countryScoresPath, countryScoresText);

console.log(`Wrote ${path.relative(repoRoot, extractedCsvPath)}`);
console.log(`Updated ${path.relative(repoRoot, countryScoresPath)}`);
