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
  skills?: Partial<Character["skills"]>,
): Character[] {
  if (!skills) return characters;
  return characters.map((character) => ({
    ...character,
    skills: {
      scavenging: Math.min(
        10,
        Math.max(0, character.skills.scavenging + (skills.scavenging ?? 0)),
      ),
      crafting: Math.min(
        10,
        Math.max(0, character.skills.crafting + (skills.crafting ?? 0)),
      ),
      combat: Math.min(
        10,
        Math.max(0, character.skills.combat + (skills.combat ?? 0)),
      ),
      stealth: Math.min(
        10,
        Math.max(0, character.skills.stealth + (skills.stealth ?? 0)),
      ),
      tech: Math.min(
        10,
        Math.max(0, character.skills.tech + (skills.tech ?? 0)),
      ),
      leadership: Math.min(
        10,
        Math.max(0, character.skills.leadership + (skills.leadership ?? 0)),
      ),
    },
  }));
}

function applyStats(
  characters: Character[],
  stats?: Partial<Character["baseStats"]>,
): Character[] {
  if (!stats) return characters;
  return characters.map((character) => ({
    ...character,
    baseStats: {
      health: Math.min(
        10,
        Math.max(0, character.baseStats.health + (stats.health ?? 0)),
      ),
      stamina: Math.min(
        10,
        Math.max(0, character.baseStats.stamina + (stats.stamina ?? 0)),
      ),
      sanity: Math.min(
        10,
        Math.max(0, character.baseStats.sanity + (stats.sanity ?? 0)),
      ),
      hunger: Math.min(
        10,
        Math.max(0, character.baseStats.hunger + (stats.hunger ?? 0)),
      ),
    },
  }));
}

function applyPersonality(
  characters: Character[],
  personality?: Partial<Character["personality"]>,
): Character[] {
  if (!personality) return characters;
  return characters.map((character) => ({
    ...character,
    personality: {
      courage: Math.min(
        10,
        Math.max(0, character.personality.courage + (personality.courage ?? 0)),
      ),
      trust: Math.min(
        10,
        Math.max(0, character.personality.trust + (personality.trust ?? 0)),
      ),
      empathy: Math.min(
        10,
        Math.max(0, character.personality.empathy + (personality.empathy ?? 0)),
      ),
      adaptability: Math.min(
        10,
        Math.max(
          0,
          character.personality.adaptability + (personality.adaptability ?? 0),
        ),
      ),
      aggression: Math.min(
        10,
        Math.max(
          0,
          character.personality.aggression + (personality.aggression ?? 0),
        ),
      ),
    },
  }));
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
  eventHistory: { eventId: string; choiceIndex: number }[];
  gamePhase: "crewSelection" | "characterSetup" | "mission";

  endTurn: () => void;
  generateRelations: () => void;
  updateRelation: (a: string, b: string, delta: number) => void;
  drawPersonality: (id: string) => void;
  selectCharacter: (id: string) => void;
  generateAge: (id: string) => void;
  pendingEvent: EventCard | null;
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
            pendingEvent: null,
            eventHistory: [
              ...state.eventHistory,
              { eventId: event.id, choiceIndex },
            ],
          };

          switch (event.type) {
            case "technical":
              updates.characters = applySkills(
                state.characters,
                effects.skills,
              );
              updates.characters = applyStats(
                state.characters ?? state.characters,
                effects.stats,
              );
              break;
            case "emotional":
              updates.relations = updateRelations(
                state.relations,
                effects.relations,
              );
              updates.characters = applyPersonality(
                state.characters,
                effects.personality,
              );
              break;
            case "supply":
              updates.items = state.items.map((item) => ({
                ...item,
                quantity: Math.max(
                  0,
                  item.quantity +
                    (effects.stock?.[item.name.toLowerCase()] ?? 0),
                ),
              }));
              break;
            case "secret":
              if (effects.revealSecret) {
                updates.characters = state.characters.map((character) =>
                  character.secret.cardId === effects.revealSecret
                    ? {
                        ...character,
                        secret: {
                          ...character.secret,
                          revealed: true,
                        },
                      }
                    : character,
                );
              }
              break;
            case "chain":
              const followUp = event.choices?.[choiceIndex].followUp;
              if (followUp) {
                const nextCard =
                  EventCards.find((e) => e.id === followUp) ?? null;
                updates.pendingEvent = nextCard;
              }
              break;
          }

          if (effects.flags) {
            updates.flags = { ...state.flags, ...effects.flags };
          }
          if (effects.stats && event.type !== "technical") {
            updates.characters = applyStats(
              updates.characters ?? state.characters,
              effects.stats,
            );
          }
          if (effects.relations && event.type !== "emotional") {
            updates.relations = updateRelations(
              updates.relations ?? state.relations,
              effects.relations,
            );
          }

          return updates;
        });
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
