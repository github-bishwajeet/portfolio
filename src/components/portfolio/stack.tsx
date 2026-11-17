"use client";

import { stack } from "@/data/portfolio";

export function Stack() {
  return (
    <section id="stack" className="mx-auto w-full max-w-5xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">Stack</p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Tools I reach for
        </h2>
      </div>

      <div className="mt-12 space-y-8 rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
        {Object.entries(stack).map(([group, items]) => (
          <div key={group} className="grid gap-3 md:grid-cols-[9rem_1fr]">
            <h3 className="text-sm font-medium text-muted-foreground">{group}</h3>
            <p className="text-sm leading-relaxed text-foreground">{items.join("  ·  ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
