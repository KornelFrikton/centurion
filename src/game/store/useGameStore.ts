import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameStore, GameState } from "./types";
import { assignSecretCards } from "../secretEffects";
import { generateRelationMatrix, updateRelations } from "../relations";
import { computeEventResolution } from "../eventResolution";
import Characters from "../../components/cards/charactercard";
import Stock, { type Item } from "../../components/cards/stockcard";
import PersonalityCard from "../../components/cards/personalitycard";
import EventCards from "../../components/cards/eventcards/event";
import {
  applyResourceEffects,
  assignAvatars,
  calculateAge,
} from "../characterEffects";
import { claudePrompt } from "../claudePrompt";
import type { EventCard } from "../../components/cards/eventcards/eventcard";

function createInitialState(): GameState {
  return {
    date: new Date("2051-07-03"),
    elapsed: 0,
    lastTurn: 0,
    characters: assignAvatars(Characters),
    items: Stock,
    relations: {},
    selectedCharacterIds: [] as string[],
    pendingEvent: null,
    flags: {},
    eventResult: null,
    nextEvent: null,
    eventHistory: [],
    gamePhase: "crewSelection",
    pendingSkillCheck: null,
  };
}

const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...createInitialState(),

      endTurn: () => {
        const randomDay = Math.floor(Math.random() * 14) + 1;

        set((state) => {
          const currentDate = new Date(state.date);
          currentDate.setDate(currentDate.getDate() + randomDay);

          const updatedItems = state.items.map((item: Item) => {
            const consumption = get().getConsumption(item.id);
            const delta = -consumption * randomDay;
            return {
              ...item,
              quantity: Math.max(
                0,
                Math.min(item.capacity, item.quantity + delta),
              ),
            };
          });

          const updatedCharacters = state.characters.map((character) => {
            if (!state.selectedCharacterIds.includes(character.id)) {
              return character;
            }
            const hungerPenalty =
              character.baseStats.hunger > 30 ? randomDay : 0;

            return {
              ...character,
              baseStats: {
                ...character.baseStats,
                health: Math.max(0, character.baseStats.health - hungerPenalty),
              },
            };
          });

          const baseUpdates = {
            lastTurn: randomDay,
            elapsed: state.elapsed + randomDay,
            date: currentDate,
            items: updatedItems,
            characters: updatedCharacters,
          };

          return {
            ...baseUpdates,
            ...applyResourceEffects({ ...state, ...baseUpdates }),
          };
        });
        get().updateAges();
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

      generateRelations: () => {
        const { characters, selectedCharacterIds } = get();

        const selectedCharacters = characters.filter((character) =>
          selectedCharacterIds.includes(character.id),
        );

        set({
          relations: generateRelationMatrix(selectedCharacters),
        });
      },

      updateRelation: (a: string, b: string, delta: number) => {
        set((state) => ({
          relations: updateRelations(state.relations, {
            between: [a, b],
            delta,
          }),
        }));
      },

      selectCharacter: (id: string) => {
        set((state) => {
          if (state.gamePhase !== "crewSelection") return state;

          if (state.selectedCharacterIds.includes(id)) {
            return {
              selectedCharacterIds: state.selectedCharacterIds.filter(
                (selectedId) => selectedId !== id,
              ),
            };
          }
          if (state.selectedCharacterIds.length >= 3) return state;

          return { selectedCharacterIds: [...state.selectedCharacterIds, id] };
        });
      },

      generateAge: (id: string) => {
        const currentDate = new Date(get().date);
        const targetAge = Math.floor(Math.random() * (60 - 20 + 1)) + 20;
        const anniversary = new Date(currentDate);
        anniversary.setFullYear(currentDate.getFullYear() - targetAge);

        const dayOffset = Math.floor(Math.random() * 365);
        const birthday = new Date(anniversary);
        birthday.setDate(birthday.getDate() - dayOffset);

        const age = calculateAge(birthday, currentDate);

        const distanceFromPeak = Math.abs(age - 40);
        const direction = age < 40 ? 1 : -1;

        const healthMod = direction * distanceFromPeak;
        const staminaMod = direction * distanceFromPeak;
        const sanityMod = -direction * distanceFromPeak;

        set((state) => ({
          characters: state.characters.map((character) =>
            character.id === id
              ? {
                  ...character,
                  age,
                  birthday: birthday.toLocaleDateString("en-CA"),
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

      updateAges: () => {
        const currentDate = new Date(get().date);

        set((state) => ({
          characters: state.characters.map((character) => {
            if (
              !state.selectedCharacterIds.includes(character.id) ||
              !character.birthday
            ) {
              return character;
            }

            const birthday = new Date(character.birthday);
            const newAge = calculateAge(birthday, currentDate);

            if (newAge === character.age) {
              return character;
            }

            return {
              ...character,
              age: newAge,
            };
          }),
        }));
      },

      drawEvent: () => {
        const state = get();

        const playedEventIds = new Set(
          state.eventHistory.map((event) => event.eventId),
        );

        const availableEvents = EventCards.filter((event) => {
          if (playedEventIds.has(event.id)) return false;

          if (!event.condition?.requiredFlags) return true;
          return Object.entries(event.condition.requiredFlags).every(
            ([flag, value]) => state.flags[flag] === value,
          );
        });

        if (availableEvents.length === 0) {
          return;
        }

        const randomEvent =
          availableEvents[Math.floor(Math.random() * availableEvents.length)];

        set({ pendingEvent: randomEvent });
      },

      resolveEvent: (choiceIndex: number, characterId?: string) => {
        const event = get().pendingEvent;
        if (!event) return;

        const choice = event.choices[choiceIndex];

        if (choice.skillCheck) {
          set({
            pendingSkillCheck: {
              choiceIndex,
              characterId: characterId ?? null,
            },
          });

          return;
        }

        set((state) =>
          computeEventResolution(event, choiceIndex, state, characterId),
        );
      },

      resolveSkillCheck: (
        choiceIndex: number,
        characterId: string | undefined,
        roll: number,
      ) => {
        const event = get().pendingEvent;
        if (!event) return;

        set((state) =>
          computeEventResolution(event, choiceIndex, state, characterId, roll),
        );
      },

      continueEvent: () => {
        set((state) => ({
          pendingEvent: state.nextEvent,
          nextEvent: null,
          eventResult: null,
        }));
      },

      advanceEvent: () => {
        get().endTurn();
        get().drawEvent();
      },

      generateAIEvent: async () => {
        const prompt = claudePrompt(get());
        console.log("Claude AI prompt:", prompt);

        const response = await fetch("/api/anthropic/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-6",
            max_tokens: 2000,
            messages: [{ role: "user", content: prompt }],
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("API error:", data);
          return;
        }

        try {
          const text = data.content[0].text;
          const clean = text.replace(/```json|```/g, "").trim();
          const parsed = JSON.parse(clean) as EventCard;
          const card = Array.isArray(parsed) ? parsed[0] : parsed;

          if (!card?.id || !card?.name || !card?.choices) {
            console.error("Invalid card structure:", card);
            return;
          }
          set({ pendingEvent: card });
        } catch (err) {
          console.error("AI card parse error:", err);
        }
      },

      startCrew: () => {
        const { characters, selectedCharacterIds } = get();

        const updatedCharacters = assignSecretCards(
          characters,
          selectedCharacterIds,
        );

        set({
          characters: updatedCharacters,
          gamePhase: "characterSetup",
        });
      },

      startMission: () => set({ gamePhase: "mission" }),

      giveUp: () => {
        set(createInitialState());
        window.scrollTo({ top: 0, behavior: "smooth" });
      },

      getProduction: () => 0,

      getConsumption: (resourceId) => {
        const people = get().selectedCharacterIds.length;
        switch (resourceId) {
          case "food":
            return people;
          case "water":
            return people;
          case "oxygen":
            return 0;
          case "energy":
            return 1;
          default:
            return 0;
        }
      },

      feedCharacter: (characterId: string) => {
        set((state) => {
          const character = state.characters.find((c) => c.id === characterId);

          if (!character) return state;

          const hunger = character.baseStats.hunger;

          if (hunger <= 0) return state;

          const food = state.items.find((item) => item.id === "food");

          if (!food || food.quantity < hunger) return state;

          return {
            characters: state.characters.map((c) =>
              c.id === characterId
                ? {
                    ...c,
                    baseStats: {
                      ...c.baseStats,
                      hunger: 0,
                    },
                  }
                : c,
            ),

            items: state.items.map((item) =>
              item.id === "food"
                ? {
                    ...item,
                    quantity: item.quantity - hunger,
                  }
                : item,
            ),
          };
        });
      },
    }),
    { name: "game-save" },
  ),
);

export default useGameStore;
