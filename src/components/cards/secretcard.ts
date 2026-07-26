export interface SecretCard {
  id: string;
  name: string;
  description: string;
}

const SecretCard: SecretCard[] = [
  {
    id: "claustrophobia",
    name: "Claustrophobia",
    description:
      "Panics in confined spaces, reducing effectiveness during ship or bunker missions.",
  },
  {
    id: "arachnophobia",
    name: "Arachnophobia",
    description:
      "Terrified of spider-like creatures, making encounters with alien fauna far more stressful.",
  },
  {
    id: "gambling_debt",
    name: "Gambling Debt",
    description:
      "Left Earth to escape overwhelming debts. Will do almost anything to secure valuable resources.",
  },
  {
    id: "criminal_record",
    name: "Criminal Record",
    description:
      "Has a concealed criminal past. If discovered, trust from the crew may decrease.",
  },
  {
    id: "terminal_illness",
    name: "Terminal Illness",
    description:
      "Secretly suffers from a progressive illness that may worsen as the mission continues.",
  },
  {
    id: "survivors_guilt",
    name: "Survivor's Guilt",
    description:
      "Haunted by the loss of former teammates, making stressful situations mentally exhausting.",
  },
];

export default SecretCard;
