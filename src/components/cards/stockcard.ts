export interface Item {
  id: string;
  name: string;
  description: string;
  quantity: number;
  capacity: number;
}

const Stock: Item[] = [
  {
    id: "food",
    name: "Food",
    quantity: 2000,
    capacity: 2000,
    description: "A basic food item to sustain life.",
  },
  {
    id: "water",
    name: "Water",
    quantity: 2000,
    capacity: 2000,
    description: "A basic water item to sustain life.",
  },
  {
    id: "oxygen",
    name: "Oxygen",
    quantity: 100,
    capacity: 100,
    description:
      "Compressed oxygen reserves for the colony's life support systems and EVA operations. If it reaches zero, the crew will die.",
  },
  {
    id: "energy",
    name: "Energy",
    quantity: 300,
    capacity: 300,
    description:
      "Stored electrical energy powering life support, machinery, and colony infrastructure.",
  },
];

export default Stock;
