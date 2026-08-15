import * as React from "react";

export function H1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`scroll-m-20 text-center text-6xl font-extrabold tracking-tight text-balance ${className ?? ""}`}
    >
      {children}
    </h1>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 ">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}

export function ModuleTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-lg font-semibold uppercase tracking-[0.25em] text-sidebar-primary
        drop-shadow-[0_0_8px_rgba(180,220,255,0.45)]"
    >
      {children}
    </h2>
  );
}

export function ModuleHeader({ title }: { title: string }) {
  return (
    <div
      className="
      flex
      items-center
      gap-3
      pl-2
      border-sidebar-border/60
      pb-2
      pt-2
      "
    >
      <span
        className="
        h-2
        w-2
        rounded-full
        bg-primary
        shadow-[0_0_14px_var(--primary)]
      "
      />

      <ModuleTitle>{title}</ModuleTitle>

      <div
        className="
        flex-1
        h-px
        bg-sidebar-border/60
      "
      />
    </div>
  );
}

export default function StarsBackground() {
  const starColors = [
    "rgba(180,220,255,0.85)",
    "rgba(255,255,255,0.95)",
    "rgba(120,180,255,0.80)",
    "rgba(200,180,255,0.75)",
  ];

  const starSpots = React.useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        size:
          Math.random() < 0.15
            ? 4 + Math.random() * 4
            : 2 + Math.random() * 2.5,
        top: Math.random() * 100,
        left: Math.random() * 100,
        opacity: 0.7 + Math.random() * 0.3,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      })),
    [],
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {starSpots.map((spot) => (
        <div
          key={spot.id}
          className="absolute rounded-full"
          style={{
            width: spot.size,
            height: spot.size,
            top: `${spot.top}%`,
            left: `${spot.left}%`,
            background: `radial-gradient(circle,
  rgba(255,255,255,1) 0%,
  rgba(255,255,255,0.95) 8%,
  ${spot.color} 22%,
  ${spot.color} 45%,
  rgba(255,255,255,0.12) 72%,
  transparent 100%
)`,
            opacity: spot.opacity,
            filter: "blur(0.6px)",
            boxShadow: `
  0 0 6px rgba(255,255,255,0.9),
  0 0 16px ${spot.color},
  0 0 34px ${spot.color},
  0 0 60px rgba(255,255,255,0.18)
`,
          }}
        />
      ))}
    </div>
  );
}
