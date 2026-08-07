import { type Character } from "../components/cards/charactercard";
import { type EventCard } from "../components/eventcards/eventcard";
import type { Item } from "../components/cards/stock";
import type {
  CharacterEffect,
  ResolvedCharacterEffect,
  GameStore,
  CharacterPersonality,
} from "./store/types";
import { applyPersonality, applySkills, applyStats } from "./characterEffects";
import { updateRelations } from "./relations";
import { applySecretTrigger } from "./secretEffects";
import EventCards from "../components/eventcards/event";

export function resolveEffectTarget<T extends object>(
  characters: Character[],
  effect: CharacterEffect<T>,
): ResolvedCharacterEffect<T> {
  if (effect.target === "random") {
    const random = characters[Math.floor(Math.random() * characters.length)];

    return {
      ...effect,
      target: "specific",
      characterId: random.id,
    };
  }
  return {
    ...effect,
    target: effect.target as "all" | "specific",
  };
}

export function performSkillCheck(
  characters: Character[],
  check: NonNullable<EventCard["choices"][number]["skillCheck"]>,
  characterId?: string,
): {
  success: boolean;
  character: string;
  characterId: string;
  skill: keyof Character["skills"];
  difficulty: number;
  roll: number;
  total: number;
} {
  let candidates: Character[] = [];

  switch (check.target) {
    case "specific":
      candidates = characters.filter((c) => c.id === characterId);
      break;

    case "random":
      candidates = [characters[Math.floor(Math.random() * characters.length)]];
      break;

    case "all":
      candidates = characters;
      break;
  }

  const character = candidates[0];

  if (!character) {
    return {
      success: false,
      character: "none",
      characterId: "none",
      skill: check.skill,
      roll: 0,
      total: 0,
      difficulty: check.difficulty,
    };
  }

  const roll = Math.floor(Math.random() * 10) + 1;
  const total = character.skills[check.skill] + roll;

  return {
    success: total >= check.difficulty,
    character: character.name,
    characterId: character.id,
    skill: check.skill,
    roll,
    total,
    difficulty: check.difficulty,
  };
}

export function computeEventResolution(
  event: EventCard,
  choiceIndex: number,
  state: Pick<GameStore, "characters" | "relations" | "items" | "flags">,
  characterId?: string,
): Partial<GameStore> {
  let updates: Partial<GameStore> = {
    eventHistory: [
      ...(state as GameStore).eventHistory,
      { eventId: event.id, choiceIndex },
    ],
  };

  let characters = state.characters;
  let relations = state.relations;
  let items = state.items;

  const choice = event.choices[choiceIndex];
  let effects = {
    ...event.effects,
    ...choice.effects,
  };

  let skillCheckResult:
    | {
        success: boolean;
        character: string;
        skill: string;
        roll: number;
        total: number;
        difficulty: number;
      }
    | undefined;

  if (choice.skillCheck) {
    skillCheckResult = performSkillCheck(
      state.characters,
      choice.skillCheck,
      characterId,
    );

    if (!skillCheckResult.success && choice.skillCheck.failEffects) {
      effects = choice.skillCheck.failEffects;
    }
  }

  let resolvedStats: CharacterEffect<Character["baseStats"]> | undefined =
    effects.stats;
  let resolvedSkills: CharacterEffect<Character["skills"]> | undefined =
    effects.skills;
  let resolvedPersonality: CharacterEffect<CharacterPersonality> | undefined =
    effects.personality;

  if (effects.stats) {
    const resolvedStatsEffect = resolveEffectTarget(characters, effects.stats);
    characters = applyStats(characters, resolvedStatsEffect);
  }

  if (effects.skills) {
    const resolvedSkillsEffect = resolveEffectTarget(
      characters,
      effects.skills,
    );
    characters = applySkills(characters, resolvedSkillsEffect);
  }

  if (effects.personality) {
    const resolvedPersonalityEffect = resolveEffectTarget(
      characters,
      effects.personality,
    );
    characters = applyPersonality(characters, resolvedPersonalityEffect);
  }

  if (effects.relations) {
    relations = updateRelations(relations, effects.relations);
  }

  if (effects.stock) {
    items = items.map((item: Item) => ({
      ...item,
      quantity: Math.max(
        0,
        Math.min(
          item.capacity,
          item.quantity + (effects.stock?.[item.name.toLowerCase()] ?? 0),
        ),
      ),
    }));
  }

  if (effects.secretTrigger) {
    characters = applySecretTrigger(characters, effects.secretTrigger);
  }

  if (effects.flags) {
    updates.flags = {
      ...state.flags,
      ...effects.flags,
    };
  }

  if (choice.followUp) {
    updates.nextEvent =
      EventCards.find((e) => e.id === choice.followUp) ?? null;
  }

  updates.pendingEvent = null;

  updates.eventResult = {
    success: skillCheckResult?.success ?? true,
    skillCheck: skillCheckResult,

    stock: effects.stock
      ? Object.entries(effects.stock).map(([item, delta]) => ({
          item,
          delta: delta ?? 0,
        }))
      : undefined,

    stats: resolvedStats
      ? Object.entries(resolvedStats.values).map(([stat, delta]) => ({
          stat,
          delta: delta ?? 0,
          target: resolvedStats.target,
          characterId: resolvedStats.characterId,
        }))
      : undefined,

    skills: resolvedSkills
      ? Object.entries(resolvedSkills.values).map(([skill, delta]) => ({
          skill,
          delta: delta ?? 0,
          target: resolvedSkills.target,
          characterId: resolvedSkills.characterId,
        }))
      : undefined,

    personality: resolvedPersonality?.values
      ? Object.entries(resolvedPersonality.values).map(([trait, delta]) => ({
          trait,
          delta: delta ?? 0,
          target: resolvedPersonality.target,
          characterId: resolvedPersonality.characterId,
        }))
      : undefined,

    relations: effects.relations
      ? [{ between: effects.relations.between, delta: effects.relations.delta }]
      : undefined,

    secrets: effects.secretTrigger
      ? [{ secretId: effects.secretTrigger.id }]
      : undefined,
  };

  updates.characters = characters;
  updates.relations = relations;
  updates.items = items;

  return updates;
}
