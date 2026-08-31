import {
  type BaseStats,
  type CharacterSkills,
  type CharacterPersonality,
} from "../../game/store/types";

export interface Character {
  id: string;
  name: string;
  class: string;
  description: string;
  birthday: string;
  age: number;
  avatar?: string;
  gender: "male" | "female";
  baseStats: BaseStats;

  skills: CharacterSkills;

  personality: CharacterPersonality;

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
      "Grew up tending her grandmother's rooftop garden back on a crowded space station, and never lost her fascination with things that grow. Quiet, patient, happiest with dirt under her fingernails.",
    birthday: "",
    age: 0,
    gender: "female",
    baseStats: {
      health: 80,
      stamina: 80,
      sanity: 80,
      hunger: 0,
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
      "Self-taught tinkerer who fixed farm equipment before he ever touched a spaceship. Talks to broken machines like old friends and has a habit of collecting spare parts nobody else thinks are worth keeping.",
    birthday: "",
    age: 0,
    gender: "male",
    baseStats: {
      health: 80,
      stamina: 80,
      sanity: 80,
      hunger: 0,
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
    class: "Family Doctor",
    description:
      "Ran a small community clinic for over a decade before volunteering for the mission. Known for remembering everyone's name and worrying about them slightly too much.",
    birthday: "",
    age: 0,
    gender: "female",
    baseStats: {
      health: 80,
      stamina: 80,
      sanity: 80,
      hunger: 0,
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
      "Spent his career studying rocks nobody else cared about and is thrilled to finally study rocks nobody has ever seen. Absent-minded, endlessly curious, keeps a pocket full of samples.",
    birthday: "",
    age: 0,
    gender: "male",
    baseStats: {
      health: 80,
      stamina: 80,
      sanity: 80,
      hunger: 0,
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
    class: "Carpenter",
    description:
      "Built houses and furniture with his hands long before he built anything for a colony. Steady, practical, the kind of person who measures twice and still checks a third time.",
    birthday: "",
    age: 0,
    gender: "male",
    baseStats: {
      health: 80,
      stamina: 80,
      sanity: 80,
      hunger: 0,
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
  {
    id: "char06",
    name: "Elena Rodriguez",
    class: "Cargo Pilot",
    description:
      "Flew supply routes between continents for years, more comfortable behind a control panel than on solid ground. Blunt, funny, terrible at sitting still.",
    age: 0,
    birthday: "",
    gender: "female",
    baseStats: {
      health: 80,
      stamina: 80,
      sanity: 80,
      hunger: 0,
    },
    skills: {
      scavenging: 5,
      crafting: 4,
      combat: 2,
      stealth: 4,
      tech: 8,
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
    id: "char07",
    name: "Marcus Webb",
    class: "Park Ranger",
    description:
      "Spent his life protecting wilderness back home and tracking wildlife most people never saw. Calm under pressure, more interested in understanding a threat than fighting it.",
    age: 0,
    birthday: "",
    gender: "male",
    baseStats: {
      health: 80,
      stamina: 80,
      sanity: 80,
      hunger: 0,
    },
    skills: {
      scavenging: 7,
      crafting: 3,
      combat: 6,
      stealth: 7,
      tech: 2,
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
    id: "char08",
    name: "Samuel Okafor",
    class: "Chef",
    description:
      "Ran a tiny neighborhood restaurant for twenty years and can make a real meal out of almost nothing. Warm, talkative, believes half of keeping people alive is keeping them fed well.",
    age: 0,
    birthday: "",
    gender: "male",
    baseStats: {
      health: 80,
      stamina: 80,
      sanity: 80,
      hunger: 0,
    },
    skills: {
      scavenging: 3,
      crafting: 6,
      combat: 3,
      stealth: 5,
      tech: 9,
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
    id: "char09",
    name: "Isabelle Moreau",
    class: "Teacher",
    description:
      "Taught elementary school before signing up, and insisted the colony bring proper schoolbooks, not just survival manuals. Gentle but stubborn about the things she thinks matter.",
    age: 0,
    birthday: "",
    gender: "female",
    baseStats: {
      health: 80,
      stamina: 80,
      sanity: 80,
      hunger: 0,
    },
    skills: {
      scavenging: 3,
      crafting: 4,
      combat: 2,
      stealth: 5,
      tech: 5,
      leadership: 8,
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
    id: "char10",
    name: "Yuki Tanaka",
    class: "Naturalist",
    description:
      "Spent years cataloguing insects and small creatures in overlooked corners of the world, convinced nobody looks closely enough. Endlessly curious about anything alive, and utterly fearless around things that bite.",
    age: 0,
    birthday: "",
    gender: "female",
    baseStats: {
      health: 80,
      stamina: 80,
      sanity: 80,
      hunger: 0,
    },
    skills: {
      scavenging: 7,
      crafting: 5,
      combat: 2,
      stealth: 7,
      tech: 8,
      leadership: 3,
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
