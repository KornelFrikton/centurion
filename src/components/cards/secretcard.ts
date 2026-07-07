export interface SecretCard {
  id: string;
  name: string;
  description: string;
}

const SecretCard: SecretCard[] = [
  {
    id: "claustrophobia",
    name: "Klausztrófóbia",
    description: "Képtelen szűk helyeken tartózkodni, pánikba esik.",
  },
  {
    id: "arachnophobia",
    name: "Arachnófóbia",
    description: "Képtelen a pókokkal szemben tartózkodni, pánikba esik.",
  },
];

export default SecretCard;
