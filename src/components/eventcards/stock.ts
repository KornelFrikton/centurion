import type { EventCard } from "./eventcard";

const SupplyCards: EventCard[] = [
  {
    id: "supply_old_storage",
    name: "Elhagyott raktár",
    description:
      "Egy régi katonai raktárra bukkantatok. A készletek egy része még használható állapotban van.",
    type: "supply",
    rarity: "common",
    target: "all",
    choices: [
      {
        description: "Átkutatjátok a raktárt.",
        effects: {
          stock: {
            Food: 20,
            Water: 15,
          },
        },
      },
      {
        description: "Gyorsan továbbálltok.",
        effects: {
          stock: {
            Food: 5,
          },
        },
      },
    ],
    effects: {},
  },

  {
    id: "supply_contaminated_cache",
    name: "Fertőzött készlet",
    description:
      "Egy lezárt konténerben túlélő készletet találtok. Nem tudjátok, miért hagyták ott.",
    type: "supply",
    rarity: "random",
    target: "all",
    choices: [
      {
        description: "Felhasználjátok a használhatónak tűnő készleteket.",
        effects: {
          stock: {
            Food: 10,
            Water: 5,
          },
        },
      },
      {
        description: "Óvatosan csak a vizet veszitek el.",
        effects: {
          stock: {
            Water: 10,
          },
        },
      },
    ],
    effects: {},
  },
];

export default SupplyCards;
