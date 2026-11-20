import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/portfolio/site-nav";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { PromoBanner } from "@/components/portfolio/promo-banner";
import { Hero } from "@/components/portfolio/hero";
import { Work } from "@/components/portfolio/work";
import { SkillsHub } from "@/components/portfolio/skills-hub";
import { Experience } from "@/components/portfolio/experience";
import { About } from "@/components/portfolio/about";
import { Contact } from "@/components/portfolio/contact";
import { JsonLd } from "@/components/seo/json-ld";
import { featuredProjects } from "@/data/portfolio";
import { createPageMetadata, siteConfig, siteJsonLdGraph } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: `${siteConfig.fullName} (Jeet) | ${siteConfig.jobTitle}`,
  description: siteConfig.description,
  path: "/",
  type: "profile",
  image: siteConfig.ogImage,
  imageAlt: siteConfig.ogImageAlt,
});

export default function Home() {
  const projectSchemaItems = featuredProjects.map((project) => ({
    title: project.title,
    description: project.description,
    href: project.href,
  }));

  return (
    <>
      <JsonLd data={siteJsonLdGraph(projectSchemaItems)} />
      <main className="relative min-h-screen bg-white">
        <SiteNav />
        <PromoBanner />
        <Hero />
        <Work />
        <SkillsHub />
        <Experience />
        <About />
        <section className="bg-[#f5f5f7] px-5 pb-10 text-center">
          <div className="mx-auto flex max-w-[720px] flex-wrap items-center justify-center gap-6 text-[17px]">
            <Link href="/about/" className="apple-link inline-flex items-center gap-1">
              Full biography <span aria-hidden>›</span>
            </Link>
            <Link href="/experience/" className="apple-link inline-flex items-center gap-1">
              Career timeline <span aria-hidden>›</span>
            </Link>
            <Link href="/articles/" className="apple-link inline-flex items-center gap-1">
              Articles <span aria-hidden>›</span>
            </Link>
            <Link href="/contact/" className="apple-link inline-flex items-center gap-1">
              Contact page <span aria-hidden>›</span>
            </Link>
          </div>
        </section>
        <Contact />
        <SiteFooter />
      </main>
    </>
  );
}
