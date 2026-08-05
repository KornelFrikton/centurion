import StatusBar from "../statusbar";
import { Separator } from "../../ui/separator";
import type { BaseStats } from "../../../game/store/types";

type CharacterStatsProps = {
  stats: BaseStats;
};

export default function CharacterStats({ stats }: CharacterStatsProps) {
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
        Status
      </div>
      <StatusBar stat="Health" value={stats.health} max={stats.health} />
      <StatusBar stat="Stamina" value={stats.stamina} max={stats.stamina} />
      <StatusBar stat="Sanity" value={stats.sanity} max={stats.sanity} />
      <StatusBar stat="Hunger" value={stats.hunger} />
    </>
  );
}
