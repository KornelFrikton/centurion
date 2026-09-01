import { type Character } from "../components/cards/charactercard";
import { type ResolvedCharacterEffect } from "./store/types";
import { maleAvatars, femaleAvatars } from "../assets/avatars";
import { type GameState } from "./store/types";

function clampApply<T extends object>(
  current: T,
  deltas: Partial<T>,
  min: number,
  max: number,
): T {
  const result = { ...current };

  Object.entries(deltas).forEach(([key, delta]) => {
    if (typeof delta !== "number") return;

    const currentValue = (current[key as keyof T] as number) ?? 0;

    result[key as keyof T] = Math.min(
      max,
      Math.max(min, currentValue + delta),
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
          [field]: clampApply(
            character[field],
            effect.values,
            0,
            field === "baseStats" ? 100 - Math.abs(character.age - 40) : 10,
          ),
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

export function assignAvatars(characters: Character[]): Character[] {
  const used = new Set<string>();

  return characters.map((character) => {
    const pool = character.gender === "female" ? femaleAvatars : maleAvatars;

    let avatar: string;
    do {
      avatar = pool[Math.floor(Math.random() * pool.length)];
    } while (used.has(avatar) && used.size < pool.length);

    used.add(avatar);

    return {
      ...character,
      avatar,
    };
  });
}

export function calculateAge(birthday: Date, currentDate: Date): number {
  let age = currentDate.getFullYear() - birthday.getFullYear();
  const monthDiff = currentDate.getMonth() - birthday.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && currentDate.getDate() < birthday.getDate())
  ) {
    age--;
  }
  return age;
}

export function applyResourceEffects(state: GameState): Partial<GameState> {
  const oxygen = state.items.find((i) => i.name === "Oxygen")?.quantity ?? 0;

  if (oxygen <= 0) {
    return {
      characters: state.characters.map((c) => ({
        ...c,
        baseStats: {
          ...c.baseStats,
          health: state.selectedCharacterIds.includes(c.id)
            ? 0
            : c.baseStats.health,
        },
      })),
    };
  }
  return {};
}
