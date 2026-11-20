"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { experience } from "@/data/portfolio";

/** Soft accent wash per role — calm, not neon. */
const accents = [
  { dot: "#0071e3", wash: "rgba(0, 113, 227, 0.08)" },
  { dot: "#5AC8A8", wash: "rgba(90, 200, 168, 0.10)" },
  { dot: "#7AA2D4", wash: "rgba(122, 162, 212, 0.10)" },
  { dot: "#C4A574", wash: "rgba(196, 165, 116, 0.12)" },
];

function yearFromWhen(when: string) {
  const match = when.match(/(\d{4})/g);
  if (!match?.length) return "";
  if (when.toLowerCase().includes("present")) return `${match[0]} – present`;
  if (match.length >= 2 && match[0] !== match[1]) return `${match[0]}–${match[1]}`;
  return match[0];
}

export function Experience() {
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="relative overflow-hidden bg-[#f5f5f7] pb-20 md:pb-28">
      {/* Soft atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(0,113,227,0.06),transparent_55%),radial-gradient(ellipse_at_90%_40%,rgba(90,200,168,0.07),transparent_50%)]"
      />

      <div className="relative mx-auto max-w-[860px] px-5 pt-20 text-center md:pt-28">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="apple-headline text-[40px] text-[#1d1d1f] md:text-[56px]">
            Experience.
          </h2>
          <p className="mx-auto mt-3 max-w-[520px] text-[19px] font-semibold text-[#86868b] md:text-[21px]">
            Verified roles from 2020 to present.
          </p>
          <p className="mt-4">
            <Link href="/experience/" className="apple-link text-[17px]">
              Full career timeline ›
            </Link>
          </p>
        </motion.div>
      </div>

      <ol className="relative mx-auto mt-14 max-w-[720px] px-5">
        {/* Quiet spine */}
        <div
          aria-hidden
          className="absolute top-3 bottom-3 left-[34px] w-px bg-gradient-to-b from-[#0071e3]/40 via-[#d2d2d7] to-transparent md:left-1/2 md:-translate-x-px"
        />

        {experience.map((item, index) => {
          const accent = accents[index % accents.length];
          const year = yearFromWhen(item.when);
          const fromLeft = index % 2 === 0;

          return (
            <motion.li
              key={item.company}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: Math.min(index * 0.08, 0.28),
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative mb-10 last:mb-0 md:mb-14 md:grid md:grid-cols-2 md:gap-12 ${
                fromLeft ? "" : ""
              }`}
            >
              {/* Node on spine */}
              <span
                aria-hidden
                className="absolute top-3 left-[28px] z-10 size-3 rounded-full ring-4 ring-[#f5f5f7] md:left-1/2 md:-translate-x-1/2"
                style={{ backgroundColor: accent.dot }}
              />

              <div
                className={`pl-12 md:pl-0 ${
                  fromLeft
                    ? "md:col-start-1 md:pr-10 md:text-right"
                    : "md:col-start-2 md:pl-10 md:text-left"
                }`}
              >
                <p
                  className="font-light tracking-tight text-[#c7c7cc] select-none"
                  style={{
                    fontSize:
                      year.length > 6
                        ? "clamp(1.75rem, 4vw, 2.5rem)"
                        : "clamp(2.5rem, 6vw, 3.5rem)",
                    lineHeight: 1.1,
                  }}
                >
                  {year}
                </p>
                <div
                  className={`mt-3 rounded-[22px] px-5 py-5 text-left md:px-6 ${
                    fromLeft ? "md:ml-auto" : ""
                  }`}
                  style={{ background: accent.wash }}
                >
                  <p className="text-[12px] font-medium tracking-[0.06em] text-[#6e6e73] uppercase">
                    {item.when}
                  </p>
                  <h3 className="mt-2 text-[22px] font-semibold tracking-tight text-[#1d1d1f]">
                    {item.company}
                  </h3>
                  <p className="mt-1 text-[15px] text-[#6e6e73]">{item.role}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#6e6e73]">
                    {item.body}
                  </p>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
