import type { EventCard } from "./eventcard";

const EmotionalEvents: EventCard[] = [
  {
    id: "emo_campfire",
    name: "Stories Over Dinner",
    description:
      "After dinner, the survivors share memories from their past lives. The atmosphere feels unusually calm.",
    type: "emotional",
    rarity: "common",
    choices: [
      {
        description: "Encourage everyone to share their stories.",
        effects: {
          stats: {
            target: "all",
            values: {
              sanity: 5,
            },
          },
          relations: {
            between: "all",
            delta: 1,
          },
        },
      },
      {
        description: "Let everyone enjoy the quiet moment.",
        effects: {
          stats: {
            target: "all",
            values: {
              sanity: 2,
            },
          },
        },
      },
      {
        description: "Use the opportunity to discuss future plans.",
        effects: {
          stats: {
            target: "all",
            values: {
              sanity: -2,
            },
          },
          relations: {
            between: "all",
            delta: 2,
          },
        },
      },
      {
        description: "Skip the gathering and focus on repairs.",
        effects: {
          stock: {
            energy: -5,
          },
          stats: {
            target: "all",
            values: {
              sanity: -5,
            },
          },
        },
      },
    ],
    effects: {},
  },
];

export default EmotionalEvents;
