import { SiteNav } from "@/components/portfolio/site-nav";
import { PromoBanner } from "@/components/portfolio/promo-banner";
import { Hero } from "@/components/portfolio/hero";
import { Work } from "@/components/portfolio/work";
import { SkillsHub } from "@/components/portfolio/skills-hub";
import { Experience } from "@/components/portfolio/experience";
import { About } from "@/components/portfolio/about";
import { Contact } from "@/components/portfolio/contact";

export default function Home() {
  return (
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
  );
}
