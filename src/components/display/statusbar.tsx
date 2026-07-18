import { Progress } from "../ui/progress";

function StatusBar({
  stat,
  value,
  max = 100,
  invert = false,
}: {
  stat: string;
  value: number;
  max?: number;
  invert?: boolean;
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
    </div>
  );
}

export default StatusBar;
