"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { strengths, stack } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="bg-[#f5f5f7] px-5 py-20 md:py-28">
      <div className="mx-auto max-w-[980px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-[720px] text-center"
        >
          <h2 className="apple-headline text-[40px] text-[#1d1d1f] md:text-[56px]">
            Meet Bishwajeet Kumar.
          </h2>
          <p className="mt-4 text-[19px] leading-snug font-semibold text-[#86868b] md:text-[21px]">
            Colleagues call him Jeet. Software engineer since 2020, now shipping
            AI product systems at StudioJadu after leading fullstack delivery at
            TheCodeWork.
          </p>
          <p className="mt-5">
            <Link href="/about/" className="apple-link text-[17px]">
              Read the full biography ›
            </Link>
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {strengths.slice(0, 6).map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: Math.min(index * 0.04, 0.2), duration: 0.4 }}
              className="rounded-[28px] bg-white px-7 py-8"
            >
              <h3 className="text-[21px] font-semibold tracking-tight text-[#1d1d1f]">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#86868b]">{item.description}</p>
            </motion.article>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-[720px] space-y-3 text-center">
          {Object.entries(stack).map(([group, items]) => (
            <p key={group} className="text-[15px] text-[#86868b]">
              <span className="font-semibold text-[#1d1d1f]">{group}</span>
              <span className="mx-2 text-[#d2d2d7]">·</span>
              {items.join(", ")}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
