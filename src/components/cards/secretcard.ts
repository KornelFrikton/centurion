export interface SecretCard {
  id: string;
  name: string;
  description: string;
  trigger: string[];
}

const secretCard: SecretCard[] = [
  {
    id: "claustrophobia",
    name: "Claustrophobia",
    description:
      "Panics in confined spaces, reducing effectiveness during ship or bunker missions.",
    trigger: ["confined_space", "airlock_use", "system_lockdown"],
  },
  {
    id: "abandoned_child",
    name: "Abandoned Child",
    description:
      "Left a child behind on Earth years ago and never told anyone. Guilt resurfaces violently whenever children or family are mentioned.",
    trigger: ["family_mention", "crew_death"],
  },
  {
    id: "gambling_debt",
    name: "Gambling Debt",
    description:
      "Left Earth to escape overwhelming debts. Will do almost anything to secure valuable resources.",
    trigger: ["valuable_loot", "resource_shortage"],
  },
  {
    id: "criminal_record",
    name: "Criminal Record",
    description:
      "Has a concealed criminal past. If discovered, trust from the crew may decrease.",
    trigger: ["identity_check", "crew_decision"],
  },
  {
    id: "terminal_illness",
    name: "Terminal Illness",
    description:
      "Secretly suffers from a progressive illness that may worsen as the mission continues.",
    trigger: ["medical_exam", "resource_shortage"],
  },
  {
    id: "survivors_guilt",
    name: "Survivor's Guilt",
    description:
      "Haunted by the loss of former teammates, making stressful situations mentally exhausting.",
    trigger: ["crew_death", "system_lockdown"],
  },
  {
    id: "insomnia",
    name: "Chronic Insomnia",
    description:
      "Struggles to sleep in the ship's cramped quarters, causing reduced focus and slower reactions during night shifts.",
    trigger: ["night_shift", "system_lockdown"],
  },
  {
    id: "paranoia",
    name: "Paranoia",
    description:
      "Convinced someone aboard means them harm. Overreacts to routine crew decisions, straining group cohesion.",
    trigger: ["crew_decision", "identity_check"],
  },
  {
    id: "stim_addiction",
    name: "Stimulant Addiction",
    description:
      "Dependent on illicit stimulants smuggled aboard. Performance drops sharply when supplies run low.",
    trigger: ["resource_shortage", "medical_exam"],
  },
  {
    id: "corporate_spy",
    name: "Corporate Spy",
    description:
      "Secretly reports to a rival corporation. May leak sensitive mission data, risking the crew's safety.",
    trigger: ["identity_check", "system_lockdown"],
  },
];

export default secretCard;
