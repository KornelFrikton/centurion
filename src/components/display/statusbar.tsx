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
  const maxMarker = `${max}%`;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{stat}</span>
        <span>
          {value} / {max}
        </span>
      </div>

      <div className="relative h-2">
        <Progress value={displayValue} />
        <div
          className="absolute -top-3 z-10 text-xs text-primary"
          style={{
            left: `calc(${maxMarker} - 6px)`,
          }}
        >
          ▼
        </div>
      </div>

      {(production !== undefined || consumption !== undefined) && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span className="text-green-500">Prod: +{production}/day</span>

          <span
            className={
              (production ?? 0) - (consumption ?? 0) >= 0
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {(production ?? 0) - (consumption ?? 0) >= 0 ? (
              <strong>+</strong>
            ) : (
              <strong>-</strong>
            )}
          </span>

          <span className="text-red-500">Cons: -{consumption}/day</span>
        </div>
      )}
    </div>
  );
}

export default StatusBar;
