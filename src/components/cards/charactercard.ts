import { type BaseStats, type CharacterSkills } from "../../game/store/types";

export interface Character {
  id: string;
  name: string;
  class: string;
  description: string;
  age: number;
  avatar?: string;
  gender: "male" | "female";
  baseStats: BaseStats;

  skills: CharacterSkills;

  personality: {
    courage: number;
    trust: number;
    empathy: number;
    adaptability: number;
    aggression: number;
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
    gender: "female",
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
      courage: 0,
      trust: 0,
      empathy: 0,
      adaptability: 0,
      aggression: 0,
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
    gender: "male",
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
      courage: 0,
      trust: 0,
      empathy: 0,
      adaptability: 0,
      aggression: 0,
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
    gender: "female",
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
      courage: 0,
      trust: 0,
      empathy: 0,
      adaptability: 0,
      aggression: 0,
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
    gender: "male",
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
      courage: 0,
      trust: 0,
      empathy: 0,
      adaptability: 0,
      aggression: 0,
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
    gender: "male",
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
      courage: 0,
      trust: 0,
      empathy: 0,
      adaptability: 0,
      aggression: 0,
    },
    secret: {
      cardId: "",
      revealed: false,
    },
  },
];

export default Characters;
