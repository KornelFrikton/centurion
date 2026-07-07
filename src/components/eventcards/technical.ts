import type { EventCard } from "./eventcard";

const TechnicalEvents: EventCard[] = [
  {
    id: "tech_water_purifier",
    name: "Vízszűrő javítása",
    description: "Sikerült működésre bírni egy régi víztisztítót.",
    type: "technical",
    rarity: "common",
    target: "all",
    choices: [
      {
        description: "Beüzemelitek.",
        effects: {
          stock: {
            Water: 50,
          },
          skills: {
            tech: 1,
          },
        },
      },
      {
        description: "Alkatrésznek szétszeditek.",
        effects: {
          skills: {
            crafting: 1,
          },
        },
      },
    ],
    effects: {},
  },
  {
    id: "tech_hydroponics",
    name: "Hidroponikus kert",
    description:
      "Egy elhagyott laborban működő növénytermesztő rendszert találtatok.",
    type: "technical",
    rarity: "random",
    target: "all",
    choices: [
      {
        description: "Megjavítjátok.",
        effects: {
          stock: {
            Food: 80,
          },
          stats: {
            stamina: -5,
          },
          skills: {
            tech: 1,
          },
        },
      },
      {
        description: "Kifosztjátok és továbbálltok.",
        effects: {
          stock: {
            Food: 20,
          },
        },
      },
    ],
    effects: {},
  },
];

export default TechnicalEvents;
