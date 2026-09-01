import TechnicalEvents from "./technical";
import EmotionalEvents from "./emotional";
import SupplyEvents from "./stock";
import SecretEvents from "./secret";
import ChainEvents from "./chain";
import type { EventCard } from "./eventcard";

const EventCards: EventCard[] = [
  ...TechnicalEvents,
  ...EmotionalEvents,
  ...SupplyEvents,
  ...SecretEvents,
  ...ChainEvents,
];

export default EventCards;
