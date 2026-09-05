import type { Character } from "../cards/charactercard";

export interface Personality {
  id: string;
  name: string;
  description: string;
  effects: Character["personality"];
}

const Personalities: Personality[] = [
  {
    id: "card_calculated",
    name: "Calculated",
    description:
      "Cold and rational, carefully weighs every decision and prioritizes personal survival.",
    effects: {
      courage: 3,
      trust: 0,
      empathy: 1,
      adaptability: 8,
      aggression: 2,
    },
  },
  {
    id: "card_timid",
    name: "Timid",
    description:
      "Cautious and reserved, struggles to trust others and avoids unnecessary risks.",
    effects: {
      courage: 2,
      trust: 1,
      empathy: 6,
      adaptability: 1,
      aggression: 0,
    },
  },
  {
    id: "card_bold",
    name: "Bold",
    description:
      "Fearless and willing to take risks, even when the odds are against them.",
    effects: {
      courage: 8,
      trust: 5,
      empathy: 2,
      adaptability: 9,
      aggression: 3,
    },
  },
  {
    id: "card_analytical",
    name: "Analytical",
    description:
      "Follows logic and data over emotions, always searching for the most efficient solution.",
    effects: {
      courage: 5,
      trust: 4,
      empathy: 3,
      adaptability: 8,
      aggression: 1,
    },
  },
  {
    id: "card_paranoid",
    name: "Paranoid",
    description:
      "Always expects danger and struggles to trust other people's intentions.",
    effects: {
      courage: 5,
      trust: 0,
      empathy: 2,
      adaptability: 4,
      aggression: 6,
    },
  },
  {
    id: "card_leader",
    name: "Leader",
    description:
      "A natural commander who makes decisions and keeps the crew together.",
    effects: {
      courage: 8,
      trust: 7,
      empathy: 7,
      adaptability: 6,
      aggression: 4,
    },
  },
  {
    id: "card_empath",
    name: "Empath",
    description:
      "Deeply attuned to others' emotions, often sacrifices personal needs for the group.",
    effects: {
      courage: 4,
      trust: 8,
      empathy: 10,
      adaptability: 5,
      aggression: 0,
    },
  },
  {
    id: "card_survivalist",
    name: "Survivalist",
    description:
      "Ruthlessly focused on survival at any cost. Will do what others won't.",
    effects: {
      courage: 7,
      trust: 1,
      empathy: 0,
      adaptability: 9,
      aggression: 7,
    },
  },
  {
    id: "card_broken",
    name: "Broken",
    description:
      "Shattered by past trauma. Barely functional, unpredictable under pressure.",
    effects: {
      courage: 1,
      trust: 1,
      empathy: 3,
      adaptability: 2,
      aggression: 8,
    },
  },
  {
    id: "card_idealist",
    name: "Idealist",
    description:
      "Believes in doing what's right, even when it's costly. Refuses to compromise morals.",
    effects: {
      courage: 7,
      trust: 8,
      empathy: 8,
      adaptability: 3,
      aggression: 1,
    },
  },
  {
    id: "card_manipulator",
    name: "Manipulator",
    description:
      "Skilled at reading people and bending situations to their advantage. Trust is a tool.",
    effects: {
      courage: 5,
      trust: 0,
      empathy: 6,
      adaptability: 9,
      aggression: 4,
    },
  },
  {
    id: "card_nihilist",
    name: "Nihilist",
    description:
      "Sees no point in survival or cooperation. Acts unpredictably, nothing truly matters.",
    effects: {
      courage: 6,
      trust: 0,
      empathy: 0,
      adaptability: 5,
      aggression: 9,
    },
  },
  {
    id: "card_protector",
    name: "Protector",
    description:
      "Will sacrifice everything to keep others safe. Puts the group above themselves always.",
    effects: {
      courage: 9,
      trust: 7,
      empathy: 8,
      adaptability: 5,
      aggression: 5,
    },
  },
  {
    id: "card_coward",
    name: "Coward",
    description:
      "Flees from danger and responsibility. Self-preservation overrides everything else.",
    effects: {
      courage: 0,
      trust: 2,
      empathy: 4,
      adaptability: 6,
      aggression: 1,
    },
  },
  {
    id: "card_fanatic",
    name: "Fanatic",
    description:
      "Driven by an obsessive belief or mission. Extreme dedication, zero compromise.",
    effects: {
      courage: 10,
      trust: 3,
      empathy: 1,
      adaptability: 1,
      aggression: 8,
    },
  },
  {
    id: "card_stoic",
    name: "Stoic",
    description:
      "Emotionally detached, endures hardship without complaint. Reliable but distant.",
    effects: {
      courage: 7,
      trust: 4,
      empathy: 2,
      adaptability: 7,
      aggression: 2,
    },
  },
  {
    id: "card_opportunist",
    name: "Opportunist",
    description:
      "Always looking for personal gain. Loyal only when it benefits them.",
    effects: {
      courage: 5,
      trust: 1,
      empathy: 2,
      adaptability: 10,
      aggression: 5,
    },
  },
  {
    id: "card_martyr",
    name: "Martyr",
    description:
      "Seeks to suffer for others. Guilt-driven, often makes unnecessary sacrifices.",
    effects: {
      courage: 8,
      trust: 6,
      empathy: 9,
      adaptability: 3,
      aggression: 0,
    },
  },
];

export default Personalities;
