import type { Character } from "../cards/charactercard";
import type { SecretTriggerEffect } from "../../game/store/types";

export type EventEffects = {
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
    secretTriggers?: {
      id: string;
      target: "specific" | "all";
      effect?: SecretTriggerEffect;
    }[];
  };
};

export interface EventCard {
  id: string;
  name: string;
  description: string;
  type: "technical" | "emotional" | "secret" | "supply" | "chain";
  banner?: string;
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
      target: "all" | "random" | "specific";
      skill: keyof Character["skills"];
      difficulty: number;
      failEffects?: EventEffects;
    };
    effects: EventEffects;
    followUp?: EventCard["id"] | null;
  }[];
}
