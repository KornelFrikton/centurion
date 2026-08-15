import { Progress } from "../ui/progress";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

function StatusBar({
  stat,
  value,
  max = 100,
  invert = false,
  description,
  delta,
}: {
  stat: string;
  value: number;
  max?: number;
  invert?: boolean;
  description?: string;
  delta?: number;
}) {
  const displayValue = invert
    ? ((max - value) / max) * 100
    : (value / max) * 100;

  return (
    <div className="space-y-1.5 py-1">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/90">
        <Tooltip>
          <TooltipTrigger className="cursor-help">
            <span className="uppercase tracking-[0.14em]">{stat}</span>
          </TooltipTrigger>

          {description && (
            <TooltipContent>
              <p>{description}</p>
            </TooltipContent>
          )}
        </Tooltip>

        <span className="text-primary">
          {value} / {max}{" "}
        </span>
      </div>

      <div>
        <Progress
          className="shadow-[0_0_8px_var(--primary)] rounded-full"
          value={displayValue}
        />
      </div>

      <div className="min-h-2 text-right text-xs">
        {delta !== undefined && delta < 0 && (
          <span className="text-destructive">
            Last jump consumption: {delta}
          </span>
        )}
      </div>
    </div>
  );
}

export default StatusBar;
