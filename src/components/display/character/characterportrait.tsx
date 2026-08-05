import { Badge } from "../../ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

type CharacterPortraitProps = {
  name: string;
  avatar?: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
};

export default function CharacterPortrait({
  name,
  avatar,
  description,
  selected,
  onSelect,
}: CharacterPortraitProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <button
          type="button"
          onClick={onSelect}
          className={`
            relative inline-flex cursor-pointer rounded-xl p-1 transition-all
            ${
              selected
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
              object-cover
            "
          />

          {selected && (
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
        </button>
      </TooltipTrigger>
      {description && (
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
