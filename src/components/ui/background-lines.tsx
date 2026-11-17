"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ReactNode } from "react";

export interface BackgroundLinesProps {
  children: ReactNode;
  className?: string;
  svgOptions?: {
    duration?: number;
  };
}

const PATHS = [
  "M-160 40C40 130 120 10 300 100S580 230 760 105 1040 20 1360 120",
  "M-140 85C20 190 180 25 350 125S620 260 800 130 1060 55 1390 165",
  "M-120 130C55 245 210 60 390 165S660 300 850 180 1110 95 1410 210",
  "M-100 175C80 300 250 100 430 210S700 345 900 225 1160 140 1430 255",
  "M-80 220C110 350 285 145 470 255S745 390 950 270 1210 190 1450 300",
  "M-60 265C140 400 320 185 510 300S790 435 1000 315 1260 230 1470 345",
  "M-40 310C165 450 350 225 550 345S830 480 1050 360 1310 275 1490 390",
  "M-20 355C190 500 385 270 590 390S875 525 1100 405 1360 320 1510 435",
  "M0 400C220 550 420 310 630 435S920 570 1150 450 1410 365 1530 480",
  "M20 445C245 600 450 350 670 480S965 615 1200 495 1460 410 1550 525",
  "M40 490C275 650 485 395 710 525S1010 660 1250 540 1510 455 1570 570",
  "M60 535C300 700 520 435 750 570S1050 705 1300 585 1560 500 1590 615",
];

const COLORS = [
  "#46A5CA",
  "#8C2F2F",
  "#4FAE4D",
  "#D6590C",
  "#811010",
  "#247AFB",
  "#A534A0",
  "#4FAE4D",
  "#D6590C",
  "#46A5CA",
  "#A534A0",
  "#247AFB",
];

export function BackgroundLines({
  children,
  className,
  svgOptions,
}: BackgroundLinesProps) {
  const duration = svgOptions?.duration ?? 10;

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden",
        className,
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 640"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <filter id="background-lines-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g fill="none" filter="url(#background-lines-glow)">
          {PATHS.map((path, index) => (
            <motion.path
              key={path}
              d={path}
              stroke={COLORS[index]}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="5 9"
              initial={{ strokeDashoffset: 0, opacity: 0.28 }}
              animate={{
                strokeDashoffset: index % 2 === 0 ? -280 : 280,
                opacity: [0.18, 0.7, 0.18],
              }}
              transition={{
                strokeDashoffset: {
                  duration: duration + index * 0.35,
                  ease: "linear",
                  repeat: Infinity,
                },
                opacity: {
                  duration: duration * 0.55,
                  delay: index * 0.12,
                  repeat: Infinity,
                },
              }}
            />
          ))}
        </g>
      </svg>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
