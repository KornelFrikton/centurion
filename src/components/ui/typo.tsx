import { Card } from "./card";

export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      {children}
    </h2>
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
      border-b
      border-sidebar-border/60
      pb-2
      mb-3"
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
