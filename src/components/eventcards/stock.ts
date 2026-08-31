import type { EventCard } from "./eventcard";
import stock_banner from "../../assets/banners/stock_banner.png";

const SupplyCards: EventCard[] = [
  {
    id: "supply_cargo_container",
    name: "Drifting Cargo Container",
    description:
      "Sensors detect a cargo container slowly drifting through space. Its beacon is still active.",
    type: "supply",
    banner: stock_banner,
    rarity: "common",
    choices: [
      {
        description: "Force the container open.",
        skillCheck: {
          target: "specific",
          skill: "scavenging",
          difficulty: 7,
          failEffects: {
            stats: {
              target: "specific",
              values: {
                health: -15,
              },
            },
            stock: {
              food: -5,
            },
          },
        },
        effects: {
          stock: {
            food: 20,
            water: 15,
          },
        },
      },

      {
        description: "Carefully recover the cargo.",
        effects: {
          stock: {
            food: 10,
            water: 10,
            energy: 5,
          },
          stats: {
            target: "all",
            values: {
              hunger: 5,
            },
          },
        },
      },
      {
        description: "Strip it for spare power cells.",
        effects: {
          stock: {
            energy: 20,
          },
          stats: {
            target: "all",
            values: {
              stamina: -5,
            },
          },
        },
      },
      {
        description: "Ignore the signal and conserve resources.",
        effects: {
          stock: {
            energy: 5,
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
  },

  {
    id: "supply_abandoned_shuttle",
    name: "Abandoned Shuttle",
    description:
      "An abandoned shuttle drifts silently nearby. Its systems are offline, but the cargo bay appears intact.",
    type: "supply",
    banner: stock_banner,
    rarity: "common",
    choices: [
      {
        description: "Attempt to restore the shuttle systems.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 8,
          failEffects: {
            stats: {
              target: "specific",
              values: {
                health: -10,
              },
            },
            stock: {
              energy: -5,
            },
          },
        },
        effects: {
          stock: {
            energy: 25,
            oxygen: 10,
            food: 15,
          },
        },
      },

      {
        description: "Carefully search the cargo bay.",
        effects: {
          stock: {
            food: 10,
            water: 10,
          },
        },
      },

      {
        description: "Strip the shuttle for useful components.",
        skillCheck: {
          target: "specific",
          skill: "scavenging",
          difficulty: 6,
          failEffects: {
            stock: {
              energy: -10,
            },
            stats: {
              target: "specific",
              values: {
                stamina: -10,
              },
            },
          },
        },
        effects: {
          stock: {
            energy: 30,
          },
        },
      },
    ],
  },

  {
    id: "supply_maintenance_drone",
    name: "Maintenance Drone",
    description:
      "A damaged maintenance drone still carries replacement power cells and spare components.",
    type: "supply",
    banner: stock_banner,
    rarity: "rare",

    choices: [
      {
        description: "Repair the drone and access its full inventory.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 9,
          failEffects: {
            stats: {
              target: "specific",
              values: {
                health: -5,
              },
            },
            stock: {
              energy: -10,
            },
          },
        },
        effects: {
          stock: {
            energy: 40,
            oxygen: 10,
          },
        },
      },

      {
        description: "Extract the power cells without repairing it.",
        effects: {
          stock: {
            energy: 20,
          },
        },
      },

      {
        description: "Dismantle the drone for spare components.",
        skillCheck: {
          target: "specific",
          skill: "scavenging",
          difficulty: 7,
          failEffects: {
            stock: {
              energy: -5,
            },
            stats: {
              target: "specific",
              values: {
                stamina: -10,
              },
            },
          },
        },
        effects: {
          stock: {
            energy: 25,
          },
        },
      },
    ],
  },

  {
    id: "supply_emergency_pod",
    name: "Emergency Escape Pod",
    description:
      "An old escape pod contains untouched emergency survival supplies.",
    type: "supply",
    banner: stock_banner,
    rarity: "common",

    choices: [
      {
        description: "Open the pod and take everything inside.",
        skillCheck: {
          target: "specific",
          skill: "scavenging",
          difficulty: 6,
          failEffects: {
            stats: {
              target: "specific",
              values: {
                health: -5,
              },
            },
            stock: {
              oxygen: -5,
            },
          },
        },
        effects: {
          stock: {
            food: 20,
            water: 15,
            oxygen: 10,
          },
        },
      },

      {
        description: "Carefully extract only the sealed supplies.",
        effects: {
          stock: {
            food: 10,
            water: 10,
          },
        },
      },

      {
        description: "Salvage the pod's life support system.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 7,
          failEffects: {
            stock: {
              oxygen: -10,
            },
            stats: {
              target: "specific",
              values: {
                stamina: -5,
              },
            },
          },
        },
        effects: {
          stock: {
            oxygen: 25,
            energy: 10,
          },
        },
      },
    ],
  },

  {
    id: "supply_derelict_freighter",
    name: "Derelict Freighter",
    description:
      "A massive cargo freighter drifts through the void. Most systems are dead, but parts of the cargo hold remain accessible.",
    type: "supply",
    banner: stock_banner,
    rarity: "rare",

    choices: [
      {
        description: "Send a team to fully explore the freighter.",
        skillCheck: {
          target: "specific",
          skill: "scavenging",
          difficulty: 9,
          failEffects: {
            stats: {
              target: "specific",
              values: {
                health: -20,
                sanity: -5,
              },
            },
            stock: {
              oxygen: -10,
            },
          },
        },
        effects: {
          stock: {
            food: 40,
            water: 30,
            oxygen: 20,
            energy: 25,
          },
        },
      },

      {
        description: "Recover only the accessible cargo containers.",
        effects: {
          stock: {
            food: 20,
            water: 15,
            energy: 10,
          },
        },
      },

      {
        description: "Attempt to restart the freighter's reactor systems.",
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
              energy: -15,
            },
          },
        },
        effects: {
          stock: {
            energy: 50,
          },
        },
      },

      {
        description: "Salvage the ship's navigation and communication modules.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 8,
          failEffects: {
            stats: {
              target: "specific",
              values: {
                stamina: -15,
              },
            },
          },
        },
        effects: {
          stock: {
            energy: 20,
          },
          flags: {
            recovered_navigation_data: true,
          },
        },
      },
    ],
  },
];

export default SupplyCards;
