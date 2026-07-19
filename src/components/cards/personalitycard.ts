import type { Character } from "../cards/charactercard";

export interface Personality {
  id: string;
  name: string;
  description: string;
  effects: Character["personality"];
}

const PersonalityCard: Personality[] = [
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
];

export default PersonalityCard;
