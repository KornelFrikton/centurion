export interface SecretCard {
  id: string;
  name: string;
  description: string;
  trigger: string[];
}

const SecretCard: SecretCard[] = [
  {
    id: "claustrophobia",
    name: "Claustrophobia",
    description:
      "Panics in confined spaces, reducing effectiveness during ship or bunker missions.",
    trigger: ["confined_space"],
  },
  {
    id: "arachnophobia",
    name: "Arachnophobia",
    description:
      "Terrified of spider-like creatures, making encounters with alien fauna far more stressful.",
    trigger: ["spiders"],
  },
  {
    id: "gambling_debt",
    name: "Gambling Debt",
    description:
      "Left Earth to escape overwhelming debts. Will do almost anything to secure valuable resources.",
    trigger: ["valuable_loot"],
  },
  {
    id: "criminal_record",
    name: "Criminal Record",
    description:
      "Has a concealed criminal past. If discovered, trust from the crew may decrease.",
    trigger: ["identity_check"],
  },
  {
    id: "terminal_illness",
    name: "Terminal Illness",
    description:
      "Secretly suffers from a progressive illness that may worsen as the mission continues.",
    trigger: ["medical_exam"],
  },
  {
    id: "survivors_guilt",
    name: "Survivor's Guilt",
    description:
      "Haunted by the loss of former teammates, making stressful situations mentally exhausting.",
    trigger: ["crew_death"],
  },
];

export default SecretCard;
