import type { Metadata } from "next";
import { SiteNav } from "@/components/portfolio/site-nav";
import { PromoBanner } from "@/components/portfolio/promo-banner";
import { Hero } from "@/components/portfolio/hero";
import { Work } from "@/components/portfolio/work";
import { SkillsHub } from "@/components/portfolio/skills-hub";
import { Experience } from "@/components/portfolio/experience";
import { About } from "@/components/portfolio/about";
import { Contact } from "@/components/portfolio/contact";
import { JsonLd } from "@/components/seo/json-ld";
import { featuredProjects } from "@/data/portfolio";
import { siteConfig, siteJsonLdGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.fullName} (Jeet) | ${siteConfig.jobTitle}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "./",
  },
};

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
        <Contact />
      </main>
    </>
  );
}
