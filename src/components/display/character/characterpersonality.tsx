import { Separator } from "../../ui/separator";
import RatingDots from "../ratingdots";
import type { CharacterPersonality } from "../../../game/store/types";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

type CharacterPersonalityProps = {
  personality?: CharacterPersonality;
  personalityName?: string;
};

export default function CharacterPersonality({
  personality,
  personalityName,
}: CharacterPersonalityProps) {
  if (!personalityName || !personality) return null;

  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <Separator className="mt-3 mb-3" />

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mb-3 relative flex w-full items-center justify-center text-xs font-semibold uppercase tracking-[0.16em] text-sidebar-foreground/85 transition-colors hover:text-primary"
      >
        <span>Psycho Profile</span>

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
      )}
    </>
  );
}
