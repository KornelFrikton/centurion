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

const People: Character[] = [
  {
    id: "char01",
    name: "Bela",
    class: "soldier",
    description: "Lángokban ég az éle.",
    age: 0,
    baseStats: {
      health: 80, // életerő
      stamina: 80, // fizikai terhelhetőség
      sanity: 80, // mentális állapot (túlélőknél kulcs!)
      hunger: 20, // éhség
    },
    skills: {
      // Túlélés
      scavenging: 5, // romokban kutatás, loot találás
      crafting: 3, // tárgyak készítése, javítása

      // Harc
      combat: 9, // közeli harc
      stealth: 3, // lopakodás, elkerülés

      // Sci-fi specifikus
      tech: 5, // gépek, elektronika, hackelés
      leadership: 4, // csoport moral, parancsok hatékonysága
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
    name: "Zoli",
    class: "engineer",
    description: "A gépész az élet megóválja.",
    age: 0,
    baseStats: {
      health: 80, // életerő
      stamina: 80, // fizikai terhelhetőség
      sanity: 80, // mentális állapot (túlélőknél kulcs!)
      hunger: 20, // éhség
    },
    skills: {
      // Túlélés
      scavenging: 3, // romokban kutatás, loot találás
      crafting: 8, // tárgyak készítése, javítása

      // Harc
      combat: 5, // közeli harc
      stealth: 3, // lopakodás, elkerülés

      // Sci-fi specifikus
      tech: 9, // gépek, elektronika, hackelés
      leadership: 4, // csoport moral, parancsok hatékonysága
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
    name: "Andi",
    class: "orvos",
    description: "Minden nap egy alma.",
    age: 0,
    baseStats: {
      health: 80, // életerő
      stamina: 80, // fizikai terhelhetőség
      sanity: 80, // mentális állapot (túlélőknél kulcs!)
      hunger: 20, // éhség
    },
    skills: {
      // Túlélés
      scavenging: 4, // romokban kutatás, loot találás
      crafting: 7, // tárgyak készítése, javítása

      // Harc
      combat: 3, // közeli harc
      stealth: 3, // lopakodás, elkerülés

      // Sci-fi specifikus
      tech: 9, // gépek, elektronika, hackelés
      leadership: 5, // csoport moral, parancsok hatékonysága
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

export default People;
