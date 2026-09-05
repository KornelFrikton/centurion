import { Badge } from "../../ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import useGameStore from "@/game/store/useGameStore";

type CharacterPortraitProps = {
  name: string;
  avatar?: string;
  age: number;
  description?: string;
  selected: boolean;
  dead: boolean;
  onSelect: () => void;
};

export default function CharacterPortrait({
  name,
  avatar,
  age,
  description,
  selected,
  dead,
  onSelect,
}: CharacterPortraitProps) {
  const gamePhase = useGameStore((s) => s.gamePhase);

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          onClick={onSelect}
          className={`
            inline-flex
            relative
            cursor-pointer rounded-xl p-1 transition-all
            ${
              gamePhase === "crewSelection" && selected
                ? "ring-2 ring-(--success) shadow-[0_0_12px_rgba(120,180,255,0.55),0_0_28px_rgba(120,180,255,0.28)]"
                : "ring-1 ring-sidebar-border hover:shadow-[0_0_12px_rgba(120,180,255,0.18)]"
            }
          `}
        >
          <img
            src={avatar}
            alt={name}
            className="
              h-20
              w-20
              rounded-xl
              object-cover"
          />

          {gamePhase === "crewSelection" && selected && (
            <Badge
              className="
                absolute
                -bottom-2
                left-1/2
                -translate-x-1/2
                bg-(--success)
                text-(--success-foreground)
                whitespace-nowrap
                shadow-[0_0_8px_rgba(120,180,255,0.6),0_0_18px_rgba(120,180,255,0.35)]
              "
            >
              Active
            </Badge>
          )}

          {gamePhase !== "crewSelection" && age > 0 && !dead && (
            <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
              AGE {age}
            </Badge>
          )}

          {dead && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50">
              <span className="text-sm font-bold uppercase tracking-widest text-destructive">
                Dead
              </span>
            </div>
          )}
        </div>
      </TooltipTrigger>
      {description && (
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
