import { Progress } from "../ui/progress";

function StatusBar({
  stat,
  value,
  max = 100,
  invert = false,
  consumption,
  production,
}: {
  stat: string;
  value: number;
  max?: number;
  invert?: boolean;
  consumption?: number;
  production?: number;
}) {
  const displayValue = invert ? 100 - value : value;

  return (
    <div className="space-y-1.5 py-1">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/90">
        <span>{stat}</span>
        <span className="text-primary">
          {value} / {max}
        </span>
      </div>

      <div className="relative">
        <Progress value={displayValue} />
        <div
          className="absolute
          inset-0
          rounded-full
          shadow-[0_0_8px_var(--primary)]
          pointer-events-none"
        ></div>
      </div>

      {(production !== undefined || consumption !== undefined) && (
        <div className="flex justify-between text-[11px] uppercase tracking-wide">
          {production !== undefined && (
            <span className="text-(--success)">PROD +{production}/day</span>
          )}

          <span
            className={
              (production ?? 0) - (consumption ?? 0) >= 0
                ? "text-(--success) drop-shadow-[0_0_6px_var(--success)]"
                : "text-destructive drop-shadow-[0_0_6px_var(--destructive)]"
            }
          ></span>

          {consumption !== undefined && (
            <span className="text-destructive">CONS -{consumption}/day</span>
          )}
        </div>
      )}
    </div>
  );
}

export default StatusBar;
