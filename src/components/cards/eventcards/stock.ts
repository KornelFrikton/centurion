import type { EventCard } from "./eventcard";
import stock_banner from "../../../assets/banners/stock_banner.png";

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
  {
    id: "supply_power_surge",
    name: "Power Surge",
    description:
      "An unexpected power surge ripples through the ship's systems. Some equipment is damaged, but the energy cells are overcharged.",
    type: "supply",
    banner: stock_banner,
    rarity: "common",
    choices: [
      {
        description: "Redirect the surge to charge the energy reserves.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 7,
          failEffects: {
            stock: { energy: -20 },
            stats: { target: "specific", values: { health: -10 } },
          },
        },
        effects: {
          stock: { energy: 30 },
          stats: { target: "all", values: { sanity: 5 } },
        },
      },
      {
        description: "Shut everything down to prevent further damage.",
        effects: {
          stock: { energy: -10 },
          stats: { target: "all", values: { stamina: -5 } },
        },
      },
      {
        description: "Let it run and hope the systems hold.",
        effects: {
          stock: { energy: 15 },
          stats: { target: "all", values: { health: -10, sanity: -5 } },
        },
      },
    ],
  },
  {
    id: "supply_distress_beacon",
    name: "Distress Beacon",
    description:
      "A distress beacon is detected nearby. The signal is old – whatever sent it may be long gone, but the source could still hold supplies.",
    type: "supply",
    banner: stock_banner,
    rarity: "rare",
    choices: [
      {
        description: "Navigate toward the beacon source and investigate.",
        skillCheck: {
          target: "specific",
          skill: "scavenging",
          difficulty: 7,
          failEffects: {
            stock: { energy: -15 },
            stats: {
              target: "specific",
              values: { health: -10, stamina: -10 },
            },
          },
        },
        effects: {
          stock: { food: 20, water: 15, energy: 10 },
          stats: { target: "all", values: { sanity: 5 } },
        },
      },
      {
        description: "Scan the area remotely before committing.",
        effects: {
          stock: { energy: -5 },
          stats: { target: "all", values: { sanity: -5 } },
          flags: { distress_beacon_scanned: true },
        },
      },
      {
        description: "Ignore the beacon and conserve fuel.",
        effects: {
          stock: { energy: 5 },
          stats: { target: "all", values: { sanity: -10 } },
          relations: { between: "all", delta: -1 },
        },
      },
    ],
  },

  {
    id: "supply_frozen_storage",
    name: "Frozen Storage Unit",
    description:
      "A cryogenic storage unit floats nearby, still powered by a backup cell. The contents are unknown but preserved.",
    type: "supply",
    banner: stock_banner,
    rarity: "common",
    choices: [
      {
        description: "Force it open immediately.",
        skillCheck: {
          target: "specific",
          skill: "crafting",
          difficulty: 6,
          failEffects: {
            stock: { food: -10 },
            stats: { target: "specific", values: { stamina: -10 } },
          },
        },
        effects: {
          stock: { food: 30, water: 10 },
        },
      },
      {
        description: "Carefully thaw and inspect the contents first.",
        effects: {
          stock: { food: 20, water: 5 },
          stats: { target: "all", values: { sanity: 5 } },
        },
      },
      {
        description:
          "Hook it up to the ship's power grid to preserve it longer.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 7,
          failEffects: {
            stock: { energy: -15 },
          },
        },
        effects: {
          stock: { energy: -5, food: 25 },
          flags: { frozen_storage_connected: true },
        },
      },
    ],
  },

  {
    id: "supply_asteroid_mine",
    name: "Abandoned Mining Station",
    description:
      "An asteroid mining outpost shows faint life support signals. Its fuel depot may still be intact.",
    type: "supply",
    banner: stock_banner,
    rarity: "rare",
    choices: [
      {
        description: "Dock and explore the full station.",
        skillCheck: {
          target: "specific",
          skill: "scavenging",
          difficulty: 8,
          failEffects: {
            stats: {
              target: "specific",
              values: { health: -20, sanity: -10 },
            },
          },
        },
        effects: {
          stock: { energy: 40, oxygen: 15, water: 20 },
          stats: { target: "all", values: { sanity: 5 } },
        },
      },
      {
        description: "Only access the fuel depot remotely.",
        effects: {
          stock: { energy: 20 },
        },
      },
      {
        description: "Strip the station's solar panels.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 7,
          failEffects: {
            stock: { energy: -10 },
            stats: { target: "specific", values: { stamina: -15 } },
          },
        },
        effects: {
          stock: { energy: 35 },
        },
      },
      {
        description: "Leave it – the risk isn't worth it.",
        effects: {
          stats: { target: "all", values: { sanity: -5 } },
        },
      },
    ],
  },

  {
    id: "supply_water_reclaimer",
    name: "Broken Water Reclaimer",
    description:
      "The ship's secondary water reclaimer has failed. Repairing it could restore water production, but parts are scarce.",
    type: "supply",
    banner: stock_banner,
    rarity: "common",
    choices: [
      {
        description: "Attempt a full repair using spare components.",
        skillCheck: {
          target: "specific",
          skill: "crafting",
          difficulty: 8,
          failEffects: {
            stock: { water: -20, energy: -10 },
            stats: { target: "specific", values: { stamina: -15 } },
          },
        },
        effects: {
          stock: { water: 40 },
          flags: { water_reclaimer_repaired: true },
        },
      },
      {
        description: "Perform a temporary patch to buy more time.",
        effects: {
          stock: { water: 15 },
          stats: { target: "all", values: { stamina: -5 } },
        },
      },
      {
        description: "Cannibalize it for parts to fix something else.",
        effects: {
          stock: { energy: 15 },
          flags: { water_reclaimer_destroyed: true },
        },
      },
    ],
  },

  {
    id: "supply_oxygen_leak",
    name: "Oxygen Leak",
    description:
      "A slow oxygen leak has been detected in the lower deck. It's not critical yet, but it will be.",
    type: "supply",
    banner: stock_banner,
    rarity: "common",
    choices: [
      {
        description: "Seal the leak immediately.",
        skillCheck: {
          target: "specific",
          skill: "crafting",
          difficulty: 7,
          failEffects: {
            stock: { oxygen: -20 },
            stats: { target: "specific", values: { health: -10 } },
          },
        },
        effects: {
          stock: { oxygen: 10 },
          stats: { target: "all", values: { sanity: 5 } },
        },
      },
      {
        description: "Redirect oxygen flow from another section.",
        effects: {
          stock: { oxygen: -10 },
          stats: { target: "all", values: { stamina: -5 } },
        },
      },
      {
        description: "Seal off the affected deck entirely.",
        effects: {
          stock: { oxygen: 5 },
          stats: { target: "all", values: { sanity: -10 } },
          flags: { lower_deck_sealed: true },
        },
      },
    ],
  },

  {
    id: "supply_rationing_crisis",
    name: "Rationing Crisis",
    description:
      "Food supplies are running lower than expected. Someone needs to make a hard call about how rations are distributed.",
    type: "supply",
    banner: stock_banner,
    rarity: "common",
    choices: [
      {
        description: "Equal rations for everyone, no exceptions.",
        effects: {
          stock: { food: -10 },
          stats: { target: "all", values: { sanity: 5, hunger: 5 } },
          relations: { between: "all", delta: 1 },
        },
      },
      {
        description: "Prioritize those doing physical labor.",
        effects: {
          stock: { food: -5 },
          stats: { target: "all", values: { stamina: 5 } },
          relations: { between: "all", delta: -1 },
          personality: {
            target: "all",
            values: { aggression: 1 },
          },
        },
      },
      {
        description: "Cut rations by 30% across the board.",
        effects: {
          stock: { food: 20 },
          stats: { target: "all", values: { hunger: -10, sanity: -5 } },
          relations: { between: "all", delta: -2 },
        },
      },
      {
        description: "Let people manage their own portions.",
        effects: {
          stock: { food: -15 },
          stats: { target: "all", values: { sanity: -5 } },
          flags: { rationing_abandoned: true },
        },
      },
    ],
  },

  {
    id: "supply_solar_flare",
    name: "Solar Flare Warning",
    description:
      "A solar flare is approaching. The ship's energy reserves can be used to boost shields, but it will drain critical systems.",
    type: "supply",
    banner: stock_banner,
    rarity: "rare",
    choices: [
      {
        description: "Redirect full power to shields.",
        effects: {
          stock: { energy: -40 },
          stats: { target: "all", values: { sanity: 5 } },
        },
      },
      {
        description: "Partially boost shields and hope for the best.",
        effects: {
          stock: { energy: -20 },
          stats: {
            target: "all",
            values: { health: -10, stamina: -5 },
          },
        },
      },
      {
        description: "Shut down non-essential systems and ride it out.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 8,
          failEffects: {
            stock: { energy: -30 },
            stats: {
              target: "all",
              values: { health: -20, sanity: -10 },
            },
          },
        },
        effects: {
          stock: { energy: -10 },
          stats: { target: "all", values: { sanity: -5 } },
        },
      },
    ],
  },

  {
    id: "supply_hydroponics_failure",
    name: "Hydroponics Bay Failure",
    description:
      "The hydroponics bay is failing. Without intervention, the ship will lose its only source of renewable food.",
    type: "supply",
    banner: stock_banner,
    rarity: "rare",
    choices: [
      {
        description: "Divert full resources to save the hydroponics bay.",
        skillCheck: {
          target: "specific",
          skill: "crafting",
          difficulty: 9,
          failEffects: {
            stock: { food: -30, energy: -15 },
            stats: { target: "all", values: { sanity: -10 } },
          },
        },
        effects: {
          stock: { food: 20 },
          flags: { hydroponics_saved: true },
          stats: { target: "all", values: { sanity: 10 } },
        },
      },
      {
        description: "Harvest what remains before it's too late.",
        effects: {
          stock: { food: 15 },
          flags: { hydroponics_lost: true },
          stats: { target: "all", values: { sanity: -5 } },
        },
      },
      {
        description: "Attempt a partial repair to slow the decay.",
        effects: {
          stock: { food: 5, energy: -10 },
          stats: { target: "all", values: { stamina: -10 } },
        },
      },
    ],
  },

  {
    id: "supply_contaminated_water",
    name: "Contaminated Water Supply",
    description:
      "The ship's primary water supply shows signs of biological contamination. The source is unclear.",
    type: "supply",
    banner: stock_banner,
    rarity: "common",
    choices: [
      {
        description: "Purify the entire water supply immediately.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 7,
          failEffects: {
            stock: { water: -30 },
            stats: {
              target: "all",
              values: { health: -15, sanity: -5 },
            },
          },
        },
        effects: {
          stock: { water: -10 },
          flags: { water_purified: true },
          stats: { target: "all", values: { sanity: 5 } },
        },
      },
      {
        description: "Ration the remaining clean water while investigating.",
        effects: {
          stock: { water: -20 },
          stats: { target: "all", values: { hunger: -5, stamina: -5 } },
        },
      },
      {
        description: "Risk drinking the contaminated water.",
        effects: {
          stock: { water: 10 },
          stats: {
            target: "all",
            values: { health: -20, stamina: -10 },
          },
          flags: { crew_contaminated: true },
        },
      },
    ],
  },
];

export default SupplyCards;
