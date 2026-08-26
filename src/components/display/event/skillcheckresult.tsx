import { Badge } from "../../ui/badge";

type SkillCheckResultProps = {
  skillCheck: {
    success: boolean;
    character: string;
    total: number;
    difficulty: number;
    skill: string;
    roll: number;
  };
};

export default function SkillCheckResult({
  skillCheck,
}: SkillCheckResultProps) {
  return (
    <div className="space-y-2 rounded-lg border border-sidebar-border/60 bg-background/30 p-3">
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/60">
          Skill Check
        </div>
        <Badge
          className={
            skillCheck.total >= skillCheck.difficulty
              ? "bg-(--success) text-white"
              : "bg-destructive text-white"
          }
        >
          {skillCheck.total >= skillCheck.difficulty ? "PASS" : "FAIL"}
        </Badge>
      </div>

      <div className="flex items-center justify-center gap-4">
        <span className="text-md text-foreground uppercase font-semibold tracking-[0.12em]">
          {skillCheck.character}
        </span>

        <span className="text-sm font-semibold uppercase text-primary tracking-[0.12em]">
          {skillCheck.skill}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg border border-sidebar-border/60 bg-background/40 p-3">
          <div className="text-[10px] uppercase tracking-[0.12em] text-sidebar-foreground/60">
            Roll
          </div>

          <div className="mt-1 text-2xl font-bold">{skillCheck.roll}</div>
        </div>

        <div className="rounded-lg border border-sidebar-border/60 bg-background/40 p-3">
          <div className="text-[10px] uppercase tracking-[0.12em] text-sidebar-foreground/60">
            Total
          </div>

          <div
            className={
              skillCheck.success
                ? "mt-1 text-2xl font-bold text-(--success)"
                : "mt-1 text-2xl font-bold text-destructive"
            }
          >
            {skillCheck.total}
          </div>
        </div>
        <div className="rounded-lg border border-sidebar-border/60 bg-background/40 p-3">
          <div className="text-[10px] uppercase tracking-[0.12em] text-sidebar-foreground/60">
            Required
          </div>

          <div className="mt-1 text-2xl font-bold text-primary">
            {skillCheck.difficulty}
          </div>
        </div>
      </div>
    </div>
  );
}
