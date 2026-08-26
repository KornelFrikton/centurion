import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import Dice from "../../display/dice";
import { useState } from "react";

type SkillCheckProps = {
  pendingSkillCheck: {
    choiceIndex: number;
    characterId: string | null;
  };
  resolveSkillCheck: (
    choiceIndex: number,
    characterId: string | undefined,
    roll: number,
  ) => void;
};

export default function SkillCheck({
  resolveSkillCheck,
  pendingSkillCheck,
}: SkillCheckProps) {
  const [skillRoll, setSkillRoll] = useState<number | null>(null);

  return (
    <Card>
      <CardHeader className="mb-4">
        <CardTitle className="text-lg text-center font-semibold uppercase tracking-[0.14em]">
          Skill Check
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        <div className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
          Roll the dice
        </div>

        <Dice
          value={skillRoll}
          onRoll={(roll) => {
            setSkillRoll(roll);

            resolveSkillCheck(
              pendingSkillCheck.choiceIndex,
              pendingSkillCheck.characterId ?? undefined,
              roll,
            );
          }}
        />

        <div className="text-xs uppercase tracking-[0.12em] text-sidebar-foreground/60">
          {skillRoll === null
            ? "Click the dice to roll"
            : `Rolled ${skillRoll}`}
        </div>
      </CardContent>
    </Card>
  );
}
