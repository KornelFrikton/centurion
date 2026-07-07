import type { Character } from "../cards/charactercard";

export interface EventCard {
  id: string;
  name: string;
  description: string;
  type: "technical" | "emotional" | "secret" | "supply" | "chain";
  rarity?: "common" | "random" | "legendary";
  target?: "all" | "random" | "specific";
  condition?: {
    requiredFlags?: Record<string, boolean>;
    requiredEvent?: string;
    minStock?: number;
    minSanity?: number;
    minHealth?: number;
    minRelation?: number;
    requiredChoice?: string;
  };
  choices: {
    description: string;
    effects: EventCard["effects"];
    followUp?: EventCard["id"] | null;
  }[];
  effects: {
    stats?: Partial<Character["baseStats"]>;
    stock?: Partial<Record<string, number>>;
    skills?: Partial<Character["skills"]>;
    personality?: Partial<Character["personality"]>;
    relations?: {
      between: "all" | [Character["id"], Character["id"]];
      delta: number;
    };
    flags?: Record<string, boolean>;
    revealSecret?: string;
  };
}
