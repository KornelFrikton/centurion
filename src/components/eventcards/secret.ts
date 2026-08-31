import type { EventCard } from "./eventcard";
import secret_banner from "../../assets/banners/secret_banner.png";

const SecretEvents: EventCard[] = [
  {
    id: "secret_confined_space",
    name: "Collapsed Corridor",
    description:
      "A support beam has given way, blocking the main corridor. The only way through is a narrow gap barely wide enough for a person.",
    type: "secret",
    banner: secret_banner,
    rarity: "common",

    choices: [
      {
        description: "Squeeze through the gap yourself.",
        skillCheck: {
          target: "specific",
          skill: "stealth",
          difficulty: 6,
          failEffects: {
            stats: {
              target: "specific",
              values: { stamina: -20, health: -10 },
            },
          },
        },
        effects: {
          secretTriggers: [
            {
              id: "confined_space",
              target: "specific",
              effect: {
                personality: { values: { courage: -3 } },
                stats: { values: { stamina: -8 } },
              },
            },
          ],
        },
      },
      {
        description: "Clear debris with tools instead — slower, but safer.",
        effects: {
          stock: { energy: -10 },
        },
      },
      {
        description: "Abandon this route entirely and reroute the crew.",
        effects: {
          stock: { energy: -20 },
          stats: {
            target: "all",
            values: { stamina: -5 },
          },
        },
      },
    ],

    effects: {},
  },

  {
    id: "secret_system_lockdown",
    name: "Emergency Lockdown",
    description:
      "A hull sensor malfunction triggers a full emergency lockdown. Bulkheads seal across the ship, trapping crew members wherever they happen to be standing.",
    type: "secret",
    banner: secret_banner,
    rarity: "rare",

    choices: [
      {
        description: "Force an override from the nearest terminal.",
        skillCheck: {
          target: "random",
          skill: "tech",
          difficulty: 8,
          failEffects: {
            stats: {
              target: "all",
              values: { sanity: -6, hunger: -5 },
            },
          },
        },
        effects: {
          secretTriggers: [
            {
              id: "system_lockdown",
              target: "all",
              effect: {
                personality: { values: { trust: -4 } },
              },
            },
          ],
        },
      },
      {
        description: "Sit tight and wait for the system to reset itself.",
        effects: {
          stats: {
            target: "all",
            values: { hunger: -8 },
          },
        },
      },
      {
        description: "Communicate through the vents to keep everyone calm.",
        skillCheck: {
          target: "specific",
          skill: "leadership",
          difficulty: 5,
          failEffects: {
            relations: { between: "all", delta: -2 },
          },
        },
        effects: {
          relations: { between: "all", delta: 2 },
        },
      },
    ],

    effects: {},
  },

  {
    id: "secret_valuable_cache",
    name: "Hidden Smuggler's Cache",
    description:
      "Behind a sealed panel, a cache of unregistered supplies — clearly stashed by someone who didn't want it found. Taking it quietly would be easy.",
    type: "secret",
    banner: secret_banner,
    rarity: "common",

    choices: [
      {
        description: "Pocket it quietly before anyone notices.",
        skillCheck: {
          target: "specific",
          skill: "stealth",
          difficulty: 5,
          failEffects: {
            relations: {
              between: "all",
              delta: -2,
            },
          },
        },
        effects: {
          stock: { food: 15, water: 10, energy: 5 },
          secretTriggers: [
            {
              id: "valuable_loot",
              target: "specific",
              effect: {
                personality: { values: { trust: -4, aggression: 2 } },
              },
            },
          ],
        },
      },
      {
        description: "Report it and split it fairly.",
        effects: {
          stock: { food: 15, water: 10 },
          relations: { between: "all", delta: 2 },
          personality: {
            target: "specific",
            values: { trust: 3 },
          },
        },
      },
      {
        description: "Leave it sealed — not worth the risk.",
        effects: {},
      },
      {
        description: "Trade part of it to another crew member for a favor.",
        effects: {
          stock: { food: 10, water: 5 },
          secretTriggers: [
            {
              id: "valuable_loot",
              target: "specific",
              effect: {
                relations: { between: "all", delta: -1 },
                personality: { values: { trust: 2 } },
              },
            },
          ],
        },
      },
    ],

    effects: {},
  },

  {
    id: "secret_dwindling_supplies",
    name: "Failing Rations",
    description:
      "The hydroponics bay has failed. Food stores won't last as long as planned, and someone needs to decide how the shortage is handled.",
    type: "secret",
    banner: secret_banner,
    rarity: "common",

    choices: [
      {
        description: "Cut everyone's rations equally.",
        effects: {
          stats: {
            target: "all",
            values: { hunger: -15 },
          },
          secretTriggers: [
            {
              id: "resource_shortage",
              target: "all",
              effect: {
                personality: { values: { aggression: 3 } },
              },
            },
          ],
        },
      },
      {
        description: "Quietly skip your own meals to stretch supplies further.",
        effects: {
          stats: {
            target: "specific",
            values: { hunger: -25, stamina: -10 },
          },
          relations: { between: "all", delta: 2 },
        },
      },
      {
        description: "Try to repair the hydroponics bay instead.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 7,
          failEffects: {
            stats: { target: "all", values: { hunger: -10 } },
          },
        },
        effects: {
          stock: { food: 10 },
        },
      },
    ],

    effects: {},
  },

  {
    id: "secret_identity_check",
    name: "Routine Identity Verification",
    description:
      "Command orders a full identity and background sweep — standard procedure after the last incident, but no one seems thrilled about it.",
    type: "secret",
    banner: secret_banner,
    rarity: "common",

    choices: [
      {
        description: "Comply and let the scan run.",

        effects: {
          relations: { between: "all", delta: -3 },
          personality: { target: "all", values: { trust: -5 } },
        },
      },
      {
        description: "Tamper with the terminal to skip your entry.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 8,
          failEffects: {
            relations: { between: "all", delta: -4 },
            flags: { crew_suspects_tampering: true },
          },
        },
        effects: {
          flags: { identity_check_bypassed: true },
        },
      },
      {
        description: "Confront command about the necessity of the scan.",
        skillCheck: {
          target: "specific",
          skill: "leadership",
          difficulty: 6,
          failEffects: {
            relations: { between: "all", delta: -2 },
          },
        },
        effects: {
          flags: { identity_check_delayed: true },
        },
      },
    ],

    effects: {},
  },

  {
    id: "secret_crew_decision",
    name: "Difficult Crew Vote",
    description:
      "The ship is at a fork: two possible routes, each with real risk. The crew has to decide together, and tempers are already rising.",
    type: "secret",
    banner: secret_banner,
    rarity: "common",

    choices: [
      {
        description: "Push for an open vote.",
        skillCheck: {
          target: "specific",
          skill: "leadership",
          difficulty: 6,
          failEffects: {
            relations: { between: "all", delta: -3 },
          },
        },
        effects: {
          secretTriggers: [
            {
              id: "crew_decision",
              target: "all",
              effect: {
                personality: { values: { aggression: 3, trust: -3 } },
              },
            },
          ],
        },
      },
      {
        description: "Let the captain decide alone to avoid conflict.",
        effects: {
          relations: { between: "all", delta: -1 },
          personality: {
            target: "specific",
            values: { adaptability: -3 },
          },
        },
      },
      {
        description: "Propose a compromise route that satisfies no one fully.",
        skillCheck: {
          target: "specific",
          skill: "leadership",
          difficulty: 7,
          failEffects: {
            relations: { between: "all", delta: -2 },
          },
        },
        effects: {
          relations: { between: "all", delta: 1 },
        },
      },
    ],

    effects: {},
  },

  {
    id: "secret_medical_exam",
    name: "Mandatory Medical Checkup",
    description:
      "The ship's medic wants a full checkup on every crew member before the next stretch of the journey. Some are more eager than others.",
    type: "secret",
    banner: secret_banner,
    rarity: "common",

    choices: [
      {
        description: "Go through with the full exam.",
        effects: {
          secretTriggers: [
            {
              id: "medical_exam",
              target: "specific",
              effect: {
                stats: { values: { sanity: -5 } },
              },
            },
          ],
        },
      },
      {
        description: "Fake a clean bill of health.",
        skillCheck: {
          target: "specific",
          skill: "stealth",
          difficulty: 6,
          failEffects: {
            relations: { between: "all", delta: -3 },
            flags: { medical_lie_exposed: true },
          },
        },
        effects: {
          flags: { medical_exam_faked: true },
        },
      },
      {
        description: "Ask the medic to keep the results private.",
        skillCheck: {
          target: "specific",
          skill: "leadership",
          difficulty: 5,
          failEffects: {
            relations: { between: "all", delta: -2 },
          },
        },
        effects: {
          personality: {
            target: "specific",
            values: { trust: 2 },
          },
        },
      },
    ],

    effects: {},
  },

  {
    id: "secret_crew_death",
    name: "A Crewmate Lost",
    description:
      "One of the crew didn't make it. The ship goes quiet as the rest try to process it, each in their own way, while the mission still has to continue.",
    type: "secret",
    banner: secret_banner,
    rarity: "legendary",

    choices: [
      {
        description: "Hold a proper memorial before moving on.",
        skillCheck: {
          target: "specific",
          skill: "leadership",
          difficulty: 5,
          failEffects: {
            stats: { target: "all", values: { sanity: -8 } },
          },
        },
        effects: {
          relations: { between: "all", delta: 2 },
        },
      },
      {
        description: "Move on immediately — there's no time to grieve.",
        effects: {
          stats: {
            target: "all",
            values: { sanity: -12 },
          },
          relations: { between: "all", delta: -2 },
        },
      },
      {
        description: "Salvage what you can from their belongings first.",
        effects: {
          stock: { food: 5, energy: 5 },
          relations: { between: "all", delta: -3 },
          personality: {
            target: "specific",
            values: { empathy: -3 },
          },
        },
      },
    ],

    effects: {
      secretTriggers: [
        {
          id: "crew_death",
          target: "all",
          effect: {
            personality: { values: { empathy: -4, aggression: 2 } },
          },
        },
      ],
    },
  },

  {
    id: "secret_night_shift",
    name: "Long Night Shift",
    description:
      "The ship is silent except for the hum of the reactor. Someone has to sit alone in the dark, watching the instruments until dawn cycle.",
    type: "secret",
    banner: secret_banner,
    rarity: "common",

    choices: [
      {
        description: "Take the shift alone.",
        effects: {
          secretTriggers: [
            {
              id: "night_shift",
              target: "specific",
              effect: {
                stats: { values: { sanity: -10, stamina: -8 } },
                skills: { values: { tech: -2 } },
              },
            },
          ],
        },
      },
      {
        description: "Ask someone to keep you company.",
        effects: {
          stock: { energy: -5 },
          relations: { between: "all", delta: 2 },
        },
      },
      {
        description: "Rig an automated alarm and sleep anyway.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 6,
          failEffects: {
            stats: { target: "all", values: { sanity: -6 } },
          },
        },
        effects: {
          stats: {
            target: "specific",
            values: { stamina: 3 },
          },
        },
      },
    ],

    effects: {},
  },

  {
    id: "secret_family_transmission",
    name: "Transmission from Home",
    description:
      "A garbled burst transmission breaks through the static — fragments of voices and names from Earth, barely legible over the noise.",
    type: "secret",
    banner: secret_banner,
    rarity: "rare",

    choices: [
      {
        description: "Stay and listen to the whole thing.",
        effects: {
          secretTriggers: [
            {
              id: "family_mention",
              target: "specific",
              effect: {
                stats: { values: { sanity: -10 } },
                personality: { values: { empathy: 5, adaptability: -4 } },
              },
            },
          ],
        },
      },
      {
        description: "Cut the signal and walk away.",
        effects: {
          stock: { energy: -5 },
          personality: {
            target: "specific",
            values: { adaptability: 2 },
          },
        },
      },
      {
        description: "Try to clean up the signal for a clearer message.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 7,
          failEffects: {
            stock: { energy: -10 },
          },
        },
        effects: {
          secretTriggers: [
            {
              id: "family_mention",
              target: "specific",
              effect: {
                stats: { values: { sanity: -10 } },
              },
            },
          ],
        },
      },
      {
        description: "Share the transmission with the whole crew.",
        effects: {
          relations: { between: "all", delta: 1 },
          stats: {
            target: "all",
            values: { sanity: -5 },
          },
        },
      },
    ],

    effects: {},
  },
];

export default SecretEvents;
