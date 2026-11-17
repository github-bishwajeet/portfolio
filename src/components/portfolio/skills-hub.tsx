"use client";

import { motion } from "motion/react";
import { DirectionAwareSelection } from "@/components/interactions/direction-aware-selection";
import { stack } from "@/data/portfolio";

const selectionItems = Object.entries(stack).flatMap(([group, items], gi) =>
  items.map((label, ii) => ({
    id: `${group}-${label}`,
    label,
    color: ["#0071e3", "#1d1d1f", "#6e6e73", "#2997ff"][(gi + ii) % 4],
  })),
);

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
    body: "Redis and job queues for media pipelines, webhooks, notifications, and long running work that should never block the request path.",
  },
  {
    title: "Integrations",
    body: "Third party systems, payments, and enterprise connectors wired through events, retries, and idempotent handlers.",
  },
];

export function SkillsHub() {
  return (
    <section id="skills" className="bg-white px-5 py-20 md:py-28">
      <div className="mx-auto max-w-[980px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <h2 className="apple-headline text-[40px] text-[#1d1d1f] md:text-[56px]">
            Systems that scale.
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[19px] font-semibold text-[#86868b] md:text-[21px]">
            Distributed systems, microservices, and queues at the center of how Jeet builds.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {pillars.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.05, duration: 0.45 }}
              className="rounded-[28px] bg-[#f5f5f7] px-8 py-9"
            >
              <h3 className="text-[24px] font-semibold tracking-tight text-[#1d1d1f]">
                {item.title}
              </h3>
              <p className="mt-3 text-[17px] leading-relaxed text-[#86868b]">{item.body}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-12">
          <p className="mb-4 text-center text-[14px] text-[#86868b]">
            Technologies
          </p>
          <DirectionAwareSelection
            items={selectionItems}
            className="rounded-[28px] border-0 bg-[#f5f5f7] p-6 shadow-none"
          />
        </div>
      </div>
    </section>
  );
}
