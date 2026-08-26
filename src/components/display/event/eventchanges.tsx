type ChangeItem = {
  target?: string;
  delta: number;
  type: string;
};

type EventChangesProps = {
  title: string;
  changes: ChangeItem[];
};

export default function EventChanges({ title, changes }: EventChangesProps) {
  return (
    <div className="space-y-2 rounded-lg border border-sidebar-border/60 bg-background/30 p-3">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/60">
        {title}
      </div>

      {changes.map((change, index) => (
        <div
          key={`${change.type}-${change.target ?? ""}-${index}`}
          className="flex items-center justify-between rounded-lg border border-sidebar-border/60 bg-background/30 px-3 py-2 text-sm"
        >
          <span className="uppercase">
            {change.target && <span className="mr-2">{change.target}</span>}
          </span>

          <span
            className={
              change.delta > 0
                ? "font-semibold text-(--success)"
                : "font-semibold text-destructive"
            }
          >
            <span className="text-primary uppercase pr-2">{change.type}</span>
            {change.delta > 0 ? "+" : ""}
            {change.delta}
          </span>
        </div>
      ))}
    </div>
  );
}
