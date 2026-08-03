// people.ts
export interface Character {
  id: string;
  name: string;
  class: string;
  description: string;
  age: number;
  baseStats: {
    health: number;
    stamina: number;
    sanity: number;
    hunger: number;
  };

  skills: {
    scavenging: number; // loot, erőforrás keresés
    crafting: number; // tárgykészítés, javítás

    // Harc
    combat: number; // firearms + melee összevonva
    stealth: number; // lopakodás

    // Tech & szociális
    tech: number; // gépek, hackelés
    leadership: number; // vezetés, csoport hatékonyság
  };

  personality: {
    courage: number; // bátorság – veszélyes helyzetben hogy reagál (a sajátunkból)
    trust: number; // bizalom – mennyire nyitott másokra, árulás esélye (a sajátunkból)
    empathy: number; // empátia – törődés másokkal, megosztja-e a készletet (mindkettőben megvolt)
    adaptability: number; // alkalmazkodóképesség – VS Code ötlete, kifejezetten túlélős téma
    aggression: number; // agresszivitás – konfliktuskezelés (a sajátunkból)
  };

  personalityName?: string;
  personalityDescription?: string;

  secret: {
    cardId: string;
    revealed: boolean;
  };
}

const Characters: Character[] = [
  {
    id: "char01",
    name: "Anna Kovacs",
    class: "Botanist",
    description:
      "An expert in hydroponics and sustainable agriculture, responsible for establishing the colony's food production.",
    age: 0,
    baseStats: {
      health: 80,
      stamina: 80,
      sanity: 80,
      hunger: 20,
    },
    skills: {
      scavenging: 6,
      crafting: 5,
      combat: 2,
      stealth: 4,
      tech: 7,
      leadership: 5,
    },
    personality: {
      courage: 5,
      trust: 5,
      empathy: 5,
      adaptability: 5,
      aggression: 5,
    },
    secret: {
      cardId: "",
      revealed: false,
    },
  },
  {
    id: "char02",
    name: "Gabriel Foster",
    class: "Mechanical Engineer",
    description:
      "A veteran engineer capable of repairing almost any machine with limited resources.",
    age: 0,
    baseStats: {
      health: 80,
      stamina: 80,
      sanity: 80,
      hunger: 20,
    },
    skills: {
      scavenging: 5,
      crafting: 9,
      combat: 4,
      stealth: 3,
      tech: 10,
      leadership: 5,
    },
    personality: {
      courage: 5,
      trust: 5,
      empathy: 5,
      adaptability: 5,
      aggression: 5,
    },
    secret: {
      cardId: "",
      revealed: false,
    },
  },
  {
    id: "char03",
    name: "Dr. Maya Chen",
    class: "Medical Officer",
    description:
      "An emergency physician trained to keep the crew alive in the harshest environments.",
    age: 0,
    baseStats: {
      health: 80,
      stamina: 80,
      sanity: 80,
      hunger: 20,
    },
    skills: {
      scavenging: 4,
      crafting: 6,
      combat: 3,
      stealth: 4,
      tech: 8,
      leadership: 7,
    },
    personality: {
      courage: 5,
      trust: 5,
      empathy: 5,
      adaptability: 5,
      aggression: 5,
    },
    secret: {
      cardId: "",
      revealed: false,
    },
  },
  {
    id: "char04",
    name: "Ethan Brooks",
    class: "Geologist",
    description:
      "A planetary geologist specializing in locating minerals, groundwater, and safe construction sites.",
    age: 0,
    baseStats: {
      health: 80,
      stamina: 80,
      sanity: 80,
      hunger: 20,
    },
    skills: {
      scavenging: 9,
      crafting: 4,
      combat: 4,
      stealth: 5,
      tech: 6,
      leadership: 4,
    },
    personality: {
      courage: 5,
      trust: 5,
      empathy: 5,
      adaptability: 5,
      aggression: 5,
    },
    secret: {
      cardId: "",
      revealed: false,
    },
  },
  {
    id: "char05",
    name: "Daniel Carter",
    class: "Construction Specialist",
    description:
      "A structural engineer and builder responsible for assembling habitats and colony infrastructure.",
    age: 0,
    baseStats: {
      health: 80,
      stamina: 80,
      sanity: 80,
      hunger: 20,
    },
    skills: {
      scavenging: 6,
      crafting: 8,
      combat: 6,
      stealth: 3,
      tech: 5,
      leadership: 6,
    },
    personality: {
      courage: 5,
      trust: 5,
      empathy: 5,
      adaptability: 5,
      aggression: 5,
    },
    secret: {
      cardId: "",
      revealed: false,
    },
  },
];

export default Characters;
