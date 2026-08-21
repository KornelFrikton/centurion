import StatusBar from "../statusbar";
import { Separator } from "../../ui/separator";
import type { BaseStats } from "../../../game/store/types";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "../../ui/button";
import useGameStore from "../../../game/store/useGameStore";

type CharacterStatsProps = {
  characterId: string;
  stats: BaseStats;
};

export default function CharacterStats({
  characterId,
  stats,
}: CharacterStatsProps) {
  const [expanded, setExpanded] = useState(true);
  const items = useGameStore((state) => state.items);
  const feedCharacter = useGameStore((state) => state.feedCharacter);

  const food = items.find((item) => item.id === "food");

  return (
    <>
      <Separator className="mt-3 mb-3" />

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mb-3 relative flex w-full items-center justify-center text-xs font-semibold uppercase tracking-[0.16em] text-sidebar-foreground/85 transition-colors hover:text-primary"
      >
        <span>Status</span>

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
          <StatusBar stat="Health" value={stats.health} max={100} />
          <StatusBar stat="Stamina" value={stats.stamina} max={100} />
          <StatusBar stat="Sanity" value={stats.sanity} max={100} />
          <StatusBar
            stat="Hunger"
            value={stats.hunger}
            max={100}
            description="Above 30 Hunger, the character loses 1 Health per day. Consume Food to reset Hunger to 0."
          />

          {stats.hunger > 0 && (
            <Button
              size="lg"
              variant="secondary"
              className="mx-auto mt-3 block animate-pulse uppercase tracking-[0.18em]"
              disabled={!food || food.quantity < stats.hunger}
              onClick={() => feedCharacter(characterId)}
            >
              Consume Food
            </Button>
          )}
        </>
      )}
    </>
  );
}
