import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv } from "../../lib/parse-csv.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourceDir = resolve(scriptDir, "..");
const repoRoot = resolve(sourceDir, "../../../../..");
const csvPath = resolve(sourceDir, "data", "persuading-scores.csv");
const countryScoresPath = resolve(
  repoRoot,
  "app/projects/cultural-atlas/data/country-scores.ts",
);

function findMatchingBrace(text, openBraceIndex) {
  let depth = 0;
  let inString = false;
  let stringQuote = "";
  let escaped = false;

  for (let index = openBraceIndex; index < text.length; index += 1) {
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

  throw new Error(`No matching brace found at index ${openBraceIndex}.`);
}

function keyPatternForAtlasId(atlasId) {
  if (/^[a-zA-Z_$][\w$]*$/.test(atlasId)) {
    return new RegExp(`\\n  ${atlasId}: \\{`);
  }

  return new RegExp(`\\n  "${atlasId}": \\{`);
}

function buildPersuadingBlock(row) {
  return `      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: ${row.applicationFirstScore},
            label: "SVS embeddedness-autonomy proxy: ${row.embeddednessMinusIntellectualAutonomy}",
          },
        ],
      },
`;
}

function insertPersuadingScore(text, row) {
  const countryMatch = keyPatternForAtlasId(row.atlasId).exec(text);
  if (!countryMatch) {
    throw new Error(`Could not find country entry for ${row.atlasId}.`);
  }

  const countryOpenBraceIndex =
    countryMatch.index + countryMatch[0].lastIndexOf("{");
  const countryCloseBraceIndex = findMatchingBrace(text, countryOpenBraceIndex);
  const countryBlock = text.slice(
    countryOpenBraceIndex,
    countryCloseBraceIndex + 1,
  );

  if (countryBlock.includes("\n      persuading: {")) {
    return text;
  }

  const scoresMatch = /scores: \{/.exec(countryBlock);
  if (!scoresMatch) {
    throw new Error(`Could not find scores block for ${row.atlasId}.`);
  }

  const scoresOpenBraceIndex =
    countryOpenBraceIndex + scoresMatch.index + scoresMatch[0].lastIndexOf("{");
  const scoresCloseBraceIndex = findMatchingBrace(text, scoresOpenBraceIndex);
  const scoresBlock = text.slice(
    scoresOpenBraceIndex,
    scoresCloseBraceIndex + 1,
  );
  const persuadingBlock = buildPersuadingBlock(row);

  const communicatingMatch = /\n      communicating: \{/.exec(scoresBlock);
  if (!communicatingMatch) {
    const insertAt = scoresOpenBraceIndex + 1;
    return `${text.slice(0, insertAt)}\n${persuadingBlock}${text.slice(insertAt)}`;
  }

  const communicatingOpenBraceIndex =
    scoresOpenBraceIndex +
    communicatingMatch.index +
    communicatingMatch[0].lastIndexOf("{");
  const communicatingCloseBraceIndex = findMatchingBrace(
    text,
    communicatingOpenBraceIndex,
  );
  const commaIndex =
    text[communicatingCloseBraceIndex + 1] === ","
      ? communicatingCloseBraceIndex + 2
      : communicatingCloseBraceIndex + 1;

  return `${text.slice(0, commaIndex)}\n${persuadingBlock}${text.slice(commaIndex)}`;
}

const rows = parseCsv(readFileSync(csvPath, "utf8"));
const spreads = rows.map((row) =>
  Number(row.embeddednessMinusIntellectualAutonomy),
);
const minSpread = Math.min(...spreads);
const maxSpread = Math.max(...spreads);

for (const row of rows) {
  const expectedScore = Math.round(
    ((Number(row.embeddednessMinusIntellectualAutonomy) - minSpread) /
      (maxSpread - minSpread)) *
      99,
  );

  if (expectedScore !== Number(row.applicationFirstScore)) {
    throw new Error(
      `${row.country} score mismatch: expected ${expectedScore}, found ${row.applicationFirstScore}.`,
    );
  }
}

let countryScores = readFileSync(countryScoresPath, "utf8");

for (const row of rows.filter((entry) => entry.atlasId)) {
  countryScores = insertPersuadingScore(countryScores, row);
}

writeFileSync(countryScoresPath, countryScores);
