type ResourceChangesProps = {
  changes: {
    item: string;
    delta: number;
  }[];
};

export default function ResourceChanges({ changes }: ResourceChangesProps) {
  if (!changes.length) return null;
  return (
    <div className="space-y-2 rounded-lg border border-sidebar-border/60 bg-background/30 p-3">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/60">
        Resources
      </div>

      {changes.map((change) => (
        <div
          key={change.item}
          className="flex items-center justify-between rounded-lg border border-sidebar-border/60 bg-background/30 px-3 py-2"
        >
          <span className="text-sm uppercase">{change.item}</span>
          <span
            className={
              change.delta > 0
                ? "font-semibold text-(--success)"
                : "font-semibold text-destructive"
            }
          >
            {change.delta > 0 ? "+" : ""}
            {change.delta}
          </span>
        </div>
      ))}
    </div>
  );
}
