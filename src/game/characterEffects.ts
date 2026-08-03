import { type Character } from "../components/cards/charactercard";
import { type ResolvedCharacterEffect } from "./store/types";

function clampApply<T extends object>(
  current: T,
  deltas: Partial<T>,
  min = 0,
  max = 10,
): T {
  const result = { ...current };

  Object.entries(deltas).forEach(([key, delta]) => {
    if (typeof delta !== "number") return;

    result[key as keyof T] = Math.min(
      max,
      Math.max(min, ((current[key as keyof T] as number) ?? 0) + delta),
    ) as T[keyof T];
  });

  return result;
}

function getAffectedCharacters(
  characters: Character[],
  target: "all" | "specific",
  characterId?: string,
): Character[] {
  if (target === "all") {
    return characters;
  }

  if (target === "specific" && characterId) {
    return characters.filter((character) => character.id === characterId);
  }

  return [];
}

export function applyCharacterEffect<
  K extends "baseStats" | "skills" | "personality",
>(
  characters: Character[],
  field: K,
  effect?: ResolvedCharacterEffect<Character[K]>,
): Character[] {
  if (!effect) return characters;

  const affected = getAffectedCharacters(
    characters,
    effect.target,
    effect.characterId,
  );

  return characters.map((character) =>
    affected.some((c) => c.id === character.id)
      ? {
          ...character,
          [field]: clampApply(character[field], effect.values),
        }
      : character,
  );
}

export const applyStats = (
  chars: Character[],
  effect?: ResolvedCharacterEffect<Character["baseStats"]>,
) => applyCharacterEffect(chars, "baseStats", effect);

export const applySkills = (
  chars: Character[],
  effect?: ResolvedCharacterEffect<Character["skills"]>,
) => applyCharacterEffect(chars, "skills", effect);

export const applyPersonality = (
  chars: Character[],
  effect?: ResolvedCharacterEffect<Character["personality"]>,
) => applyCharacterEffect(chars, "personality", effect);
