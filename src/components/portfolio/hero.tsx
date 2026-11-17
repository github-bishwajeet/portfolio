"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section id="top" className="relative overflow-x-hidden bg-[#f5f5f7]">
      <div className="mx-auto max-w-[980px] px-5 pt-36 pb-6 text-center md:pt-40 md:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[19px] font-semibold text-[#1d1d1f] md:text-[21px]">
            Bishwajeet Kumar
          </p>
          <h1 className="apple-headline mt-1 text-[48px] leading-[1.05] text-[#1d1d1f] md:text-[64px] lg:text-[72px]">
            Hi, I&apos;m Jeet.
          </h1>
          <p className="mx-auto mt-4 max-w-[560px] text-[19px] leading-[1.55] font-normal text-[#86868b] md:text-[21px] md:leading-[1.6]">
            Senior fullstack engineer.
            <br />
            Distributed systems, queues, and AI products that ship.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-6 text-[17px]">
            <a href="#work" className="apple-link inline-flex items-center gap-1">
              See the work
              <span aria-hidden>›</span>
            </a>
            <a href="#contact" className="apple-link inline-flex items-center gap-1">
              Get in touch
              <span aria-hidden>›</span>
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-[420px] px-5 pb-16 md:pb-24"
      >
        <div className="mx-auto overflow-hidden rounded-full bg-[#1d1d1f] shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
          <Image
            src="/bishwajeet-avatar.png"
            alt="Jeet, Bishwajeet Kumar"
            width={840}
            height={840}
            className="aspect-square w-full object-cover object-center"
            priority
          />
        </div>
        <p className="mt-5 text-center text-[14px] text-[#86868b]">
          Bengaluru · Studio Jadu · Open to product team roles
        </p>
      </motion.div>
    </section>
  );
}
