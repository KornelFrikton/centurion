import type { EventCard } from "./eventcard";

const ChainEvents: EventCard[] = [
  {
    id: "chain_abandoned_lab",
    name: "Elhagyott laboratórium",
    description:
      "Egy régi kutatóállomást találtok. Az ajtó zárva van, de még van áram a rendszerben.",

    type: "chain",
    rarity: "common",
    target: "all",

    choices: [
      {
        description: "Megpróbáljátok feltörni az ajtót.",
        followUp: "chain_lab_enter",
        effects: {
          flags: {
            opened_lab: true,
          },
        },
      },
      {
        description: "Nem kockáztattok, inkább körbejárjátok az épületet.",
        followUp: "chain_lab_outside",
        effects: {
          flags: {
            avoided_lab: true,
          },
        },
      },
    ],

    effects: {},
  },

  {
    id: "chain_lab_enter",
    name: "A labor belseje",
    description:
      "A laborban régi kutatási eszközöket és használható alkatrészeket találtok.",

    type: "technical",
    rarity: "random",
    target: "all",

    condition: {
      requiredFlags: {
        opened_lab: true,
      },
    },

    choices: [
      {
        description: "Kimentitek az alkatrészeket.",
        effects: {
          stock: {
            parts: 5,
          },
          skills: {
            tech: 1,
          },
        },
      },
      {
        description: "Megpróbáljátok újraindítani a rendszert.",
        effects: {
          flags: {
            lab_power_restored: true,
          },
        },
      },
    ],

    effects: {},
  },

  {
    id: "chain_lab_outside",
    name: "A labor hátulja",
    description:
      "A labor mögött egy lezárt szállítmányt találtok. Valószínűleg még tartalmaz készleteket.",

    type: "supply",
    rarity: "random",
    target: "all",

    condition: {
      requiredFlags: {
        avoided_lab: true,
      },
    },

    choices: [
      {
        description: "Feltöritek a szállítmányt.",
        effects: {
          stock: {
            food: 10,
            water: 10,
          },
        },
      },
      {
        description: "Biztonságosan elhagyjátok a területet.",
        effects: {
          relations: {
            between: "all",
            delta: 1,
          },
        },
      },
    ],

    effects: {},
  },
];
export default ChainEvents;
