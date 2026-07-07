// stock.ts
export interface Item {
  id: string;
  name: string;
  description: string;
  quantity: number;
  effect: {
    health: number;
    stamina: number;
    sanity: number;
    hunger: number;
  };
}

const Stock: Item[] = [
  {
    id: "item01",
    name: "Food",
    quantity: 3650,
    description: "A basic food item to sustain life.",
    effect: {
      health: 10, // életerő
      stamina: 10, // fizikai terhelhetőség
      sanity: 5, // mentális állapot (túlélőknél kulcs!)
      hunger: 20, // éhség
    },
  },
  {
    id: "item02",
    name: "Water",
    quantity: 1825,
    description: "A basic water item to sustain life.",
    effect: {
      health: 5, // életerő
      stamina: 5, // fizikai terhelhetőség
      sanity: 10, // mentális állapot (túlélőknél kulcs!)
      hunger: 10, // éhség
    },
  },
];

export default Stock;
