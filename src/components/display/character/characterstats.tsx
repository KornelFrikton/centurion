import StatusBar from "../statusbar";
import { Separator } from "../../ui/separator";
import type { BaseStats } from "../../../game/store/types";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

type CharacterStatsProps = {
  stats: BaseStats;
};

export default function CharacterStats({ stats }: CharacterStatsProps) {
  const [expanded, setExpanded] = useState(true);

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
          <StatusBar stat="Health" value={stats.health} max={stats.health} />
          <StatusBar stat="Stamina" value={stats.stamina} max={stats.stamina} />
          <StatusBar stat="Sanity" value={stats.sanity} max={stats.sanity} />
          <StatusBar stat="Hunger" value={stats.hunger} />
        </>
      )}
    </>
  );
}
