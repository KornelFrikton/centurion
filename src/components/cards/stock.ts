// stock.ts
export interface Item {
  id: string;
  name: string;
  description: string;
  quantity: number;
  capacity: number;
}

const Stock: Item[] = [
  {
    id: "item01",
    name: "food",
    quantity: 3650,
    capacity: 3650,
    description: "A basic food item to sustain life.",
  },
  {
    id: "item02",
    name: "water",
    quantity: 1825,
    capacity: 1825,
    description: "A basic water item to sustain life.",
  },
  {
    id: "item03",
    name: "oxygen",
    quantity: 2500,
    capacity: 2500,
    description:
      "Compressed oxygen reserves for the colony's life support systems and EVA operations.",
  },
  {
    id: "item04",
    name: "energy",
    quantity: 5000,
    capacity: 5000,
    description:
      "Stored electrical energy powering life support, machinery, and colony infrastructure.",
  },
];

export default Stock;
