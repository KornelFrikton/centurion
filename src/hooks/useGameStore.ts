import { create } from "zustand";
import { persist } from "zustand/middleware";
import Stock, { type Item } from "../components/cards/stock";
import People, { type Character } from "../components/cards/charactercard";
import PersonalityCard from "../components/cards/personalitycard";
import EventCards from "../components/eventcards/event";
import type { EventCard } from "../components/eventcards/eventcard";
import SecretCard from "../components/cards/secretcard";

type RelationMatrix = {
  [key: string]: {
    [key: string]: number;
  };
};

type CharacterEffect<T> = {
  target: "all" | "random" | "specific";
  characterId?: string;
  values: Partial<T>;
};

//helper functions to apply effects
function calculateRelation(a: Character, b: Character): number {
  let score = 5;

  score += (a.personality.trust + b.personality.trust) / 10;
  score += a.personality.empathy / 5;
  score -= b.personality.aggression / 3;
  score += (b.personality.courage - 5) / 5;
  score += a.personality.adaptability / 10;

  return Math.round(Math.max(0, Math.min(10, score)) * 10) / 10;
}

function assignSecretCards(characters: Character[]): Character[] {
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

function applySkills(
  characters: Character[],
  effect?: CharacterEffect<Character["skills"]>,
): Character[] {
  if (!effect) return characters;

  const affectedCharacters = getAffectedCharacters(
    characters,
    effect.target,
    effect.characterId,
  );

  return characters.map((character) => {
    if (!affectedCharacters.some((c) => c.id === character.id)) {
      return character;
    }

    return {
      ...character,
      skills: {
        scavenging: Math.min(
          10,
          Math.max(
            0,
            character.skills.scavenging + (effect.values.scavenging ?? 0),
          ),
        ),
        crafting: Math.min(
          10,
          Math.max(
            0,
            character.skills.crafting + (effect.values.crafting ?? 0),
          ),
        ),
        combat: Math.min(
          10,
          Math.max(0, character.skills.combat + (effect.values.combat ?? 0)),
        ),
        stealth: Math.min(
          10,
          Math.max(0, character.skills.stealth + (effect.values.stealth ?? 0)),
        ),
        tech: Math.min(
          10,
          Math.max(0, character.skills.tech + (effect.values.tech ?? 0)),
        ),
        leadership: Math.min(
          10,
          Math.max(
            0,
            character.skills.leadership + (effect.values.leadership ?? 0),
          ),
        ),
      },
    };
  });
}

function applyStats(
  characters: Character[],
  effect?: CharacterEffect<Character["baseStats"]>,
): Character[] {
  if (!effect) return characters;

  const affectedCharacters = getAffectedCharacters(
    characters,
    effect.target,
    effect.characterId,
  );

  return characters.map((character) => {
    if (!affectedCharacters.some((c) => c.id === character.id)) {
      return character;
    }

    return {
      ...character,
      baseStats: {
        health: Math.min(
          10,
          Math.max(0, character.baseStats.health + (effect.values.health ?? 0)),
        ),
        stamina: Math.min(
          10,
          Math.max(
            0,
            character.baseStats.stamina + (effect.values.stamina ?? 0),
          ),
        ),
        sanity: Math.min(
          10,
          Math.max(0, character.baseStats.sanity + (effect.values.sanity ?? 0)),
        ),
        hunger: Math.min(
          10,
          Math.max(0, character.baseStats.hunger + (effect.values.hunger ?? 0)),
        ),
      },
    };
  });
}

function applyPersonality(
  characters: Character[],
  effect?: CharacterEffect<Character["personality"]>,
): Character[] {
  if (!effect) return characters;

  const affectedCharacters = getAffectedCharacters(
    characters,
    effect.target,
    effect.characterId,
  );

  return characters.map((character) => {
    if (!affectedCharacters.some((c) => c.id === character.id)) {
      return character;
    }

    return {
      ...character,
      personality: {
        courage: Math.min(
          10,
          Math.max(
            0,
            character.personality.courage + (effect.values.courage ?? 0),
          ),
        ),
        trust: Math.min(
          10,
          Math.max(0, character.personality.trust + (effect.values.trust ?? 0)),
        ),
        empathy: Math.min(
          10,
          Math.max(
            0,
            character.personality.empathy + (effect.values.empathy ?? 0),
          ),
        ),
        adaptability: Math.min(
          10,
          Math.max(
            0,
            character.personality.adaptability +
              (effect.values.adaptability ?? 0),
          ),
        ),
        aggression: Math.min(
          10,
          Math.max(
            0,
            character.personality.aggression + (effect.values.aggression ?? 0),
          ),
        ),
      },
    };
  });
}

function applySecretTrigger(
  characters: Character[],
  trigger: {
    id: string;
    effect?: EventCard["effects"];
  },
): Character[] {
  const affected = characters.filter(
    (character) => character.secret.cardId === trigger.id,
  );

  return characters.map((character) => {
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
}

function updateRelations(
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

function getAffectedCharacters(
  characters: Character[],
  target: "all" | "random" | "specific",
  characterId?: string,
): Character[] {
  if (target === "all") {
    return characters;
  }

  if (target === "specific" && characterId) {
    return characters.filter((c) => c.id === characterId);
  }

  if (target === "random") {
    const random = characters[Math.floor(Math.random() * characters.length)];

    return [random];
  }

  return [];
}

//Store definition
interface GameStore {
  date: Date;
  elapsed: number;
  lastTurn: number;
  characters: typeof People;
  items: typeof Stock;
  relations: RelationMatrix;
  selectedCharacterIds: string[];
  flags: Record<string, boolean>;
  eventResult: {
    success?: boolean;
    messages: string[];
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
  resolveEvent: (choiceIndex: number) => void;
  startCrew: () => void;
  startMission: () => void;

  getProduction: (resourceId: string) => number;
  getConsumption: (resourceId: string) => number;
}

const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      date: new Date("2051-07-03"),
      elapsed: 0,
      lastTurn: 0,
      characters: assignSecretCards(People),
      items: Stock,
      relations: {},
      selectedCharacterIds: [] as string[],
      pendingEvent: null,
      flags: {},
      eventResult: null,
      nextEvent: null,
      eventHistory: [] as { eventId: string; choiceIndex: number }[],
      gamePhase: "crewSelection",

      endTurn: () => {
        const randomDay: number = Math.floor(Math.random() * 14) + 1;

        set((state) => {
          const currentDate = new Date(state.date);
          currentDate.setDate(currentDate.getDate() + randomDay);

          return {
            lastTurn: randomDay,
            elapsed: state.elapsed + randomDay,
            date: currentDate,

            items: state.items.map((item: Item) => {
              const production = get().getProduction(item.id);
              const consumption = get().getConsumption(item.id);

              const delta = (production - consumption) * randomDay;
              return {
                ...item,
                quantity: Math.max(
                  0,
                  Math.min(item.capacity, item.quantity + delta),
                ),
              };
            }),
          };
        });
      },

      drawPersonality: (id: string) => {
        const randomCard =
          PersonalityCard[Math.floor(Math.random() * PersonalityCard.length)];

        set((state) => ({
          characters: state.characters.map((character) =>
            character.id === id
              ? {
                  ...character,
                  personality: randomCard.effects,
                  personalityName: randomCard.name,
                  personalityDescription: randomCard.description,
                }
              : character,
          ),
        }));
        get().generateRelations();
      },

      updateRelation: (a: string, b: string, delta: number) => {
        set((state) => {
          const current =
            state.relations[a]?.[b] ?? state.relations[b]?.[a] ?? 0;
          const newValue = Math.min(100, Math.max(0, current + delta));
          const key1 = state.relations[a]?.[b] !== undefined ? a : b;
          const key2 = state.relations[a]?.[b] !== undefined ? b : a;
          return {
            relations: {
              ...state.relations,
              [key1]: {
                ...state.relations[key1],
                [key2]: newValue,
              },
            },
          };
        });
      },

      generateRelations: () => {
        const characters = get().characters;
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
        set({ relations });
      },

      selectCharacter: (id: string) => {
        set((state) => {
          if (state.gamePhase !== "crewSelection") return state;

          if (state.selectedCharacterIds.includes(id))
            return {
              selectedCharacterIds: state.selectedCharacterIds.filter(
                (selectedId) => selectedId !== id,
              ),
            };
          if (state.selectedCharacterIds.length >= 2) return state;

          return { selectedCharacterIds: [...state.selectedCharacterIds, id] };
        });
      },

      generateAge: (id: string) => {
        const age = Math.floor(Math.random() * (60 - 20 + 1)) + 20; // Random age between 20 and 60
        const distanceFromPeak = Math.abs(age - 40);
        const direction = age < 40 ? 1 : -1;

        const healthMod = direction * distanceFromPeak; // Random modifier between
        const staminaMod = direction * distanceFromPeak; // Random modifier between
        const sanityMod = -direction * distanceFromPeak; // Random modifier between

        set((state) => ({
          characters: state.characters.map((character) =>
            character.id === id
              ? {
                  ...character,
                  age,
                  baseStats: {
                    ...character.baseStats,
                    health: character.baseStats.health + healthMod,
                    stamina: character.baseStats.stamina + staminaMod,
                    sanity: character.baseStats.sanity + sanityMod,
                  },
                }
              : character,
          ),
        }));
      },

      drawEvent: () => {
        console.log(EventCards);

        const state = get();

        const availableEvents = EventCards.filter((event) => {
          if (!event.condition) return true;

          if (event.condition.requiredFlags) {
            return Object.entries(event.condition.requiredFlags).every(
              ([flag, value]) => state.flags[flag] === value,
            );
          }

          return true;
        });

        const randomEvent =
          availableEvents[Math.floor(Math.random() * availableEvents.length)];

        set({ pendingEvent: randomEvent });
      },

      resolveEvent: (choiceIndex: number) => {
        const event = get().pendingEvent;
        if (!event) return;

        const effects = event.choices
          ? event.choices[choiceIndex].effects
          : event.effects;

        set((state) => {
          let updates: Partial<GameStore> = {
            eventHistory: [
              ...state.eventHistory,
              { eventId: event.id, choiceIndex },
            ],
          };

          let characters = state.characters;
          let relations = state.relations;
          let items = state.items;

          // Character effects
          if (effects.stats) {
            characters = applyStats(characters, effects.stats);
          }

          if (effects.skills) {
            characters = applySkills(characters, effects.skills);
          }

          if (effects.personality) {
            characters = applyPersonality(characters, effects.personality);
          }

          // Relations
          if (effects.relations) {
            relations = updateRelations(relations, effects.relations);
          }

          // Stock
          if (effects.stock) {
            items = items.map((item) => ({
              ...item,
              quantity: Math.max(
                0,
                Math.min(
                  item.capacity,
                  item.quantity +
                    (effects.stock?.[item.name.toLowerCase()] ?? 0),
                ),
              ),
            }));
          }

          // Secret reveal
          if (effects.secretTrigger) {
            characters = applySecretTrigger(characters, effects.secretTrigger);
          }

          // Flags
          if (effects.flags) {
            updates.flags = {
              ...state.flags,
              ...effects.flags,
            };
          }

          // Chain event
          if (event.choices?.[choiceIndex].followUp) {
            const followUp = event.choices[choiceIndex].followUp;

            updates.nextEvent =
              EventCards.find((e) => e.id === followUp) ?? null;
          }

          updates.pendingEvent = null;

          updates.eventResult = {
            success: true,
            messages: ["TEST"],
          };

          updates.characters = characters;
          updates.relations = relations;
          updates.items = items;

          return updates;
        });
      },

      continueEvent: () => {
        set((state) => ({
          pendingEvent: state.nextEvent,
          nextEvent: null,
          eventResult: null,
        }));
      },

      startCrew: () => {
        set({ gamePhase: "characterSetup" });
      },

      startMission: () => {
        set({ gamePhase: "mission" });
      },

      getProduction: (resourceId) => {
        switch (resourceId) {
          case "food":
            return 20;

          case "water":
            return 30;

          case "oxygen":
            return 40;

          case "energy":
            return 120;

          default:
            return 0;
        }
      },
      getConsumption: (resourceId) => {
        const people = get().selectedCharacterIds.length;

        switch (resourceId) {
          case "food":
            return people;

          case "water":
            return people * 2;

          case "oxygen":
            return people * 3;

          case "energy":
            return 80;

          default:
            return 0;
        }
      },
    }),

    { name: "game-save" },
  ),
);

export default useGameStore;
