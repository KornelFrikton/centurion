import type { EventCard } from "./eventcard";

const SecretEvents: EventCard[] = [
  {
    id: "secret_confined_space",
    name: "Szűk alagút",
    description:
      "A továbbjutáshoz valakinek át kell másznia egy szűk szervizalagúton.",
    type: "secret",
    choices: [
      {
        description: "Bemászik a járatba.",
        effects: {
          revealSecret: "claustrophobia",
        },
      },
      {
        description: "Másik útvonalat kerestek.",
        effects: {},
      },
    ],
    effects: {},
  },
];

export default SecretEvents;
