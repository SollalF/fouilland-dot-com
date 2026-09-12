import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import xlsx from "xlsx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const evaluationDir = path.resolve(__dirname, "..");
const projectDir = path.resolve(evaluationDir, "..", "..");
const scoreFile = path.join(projectDir, "data", "country-scores.ts");
const workbookFile = path.join(
  evaluationDir,
  "GLOBE-Phase-2-Aggregated-Societal-Culture-Data.xls",
);
const extractedTableFile = path.join(
  evaluationDir,
  "globe-assertiveness-evaluation-scores.csv",
);

const sheetName = "GLOBE Phase 2 Society Level Soc";
const countryColumn = "Country Name";
const assertivenessColumn = "Assertiveness Societal Practices ";

const countryAliases = new Map([
  ["Canada (English-speaking)", "Canada"],
  ["England", "United Kingdom"],
  ["USA", "United States"],
]);

const aggregateCountries = new Map([
  ["Germany", ["Germany (EAST)", "Germany (WEST)"]],
]);

function normalizeScore(assertiveness) {
  return Math.round(((7 - assertiveness) / 6) * 99);
}

function formatNumber(value) {
  return Number(value.toFixed(2)).toString();
}

function csvCell(value) {
  const stringValue = String(value ?? "");
  if (/[",\n\r]/.test(stringValue)) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }
  return stringValue;
}

function parseAtlasCountries(scoreSource) {
  return [
    ...scoreSource.matchAll(
      /\n  "?([a-z0-9-]+)"?: \{\n    id: "[^"]+",\n    name: "([^"]+)"/g,
    ),
  ].map((match) => ({
    id: match[1],
    name: match[2],
  }));
}

function buildGLOBERows() {
  const workbook = xlsx.readFile(workbookFile);
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    throw new Error(`Sheet not found: ${sheetName}`);
  }

  return xlsx.utils
    .sheet_to_json(sheet, { defval: "" })
    .map((row) => ({
      sourceCountryName: row[countryColumn],
      assertiveness: Number(row[assertivenessColumn]),
    }))
    .filter(
      (row) =>
        row.sourceCountryName &&
        Number.isFinite(row.assertiveness) &&
        row.assertiveness > 0,
    );
}

function buildEvaluationRows(scoreSource) {
  const atlasCountries = parseAtlasCountries(scoreSource);
  const atlasByName = new Map(
    atlasCountries.map((country) => [country.name, country]),
  );
  const globeRows = buildGLOBERows();
  const globeByName = new Map(
    globeRows.map((row) => [row.sourceCountryName, row]),
  );
  const rows = [];

  for (const row of globeRows) {
    const atlasName =
      countryAliases.get(row.sourceCountryName) ?? row.sourceCountryName;
    const atlasCountry = atlasByName.get(atlasName);
    if (!atlasCountry || aggregateCountries.has(atlasName)) continue;

    rows.push({
      atlasCountryId: atlasCountry.id,
      atlasCountryName: atlasCountry.name,
      sourceCountryName: row.sourceCountryName,
      assertiveness: row.assertiveness,
      evaluatingScore: normalizeScore(row.assertiveness),
      label: `GLOBE assertiveness practices: ${formatNumber(row.assertiveness)}`,
    });
  }

  for (const [atlasName, sourceCountryNames] of aggregateCountries) {
    const atlasCountry = atlasByName.get(atlasName);
    if (!atlasCountry) continue;

    const sourceRows = sourceCountryNames.map((name) => {
      const row = globeByName.get(name);
      if (!row) {
        throw new Error(`Missing aggregate source row: ${name}`);
      }
      return row;
    });
    const assertiveness =
      sourceRows.reduce((sum, row) => sum + row.assertiveness, 0) /
      sourceRows.length;

    rows.push({
      atlasCountryId: atlasCountry.id,
      atlasCountryName: atlasCountry.name,
      sourceCountryName: sourceCountryNames.join("; "),
      assertiveness,
      evaluatingScore: normalizeScore(assertiveness),
      label: `GLOBE assertiveness practices: ${formatNumber(assertiveness)}`,
    });
  }

  return rows.sort((a, b) => a.atlasCountryId.localeCompare(b.atlasCountryId));
}

function writeExtractedTable(rows) {
  const header = [
    "atlasCountryId",
    "atlasCountryName",
    "sourceCountryName",
    "assertivenessSocietalPractices",
    "evaluatingScore",
    "label",
  ];
  const csvRows = rows.map((row) =>
    [
      row.atlasCountryId,
      row.atlasCountryName,
      row.sourceCountryName,
      formatNumber(row.assertiveness),
      row.evaluatingScore,
      row.label,
    ]
      .map(csvCell)
      .join(","),
  );

  fs.writeFileSync(
    extractedTableFile,
    `${header.join(",")}\n${csvRows.join("\n")}\n`,
  );
}

function buildEvaluatingBlock(row, indent) {
  return `${indent}evaluating: {
${indent}  sources: [
${indent}    {
${indent}      sourceId: "globe-phase-2",
${indent}      value: ${row.evaluatingScore},
${indent}      label: "${row.label}",
${indent}    },
${indent}  ],
${indent}},`;
}

function upsertEvaluationScores(scoreSource, rows) {
  let nextSource = scoreSource;

  for (const row of rows) {
    const entryPattern = new RegExp(
      `(\\n  "?${row.atlasCountryId}"?: \\{\\n    id: "${row.atlasCountryId}",\\n    name: "[^"]+",\\n    scores: \\{)([\\s\\S]*?)(\\n    \\},\\n  \\},)`,
    );
    const match = nextSource.match(entryPattern);
    if (!match) {
      throw new Error(`Country entry not found: ${row.atlasCountryId}`);
    }

    const [fullMatch, entryStart, scoresBody, entryEnd] = match;
    const evaluatingBlock = buildEvaluatingBlock(row, "      ");
    let nextScoresBody;

    if (/\n      evaluating: \{/.test(scoresBody)) {
      nextScoresBody = scoresBody.replace(
        /\n      evaluating: \{\n        sources: \[\n[\s\S]*?\n        \],\n      \},/,
        `\n${evaluatingBlock}`,
      );
    } else if (/\n      deciding: \{/.test(scoresBody)) {
      nextScoresBody = scoresBody.replace(
        /(\n      deciding: \{\n        sources: \[\n[\s\S]*?\n        \],\n      \},)/,
        `$1\n${evaluatingBlock}`,
      );
    } else if (/\n      communicating: \{/.test(scoresBody)) {
      nextScoresBody = scoresBody.replace(
        /(\n      communicating: \{\n        sources: \[\n[\s\S]*?\n        \],\n      \},)/,
        `$1\n${evaluatingBlock}`,
      );
    } else {
      nextScoresBody = `${scoresBody}\n${evaluatingBlock}`;
    }

    nextSource = nextSource.replace(
      fullMatch,
      `${entryStart}${nextScoresBody}${entryEnd}`,
    );
  }

  return nextSource;
}

const scoreSource = fs.readFileSync(scoreFile, "utf8");
const rows = buildEvaluationRows(scoreSource);
writeExtractedTable(rows);
fs.writeFileSync(scoreFile, upsertEvaluationScores(scoreSource, rows));

console.log(`Wrote ${rows.length} evaluation score rows.`);
console.log(path.relative(process.cwd(), extractedTableFile));
