import { type Character } from "../components/cards/charactercard";
import { type EventCard } from "../components/eventcards/eventcard";
import SecretCard from "../components/cards/secretcard";
import { applyStats, applySkills, applyPersonality } from "./characterEffects";
import type { SecretTriggerEffect } from "../game/store/types";

export function assignSecretCards(
  characters: Character[],
  selectedCharacterIds: string[],
): Character[] {
  return characters.map((character) => {
    if (!selectedCharacterIds.includes(character.id)) {
      return character;
    }

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
  triggers: NonNullable<
    EventCard["choices"][number]["effects"]["secretTriggers"]
  >,
  selectedCharacterId?: string,
): {
  characters: Character[];
  revealedSecrets: {
    secretId: string;
    characterId: string;
    effect?: SecretTriggerEffect;
  }[];
} {
  const revealedSecrets = new Map<
    string,
    {
      secretId: string;
      characterId: string;
      effect?: SecretTriggerEffect;
    }
  >();

  let updatedCharacters = characters;

  for (const trigger of triggers) {
    const affected = updatedCharacters.filter((character) => {
      if (character.secret.revealed) {
        return false;
      }

      if (
        trigger.target === "specific" &&
        character.id !== selectedCharacterId
      ) {
        return false;
      }

      const secret = SecretCard.find(
        (secretCard) => secretCard.id === character.secret.cardId,
      );

      return secret?.trigger.includes(trigger.id) ?? false;
    });

    for (const character of affected) {
      const secretId = character.secret.cardId;

      // Egy karakter/secret csak egyszer aktiválódhat
      const key = `${character.id}:${secretId}`;

      if (revealedSecrets.has(key)) {
        continue;
      }

      revealedSecrets.set(key, {
        secretId,
        characterId: character.id,
        effect: trigger.effect,
      });

      updatedCharacters = updatedCharacters.map((c) =>
        c.id === character.id
          ? {
              ...c,
              secret: {
                ...c.secret,
                revealed: true,
              },
            }
          : c,
      );

      if (trigger.effect?.stats) {
        updatedCharacters = applyStats(updatedCharacters, {
          ...trigger.effect.stats,
          target: "specific",
          characterId: character.id,
        });
      }

      if (trigger.effect?.skills) {
        updatedCharacters = applySkills(updatedCharacters, {
          ...trigger.effect.skills,
          target: "specific",
          characterId: character.id,
        });
      }

      if (trigger.effect?.personality) {
        updatedCharacters = applyPersonality(updatedCharacters, {
          ...trigger.effect.personality,
          target: "specific",
          characterId: character.id,
        });
      }
    }
  }

  return {
    characters: updatedCharacters,
    revealedSecrets: Array.from(revealedSecrets.values()),
  };
}
