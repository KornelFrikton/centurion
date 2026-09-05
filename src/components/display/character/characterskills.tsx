import { Separator } from "../../ui/separator";
import RatingDots from "../ratingdots";
import type { CharacterSkills } from "../../../game/store/types";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

type CharacterSkillsProps = {
  skills: CharacterSkills;
};

export default function CharacterSkills({ skills }: CharacterSkillsProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <Separator className="mt-3 mb-3" />

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mb-3 relative flex w-full items-center justify-center text-xs font-semibold uppercase tracking-[0.16em] text-sidebar-foreground/85 transition-colors hover:text-primary"
      >
        <span>Crew Profile</span>

        <span className="absolute right-0 flex items-center">
          {expanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </span>
      </button>

      {expanded && (
        <>
          <RatingDots
            name="Scavenging"
            description="Scavenging and loot finding"
            value={skills.scavenging}
          />
          <RatingDots
            name="Crafting"
            description="Item creation and repair"
            value={skills.crafting}
          />
          <RatingDots
            name="Combat"
            description="Close-quarters combat ability"
            value={skills.combat}
          />
          <RatingDots
            name="Stealth"
            description="Stealth and evasion"
            value={skills.stealth}
          />
          <RatingDots
            name="Tech"
            description="Machines, electronics, and hacking"
            value={skills.tech}
          />
          <RatingDots
            name="Leadership"
            description="Group morale and command effectiveness"
            value={skills.leadership}
          />
        </>
      )}
    </>
  );
}
