"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BorderBeam } from "@/components/ui/border-beam";
import { assetPath, cn } from "@/lib/utils";

type Token =
  | { t: "kw" | "str" | "fn" | "num" | "cmt" | "plain"; v: string }
  | { t: "nl" };

const CODE_LINES: Token[] = [
  { t: "kw", v: "import" },
  { t: "plain", v: " { Queue } " },
  { t: "kw", v: "from" },
  { t: "str", v: " './queue.js'" },
  { t: "nl" },
  { t: "nl" },
  { t: "kw", v: "const" },
  { t: "plain", v: " worker = " },
  { t: "kw", v: "new" },
  { t: "fn", v: " Queue" },
  { t: "plain", v: "({" },
  { t: "nl" },
  { t: "plain", v: "  concurrency: " },
  { t: "num", v: "8" },
  { t: "plain", v: "," },
  { t: "nl" },
  { t: "plain", v: "  retries: " },
  { t: "num", v: "3" },
  { t: "nl" },
  { t: "plain", v: "})" },
  { t: "nl" },
  { t: "nl" },
  { t: "kw", v: "await" },
  { t: "plain", v: " worker." },
  { t: "fn", v: "process" },
  { t: "plain", v: "({" },
  { t: "nl" },
  { t: "plain", v: "  id: " },
  { t: "str", v: "'aida-render'" },
  { t: "plain", v: "," },
  { t: "nl" },
  { t: "plain", v: "  type: " },
  { t: "str", v: "'video'" },
  { t: "nl" },
  { t: "plain", v: "})" },
  { t: "nl" },
  { t: "nl" },
  { t: "cmt", v: "// → job done · 142ms" },
];

function tokenClass(t: Exclude<Token["t"], "nl">) {
  switch (t) {
    case "kw":
      return "text-[#c586c0]";
    case "str":
      return "text-[#ce9178]";
    case "fn":
      return "text-[#dcdcaa]";
    case "num":
      return "text-[#b5cea8]";
    case "cmt":
      return "text-[#6a9955]";
    default:
      return "text-[#d4d4d4]";
  }
}

type CharCell = { ch: string; className: string };

function buildCells(tokens: Token[]): CharCell[] {
  const cells: CharCell[] = [];
  for (const token of tokens) {
    if (token.t === "nl") {
      cells.push({ ch: "\n", className: "" });
      continue;
    }
    const className = tokenClass(token.t);
    for (const ch of token.v) {
      cells.push({ ch, className });
    }
  }
  return cells;
}

function CodeFace({
  active,
  onComplete,
}: {
  active: boolean;
  onComplete?: () => void;
}) {
  const cells = useMemo(() => buildCells(CODE_LINES), []);
  const [visibleChars, setVisibleChars] = useState(0);
  const [terminalLine, setTerminalLine] = useState("");
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!active) {
      setVisibleChars(0);
      setTerminalLine("");
      return;
    }

    let char = 0;
    let typingTimer: number | undefined;
    let holdTimer: number | undefined;
    let terminalTimer: number | undefined;
    let settleTimer: number | undefined;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      // Keep the finished editor on screen briefly, then signal flip-back
      settleTimer = window.setTimeout(() => onCompleteRef.current?.(), 1600);
    };

    const tick = () => {
      char += 1;
      setVisibleChars(char);
      if (char < cells.length) {
        const delay = cells[char - 1]?.ch === "\n" ? 90 : 18 + Math.random() * 28;
        typingTimer = window.setTimeout(tick, delay);
      } else {
        terminalTimer = window.setTimeout(() => {
          setTerminalLine("$ node worker.js · listening on :3000");
          finish();
        }, 280);
      }
    };

    // Wait for the flip to finish before typing starts
    holdTimer = window.setTimeout(tick, 900);
    return () => {
      window.clearTimeout(typingTimer);
      window.clearTimeout(holdTimer);
      window.clearTimeout(terminalTimer);
      window.clearTimeout(settleTimer);
    };
  }, [active, cells]);

  const visible = cells.slice(0, visibleChars);
  const lines: CharCell[][] = [[]];
  for (const cell of visible) {
    if (cell.ch === "\n") {
      lines.push([]);
    } else {
      lines[lines.length - 1].push(cell);
    }
  }

  const typing = active && visibleChars < cells.length;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] bg-[#1e1e1e] text-left shadow-[0_24px_60px_rgba(0,0,0,0.28)] ring-1 ring-black/10">
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#2d2d2d] px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <p className="ml-2 truncate font-mono text-[10px] text-[#c8c8c8] md:text-[11px]">
          worker.js — jeet · node
        </p>
      </div>
      <div className="flex-1 overflow-hidden px-2 py-3 font-mono text-[10px] leading-[1.45] md:text-[11px] md:leading-[1.5]">
        {lines.map((line, index) => (
          <div key={index} className="flex min-h-[1.15em]">
            <span className="w-6 shrink-0 select-none text-right text-[#558]">
              {index + 1}
            </span>
            <span className="pl-3 whitespace-pre">
              {line.map((cell, i) => (
                <span key={i} className={cell.className}>
                  {cell.ch}
                </span>
              ))}
              {typing && index === lines.length - 1 ? (
                <span className="ml-px inline-block h-[1.05em] w-[6px] translate-y-[1px] animate-pulse bg-[#aeafad] align-middle" />
              ) : null}
            </span>
          </div>
        ))}
      </div>
      <div
        className={cn(
          "border-t border-white/10 bg-[#181818] px-3 py-2 font-mono text-[9px] md:text-[10px]",
          terminalLine ? "text-[#9cdcfe]" : "text-[#6e6e6e]",
        )}
      >
        {terminalLine || "terminal · node"}
      </div>
    </div>
  );
}

export function HeroFlip() {
  const reduceMotion = useReducedMotion();
  const [face, setFace] = useState<"avatar" | "code">("avatar");

  useEffect(() => {
    if (reduceMotion || face !== "avatar") return;

    const timer = window.setTimeout(() => setFace("code"), 3200);
    return () => window.clearTimeout(timer);
  }, [face, reduceMotion]);

  const showingCode = face === "code" && !reduceMotion;

  return (
    <div className="relative mx-auto aspect-square w-full rounded-full [perspective:1200px]">
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: showingCode ? 180 : 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="absolute inset-0 rounded-full bg-[#1d1d1f] shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <Image
              src={assetPath("/bishwajeet-avatar.png")}
              alt="Jeet, Bishwajeet Kumar"
              width={840}
              height={840}
              className="aspect-square h-full w-full object-cover object-center"
              priority
            />
          </div>
          {!reduceMotion ? (
            <div className="pointer-events-none absolute -inset-px rounded-full">
              <BorderBeam
                duration={8}
                size={120}
                borderWidth={4}
                colorFrom="#ffaa40"
                colorTo="#9c40ff"
                style={{ offsetPath: "circle(50% at 50% 50%)" }}
              />
            </div>
          ) : null}
        </div>

        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <CodeFace
            active={showingCode}
            onComplete={() => setFace("avatar")}
          />
        </div>
      </motion.div>
    </div>
  );
}
