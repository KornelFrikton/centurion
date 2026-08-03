import { type EventCard } from "../../components/eventcards/eventcard";
import type { Character } from "../../components/cards/charactercard";
import type { Item } from "../../components/cards/stock";

export type RelationMatrix = {
  [key: string]: {
    [key: string]: number;
  };
};

export type CharacterEffect<T> = {
  target: "all" | "random" | "specific";
  characterId?: string;
  values: Partial<T>;
};

export type ResolvedCharacterEffect<T> = Omit<CharacterEffect<T>, "target"> & {
  target: "all" | "specific";
};

export type GameStore = {
  date: Date;
  elapsed: number;
  lastTurn: number;
  characters: Character[];
  items: Item[];
  relations: RelationMatrix;
  selectedCharacterIds: string[];
  flags: Record<string, boolean>;
  eventResult: {
    success?: boolean;
    stock?: { item: string; delta: number }[];
    stats?: {
      characterId?: string;
      stat: string;
      delta: number;
      target: "all" | "random" | "specific";
    }[];
    skills?: {
      skill: string;
      delta: number;
      target: "all" | "random" | "specific";
      characterId?: string;
    }[];
    personality?: {
      trait: string;
      delta: number;
      target: "all" | "random" | "specific";
      characterId?: string;
    }[];
    relations?: { between: "all" | [string, string]; delta: number }[];
    secrets?: { secretId: string }[];
    skillCheck?: {
      success: boolean;
      character: string;
      skill: string;
      roll: number;
      total: number;
      difficulty: number;
    };
  } | null;
  nextEvent: EventCard | null;
  eventHistory: { eventId: string; choiceIndex: number }[];
  gamePhase: "crewSelection" | "characterSetup" | "mission";

  endTurn: () => void;
  generateRelations: () => void;
  updateRelation: (a: string, b: string, delta: number) => void;
  drawPersonality: (id: string) => void;
  selectCharacter: (id: string) => void;
  generateAge: (id: string) => void;
  pendingEvent: EventCard | null;
  continueEvent: () => void;
  drawEvent: () => void;
  resolveEvent: (choiceIndex: number, characterId?: string) => void;
  startCrew: () => void;
  startMission: () => void;

  getProduction: (resourceId: string) => number;
  getConsumption: (resourceId: string) => number;
};
