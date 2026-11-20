"use client";

import { motion, useReducedMotion } from "motion/react";
import { TechPipeline } from "@/components/portfolio/tech-pipeline";

const pillars = [
  {
    title: "Distributed systems",
    body: "Service boundaries, eventual consistency, and resilient APIs that stay healthy as traffic and teams grow.",
  },
  {
    title: "Microservices",
    body: "Decomposed domains with clear contracts, auth, and observability so features ship without blocking the monolith.",
  },
  {
    title: "Queuing & async",
    body: "Redis and job queues for media pipelines, webhooks, notifications, and long running work off the request path.",
  },
  {
    title: "Integrations",
    body: "Third party systems, payments, and enterprise connectors wired through events, retries, and idempotent handlers.",
  },
];

export function SkillsHub() {
  const reduced = useReducedMotion();

  return (
    <section id="skills" className="bg-[#f5f5f7] pt-20 pb-20 md:pt-28 md:pb-28">
      <div className="mx-auto max-w-[1240px] px-5 pb-40 md:pb-56">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-[620px] text-center"
        >
          <h2 className="apple-headline text-[40px] leading-[1.05] text-[#1d1d1f] md:text-[56px]">
            Systems that scale.
          </h2>
          <p className="mt-4 text-[17px] leading-[1.6] font-normal text-[#6e6e73] md:text-[19px]">
            How Jeet designs services, queues, and integrations for real load.
          </p>
        </motion.div>

        <motion.ul
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0"
        >
          {pillars.map((item, index) => (
            <li
              key={item.title}
              className={`text-center sm:text-left lg:px-5 ${
                index > 0 ? "lg:border-l lg:border-[#d2d2d7]/80" : ""
              }`}
            >
              <h3 className="text-[17px] font-semibold tracking-tight text-[#1d1d1f] md:text-[18px]">
                {item.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#6e6e73] md:text-[15px]">
                {item.body}
              </p>
            </li>
          ))}
        </motion.ul>
      </div>

      <div className="w-full md:mx-auto md:max-w-[1240px] md:px-5">
        <TechPipeline />
      </div>
    </section>
  );
}
