import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { PageShell } from "@/components/portfolio/page-shell";
import { experience } from "@/data/portfolio";
import {
  createPageMetadata,
  experienceJsonLdGraph,
  siteConfig,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: `Experience — ${siteConfig.fullName} (Jeet)`,
  description: `Career timeline for ${siteConfig.fullName} (Jeet): ${siteConfig.jobTitle} at ${siteConfig.organization.name}, prior roles at TheCodeWork and Doutedesk, and earlier Laravel engineering work.`,
  path: "/experience/",
});

/** Technologies shown per role — only stacks already reflected on the site. */
const roleDetails: Record<
  string,
  { contributions: string[]; technologies: string[]; projectsNote?: string }
> = {
  StudioJadu: {
    contributions: [
      "Shipping AI-powered filmmaking and storytelling tools across story, image, and video workflows.",
      "Building production systems for async media pipelines and reliable delivery of long-running AI workloads.",
      "Connecting creative tooling to service-oriented platforms used in real production contexts.",
    ],
    technologies: [
      "Laravel",
      "Vue",
      "AI APIs",
      "Job queues",
      "Distributed systems",
    ],
    projectsNote: "Related work: StudioJadu · AIDA on the homepage work section.",
  },
  TheCodeWork: {
    contributions: [
      "End-to-end product development for startups and enterprises.",
      "Architecture, fullstack delivery, sprint ownership, and multi-project client coordination.",
      "Project leadership across marketplace, ops, and commerce-facing products.",
    ],
    technologies: [
      "Laravel",
      "Node.js",
      "APIs",
      "Redis",
      "Vue.js",
      "React",
    ],
    projectsNote:
      "Related work includes Clunker Busters, Ridebase, MDware partnership work, and other client products listed on the homepage.",
  },
  Doutedesk: {
    contributions: [
      "Owned web app and REST API development for a digital office platform.",
      "Integrations, testing, deployment, and production monitoring for mobile and third-party consumers.",
    ],
    technologies: ["REST APIs", "Web apps", "Integrations", "Monitoring"],
  },
  "Earlier roles": {
    contributions: [
      "Mentored freshers on Laravel.",
      "Built multi-vendor event management, ERP, and e-commerce courier systems.",
    ],
    technologies: ["Laravel", "PHP"],
  },
};

export default function ExperiencePage() {
  return (
    <>
      <JsonLd data={experienceJsonLdGraph()} />
      <PageShell
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Experience" },
        ]}
      >
        <div className="mx-auto max-w-[720px] px-5 pb-20 md:pb-28">
          <header className="text-center">
            <p className="text-[12px] font-medium tracking-[0.12em] text-[#6e6e73] uppercase">
              Career
            </p>
            <h1 className="apple-headline mt-3 text-[40px] leading-[1.08] text-[#1d1d1f] md:text-[52px]">
              Experience.
            </h1>
            <p className="mx-auto mt-3 max-w-[560px] text-[15px] font-extralight leading-[1.55] tracking-[0.01em] text-[#6e6e73] md:text-[17px]">
              Verified roles for {siteConfig.fullName} ({siteConfig.nickname}).
              Dates and titles match the portfolio source of truth.
            </p>
          </header>

          <ol className="mt-14 space-y-8">
            {experience.map((item) => {
              const details = roleDetails[item.company];
              return (
                <li
                  key={item.company}
                  className="rounded-[28px] border border-[#d2d2d7]/80 bg-white px-6 py-7 md:px-8 md:py-8"
                >
                  <p className="text-[13px] font-medium text-[#0071e3]">
                    {item.when}
                  </p>
                  <h2 className="mt-2 text-[24px] font-semibold tracking-tight text-[#1d1d1f] md:text-[28px]">
                    {item.company}
                  </h2>
                  <p className="mt-1 text-[16px] text-[#86868b]">{item.role}</p>
                  <p className="mt-4 text-[16px] leading-relaxed text-[#6e6e73]">
                    {item.body}
                  </p>

                  {details ? (
                    <>
                      <h3 className="mt-6 text-[14px] font-semibold tracking-wide text-[#1d1d1f] uppercase">
                        Focus
                      </h3>
                      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-[#6e6e73]">
                        {details.contributions.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>

                      <h3 className="mt-6 text-[14px] font-semibold tracking-wide text-[#1d1d1f] uppercase">
                        Technologies
                      </h3>
                      <p className="mt-2 text-[15px] text-[#6e6e73]">
                        {details.technologies.join(" · ")}
                      </p>

                      {details.projectsNote ? (
                        <p className="mt-4 text-[14px] text-[#86868b]">
                          {details.projectsNote}{" "}
                          <Link href="/#work" className="apple-link">
                            View work
                          </Link>
                          .
                        </p>
                      ) : null}
                    </>
                  ) : null}
                </li>
              );
            })}
          </ol>

          <div className="mt-12 flex flex-wrap gap-6 text-[17px]">
            <Link href="/about/" className="apple-link inline-flex items-center gap-1">
              About {siteConfig.nickname} <span aria-hidden>›</span>
            </Link>
            <Link href="/#work" className="apple-link inline-flex items-center gap-1">
              Selected work <span aria-hidden>›</span>
            </Link>
            <Link href="/contact/" className="apple-link inline-flex items-center gap-1">
              Contact <span aria-hidden>›</span>
            </Link>
          </div>
        </div>
      </PageShell>
    </>
  );
}
