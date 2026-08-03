import { type Character } from "../components/cards/charactercard";
import { type EventCard } from "../components/eventcards/eventcard";
import SecretCard from "../components/cards/secretcard";
import { applyStats, applySkills, applyPersonality } from "./characterEffects";

export function assignSecretCards(characters: Character[]): Character[] {
  return characters.map((character) => {
    const randomSecret =
      SecretCard[Math.floor(Math.random() * SecretCard.length)];

    return {
      ...character,
      secret: {
        cardId: randomSecret.id,
        revealed: false,
      },
    };
  });
}

export function applySecretTrigger(
  characters: Character[],
  trigger: {
    id: string;
    effect?: Omit<EventCard["effects"], "secretTrigger">;
  },
): Character[] {
  const affected = characters.filter(
    (character) => character.secret.cardId === trigger.id,
  );

  let updatedCharacters = characters.map((character) => {
    if (!affected.some((c) => c.id === character.id)) {
      return character;
    }

    return {
      ...character,
      secret: {
        ...character.secret,
        revealed: true,
      },
    };
  });

  if (!trigger.effect) {
    return updatedCharacters;
  }

  for (const character of affected) {
    if (trigger.effect.stats) {
      updatedCharacters = applyStats(updatedCharacters, {
        ...trigger.effect.stats,
        target: "specific",
        characterId: character.id,
      });
    }

    if (trigger.effect.skills) {
      updatedCharacters = applySkills(updatedCharacters, {
        ...trigger.effect.skills,
        target: "specific",
        characterId: character.id,
      });
    }

    if (trigger.effect.personality) {
      updatedCharacters = applyPersonality(updatedCharacters, {
        ...trigger.effect.personality,
        target: "specific",
        characterId: character.id,
      });
    }
  }

  return updatedCharacters;
}
