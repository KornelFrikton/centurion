import { Separator } from "../../ui/separator";
import RatingDots from "../ratingdots";
import type { CharacterSkills } from "../../../game/store/types";

type CharacterSkillsProps = {
  skills: CharacterSkills;
};

export default function CharacterSkills({ skills }: CharacterSkillsProps) {
  return (
    <>
      <Separator className="mt-4 mb-2" />
      <div
        className="
    mb-1
    text-xs
    font-semibold
    uppercase
    tracking-[0.16em]
    text-sidebar-foreground/85
    text-center
  "
      >
        Crew Profile
      </div>
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
  );
}
