import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "relative shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px bg-transparent overflow-visible before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent,rgba(120,180,255,0.65),transparent)] after:absolute after:left-1/2 after:top-1/2 after:h-px after:w-3/4 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-[rgba(120,180,255,0.35)] after:blur-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
