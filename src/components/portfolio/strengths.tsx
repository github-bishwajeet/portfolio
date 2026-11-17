"use client";

import { strengths, stack } from "@/data/portfolio";

export function Strengths() {
  return (
    <section id="about" className="mx-auto max-w-2xl px-6 py-16">
      <div className="border-t border-border pt-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
          About
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          I lead end to end product engineering: architecture, APIs, web apps, and delivery.
          Comfortable owning Laravel/Vue systems and collaborating across modern JS stacks inside
          product orgs, or partnering on a focused build when the fit is right.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {strengths.slice(0, 6).map((item) => (
            <article key={item.title}>
              <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 space-y-4">
          <h3 className="text-sm font-semibold">Stack</h3>
          {Object.entries(stack).map(([group, items]) => (
            <p key={group} className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{group}:</span> {items.join(", ")}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
