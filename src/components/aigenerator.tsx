/*import { type EventCard } from "./eventcard";

generateEventChoices: async () => {
  const state = get();

  // Karakterek nevei és personality értékeik
  const characterContext = state.characters
    .map(
      (c) => `
      - ${c.name} (${c.class}, age: ${c.age})
        Personality: courage ${c.personality.courage}, 
        trust ${c.personality.trust},
        aggression ${c.personality.aggression}
        Sanity: ${c.baseStats.sanity}
    `,
    )
    .join("\n");

  // Kapcsolatok
  const relationContext = Object.entries(state.relations)
    .map(([a, targets]) =>
      Object.entries(targets).map(([b, value]) => {
        const nameA = state.characters.find((c) => c.id === a)?.name;
        const nameB = state.characters.find((c) => c.id === b)?.name;
        return `${nameA} → ${nameB}: ${value}/10`;
      }),
    )
    .flat()
    .join("\n");

  // Készlet állapot
  const stockContext = state.items
    .map((i) => `${i.name}: ${i.quantity} egység`)
    .join(", ");

  const prompt = `
    You are a narrative designer for a sci-fi survival game.
    The crew is stranded on a spaceship in 2051. It is day ${state.elapsed}.

    CREW:
    ${characterContext}

    RELATIONSHIPS:
    ${relationContext}

    SUPPLIES:
    ${stockContext}

    Generate 3 different event cards as a JSON array. Each card should:
    - Feel personal to these specific characters and their current situation
    - Reflect the tension or harmony in their relationships
    - Have consequences relevant to the current supply levels
    - Have 2 morally complex choices
    - Be dramatic and narratively interesting

    Return ONLY a JSON array, no other text:
    [
      {
        "id": "unique_id",
        "name": "Event name",
        "type": "technical" | "emotional" | "supply",
        "description": "What happens, referencing the actual characters by name",
        "choices": [
          { 
            "label": "Choice text",
            "effects": {
              "stats": { "sanity": 0, "health": 0, "stamina": 0 },
              "stock": { "food": 0, "water": 0 },
              "relations": { "between": "all", "delta": 0 }
            }
          }
        ]
      }
    ]
  `;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  const cards = JSON.parse(data.content[0].text) as EventCard[];
  set({ eventChoices: cards });
};
*/
