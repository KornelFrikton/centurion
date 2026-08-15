import type { EventCard } from "./eventcard";
import secret_banner from "../../assets/banners/secret_banner.png";

const SecretEvents: EventCard[] = [
  {
    id: "secret_confined_space",
    name: "Confined Maintenance Tunnel",
    description:
      "The only way forward is through a narrow maintenance tunnel. Someone must crawl through the cramped passage to restore access.",
    type: "secret",
    banner: secret_banner,
    rarity: "common",

    choices: [
      {
        description: "Send someone into the tunnel.",
        effects: {
          secretTrigger: {
            id: "confined_space",
            effect: {
              stats: {
                target: "specific",
                values: {
                  sanity: -15,
                },
              },
            },
          },
        },
      },
      {
        description: "Search for another route.",
        effects: {
          stock: {
            energy: -10,
          },
        },
      },
    ],
    effects: {},
  },
  {
    id: "secret_alien_spiders",
    name: "Alien Infestation",
    description:
      "Several spider-like creatures emerge from the ventilation system.",
    type: "secret",
    banner: secret_banner,
    rarity: "rare",
    choices: [
      {
        description: "Fight the creatures.",
        effects: {},
      },
    ],

    effects: {
      secretTrigger: {
        id: "spiders",
        effect: {
          stats: {
            target: "all",
            values: {
              sanity: -10,
            },
          },
        },
      },
    },
  },
  {
    id: "secret_valuable_cache",
    name: "Hidden Smuggler's Cache",
    description:
      "Behind a sealed maintenance panel you discover a hidden cache of valuable supplies. Taking everything would leave little for anyone else.",

    type: "secret",
    banner: secret_banner,
    rarity: "common",

    choices: [
      {
        description: "Take everything you can.",
        effects: {
          stock: {
            food: 25,
            water: 15,
            energy: 10,
          },
          secretTrigger: {
            id: "valuable_loot",
            effect: {
              relations: {
                between: "all",
                delta: -1,
              },
            },
          },
        },
      },
      {
        description: "Share the supplies with the crew.",
        effects: {
          stock: {
            food: 15,
            water: 10,
          },
          relations: {
            between: "all",
            delta: 1,
          },
        },
      },
      {
        description: "Leave the cache untouched.",
        effects: {},
      },
    ],

    effects: {},
  },
];

export default SecretEvents;
