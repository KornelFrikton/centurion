import type { EventCard } from "./eventcard";
import technical_banner from "../../assets/banners/technical_banner.png";

const TechnicalEvents: EventCard[] = [
  {
    id: "tech_water_purifier",
    name: "Water Purifier Repair",
    description:
      "A damaged water purification system has been found. Restoring it could significantly improve the ship's water supply.",
    type: "technical",
    banner: technical_banner,
    rarity: "common",

    choices: [
      {
        description: "Carefully repair the purifier.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 7,
          failEffects: {
            stats: {
              target: "specific",
              values: {
                stamina: -5,
              },
            },
            stock: {
              water: -10,
            },
          },
        },
        effects: {
          stock: {
            water: 30,
          },
          flags: {
            water_purifier_repaired: true,
          },
        },
      },

      {
        description: "Push the purifier beyond its limits.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 10,
          failEffects: {
            stats: {
              target: "specific",
              values: {
                health: -10,
              },
            },
            stock: {
              water: -20,
            },
          },
        },
        effects: {
          stock: {
            water: 60,
          },
          flags: {
            water_purifier_upgraded: true,
          },
        },
      },

      {
        description: "Salvage the purifier for spare parts.",
        effects: {
          stock: {
            energy: 10,
          },
          skills: {
            target: "specific",
            values: {
              tech: 1,
            },
          },
        },
      },
    ],
    effects: {},
  },

  {
    id: "tech_hydroponics",
    name: "Hydroponic Garden",
    description:
      "An abandoned laboratory contains a functioning hydroponic growing system. It could become a valuable source of food and oxygen.",
    type: "technical",
    banner: technical_banner,
    rarity: "legendary",

    choices: [
      {
        description: "Restore the hydroponic system.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 8,
          failEffects: {
            stats: {
              target: "specific",
              values: {
                stamina: -10,
              },
            },
            stock: {
              energy: -15,
            },
          },
        },
        effects: {
          flags: {
            hydroponics_active: true,
          },
          stock: {
            food: 20,
            oxygen: 15,
          },
        },
      },

      {
        description: "Repair only the most productive sections.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 7,
          failEffects: {
            stock: {
              food: -10,
            },
          },
        },
        effects: {
          flags: {
            hydroponics_limited: true,
          },
          stock: {
            food: 10,
          },
        },
      },

      {
        description: "Harvest what remains and abandon the system.",
        effects: {
          stock: {
            food: 25,
          },
        },
      },

      {
        description: "Convert the laboratory equipment into spare parts.",
        effects: {
          stock: {
            energy: 30,
          },
          flags: {
            hydroponics_destroyed: true,
          },
        },
      },
    ],

    effects: {},
  },
];

export default TechnicalEvents;
