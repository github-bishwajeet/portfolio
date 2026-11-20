"use client";

import { motion } from "motion/react";
import { HeroFlip } from "@/components/portfolio/hero-flip";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

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
          <p className="mx-auto my-6 max-w-[560px] text-[19px] leading-[1.55] font-normal text-[#86868b] md:my-8 md:text-[21px] md:leading-[1.6]">
            <AnimatedGradientText
              speed={1.2}
              colorFrom="#0071e3"
              colorTo="#1d1d1f"
              className="text-[19px] font-medium md:text-[21px]"
            >
              Senior Software Engineer.
            </AnimatedGradientText>
            <br />
            <span className="text-[15px] font-extralight leading-[1.55] tracking-[0.01em] text-[#6e6e73] [word-spacing:0.08em] md:text-[17px] md:leading-[1.6]">
              Shipping distributed systems and AI pipelines that hold under real load.
            </span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-[17px]">
            <a href="#work" className="apple-link inline-flex items-center gap-1">
              See the work
              <span aria-hidden>›</span>
            </a>
            <a href="/about/" className="apple-link inline-flex items-center gap-1">
              About Jeet
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
        <HeroFlip />
        <p className="mt-5 text-center text-[14px] text-[#86868b]">
          Bengaluru · StudioJadu · Open to product team roles
        </p>
      </motion.div>
    </section>
  );
}
