"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { experience } from "@/data/portfolio";

const MacbookScroll = dynamic(
  () =>
    import("@/components/ui/macbook-scroll").then((mod) => mod.MacbookScroll),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto h-[420px] w-full max-w-[980px] animate-pulse rounded-[28px] bg-[#f5f5f7]" />
    ),
  },
);

function ExperienceScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-[#f5f5f7] text-left text-[#1d1d1f]">
      <div className="flex items-center justify-between border-b border-[#d2d2d7] bg-white px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <p className="text-[10px] tracking-wide text-[#86868b]">jeet · career</p>
        <div className="w-10" />
      </div>
      <div className="space-y-2 overflow-y-auto p-4">
        <p className="text-[10px] font-semibold tracking-wide text-[#0071e3] uppercase">
          Timeline
        </p>
        <h3 className="text-sm font-semibold">Where Jeet has built</h3>
        {experience.map((item, index) => (
          <div
            key={item.company}
            className="rounded-lg border border-[#d2d2d7] bg-white px-3 py-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[12px] font-semibold">{item.company}</p>
                <p className="mt-0.5 text-[10px] text-[#86868b]">{item.role}</p>
              </div>
              <span className="shrink-0 text-[9px] font-medium text-[#0071e3]">
                {index === 0 ? "Now" : item.when.split("·")[0]}
              </span>
            </div>
            <p className="mt-1.5 text-[10px] leading-snug text-[#6e6e73]">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="bg-white pb-16 md:pb-24">
      <div className="mx-auto max-w-[980px] px-5 pt-20 text-center md:pt-28 md:pb-2">
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
      </div>

      {/* Crawlable semantic timeline — MacBook below is progressive enhancement only. */}
      <ol className="mx-auto mt-10 max-w-[720px] space-y-5 px-5 text-left">
        {experience.map((item) => (
          <li
            key={item.company}
            className="rounded-[22px] border border-[#e8e8ed] bg-[#fbfbfd] px-5 py-5 md:px-6"
          >
            <p className="text-[13px] font-medium text-[#0071e3]">{item.when}</p>
            <h3 className="mt-1.5 text-[20px] font-semibold tracking-tight text-[#1d1d1f]">
              {item.company}
            </h3>
            <p className="mt-1 text-[15px] text-[#86868b]">{item.role}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-[#6e6e73]">
              {item.body}
            </p>
          </li>
        ))}
      </ol>

      <div className="relative mt-8" aria-hidden="true">
        <MacbookScroll showGradient screen={<ExperienceScreen />} />
      </div>
    </section>
  );
}
