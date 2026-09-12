import {
  formatSourceCitation,
  sourceById,
  type SourceId,
} from "./sources";

export const SCALES = [
  {
    id: "communicating",
    label: "Communicating",
    description:
      "How much meaning is carried by explicit words versus shared context, tone, and nonverbal cues.",
    low: "Low context",
    lowDescription:
      "People spell out expectations, background, and next steps directly.",
    high: "High context",
    highDescription:
      "People rely more on shared history, implication, status, and reading between the lines.",
  },
  {
    id: "evaluating",
    label: "Evaluating",
    description:
      "How openly people give criticism or corrective feedback.",
    low: "Direct negative feedback",
    lowDescription:
      "Criticism is stated plainly and may be separated from the relationship.",
    high: "Indirect negative feedback",
    highDescription:
      "Criticism is softened, implied, or delivered privately to protect harmony and face.",
  },
  {
    id: "persuading",
    label: "Persuading",
    description:
      "Whether arguments usually begin with theory and principles or with concrete cases and action.",
    low: "Principles-first",
    lowDescription:
      "People build the case from concepts, logic, and underlying rules before applications.",
    high: "Application-first",
    highDescription:
      "People start with examples, practical outcomes, and recommendations before broader theory.",
  },
  {
    id: "leading",
    label: "Leading",
    description:
      "How much distance is expected between leaders and the people they lead.",
    low: "Egalitarian",
    lowDescription:
      "Managers are expected to be accessible, consultative, and relatively informal.",
    high: "Hierarchical",
    highDescription:
      "Authority, rank, and clear status differences are expected and respected.",
  },
  {
    id: "deciding",
    label: "Deciding",
    description:
      "How decisions are typically made once a group or organization needs to commit.",
    low: "Consensual",
    lowDescription:
      "Decisions take longer up front because broad input and buy-in matter.",
    high: "Top-down",
    highDescription:
      "A leader or small group decides, often allowing faster commitment after consultation.",
  },
  {
    id: "trusting",
    label: "Trusting",
    description:
      "What people usually rely on when deciding whether someone is trustworthy.",
    low: "Task-based",
    lowDescription:
      "Trust grows from reliability, competence, contracts, and doing good work together.",
    high: "Relationship-based",
    highDescription:
      "Trust grows from personal rapport, shared meals, introductions, and long-term relationships.",
  },
  {
    id: "disagreeing",
    label: "Disagreeing",
    description:
      "How comfortable people are with open debate, challenge, and conflict in group settings.",
    low: "Confrontational",
    lowDescription:
      "Disagreement can be direct and public without necessarily damaging the relationship.",
    high: "Avoids confrontation",
    highDescription:
      "Disagreement is handled carefully, indirectly, or offline to preserve harmony.",
  },
  {
    id: "scheduling",
    label: "Scheduling",
    description:
      "How people treat time, plans, deadlines, and interruptions.",
    low: "Linear time",
    lowDescription:
      "Schedules, punctuality, sequencing, and deadlines are treated as firm commitments.",
    high: "Flexible time",
    highDescription:
      "Plans adapt more readily around relationships, changing priorities, and context.",
  },
] as const;

export type ScaleId = (typeof SCALES)[number]["id"];

/** One cited data point. */
interface ScoreSourceBase {
  sourceId: SourceId;
  explanation?: string;
}

export type ScoreSource =
  | (ScoreSourceBase & {
      /** Short label shown in the UI (e.g. "High-context proxy"). */
      label: string;
      /** Numeric value on the 0-99 scale. */
      value?: number;
    })
  | (ScoreSourceBase & {
      /** Numeric value on the 0-99 scale. */
      value: number;
    });

export type PrimaryScoreSource = ScoreSourceBase & {
  /** Numeric value on the 0-99 scale. */
  value: number;
  /** Short label shown in the UI (e.g. "High-context proxy"). */
  label?: string;
};

export interface ScoreEntry {
  /** First citation is primary; later entries are supporting citations. */
  sources: [PrimaryScoreSource, ...ScoreSource[]];
}

export type CountryScores = Partial<Record<ScaleId, ScoreEntry>>;

export function getScoreSourceSummary(source: ScoreSource): string {
  if ("label" in source) {
    return "value" in source ? `${source.label}: ${source.value}` : source.label;
  }
  return String(source.value);
}

export function getScoreSourceCitation(source: ScoreSource): string {
  return [
    getScoreSourceSummary(source),
    formatSourceCitation(sourceById[source.sourceId]),
    source.explanation,
  ]
    .filter(Boolean)
    .join(" · ");
}

export function getPoleLabel(scaleId: ScaleId, score: number): string {
  const scale = SCALES.find((s) => s.id === scaleId);
  if (!scale) return "";
  return score >= 50 ? scale.high : scale.low;
}
