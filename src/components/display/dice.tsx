import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

type DiceProps = {
  value?: number | null;
  onRoll: (roll: number) => void;
  disabled?: boolean;
};

export default function Dice({
  value = null,
  onRoll,
  disabled = false,
}: DiceProps) {
  const [displayValue, setDisplayValue] = useState<number | null>(value);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    if (!isRolling && value !== null) {
      setDisplayValue(value);
    }
  }, [value, isRolling]);

  const handleRoll = () => {
    if (isRolling || disabled) return;

    const roll = Math.floor(Math.random() * 6) + 1;

    setIsRolling(true);

    const animationInterval = setInterval(() => {
      setDisplayValue(Math.floor(Math.random() * 6) + 1);
    }, 120);

    setTimeout(() => {
      clearInterval(animationInterval);

      setDisplayValue(roll);
      setIsRolling(false);

      setTimeout(() => {
        onRoll(roll);
      }, 2000);
    }, 2000);
  };

  return (
    <button
      type="button"
      onClick={handleRoll}
      disabled={disabled || isRolling}
      className={cn(
        "flex h-16 w-16 items-center justify-center",
        "rounded-xl border border-primary/50",
        "bg-sidebar/80 text-2xl font-bold text-primary",
        "shadow-[0_0_12px_rgba(120,180,255,0.2)]",
        "transition-transform duration-100",
        "hover:scale-105",
        isRolling && "animate-spin scale-110",
      )}
    >
      {displayValue ?? "?"}
    </button>
  );
}
