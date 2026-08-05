import { Separator } from "../../ui/separator";
import RatingDots from "../ratingdots";
import type { CharacterPersonality } from "../../../game/store/types";

type CharacterPersonalityProps = {
  personality?: CharacterPersonality;
};

export default function CharacterPersonality({
  personality,
}: CharacterPersonalityProps) {
  if (!personality) return null;

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
        Psycho Profile
      </div>
      <RatingDots
        name="Courage"
        description="Courage under pressure and danger"
        value={personality.courage}
      />
      <RatingDots
        name="Trust"
        description="Ability to rely on others and build relationships"
        value={personality.trust}
      />
      <RatingDots
        name="Empathy"
        description="Understanding and supporting crew members"
        value={personality.empathy}
      />
      <RatingDots
        name="Adaptability"
        description="Ability to adjust to changing situations"
        value={personality.adaptability}
      />
      <RatingDots
        name="Aggression"
        description="Combat drive and hostile response"
        value={personality.aggression}
      />
    </>
  );
}
