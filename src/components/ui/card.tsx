import * as React from "react";

import { cn } from "@/lib/utils";

function Card({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  const starColors = [
    "rgba(120,180,255,0.25)",
    "rgba(220,240,255,0.18)",
    "rgba(60,130,255,0.20)",
    "rgba(160,120,255,0.15)",
  ];

  const starSpots = React.useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        size: 3 + Math.random() * 12,
        top: Math.random() * 90,
        left: Math.random() * 90,
        opacity: 0.5 + Math.random() * 0.5,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      })),
    [],
  );

  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card relative flex flex-col gap-(--card-spacing) overflow-hidden rounded-[min(var(--radius-4xl),24px)] border border-border bg-card py-(--card-spacing) text-sm text-card-foreground shadow-[0_12px_32px_rgba(0,0,0,0.6)] ring-1 ring-white/5 [--card-spacing:--spacing(5)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(4)] before:absolute before:inset-0 before:pointer-events-none before:bg-[radial-gradient(circle_at_20%_20%,rgba(120,180,255,0.18),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(80,140,255,0.12),transparent_35%)] after:absolute after:inset-0 after:pointer-events-none after:bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.02)_0_1px,transparent_1px_5px)] *:[img:first-child]:rounded-t-[min(var(--radius-4xl),24px)] *:[img:last-child]:rounded-b-[min(var(--radius-4xl),24px)]",
        className,
      )}
      {...props}
    >
      {starSpots.map((spot) => (
        <div
          key={spot.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: spot.size,
            height: spot.size,
            top: `${spot.top}%`,
            left: `${spot.left}%`,
            background: `radial-gradient(
              circle,
              ${spot.color} 0%,
              ${spot.color} 35%,
              transparent 75%
            )`,
            opacity: spot.opacity,
            filter: "blur(0.5px)",
            boxShadow: `0 0 12px ${spot.color}`,
          }}
        />
      ))}

      <div className="relative z-10">{children}</div>
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 rounded-t-[min(var(--radius-4xl),24px)] px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-heading text-base font-medium", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-[min(var(--radius-4xl),24px)] px-(--card-spacing) [.border-t]:pt-(--card-spacing)",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
