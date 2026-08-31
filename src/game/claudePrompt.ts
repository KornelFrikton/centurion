import type { GameState } from "../game/store/types";

export function claudePrompt(state: GameState): string {
  const selectedCharacters = state.characters.filter((c) =>
    state.selectedCharacterIds.includes(c.id),
  );

  const characterContext = selectedCharacters
    .map(
      (c) => `
      - ${c.name} (${c.class}, age: ${c.age}, gender: ${c.gender})
        BaseStats: health ${c.baseStats.health}, stamina ${c.baseStats.stamina}, 
        sanity ${c.baseStats.sanity}, hunger ${c.baseStats.hunger}
        Skills: scavenging ${c.skills.scavenging}, crafting ${c.skills.crafting},
        combat ${c.skills.combat}, stealth ${c.skills.stealth},
        tech ${c.skills.tech}, leadership ${c.skills.leadership}
        Personality: courage ${c.personality.courage}, trust ${c.personality.trust},
        empathy ${c.personality.empathy}, adaptability ${c.personality.adaptability},
        aggression ${c.personality.aggression}
        ${c.personalityName ? `Personality type: ${c.personalityName}` : ""}
        ${c.secret?.revealed ? `Secret revealed: ${c.secret.cardId}` : "Secret: hidden"}
    `,
    )
    .join("\n");

  const relationContext = Object.entries(state.relations)
    .flatMap(([a, targets]) =>
      Object.entries(targets).map(([b, value]) => {
        const nameA = state.characters.find((c) => c.id === a)?.name;
        const nameB = state.characters.find((c) => c.id === b)?.name;
        return `${nameA} → ${nameB}: ${value}/10`;
      }),
    )
    .join("\n");

  const stockContext = state.items
    .map((i) => `${i.id}: ${i.name} (${i.quantity}/${i.capacity})`)
    .join(", ");

  return `
    You are a narrative designer for a sci-fi survival game.
    The crew is stranded on a spaceship in 2051. It is day ${state.elapsed}.

    CREW:
    ${characterContext}

    RELATIONSHIPS:
    ${relationContext}

    SUPPLIES:
    ${stockContext}

    Generate ONE event card.

    Requirements:
    - Feel personal to these characters and their current situation
    - Reflect their relationships, personalities, secrets, and current supplies
    - Be dramatic and narratively interesting and appropriate for a sci-fi survival setting
    - 2-4 morally complex choices with punchy, few-word descriptions
    - Optionally include 1 skill check with relevant skill and appropriate difficulty (4-7)
    - If a skill check has failEffects, they must follow the same effect rules as normal effects
    - The event type must be one of: technical, emotional, supply
    - A choice should normally affect no more than 3 different effect categories
    - Stats, skills, and personality deltas must be integers between -10 and +10
    - Relation deltas must be integers between -10 and +10
    - For stock (food, water, oxygen, energy): no strict limit, but reasonable for the current supply levels
    - Do not use zero-valued effects. If an effect value would be 0, omit that property entirely
    - Do not invent character IDs
    - Use only the exact item IDs provided in SUPPLIES

    Return ONLY valid JSON.
    Do not use markdown.
    Do not wrap the JSON in a code block.
    Do not include fields that are not part of the provided TypeScript type.
    Follow this TypeScript type:
    
      {
        "id": "unique_id",
        "name": "Event name",
        "type": "technical" | "emotional" | "supply",
        "description": "What happens...",
        "rarity": "common" | "rare" | "legendary",
        "banner": "technical_banner" | "emotional_banner" | "stock_banner",
        "choices": [
          {
            "description": "Choice text...",
            "skillCheck": {
              "target": "all" | "random" | "specific",
              "skill": "tech" | "combat" | "stealth" | "crafting" | "scavenging" | "leadership",
              "difficulty": 5,
              "failEffects": Omit<EventCard["effects"]>;
            },
            "effects": {
              "stats": {
                "target": "all" | "random" | "specific",
                "values": { "sanity": 0, "health": 0, "stamina": 0, "hunger": 0 }
              },
              "stock": { "food": 0, "water": 0, "energy": 0 },
              "skills": {
                "target": "all" | "random" | "specific",
                "values": { "tech": 0, "combat": 0, "scavenging": 0, "crafting": 0,
                          "stealth": 0, "leadership": 0 }
              },
              "personality": {
                "target": "all" | "random" | "specific",
                "values": { "courage": 0, "trust": 0, "aggression": 0, "empathy": 0,
                          "adaptability": 0}
              },
              "relations": { "between": "all", "delta": 0 }
            }
          }
        ],
      }
  `;
}
