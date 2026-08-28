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

export type BaseStats = {
  health: number;
  stamina: number;
  sanity: number;
  hunger: number;
};

export type CharacterSkills = {
  scavenging: number;
  crafting: number;
  combat: number;
  stealth: number;
  tech: number;
  leadership: number;
};

export type CharacterPersonality = {
  courage: number;
  trust: number;
  empathy: number;
  adaptability: number;
  aggression: number;
};

export type SecretTriggerEffect = {
  stats?: {
    values: Partial<BaseStats>;
  };
  skills?: {
    values: Partial<Character["skills"]>;
  };
  personality?: {
    values: Partial<CharacterPersonality>;
  };
  relations?: {
    between: string[] | "all";
    delta: number;
  };
};

export type GameState = {
  date: Date;
  elapsed: number;
  lastTurn: number;
  characters: Character[];
  items: Item[];
  relations: RelationMatrix;
  selectedCharacterIds: string[];
  flags: Record<string, boolean>;
  eventResult: {
    type: EventCard["type"];
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
    secrets?: {
      secretId: string;
      characterId: string;
      effect?: SecretTriggerEffect;
    }[];
    skillCheck?: {
      success: boolean;
      character: string;
      skill: string;
      roll: number;
      total: number;
      difficulty: number;
    };
  } | null;
  pendingSkillCheck: {
    choiceIndex: number;
    characterId: string | null;
  } | null;

  pendingEvent: EventCard | null;
  nextEvent: EventCard | null;
  eventHistory: { eventId: string; choiceIndex: number }[];
  gamePhase: "crewSelection" | "characterSetup" | "mission";
};

export type GameStore = GameState & {
  endTurn: () => void;
  generateRelations: () => void;
  updateRelation: (a: string, b: string, delta: number) => void;
  drawPersonality: (id: string) => void;
  selectCharacter: (id: string) => void;
  generateAge: (id: string) => void;
  updateAges: () => void;
  continueEvent: () => void;
  drawEvent: () => void;
  resolveEvent: (choiceIndex: number, characterId?: string) => void;
  resolveSkillCheck: (
    choiceIndex: number,
    characterId: string | undefined,
    roll: number,
  ) => void;
  advanceEvent: () => void;
  startCrew: () => void;
  startMission: () => void;
  giveUp: () => void;

  getProduction: (resourceId: string) => number;
  getConsumption: (resourceId: string) => number;
  feedCharacter: (characterId: string) => void;
};
