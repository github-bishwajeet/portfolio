"use client";

import { cn } from "@/lib/utils";
import { animate } from "motion/react";
import {
  memo,
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

export interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

const GRADIENTS = {
  default:
    "radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%), radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%), radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%), radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%), repeating-conic-gradient(from 236.84deg at 50% 50%, #dd7bbb 0%, #d79f1e 5%, #5a922c 10%, #4c7894 15%, #dd7bbb 20%)",
  white:
    "repeating-conic-gradient(from 236.84deg at 50% 50%, #ffffff 0%, #ffffff 5%, #ffffff 10%, #ffffff 15%, #ffffff 20%)",
};

export const GlowingEffect = memo(function GlowingEffect({
  blur = 0,
  inactiveZone = 0.7,
  proximity = 0,
  spread = 20,
  variant = "default",
  glow = false,
  className,
  disabled = false,
  movementDuration = 2,
  borderWidth = 1,
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);

  const updateEffect = useCallback(
    (position?: { x: number; y: number }) => {
      const element = containerRef.current;
      if (!element || disabled) return;

      const { left, top, width, height } = element.getBoundingClientRect();
      const x = position?.x ?? lastPosition.current.x;
      const y = position?.y ?? lastPosition.current.y;
      lastPosition.current = { x, y };

      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const inactiveRadius = Math.min(width, height) * 0.5 * inactiveZone;
      const distance = Math.hypot(x - centerX, y - centerY);

      if (distance < inactiveRadius) {
        element.style.setProperty("--active", "0");
        return;
      }

      const isNear =
        x > left - proximity &&
        x < left + width + proximity &&
        y > top - proximity &&
        y < top + height + proximity;

      element.style.setProperty("--active", isNear ? "1" : "0");
      if (!isNear) return;

      const current = Number.parseFloat(
        element.style.getPropertyValue("--start") || "0",
      );
      const target =
        (Math.atan2(y - centerY, x - centerX) * 180) / Math.PI + 90;
      const shortestTurn = ((target - current + 540) % 360) - 180;

      animationRef.current?.stop();
      animationRef.current = animate(current, current + shortestTurn, {
        duration: movementDuration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (value) =>
          element.style.setProperty("--start", String(value)),
      });
    },
    [disabled, inactiveZone, movementDuration, proximity],
  );

  useEffect(() => {
    if (disabled) return;

    const onPointerMove = (event: PointerEvent) =>
      updateEffect({ x: event.clientX, y: event.clientY });
    const onScroll = () => updateEffect();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      animationRef.current?.stop();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [disabled, updateEffect]);

  const style = {
    "--blur": `${blur}px`,
    "--spread": spread,
    "--start": 0,
    "--active": disabled ? 0 : glow ? 1 : 0,
    "--glowingeffect-border-width": `${borderWidth}px`,
    "--gradient": GRADIENTS[variant],
  } as CSSProperties;

  return (
    <div
      ref={containerRef}
      style={style}
      onPointerMove={(event: ReactPointerEvent<HTMLDivElement>) =>
        updateEffect({ x: event.clientX, y: event.clientY })
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-[inherit]",
          "after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:rounded-[inherit] after:content-['']",
          "after:border-[var(--glowingeffect-border-width)] after:border-solid after:border-transparent",
          "after:bg-[var(--gradient)] after:bg-fixed after:opacity-[var(--active)] after:transition-opacity after:duration-300",
          "after:[background-attachment:fixed] after:[filter:blur(var(--blur))]",
          "after:[mask-clip:padding-box,border-box] after:[mask-composite:intersect]",
          "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#0000_0deg,#fff_calc(var(--spread)*1deg),#0000_calc(var(--spread)*2deg))]",
        )}
      />
    </div>
  );
});

GlowingEffect.displayName = "GlowingEffect";
