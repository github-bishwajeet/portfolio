import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { PageShell } from "@/components/portfolio/page-shell";
import { experience, stack } from "@/data/portfolio";
import {
  aboutJsonLdGraph,
  createPageMetadata,
  siteConfig,
} from "@/lib/seo";
import { assetPath } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: `About ${siteConfig.fullName} (Jeet) | ${siteConfig.jobTitle}`,
  description: `${siteConfig.fullName}, known as Jeet, is a ${siteConfig.jobTitle} at ${siteConfig.organization.name} in ${siteConfig.location.label}. Biography, career path, technical focus, and professional profiles.`,
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutJsonLdGraph()} />
      <PageShell
        crumbs={[
          { href: "/", label: "Home" },
          { label: "About" },
        ]}
      >
        <article className="mx-auto max-w-[720px] px-5 pb-20 md:pb-28">
          <header className="text-center">
            <p className="text-[12px] font-medium tracking-[0.12em] text-[#6e6e73] uppercase">
              About
            </p>
            <h1 className="apple-headline mt-3 text-[40px] leading-[1.08] text-[#1d1d1f] md:text-[52px]">
              {siteConfig.fullName}
            </h1>
            <p className="mt-3 text-[17px] text-[#86868b] md:text-[19px]">
              Known as {siteConfig.nickname} · {siteConfig.jobTitle} ·{" "}
              {siteConfig.organization.name}
            </p>
          </header>

          <div className="mx-auto mt-10 flex max-w-[200px] justify-center md:mt-12">
            <Image
              src={assetPath(siteConfig.profileImage)}
              alt={siteConfig.profileImageAlt}
              width={400}
              height={400}
              className="aspect-square w-full rounded-full object-cover shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
              priority
            />
          </div>

          <div className="prose-portfolio mt-12 space-y-6 text-[17px] leading-[1.65] text-[#6e6e73] md:text-[18px]">
            <p className="text-[19px] leading-[1.55] font-medium text-[#1d1d1f] md:text-[21px]">
              I&apos;m {siteConfig.fullName} — colleagues call me{" "}
              {siteConfig.nickname}. I&apos;m a {siteConfig.jobTitle} based in{" "}
              {siteConfig.location.label}, currently building at{" "}
              <a
                href={siteConfig.organization.url}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-link"
              >
                {siteConfig.organization.name}
              </a>
              .
            </p>

            <section aria-labelledby="current-role">
              <h2
                id="current-role"
                className="apple-headline text-[28px] text-[#1d1d1f] md:text-[32px]"
              >
                Current role
              </h2>
              <p className="mt-3">
                At StudioJadu I work on AI-powered filmmaking and storytelling
                tools — story creation, image generation, video workflows, and
                the platforms that connect them. Day to day that means shipping
                reliable async pipelines, service-oriented APIs, and product
                surfaces that hold up under real creative usage.
              </p>
            </section>

            <section aria-labelledby="journey">
              <h2
                id="journey"
                className="apple-headline text-[28px] text-[#1d1d1f] md:text-[32px]"
              >
                Professional journey
              </h2>
              <p className="mt-3">
                My software engineering career has centered on end-to-end product
                delivery: architecture, fullstack implementation, integrations,
                and release ownership for startups and enterprise teams.
              </p>
              <ul className="mt-4 space-y-3">
                {experience.map((item) => (
                  <li key={item.company}>
                    <span className="font-semibold text-[#1d1d1f]">
                      {item.company}
                    </span>
                    <span className="text-[#d2d2d7]"> · </span>
                    {item.role}
                    <span className="block text-[15px] text-[#86868b]">
                      {item.when}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Full timeline with responsibilities:{" "}
                <Link href="/experience/" className="apple-link">
                  Experience
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="specializations">
              <h2
                id="specializations"
                className="apple-headline text-[28px] text-[#1d1d1f] md:text-[32px]"
              >
                Technical focus
              </h2>
              <p className="mt-3">
                I specialize in distributed systems, microservices, job queues,
                and full-stack delivery. Recent work leans into AI product
                engineering — creative media pipelines that stay reliable when
                workloads are long-running and failure-prone.
              </p>
              <div className="mt-5 space-y-2">
                {Object.entries(stack).map(([group, items]) => (
                  <p key={group} className="text-[15px]">
                    <span className="font-semibold text-[#1d1d1f]">{group}</span>
                    <span className="mx-2 text-[#d2d2d7]">·</span>
                    {items.join(", ")}
                  </p>
                ))}
              </div>
            </section>

            <section aria-labelledby="education">
              <h2
                id="education"
                className="apple-headline text-[28px] text-[#1d1d1f] md:text-[32px]"
              >
                Education
              </h2>
              <p className="mt-3">
                {/* TODO(confirm): Exact degree title, field of study, and graduation year for LPU */}
                Lovely Professional University — details to be confirmed for
                public listing (degree name and years).
              </p>
            </section>

            <section aria-labelledby="profiles">
              <h2
                id="profiles"
                className="apple-headline text-[28px] text-[#1d1d1f] md:text-[32px]"
              >
                Profiles &amp; contact
              </h2>
              <p className="mt-3">
                External profiles that belong to me:
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href="https://www.linkedin.com/in/bishwajeet-kumar-2b044a14a/"
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="apple-link"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/github-bishwajeet"
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="apple-link"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.crio.do/learn/portfolio/bishwajeetk003/"
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="apple-link"
                  >
                    Crio portfolio
                  </a>
                </li>
              </ul>
              <p className="mt-4">
                Email:{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="apple-link"
                >
                  {siteConfig.email}
                </a>
                . Or use the{" "}
                <Link href="/contact/" className="apple-link">
                  contact page
                </Link>
                .
              </p>
            </section>
          </div>

          <div className="mt-12 flex flex-wrap gap-6 text-[17px]">
            <Link href="/experience/" className="apple-link inline-flex items-center gap-1">
              View experience <span aria-hidden>›</span>
            </Link>
            <Link href="/#work" className="apple-link inline-flex items-center gap-1">
              See selected work <span aria-hidden>›</span>
            </Link>
            <Link href="/articles/" className="apple-link inline-flex items-center gap-1">
              Articles <span aria-hidden>›</span>
            </Link>
          </div>
        </article>
      </PageShell>
    </>
  );
}
