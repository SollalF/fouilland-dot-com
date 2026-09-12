export type SourceId = string;

export interface Source {
  id: SourceId;
  title: string;
  author?: string;
  year?: number;
  url?: string;
  publisher?: string;
  doi?: string;
  note?: string;
  scoreDerivation?: string;
}

type SourceRegistry = Record<SourceId, Source>;

export const sourceById: SourceRegistry = {
  "shen-2022": {
    id: "shen-2022",
    title:
      "Culture and Explicitness of Persuasion: Linguistic Evidence From a 51-Year Corpus-Based Cross-Cultural Comparison of the United Nations General Debate Speeches Across 55 Countries (1970-2020)",
    author: "Lin Shen",
    year: 2022,
    publisher: "Cross-Cultural Research",
    doi: "10.1177/10693971221139523",
    note: "Communication context ranks extracted from Table 1.",
    scoreDerivation:
      "Table 1 context ranks were normalized with (16 - rank) / 15 * 99, where rank 1 is highest context and rank 16 is lowest context.",
  },
  "hofstede-2015": {
    id: "hofstede-2015",
    title: "Hofstede 6-D Model Country Comparison Scores (0-100)",
    author: "Geert Hofstede, Gert Jan Hofstede, Michael Minkov",
    year: 2015,
    publisher: "Hofstede Insights",
    note: "Power distance index values extracted from the local 2015 0-100 country comparison CSV in the deciding sources folder.",
    scoreDerivation:
      "Power distance was normalized with round(PDI / 100 * 99), where higher values map to more top-down deciding.",
  },
  "globe-phase-2": {
    id: "globe-phase-2",
    title: "GLOBE Phase 2 Aggregated Societal Culture Data",
    author: "GLOBE Project",
    publisher: "GLOBE Project",
    note: "Assertiveness societal practices values extracted from the local GLOBE Phase 2 aggregate workbook and supported by the evaluating and disagreeing source evaluations.",
    scoreDerivation:
      "Assertiveness practices on the 1-7 GLOBE scale were reversed with round((7 - assertiveness) / 6 * 99), where higher atlas values mean more indirect negative feedback for evaluating and less confrontational disagreement for disagreeing.",
  },
  "eriksson-2021": {
    id: "eriksson-2021",
    title:
      "Perceptions of the Appropriate Response to Norm Violation in 57 Societies",
    author: "Kimmo Eriksson, Pontus Strimling, Michele Gelfand, et al.",
    year: 2021,
    publisher: "Nature Communications",
    doi: "10.1038/s41467-021-21602-9",
    note: "Country-level verbal confrontation metanorms extracted from Supplementary Table 2 in the local disagreeing source materials.",
    scoreDerivation:
      "Verbal confrontation metanorms were used only where GLOBE assertiveness was unavailable, then reversed and min-max normalized within the 57-society table so higher atlas values mean avoids confrontation.",
  },
  "ralston-2011": {
    id: "ralston-2011",
    title:
      "A Twenty-First Century Assessment of Values Across the Global Workforce",
    author:
      "David A. Ralston, Carolyn P. Egri, Emmanuelle Reynaud, N. Srinivasan, Olivier Furrer, et al.",
    year: 2011,
    publisher: "Journal of Business Ethics",
    doi: "10.1007/s10551-011-0835-8",
    note: "SVS societal-level values extracted from Tables 15 and 16 in the local leading and persuading source materials.",
    scoreDerivation:
      "Table 15 hierarchy within-subject standardized scores were min-max normalized to 0-99, where higher values map to more hierarchical leading. For persuading, Table 15 embeddedness minus Table 16 intellectual autonomy standardized scores were min-max normalized across the 50 societies, where higher values map to more application-first persuasion.",
  },
  "levine-norenzayan-1999": {
    id: "levine-norenzayan-1999",
    title: "The Pace of Life in 31 Countries",
    author: "Robert V. Levine, Ara Norenzayan",
    year: 1999,
    publisher: "Journal of Cross-Cultural Psychology",
    doi: "10.1177/0022022199030002003",
    note: "Overall pace-of-life index values extracted from Table 1 in the local scheduling source materials.",
    scoreDerivation:
      "Overall pace index values were min-max normalized to 0-99, where lower raw pace values indicate faster pace, greater punctuality, and more linear-time scheduling.",
  },
  "wang-2016": {
    id: "wang-2016",
    title: "How Time Preferences Differ: Evidence from 53 Countries",
    author: "Mei Wang, Marc Oliver Rieger, Thorsten Hens",
    year: 2016,
    publisher: "Journal of Economic Psychology",
    doi: "10.1016/j.joep.2016.12.001",
    note: "Country-level waiting tendency values extracted from Table 2 in the local scheduling source materials.",
    scoreDerivation:
      "The share choosing the delayed larger payoff was reverse min-max normalized to 0-99 as a weak proxy, where greater willingness to wait maps to more linear-time scheduling.",
  },
  "white-2011": {
    id: "white-2011",
    title:
      'What Is the Meaning of "On Time"? The Sociocultural Nature of Punctuality',
    author: "Lawrence T. White, Raivo Valk, Abdessamad Dialmy",
    year: 2011,
    publisher: "Journal of Cross-Cultural Psychology",
    doi: "10.1177/0022022110362746",
    note: "Country average on-time window values extracted from the local scheduling source materials.",
    scoreDerivation:
      "Average on-time windows were min-max normalized to 0-99, where larger acceptable windows map to more flexible-time scheduling.",
  },
  "van-eerde-azar-2019": {
    id: "van-eerde-azar-2019",
    title:
      "Too Late? What Do You Mean? Cultural Norms Regarding Lateness for Meetings and Appointments",
    author: "Wendelien Van Eerde, Sana Azar",
    year: 2019,
    publisher: "Cross-Cultural Research",
    doi: "10.1177/1069397119866132",
    note: "Average acceptable lateness values extracted from Table 3 in the local scheduling source materials.",
    scoreDerivation:
      "Average acceptable lateness intervals were min-max normalized to 0-99, where larger intervals map to more flexible-time scheduling.",
  },
  "krupka-2022": {
    id: "krupka-2022",
    title: '"When in Rome": Identifying Social Norms Using Coordination Games',
    author: "Erin L. Krupka, Roberto Weber, Rachel T. A. Croson, Hanna Hoover",
    year: 2022,
    publisher: "Judgment and Decision Making",
    doi: "10.1017/S1930297500009104",
    note: "On-time versus late country groupings extracted from Table 3 and Figure 2 in the local scheduling source materials.",
    scoreDerivation:
      "Ordinal groupings were used as supporting evidence only, not as primary numeric scheduling scores.",
  },
  "pelham-2022": {
    id: "pelham-2022",
    title:
      "A Truly Global, non-WEIRD Examination of Collectivism: The Global Collectivism Index",
    author: "Brett Pelham, Curtis D. Hardin, David R. Murray, et al.",
    year: 2022,
    publisher: "Current Research in Ecological and Social Psychology",
    doi: "10.1016/j.cresp.2021.100030",
    note: "Global Collectivism Index country z-scores extracted from Table 4 in the local trusting source materials.",
    scoreDerivation:
      "Table 4 GCI z-scores were min-max normalized to 0-99, where higher collectivism maps to more relationship-based trusting.",
  },
};

export function formatSourceCitation(source: Source): string {
  const parts: string[] = [];
  if (source.author) {
    parts.push(source.author);
  }
  parts.push(source.title);
  if (source.year) {
    parts.push(`(${source.year})`);
  }
  if (source.publisher) {
    parts.push(`— ${source.publisher}`);
  }
  return parts.join(", ");
}
