"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export interface BackgroundCubesGridProps {
  className?: string;
  cellSize?: number;
  topColor?: string;
  leftColor?: string;
  rightColor?: string;
  glowColor?: string;
  amplitude?: number;
  idleRipples?: boolean;
}

type Point = { x: number; y: number };

function hexToRgb(color: string) {
  const value = color.replace("#", "");
  const normalized =
    value.length === 3
      ? value
          .split("")
          .map((character) => character + character)
          .join("")
      : value;
  const number = Number.parseInt(normalized, 16);
  return {
    r: (number >> 16) & 255,
    g: (number >> 8) & 255,
    b: number & 255,
  };
}

function mixColor(base: string, glow: string, amount: number) {
  const a = hexToRgb(base);
  const b = hexToRgb(glow);
  const t = Math.max(0, Math.min(1, amount));
  return `rgb(${Math.round(a.r + (b.r - a.r) * t)} ${Math.round(
    a.g + (b.g - a.g) * t,
  )} ${Math.round(a.b + (b.b - a.b) * t)})`;
}

export function BackgroundCubesGrid({
  className,
  cellSize = 60,
  topColor = "#1c1917",
  leftColor = "#292524",
  rightColor = "#0c0a09",
  glowColor = "#5eead4",
  amplitude = 0.55,
  idleRipples = true,
}: BackgroundCubesGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let pointer: Point = { x: -10_000, y: -10_000 };
    let pointerActivity = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawPolygon = (points: Point[], fill: string) => {
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      for (let index = 1; index < points.length; index += 1) {
        context.lineTo(points[index].x, points[index].y);
      }
      context.closePath();
      context.fillStyle = fill;
      context.fill();
    };

    const render = (timestamp: number) => {
      context.clearRect(0, 0, width, height);
      const half = cellSize / 2;
      const quarter = cellSize / 4;
      const cubeHeight = cellSize / 2;
      const columns = Math.ceil(width / cellSize) + 3;
      const rows = Math.ceil(height / cubeHeight) + 4;
      pointerActivity *= 0.985;

      for (let row = -2; row < rows; row += 1) {
        for (let column = -2; column < columns; column += 1) {
          const x = column * cellSize + (row % 2 === 0 ? 0 : half);
          const y = row * cubeHeight;
          const distance = Math.hypot(x - pointer.x, y - pointer.y);
          const pointerWave =
            Math.max(0, 1 - distance / (cellSize * 4.2)) *
            (0.5 + 0.5 * Math.cos(distance * 0.075 - timestamp * 0.008)) *
            pointerActivity;
          const idleWave = idleRipples
            ? Math.max(
                0,
                0.5 +
                  0.5 *
                    Math.sin(
                      Math.hypot(x - width * 0.5, y - height * 0.5) * 0.028 -
                        timestamp * 0.0016,
                    ),
              ) * 0.14
            : 0;
          const strength = Math.max(0, pointerWave, idleWave) * amplitude;
          const lift = strength * cellSize * 0.32;
          const cy = y - lift;

          drawPolygon(
            [
              { x, y: cy - quarter },
              { x: x + half, y: cy },
              { x, y: cy + quarter },
              { x: x - half, y: cy },
            ],
            mixColor(topColor, glowColor, strength * 1.5),
          );
          drawPolygon(
            [
              { x: x - half, y: cy },
              { x, y: cy + quarter },
              { x, y: cy + quarter + cubeHeight },
              { x: x - half, y: cy + cubeHeight },
            ],
            mixColor(leftColor, glowColor, strength),
          );
          drawPolygon(
            [
              { x: x + half, y: cy },
              { x, y: cy + quarter },
              { x, y: cy + quarter + cubeHeight },
              { x: x + half, y: cy + cubeHeight },
            ],
            mixColor(rightColor, glowColor, strength * 1.25),
          );
        }
      }

      frame = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
      pointerActivity = 1;
    };
    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) pointerActivity = 0;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    resize();
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
    };
  }, [
    amplitude,
    cellSize,
    glowColor,
    idleRipples,
    leftColor,
    rightColor,
    topColor,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
