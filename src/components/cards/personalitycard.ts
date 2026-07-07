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
    name: "Számító",
    description: "Hideg fejjel mérlegel, a saját érdekét nézi.",
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
    name: "Félénk",
    description: "Óvatos, visszahúzódó, nehezen bízik másokban.",
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
    name: "Merész",
    description: "Nem ismeri a félelmet, gyakran vállal kockázatot.",
    effects: {
      courage: 8,
      trust: 5,
      empathy: 2,
      adaptability: 9,
      aggression: 3,
    },
  },
];

export default PersonalityCard;
