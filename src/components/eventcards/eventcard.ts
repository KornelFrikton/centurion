import type { Character } from "../cards/charactercard";

export interface EventCard {
  id: string;
  name: string;
  description: string;
  type: "technical" | "emotional" | "secret" | "supply" | "chain";
  rarity?: "common" | "rare" | "legendary";
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
    skillCheck?: {
      target: "random" | "best" | "selected";
      skill: keyof Character["skills"];
      difficulty: number;
      failEffects?: EventCard["effects"];
    };
    effects: EventCard["effects"];
    followUp?: EventCard["id"] | null;
  }[];
  effects: {
    stats?: {
      target: "all" | "random" | "specific";
      characterId?: Character["id"];
      values: Partial<Character["baseStats"]>;
    };
    stock?: Partial<Record<string, number>>;
    skills?: {
      target: "all" | "random" | "specific";
      characterId?: Character["id"];
      values: Partial<Character["skills"]>;
    };
    personality?: {
      target: "all" | "random" | "specific";
      characterId?: Character["id"];
      values: Partial<Character["personality"]>;
    };
    relations?: {
      between: "all" | [Character["id"], Character["id"]];
      delta: number;
    };
    flags?: Record<string, boolean>;
    secretTrigger?: {
      id: string;
      effect: Omit<EventCard["effects"], "secretTrigger">;
    };
  };
}
