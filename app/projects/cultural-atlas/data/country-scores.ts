/**
 * Authoritative country score registry.
 *
 * Add country entries to COUNTRY_SCORES when new data is ready.
 */
import type { CountryScores } from "./scales";

interface CountryScoreInput {
  id: string;
  name: string;
  scores: CountryScores;
}

type CountryScoreRegistry = Record<string, CountryScoreInput>;

function defineCountryScores<const Scores extends CountryScoreRegistry>(
  scores: Scores & { [Id in keyof Scores]: { id: Id } },
): Scores {
  return scores;
}

export const COUNTRY_SCORES: CountryScoreRegistry = defineCountryScores({
  "united-states": {
    id: "united-states",
    name: "United States",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 13, label: "Context rank 14" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 38,
            label: "SVS embeddedness-autonomy proxy: -0.17",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 35,
            label: "SVS hierarchy std. score: -0.84",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 40,
            label: "Power distance proxy: PDI 40",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 40,
            label: "GLOBE assertiveness practices: 4.55",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 18,
            label: "GCI collectivism z-score: -1.18",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 40,
            label: "GLOBE assertiveness practices: 4.55",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "levine-norenzayan-1999",
            value: 40,
            label: "Pace-of-life index: -0.30",
          },
          {
            sourceId: "white-2011",
            value: 0,
            label: "On-time window: 20.8 min",
          },
          {
            sourceId: "wang-2016",
            value: 26,
            label: "Wait option share: 68%",
          },
        ],
      },
    },
  },
  canada: {
    id: "canada",
    name: "Canada",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 13, label: "Context rank 14" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 24,
            label: "SVS embeddedness-autonomy proxy: -0.39",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 37,
            label: "SVS hierarchy std. score: -0.82",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 39,
            label: "Power distance proxy: PDI 39",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 49,
            label: "GLOBE assertiveness practices: 4.05",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 20,
            label: "GCI collectivism z-score: -1.10",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 49,
            label: "GLOBE assertiveness practices: 4.05",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "levine-norenzayan-1999",
            value: 41,
            label: "Pace-of-life index: -0.26",
          },
          {
            sourceId: "wang-2016",
            value: 12,
            label: "Wait option share: 79%",
          },
          {
            sourceId: "krupka-2022",
            label: "On-time country grouping",
          },
        ],
      },
    },
  },
  australia: {
    id: "australia",
    name: "Australia",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 26, label: "Context rank 12" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 17,
            label: "SVS embeddedness-autonomy proxy: -0.50",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 67,
            label: "SVS hierarchy std. score: -0.53",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 38,
            label: "Power distance proxy: PDI 38",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 45,
            label: "GLOBE assertiveness practices: 4.28",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 18,
            label: "GCI collectivism z-score: -1.17",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 45,
            label: "GLOBE assertiveness practices: 4.28",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "wang-2016",
            value: 46,
            label: "Wait option share: 51%",
          },
        ],
      },
    },
  },
  "new-zealand": {
    id: "new-zealand",
    name: "New Zealand",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 7, label: "Context rank 15" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 10,
            label: "SVS embeddedness-autonomy proxy: -0.60",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 32,
            label: "SVS hierarchy std. score: -0.87",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 22,
            label: "Power distance proxy: PDI 22",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 59,
            label: "GLOBE assertiveness practices: 3.42",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 19,
            label: "GCI collectivism z-score: -1.11",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 59,
            label: "GLOBE assertiveness practices: 3.42",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "wang-2016",
            value: 54,
            label: "Wait option share: 45%",
          },
        ],
      },
    },
  },
  austria: {
    id: "austria",
    name: "Austria",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 0, label: "Context rank 16" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 20,
            label: "SVS embeddedness-autonomy proxy: -0.44",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 12,
            label: "SVS hierarchy std. score: -1.06",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 11,
            label: "Power distance proxy: PDI 11",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 39,
            label: "GLOBE assertiveness practices: 4.62",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 18,
            label: "GCI collectivism z-score: -1.16",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 39,
            label: "GLOBE assertiveness practices: 4.62",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "levine-norenzayan-1999",
            value: 26,
            label: "Pace-of-life index: -1.43",
          },
          {
            sourceId: "wang-2016",
            value: 13,
            label: "Wait option share: 78%",
          },
        ],
      },
    },
  },
  belgium: {
    id: "belgium",
    name: "Belgium",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 33, label: "Context rank 11" },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 64,
            label: "Power distance proxy: PDI 65",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 18,
            label: "GCI collectivism z-score: -1.16",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "wang-2016",
            value: 2,
            label: "Wait option share: 87%",
          },
        ],
      },
    },
  },
  bulgaria: {
    id: "bulgaria",
    name: "Bulgaria",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 46, label: "Context rank 9" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 50,
            label: "SVS embeddedness-autonomy proxy: 0.00",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 59,
            label: "SVS hierarchy std. score: -0.61",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 69,
            label: "Power distance proxy: PDI 70",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 33,
            label: "GCI collectivism z-score: -0.60",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "levine-norenzayan-1999",
            value: 65,
            label: "Pace-of-life index: 1.59",
          },
        ],
      },
    },
  },
  croatia: {
    id: "croatia",
    name: "Croatia",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 86, label: "Context rank 3" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 32,
            label: "SVS embeddedness-autonomy proxy: -0.27",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 1,
            label: "SVS hierarchy std. score: -1.16",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 72,
            label: "Power distance proxy: PDI 73",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 40,
            label: "GCI collectivism z-score: -0.34",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "wang-2016",
            value: 38,
            label: "Wait option share: 58%",
          },
        ],
      },
    },
  },
  cyprus: {
    id: "cyprus",
    name: "Cyprus",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 20, label: "Context rank 13" },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 37,
            label: "GCI collectivism z-score: -0.43",
          },
        ],
      },
    },
  },
  denmark: {
    id: "denmark",
    name: "Denmark",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 20, label: "Context rank 13" },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 18,
            label: "Power distance proxy: PDI 18",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 53,
            label: "GLOBE assertiveness practices: 3.8",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 13,
            label: "GCI collectivism z-score: -1.37",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 53,
            label: "GLOBE assertiveness practices: 3.8",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "wang-2016",
            value: 6,
            label: "Wait option share: 84%",
          },
        ],
      },
    },
  },
  estonia: {
    id: "estonia",
    name: "Estonia",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 53, label: "Context rank 8" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 33,
            label: "SVS embeddedness-autonomy proxy: -0.25",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 32,
            label: "SVS hierarchy std. score: -0.87",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 40,
            label: "Power distance proxy: PDI 40",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 13,
            label: "GCI collectivism z-score: -1.37",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "eriksson-2021",
            value: 43,
            label: "Eriksson verbal confrontation metanorm: 2.64",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "white-2011",
            value: 37,
            label: "On-time window: 26.3 min",
          },
          {
            sourceId: "wang-2016",
            value: 13,
            label: "Wait option share: 78%",
          },
        ],
      },
    },
  },
  finland: {
    id: "finland",
    name: "Finland",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 20, label: "Context rank 13" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 37,
            label: "SVS embeddedness-autonomy proxy: -0.19",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 27,
            label: "SVS hierarchy std. score: -0.91",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 33,
            label: "Power distance proxy: PDI 33",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 53,
            label: "GLOBE assertiveness practices: 3.81",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 14,
            label: "GCI collectivism z-score: -1.30",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 53,
            label: "GLOBE assertiveness practices: 3.81",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "wang-2016",
            value: 5,
            label: "Wait option share: 85%",
          },
        ],
      },
    },
  },
  france: {
    id: "france",
    name: "France",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 86, label: "Context rank 3" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 6,
            label: "SVS embeddedness-autonomy proxy: -0.66",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 34,
            label: "SVS hierarchy std. score: -0.85",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 67,
            label: "Power distance proxy: PDI 68",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 47,
            label: "GLOBE assertiveness practices: 4.13",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 18,
            label: "GCI collectivism z-score: -1.17",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 47,
            label: "GLOBE assertiveness practices: 4.13",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "levine-norenzayan-1999",
            value: 27,
            label: "Pace-of-life index: -1.36",
          },
          {
            sourceId: "wang-2016",
            value: 29,
            label: "Wait option share: 65%",
          },
          {
            sourceId: "krupka-2022",
            label: "On-time country grouping",
          },
        ],
      },
    },
  },
  germany: {
    id: "germany",
    name: "Germany",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 0, label: "Context rank 16" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 22,
            label: "SVS embeddedness-autonomy proxy: -0.41",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 51,
            label: "SVS hierarchy std. score: -0.69",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 35,
            label: "Power distance proxy: PDI 35",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 39,
            label: "GLOBE assertiveness practices: 4.64",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 13,
            label: "GCI collectivism z-score: -1.35",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 39,
            label: "GLOBE assertiveness practices: 4.64",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "levine-norenzayan-1999",
            value: 6,
            label: "Pace-of-life index: -3.00",
          },
          {
            sourceId: "wang-2016",
            value: 0,
            label: "Wait option share: 89%",
          },
          {
            sourceId: "krupka-2022",
            label: "On-time country grouping",
          },
        ],
      },
    },
  },
  greece: {
    id: "greece",
    name: "Greece",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 86, label: "Context rank 3" },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 59,
            label: "Power distance proxy: PDI 60",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 40,
            label: "GLOBE assertiveness practices: 4.58",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 32,
            label: "GCI collectivism z-score: -0.62",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 40,
            label: "GLOBE assertiveness practices: 4.58",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "levine-norenzayan-1999",
            value: 51,
            label: "Pace-of-life index: 0.54",
          },
          {
            sourceId: "wang-2016",
            value: 51,
            label: "Wait option share: 47%",
          },
        ],
      },
    },
  },
  hungary: {
    id: "hungary",
    name: "Hungary",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 53, label: "Context rank 8" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 31,
            label: "SVS embeddedness-autonomy proxy: -0.28",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 0,
            label: "SVS hierarchy std. score: -1.17",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 46,
            label: "Power distance proxy: PDI 46",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 37,
            label: "GLOBE assertiveness practices: 4.79",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 23,
            label: "GCI collectivism z-score: -0.96",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 37,
            label: "GLOBE assertiveness practices: 4.79",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "levine-norenzayan-1999",
            value: 44,
            label: "Pace-of-life index: 0.01",
          },
          {
            sourceId: "wang-2016",
            value: 15,
            label: "Wait option share: 77%",
          },
        ],
      },
    },
  },
  ireland: {
    id: "ireland",
    name: "Ireland",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 26, label: "Context rank 12" },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 28,
            label: "Power distance proxy: PDI 28",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 51,
            label: "GLOBE assertiveness practices: 3.92",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 36,
            label: "GCI collectivism z-score: -0.49",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 51,
            label: "GLOBE assertiveness practices: 3.92",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "levine-norenzayan-1999",
            value: 5,
            label: "Pace-of-life index: -3.02",
          },
          {
            sourceId: "wang-2016",
            value: 24,
            label: "Wait option share: 69%",
          },
        ],
      },
    },
  },
  italy: {
    id: "italy",
    name: "Italy",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 86, label: "Context rank 3" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 13,
            label: "SVS embeddedness-autonomy proxy: -0.56",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 41,
            label: "SVS hierarchy std. score: -0.78",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 50,
            label: "Power distance proxy: PDI 50",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 48,
            label: "GLOBE assertiveness practices: 4.07",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 29,
            label: "GCI collectivism z-score: -0.73",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 48,
            label: "GLOBE assertiveness practices: 4.07",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "levine-norenzayan-1999",
            value: 17,
            label: "Pace-of-life index: -2.13",
          },
          {
            sourceId: "wang-2016",
            value: 55,
            label: "Wait option share: 44%",
          },
        ],
      },
    },
  },
  latvia: {
    id: "latvia",
    name: "Latvia",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 53, label: "Context rank 8" },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 44,
            label: "Power distance proxy: PDI 44",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 28,
            label: "GCI collectivism z-score: -0.80",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "eriksson-2021",
            value: 43,
            label: "Eriksson verbal confrontation metanorm: 2.64",
          },
        ],
      },
    },
  },
  lithuania: {
    id: "lithuania",
    name: "Lithuania",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 53, label: "Context rank 8" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 30,
            label: "SVS embeddedness-autonomy proxy: -0.30",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 51,
            label: "SVS hierarchy std. score: -0.69",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 42,
            label: "Power distance proxy: PDI 42",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 28,
            label: "GCI collectivism z-score: -0.80",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "wang-2016",
            value: 35,
            label: "Wait option share: 60%",
          },
        ],
      },
    },
  },
  luxembourg: {
    id: "luxembourg",
    name: "Luxembourg",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 33, label: "Context rank 11" },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 40,
            label: "Power distance proxy: PDI 40",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 13,
            label: "GCI collectivism z-score: -1.34",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "wang-2016",
            value: 42,
            label: "Wait option share: 55%",
          },
        ],
      },
    },
  },
  malta: {
    id: "malta",
    name: "Malta",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 86, label: "Context rank 3" },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 55,
            label: "Power distance proxy: PDI 56",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 27,
            label: "GCI collectivism z-score: -0.82",
          },
        ],
      },
    },
  },
  netherlands: {
    id: "netherlands",
    name: "Netherlands",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 33, label: "Context rank 11" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 11,
            label: "SVS embeddedness-autonomy proxy: -0.58",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 13,
            label: "SVS hierarchy std. score: -1.05",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 38,
            label: "Power distance proxy: PDI 38",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 44,
            label: "GLOBE assertiveness practices: 4.32",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 15,
            label: "GCI collectivism z-score: -1.29",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 44,
            label: "GLOBE assertiveness practices: 4.32",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "levine-norenzayan-1999",
            value: 26,
            label: "Pace-of-life index: -1.43",
          },
          {
            sourceId: "van-eerde-azar-2019",
            value: 0,
            label: "Acceptable lateness: 9.32 min",
          },
          {
            sourceId: "wang-2016",
            value: 5,
            label: "Wait option share: 85%",
          },
        ],
      },
    },
  },
  poland: {
    id: "poland",
    name: "Poland",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 53, label: "Context rank 8" },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 67,
            label: "Power distance proxy: PDI 68",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 48,
            label: "GLOBE assertiveness practices: 4.06",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 35,
            label: "GCI collectivism z-score: -0.50",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 48,
            label: "GLOBE assertiveness practices: 4.06",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "levine-norenzayan-1999",
            value: 27,
            label: "Pace-of-life index: -1.32",
          },
          {
            sourceId: "wang-2016",
            value: 13,
            label: "Wait option share: 78%",
          },
        ],
      },
    },
  },
  portugal: {
    id: "portugal",
    name: "Portugal",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 86, label: "Context rank 3" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 22,
            label: "SVS embeddedness-autonomy proxy: -0.41",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 33,
            label: "SVS hierarchy std. score: -0.86",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 62,
            label: "Power distance proxy: PDI 63",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 55,
            label: "GLOBE assertiveness practices: 3.65",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 23,
            label: "GCI collectivism z-score: -0.96",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 55,
            label: "GLOBE assertiveness practices: 3.65",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "wang-2016",
            value: 35,
            label: "Wait option share: 60%",
          },
        ],
      },
    },
  },
  romania: {
    id: "romania",
    name: "Romania",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 46, label: "Context rank 9" },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 89,
            label: "Power distance proxy: PDI 90",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 37,
            label: "GCI collectivism z-score: -0.43",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "levine-norenzayan-1999",
            value: 76,
            label: "Pace-of-life index: 2.42",
          },
          {
            sourceId: "wang-2016",
            value: 39,
            label: "Wait option share: 57%",
          },
        ],
      },
    },
  },
  slovakia: {
    id: "slovakia",
    name: "Slovakia",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 53, label: "Context rank 8" },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 99,
            label: "Power distance proxy: PDI 100",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 28,
            label: "GCI collectivism z-score: -0.79",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "eriksson-2021",
            value: 36,
            label: "Eriksson verbal confrontation metanorm: 2.71",
          },
        ],
      },
    },
  },
  slovenia: {
    id: "slovenia",
    name: "Slovenia",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 53, label: "Context rank 8" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 34,
            label: "SVS embeddedness-autonomy proxy: -0.23",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 23,
            label: "SVS hierarchy std. score: -0.95",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 70,
            label: "Power distance proxy: PDI 71",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 50,
            label: "GLOBE assertiveness practices: 4",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 28,
            label: "GCI collectivism z-score: -0.78",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 50,
            label: "GLOBE assertiveness practices: 4",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "wang-2016",
            value: 22,
            label: "Wait option share: 71%",
          },
        ],
      },
    },
  },
  spain: {
    id: "spain",
    name: "Spain",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 86, label: "Context rank 3" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 32,
            label: "SVS embeddedness-autonomy proxy: -0.27",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 62,
            label: "SVS hierarchy std. score: -0.58",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 56,
            label: "Power distance proxy: PDI 57",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 43,
            label: "GLOBE assertiveness practices: 4.42",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 25,
            label: "GCI collectivism z-score: -0.90",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 43,
            label: "GLOBE assertiveness practices: 4.42",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "wang-2016",
            value: 51,
            label: "Wait option share: 47%",
          },
        ],
      },
    },
  },
  sweden: {
    id: "sweden",
    name: "Sweden",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 20, label: "Context rank 13" },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 31,
            label: "Power distance proxy: PDI 31",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 60,
            label: "GLOBE assertiveness practices: 3.38",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 11,
            label: "GCI collectivism z-score: -1.43",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 60,
            label: "GLOBE assertiveness practices: 3.38",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "levine-norenzayan-1999",
            value: 19,
            label: "Pace-of-life index: -1.96",
          },
          {
            sourceId: "wang-2016",
            value: 6,
            label: "Wait option share: 84%",
          },
        ],
      },
    },
  },
  "united-kingdom": {
    id: "united-kingdom",
    name: "United Kingdom",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 26, label: "Context rank 12" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 15,
            label: "SVS embeddedness-autonomy proxy: -0.52",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 41,
            label: "SVS hierarchy std. score: -0.78",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 35,
            label: "Power distance proxy: PDI 35",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 47,
            label: "GLOBE assertiveness practices: 4.15",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 19,
            label: "GCI collectivism z-score: -1.12",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 47,
            label: "GLOBE assertiveness practices: 4.15",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "levine-norenzayan-1999",
            value: 17,
            label: "Pace-of-life index: -2.09",
          },
          {
            sourceId: "wang-2016",
            value: 22,
            label: "Wait option share: 71%",
          },
        ],
      },
    },
  },
  brunei: {
    id: "brunei",
    name: "Brunei",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 59, label: "Context rank 7" },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 40,
            label: "GCI collectivism z-score: -0.34",
          },
        ],
      },
    },
  },
  cambodia: {
    id: "cambodia",
    name: "Cambodia",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 59, label: "Context rank 7" },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 66,
            label: "GCI collectivism z-score: 0.65",
          },
        ],
      },
    },
  },
  indonesia: {
    id: "indonesia",
    name: "Indonesia",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 59, label: "Context rank 7" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 58,
            label: "SVS embeddedness-autonomy proxy: 0.13",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 65,
            label: "SVS hierarchy std. score: -0.55",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 77,
            label: "Power distance proxy: PDI 78",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 52,
            label: "GLOBE assertiveness practices: 3.86",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 66,
            label: "GCI collectivism z-score: 0.67",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 52,
            label: "GLOBE assertiveness practices: 3.86",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "levine-norenzayan-1999",
            value: 98,
            label: "Pace-of-life index: 4.14",
          },
        ],
      },
    },
  },
  laos: {
    id: "laos",
    name: "Laos",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 59, label: "Context rank 7" },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 72,
            label: "GCI collectivism z-score: 0.89",
          },
        ],
      },
    },
  },
  malaysia: {
    id: "malaysia",
    name: "Malaysia",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 59, label: "Context rank 7" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 59,
            label: "SVS embeddedness-autonomy proxy: 0.15",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 87,
            label: "SVS hierarchy std. score: -0.34",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 99,
            label: "Power distance proxy: PDI 100",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 52,
            label: "GLOBE assertiveness practices: 3.87",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 48,
            label: "GCI collectivism z-score: -0.01",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 52,
            label: "GLOBE assertiveness practices: 3.87",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "wang-2016",
            value: 33,
            label: "Wait option share: 62%",
          },
        ],
      },
    },
  },
  myanmar: {
    id: "myanmar",
    name: "Myanmar",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 59, label: "Context rank 7" },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 66,
            label: "GCI collectivism z-score: 0.65",
          },
        ],
      },
    },
  },
  philippines: {
    id: "philippines",
    name: "Philippines",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 59, label: "Context rank 7" },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 93,
            label: "Power distance proxy: PDI 94",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 49,
            label: "GLOBE assertiveness practices: 4.01",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 66,
            label: "GCI collectivism z-score: 0.67",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 49,
            label: "GLOBE assertiveness practices: 4.01",
          },
        ],
      },
    },
  },
  singapore: {
    id: "singapore",
    name: "Singapore",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 59, label: "Context rank 7" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 53,
            label: "SVS embeddedness-autonomy proxy: 0.05",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 79,
            label: "SVS hierarchy std. score: -0.42",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 73,
            label: "Power distance proxy: PDI 74",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 47,
            label: "GLOBE assertiveness practices: 4.17",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 32,
            label: "GCI collectivism z-score: -0.63",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 47,
            label: "GLOBE assertiveness practices: 4.17",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "levine-norenzayan-1999",
            value: 36,
            label: "Pace-of-life index: -0.65",
          },
          {
            sourceId: "krupka-2022",
            label: "On-time country grouping",
          },
        ],
      },
    },
  },
  thailand: {
    id: "thailand",
    name: "Thailand",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 59, label: "Context rank 7" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 53,
            label: "SVS embeddedness-autonomy proxy: 0.06",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 67,
            label: "SVS hierarchy std. score: -0.53",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 63,
            label: "Power distance proxy: PDI 64",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 55,
            label: "GLOBE assertiveness practices: 3.64",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 45,
            label: "GCI collectivism z-score: -0.14",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 55,
            label: "GLOBE assertiveness practices: 3.64",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "wang-2016",
            value: 39,
            label: "Wait option share: 57%",
          },
        ],
      },
    },
  },
  "timor-leste": {
    id: "timor-leste",
    name: "Timor-Leste",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 59, label: "Context rank 7" },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 91,
            label: "GCI collectivism z-score: 1.61",
          },
        ],
      },
    },
  },
  vietnam: {
    id: "vietnam",
    name: "Vietnam",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 59, label: "Context rank 7" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 69,
            label: "SVS embeddedness-autonomy proxy: 0.29",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 95,
            label: "SVS hierarchy std. score: -0.27",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 69,
            label: "Power distance proxy: PDI 70",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 52,
            label: "GCI collectivism z-score: 0.12",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "eriksson-2021",
            value: 24,
            label: "Eriksson verbal confrontation metanorm: 2.82",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "wang-2016",
            value: 45,
            label: "Wait option share: 52%",
          },
        ],
      },
    },
  },
  china: {
    id: "china",
    name: "China",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 92, label: "Context rank 2" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 38,
            label: "SVS embeddedness-autonomy proxy: -0.17",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 85,
            label: "SVS hierarchy std. score: -0.36",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 79,
            label: "Power distance proxy: PDI 80",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 53,
            label: "GLOBE assertiveness practices: 3.76",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 45,
            label: "GCI collectivism z-score: -0.13",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 53,
            label: "GLOBE assertiveness practices: 3.76",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "levine-norenzayan-1999",
            value: 58,
            label: "Pace-of-life index: 1.03",
          },
          {
            sourceId: "wang-2016",
            value: 33,
            label: "Wait option share: 62%",
          },
          {
            sourceId: "krupka-2022",
            label: "On-time country grouping",
          },
        ],
      },
    },
  },
  japan: {
    id: "japan",
    name: "Japan",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 99, label: "Context rank 1" },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 53,
            label: "Power distance proxy: PDI 54",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 56,
            label: "GLOBE assertiveness practices: 3.59",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 18,
            label: "GCI collectivism z-score: -1.18",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 56,
            label: "GLOBE assertiveness practices: 3.59",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "levine-norenzayan-1999",
            value: 10,
            label: "Pace-of-life index: -2.68",
          },
          {
            sourceId: "wang-2016",
            value: 18,
            label: "Wait option share: 74%",
          },
        ],
      },
    },
  },
  mongolia: {
    id: "mongolia",
    name: "Mongolia",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 59, label: "Context rank 7" },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 56,
            label: "GCI collectivism z-score: 0.27",
          },
        ],
      },
    },
  },
  "north-korea": {
    id: "north-korea",
    name: "North Korea",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 59, label: "Context rank 7" },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 66,
            label: "GCI collectivism z-score: 0.68",
          },
        ],
      },
    },
  },
  "south-korea": {
    id: "south-korea",
    name: "South Korea",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 59, label: "Context rank 7" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 35,
            label: "SVS embeddedness-autonomy proxy: -0.22",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 70,
            label: "SVS hierarchy std. score: -0.51",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 59,
            label: "Power distance proxy: PDI 60",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 43,
            label: "GLOBE assertiveness practices: 4.4",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 29,
            label: "GCI collectivism z-score: -0.74",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 43,
            label: "GLOBE assertiveness practices: 4.4",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "levine-norenzayan-1999",
            value: 44,
            label: "Pace-of-life index: -0.02",
          },
          {
            sourceId: "wang-2016",
            value: 21,
            label: "Wait option share: 72%",
          },
        ],
      },
    },
  },
  afghanistan: {
    id: "afghanistan",
    name: "Afghanistan",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 59, label: "Context rank 7" },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 81,
            label: "GCI collectivism z-score: 1.25",
          },
        ],
      },
    },
  },
  bangladesh: {
    id: "bangladesh",
    name: "Bangladesh",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 59, label: "Context rank 7" },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 79,
            label: "Power distance proxy: PDI 80",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 81,
            label: "GCI collectivism z-score: 1.25",
          },
        ],
      },
    },
  },
  bhutan: {
    id: "bhutan",
    name: "Bhutan",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 66, label: "Context rank 6" },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 55,
            label: "GCI collectivism z-score: 0.26",
          },
        ],
      },
    },
  },
  india: {
    id: "india",
    name: "India",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 66, label: "Context rank 6" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 44,
            label: "SVS embeddedness-autonomy proxy: -0.09",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 81,
            label: "SVS hierarchy std. score: -0.4",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 76,
            label: "Power distance proxy: PDI 77",
          },
        ],
      },
      evaluating: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 54,
            label: "GLOBE assertiveness practices: 3.73",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 55,
            label: "GCI collectivism z-score: 0.25",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "globe-phase-2",
            value: 54,
            label: "GLOBE assertiveness practices: 3.73",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "wang-2016",
            value: 37,
            label: "Wait option share: 59%",
          },
          {
            sourceId: "krupka-2022",
            label: "Late country grouping",
          },
        ],
      },
    },
  },
  maldives: {
    id: "maldives",
    name: "Maldives",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 66, label: "Context rank 6" },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 58,
            label: "GCI collectivism z-score: 0.35",
          },
        ],
      },
    },
  },
  nepal: {
    id: "nepal",
    name: "Nepal",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 66, label: "Context rank 6" },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 69,
            label: "GCI collectivism z-score: 0.76",
          },
        ],
      },
    },
  },
  pakistan: {
    id: "pakistan",
    name: "Pakistan",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 66, label: "Context rank 6" },
        ],
      },
      persuading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 40,
            label: "SVS embeddedness-autonomy proxy: -0.15",
          },
        ],
      },

      leading: {
        sources: [
          {
            sourceId: "ralston-2011",
            value: 82,
            label: "SVS hierarchy std. score: -0.39",
          },
        ],
      },
      deciding: {
        sources: [
          {
            sourceId: "hofstede-2015",
            value: 54,
            label: "Power distance proxy: PDI 55",
          },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 67,
            label: "GCI collectivism z-score: 0.70",
          },
        ],
      },
      scheduling: {
        sources: [
          {
            sourceId: "van-eerde-azar-2019",
            value: 99,
            label: "Acceptable lateness: 19.04 min",
          },
        ],
      },
    },
  },
  "sri-lanka": {
    id: "sri-lanka",
    name: "Sri Lanka",
    scores: {
      communicating: {
        sources: [
          { sourceId: "shen-2022", value: 66, label: "Context rank 6" },
        ],
      },
      trusting: {
        sources: [
          {
            sourceId: "pelham-2022",
            value: 68,
            label: "GCI collectivism z-score: 0.75",
          },
        ],
      },
      disagreeing: {
        sources: [
          {
            sourceId: "eriksson-2021",
            value: 51,
            label: "Eriksson verbal confrontation metanorm: 2.57",
          },
        ],
      },
    },
  },
});

export type CountryId = keyof typeof COUNTRY_SCORES;
export type Country = (typeof COUNTRY_SCORES)[CountryId];

export const countries: Country[] = Object.values(COUNTRY_SCORES);
