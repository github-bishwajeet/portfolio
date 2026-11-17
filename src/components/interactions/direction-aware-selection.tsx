"use client";

import { cn } from "@/lib/utils";

export type SelectionItem = {
  id: string;
  label: string;
  color: string;
};

export interface DirectionAwareSelectionProps {
  items: SelectionItem[];
  className?: string;
  onSelect?: (item: SelectionItem) => void;
}

export function DirectionAwareSelection({
  items,
  className,
  onSelect,
}: DirectionAwareSelectionProps) {
  return (
    <div
      className={cn(
        "relative flex flex-wrap gap-3 rounded-3xl border border-neutral-200 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-neutral-950/70",
        className,
      )}
    >
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect?.(item)}
          className="rounded-lg border border-[#d2d2d7] bg-white px-4 py-2.5 text-sm font-medium text-[#1d1d1f] outline-none transition hover:border-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white focus-visible:ring-2 focus-visible:ring-[#0071e3]"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
