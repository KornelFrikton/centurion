import type { EventCard } from "./eventcard";

const EmotionalEvents: EventCard[] = [
  {
    id: "emo_campfire",
    name: "Történetek a vacsoránál",
    description:
      "A vacsora után a túlélők régi emlékeket idéznek fel. A hangulat szokatlanul nyugodt.",
    type: "emotional",
    rarity: "common",
    choices: [
      {
        description: "Mindenki megoszt egy személyes történetet.",
        effects: {
          relations: {
            between: "all",
            delta: 1,
          },
          stats: {
            sanity: 5,
          },
        },
      },
      {
        description: "A társaság hamar szétszéled.",
        effects: {
          relations: {
            between: "all",
            delta: -1,
          },
        },
      },
    ],
    effects: {},
  },
];

export default EmotionalEvents;
