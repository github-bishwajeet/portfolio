"use client";

import { cn } from "@/lib/utils";
import { Check, Copy, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

export interface PixelPromptButtonProps {
  prompt: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void | Promise<void>;
}

type Ripple = { id: number; x: number; y: number };

const COLUMNS = 18;
const ROWS = 6;
const PIXELS = Array.from({ length: COLUMNS * ROWS }, (_, index) => ({
  x: (index % COLUMNS) / (COLUMNS - 1),
  y: Math.floor(index / COLUMNS) / (ROWS - 1),
}));

export function PixelPromptButton({
  prompt,
  children = "Copy prompt",
  className,
  onClick,
}: PixelPromptButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pointer, setPointer] = useState({ x: -1, y: -1 });
  const [copied, setCopied] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((current) => [
      ...current,
      { id, x: event.clientX - bounds.left, y: event.clientY - bounds.top },
    ]);

    try {
      if (onClick) {
        await onClick();
      } else {
        await navigator.clipboard.writeText(prompt);
      }
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 1800);
    } finally {
      setTimeout(
        () => setRipples((current) => current.filter((ripple) => ripple.id !== id)),
        650,
      );
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: (event.clientX - bounds.left) / bounds.width,
          y: (event.clientY - bounds.top) / bounds.height,
        });
      }}
      onPointerLeave={() => setPointer({ x: -1, y: -1 })}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative isolate inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full border border-neutral-300 bg-white px-6 text-sm font-medium text-neutral-900 shadow-sm outline-none transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 dark:border-white/15 dark:bg-neutral-950 dark:text-white dark:focus-visible:ring-white dark:focus-visible:ring-offset-neutral-950",
        className,
      )}
    >
      <span className="absolute inset-0 -z-10 grid grid-cols-[repeat(18,1fr)] grid-rows-[repeat(6,1fr)] gap-px p-1.5">
        {PIXELS.map((pixel, index) => {
          const distance = Math.hypot(pixel.x - pointer.x, pixel.y - pointer.y);
          const intensity = Math.max(0, 1 - distance * 3.6);
          return (
            <motion.span
              key={index}
              className="rounded-[1px] bg-cyan-400"
              animate={{
                opacity: 0.03 + intensity * 0.62,
                scale: 0.65 + intensity * 0.45,
              }}
              transition={{ duration: 0.12 }}
            />
          );
        })}
      </span>

      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          aria-hidden="true"
          className="pointer-events-none absolute size-8 rounded-full bg-cyan-300/50"
          style={{ left: ripple.x - 16, top: ripple.y - 16 }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 12, opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        />
      ))}

      <span className="relative flex items-center gap-2">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
            >
              <Check className="size-4 text-emerald-500" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              {onClick ? (
                <Sparkles className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
            </motion.span>
          )}
        </AnimatePresence>
        <span>{copied ? "Copied" : children}</span>
      </span>
    </motion.button>
  );
}
