import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameStore } from "./types";
import { assignSecretCards } from "../secretEffects";
import { generateRelationMatrix, updateRelations } from "../relations";
import { computeEventResolution } from "../eventResolution";
import Characters from "../../components/cards/charactercard";
import Stock, { type Item } from "../../components/cards/stock";
import PersonalityCard from "../../components/cards/personalitycard";
import EventCards from "../../components/eventcards/event";
import { assignAvatars } from "../characterEffects";

const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      date: new Date("2051-07-03"),
      elapsed: 0,
      lastTurn: 0,
      characters: assignSecretCards(assignAvatars(Characters)),
      items: Stock,
      relations: {},
      selectedCharacterIds: [],
      pendingEvent: null,
      flags: {},
      eventResult: null,
      nextEvent: null,
      eventHistory: [],
      gamePhase: "crewSelection",

      endTurn: () => {
        const randomDay = Math.floor(Math.random() * 14) + 1;

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
          if (state.selectedCharacterIds.length >= 2) return state;

          return { selectedCharacterIds: [...state.selectedCharacterIds, id] };
        });
      },

      generateAge: (id: string) => {
        const age = Math.floor(Math.random() * (60 - 20 + 1)) + 20;
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
        const state = get();

        const availableEvents = EventCards.filter((event) => {
          if (!event.condition?.requiredFlags) return true;
          return Object.entries(event.condition.requiredFlags).every(
            ([flag, value]) => state.flags[flag] === value,
          );
        });

        const randomEvent =
          availableEvents[Math.floor(Math.random() * availableEvents.length)];

        set({ pendingEvent: randomEvent });
      },

      resolveEvent: (choiceIndex: number, characterId?: string) => {
        const event = get().pendingEvent;
        if (!event) return;

        set((state) =>
          computeEventResolution(event, choiceIndex, state, characterId),
        );
      },

      continueEvent: () => {
        set((state) => ({
          pendingEvent: state.nextEvent,
          nextEvent: null,
          eventResult: null,
        }));
      },

      startCrew: () => set({ gamePhase: "characterSetup" }),
      startMission: () => set({ gamePhase: "mission" }),

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
