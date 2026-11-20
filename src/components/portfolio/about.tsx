"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { strengths, stack } from "@/data/portfolio";

const focus = strengths.slice(0, 6);

export function About() {
  const reduced = useReducedMotion();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#fafafa] px-5 py-20 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,113,227,0.09),transparent_68%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] bottom-10 h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(90,200,168,0.12),transparent_70%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-[980px]">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[640px]"
        >
          <h2 className="apple-headline text-[40px] leading-[1.05] text-[#1d1d1f] md:text-[52px]">
            How Jeet builds.
          </h2>
          <p className="mt-4 text-[17px] leading-[1.65] text-[#6e6e73] md:text-[18px]">
            Distributed systems, queues, and AI product work shaped across
            StudioJadu and earlier fullstack delivery.
          </p>
          <p className="mt-4">
            <Link href="/about/" className="apple-link text-[17px]">
              Read the full biography ›
            </Link>
          </p>
        </motion.div>

        <ul className="mt-12 divide-y divide-[#e8e8ed] border-y border-[#e8e8ed] md:mt-14">
          {focus.map((item, index) => (
            <motion.li
              key={item.title}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                delay: Math.min(index * 0.04, 0.2),
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group grid gap-2 py-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:items-baseline md:gap-10 md:py-7"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[13px] font-medium tabular-nums text-[#c7c7cc] transition group-hover:text-[#0071e3]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[18px] font-semibold tracking-tight text-[#1d1d1f] md:text-[20px]">
                  {item.title}
                </h3>
              </div>
              <p className="pl-8 text-[15px] leading-relaxed text-[#6e6e73] md:pl-0">
                {item.description}
              </p>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="mx-auto mt-14 max-w-[720px] space-y-3"
        >
          {Object.entries(stack).map(([group, items]) => (
            <p
              key={group}
              className="text-center text-[14px] leading-relaxed text-[#86868b] md:text-[15px]"
            >
              <span className="font-semibold text-[#1d1d1f]">{group}</span>
              <span className="mx-2 text-[#d2d2d7]">·</span>
              {items.join(", ")}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
