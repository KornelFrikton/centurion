import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type RatingDotsProps = {
  name: string;
  description?: string;
  value: number;
  max?: number;
};

function RatingDots({ name, value, description, max = 10 }: RatingDotsProps) {
  return (
    <div
      className="
      rounded-md
      border border-sidebar-border/50
      bg-sidebar/20
      px-3 py-1
    "
    >
      <Tooltip>
        <TooltipTrigger>
          <div
            className="
        mb-1
        text-[11px]
        font-semibold
        uppercase
        tracking-[0.16em]
        text-sidebar-foreground/80
        cursor-help
      "
          >
            {name}
          </div>
        </TooltipTrigger>
        {description && (
          <TooltipContent>
            <p>{description}</p>
          </TooltipContent>
        )}
      </Tooltip>

      <div className="flex w-full justify-between gap-1">
        {Array.from({ length: max }).map((_, index) => (
          <span
            key={index}
            className={`h-2.5 flex-1 rounded-sm transition-all ${
              index < value
                ? "bg-(--success) shadow-[0_0_6px_var(--success),0_0_14px_var(--success),0_0_14px_rgba(109,255,154,0.4)]"
                : "bg-sidebar-border/60 ring-1 ring-sidebar-border/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default RatingDots;
