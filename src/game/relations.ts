import { type Character } from "../components/cards/charactercard";
import type { RelationMatrix } from "./store/types";

function calculateRelation(a: Character, b: Character): number {
  let score = 5;

  score += (a.personality.trust + b.personality.trust) / 10;
  score += a.personality.empathy / 5;
  score -= b.personality.aggression / 3;
  score += (b.personality.courage - 5) / 5;
  score += a.personality.adaptability / 10;

  return Math.round(Math.max(0, Math.min(10, score)) * 10) / 10;
}

export function generateRelationMatrix(
  characters: Character[],
): RelationMatrix {
  const relations: RelationMatrix = {};
  for (const character of characters) {
    relations[character.id] = {};
  }
  for (let i = 0; i < characters.length; i++) {
    for (let j = i + 1; j < characters.length; j++) {
      const a = characters[i];
      const b = characters[j];
      relations[a.id][b.id] = calculateRelation(a, b);
      relations[b.id][a.id] = calculateRelation(b, a);
    }
  }
  return relations;
}

export function updateRelations(
  relations: RelationMatrix,
  effects?: { between: "all" | [string, string]; delta: number },
): RelationMatrix {
  if (!effects) return relations;

  const newRelations = { ...relations };
  if (effects.between === "all") {
    Object.keys(newRelations).forEach((a) => {
      Object.keys(newRelations[a]).forEach((b) => {
        newRelations[a][b] = Math.min(
          10,
          Math.max(0, newRelations[a][b] + effects.delta),
        );
      });
    });
  } else {
    const [a, b] = effects.between;
    if (newRelations[a]?.[b] !== undefined) {
      newRelations[a][b] = Math.min(
        10,
        Math.max(0, newRelations[a][b] + effects.delta),
      );
    } else if (newRelations[b]?.[a] !== undefined) {
      newRelations[b][a] = Math.min(
        10,
        Math.max(0, newRelations[b][a] + effects.delta),
      );
    }
  }
  return newRelations;
}
