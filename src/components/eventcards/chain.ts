import type { EventCard } from "./eventcard";

const ChainEvents: EventCard[] = [
  {
    id: "chain_abandoned_lab",
    name: "Abandoned Laboratory",
    description:
      "You discover an abandoned research station. The door is sealed, but the systems still have power.",

    type: "chain",
    rarity: "common",

    choices: [
      {
        description: "Force the door open.",
        followUp: "chain_lab_enter",
        effects: {
          flags: {
            opened_lab: true,
          },
        },
      },
      {
        description: "Avoid the risk and search around the station.",
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
    name: "Inside the Laboratory",
    description:
      "Inside the lab you find old research equipment and several usable components.",

    type: "technical",
    rarity: "common",

    condition: {
      requiredFlags: {
        opened_lab: true,
      },
    },

    choices: [
      {
        description: "Salvage the components.",
        effects: {
          stock: {
            parts: 5,
          },
          skills: {
            target: "all",
            values: {
              tech: 1,
            },
          },
        },
      },
      {
        description: "Attempt to restore power to the laboratory.",
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
    name: "Behind the Laboratory",
    description:
      "Behind the station you find a sealed cargo container that likely still contains supplies.",

    type: "supply",
    rarity: "common",

    condition: {
      requiredFlags: {
        avoided_lab: true,
      },
    },

    choices: [
      {
        description: "Break open the cargo container.",
        effects: {
          stock: {
            food: 10,
            water: 10,
          },
        },
      },
      {
        description: "Leave the area safely.",
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
