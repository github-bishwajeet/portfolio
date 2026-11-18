"use client";

import { motion } from "motion/react";
import { Carousel, Card, type CardData } from "@/components/ui/apple-cards-carousel";
import { assetPath } from "@/lib/utils";

const cards: CardData[] = [
  {
    category: "AI platform · Current",
    title: "StudioJadu",
    alt: "StudioJadu AIDA creative platform interface screenshot",
    src: assetPath("/projects/studiojadu-card.jpg"),
    content: (
      <div className="space-y-4 text-[17px] leading-relaxed text-[#86868b]">
        <p>
          Animation studio platform for independent artists. AIDA creative workbench for story,
          image, and video generation wired into production systems.
        </p>
        <p>
          Focus: async media pipelines, job queues, service oriented APIs, and reliable delivery for
          long running AI workloads.
        </p>
        <a
          href="https://studiojadu.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="apple-link inline-flex items-center gap-1 text-[15px]"
        >
          studiojadu.com <span aria-hidden>›</span>
        </a>
      </div>
    ),
  },
  {
    category: "Commerce integrations",
    title: "MDware",
    alt: "MDware commerce integrations product screenshot",
    src: assetPath("/projects/mdware-card.jpg"),
    content: (
      <div className="space-y-4 text-[17px] leading-relaxed text-[#86868b]">
        <p>
          Lightspeed partner suite for invoicing, quoting, loyalty, and payments used by 1400+
          merchants across retail and ecommerce.
        </p>
        <p>
          Focus: multi tenant SaaS, webhook driven integrations, Peppol invoicing flows, and
          omnichannel data sync across Retail and eCom.
        </p>
        <a
          href="https://mdware.org/en"
          target="_blank"
          rel="noopener noreferrer"
          className="apple-link inline-flex items-center gap-1 text-[15px]"
        >
          mdware.org <span aria-hidden>›</span>
        </a>
      </div>
    ),
  },
  {
    category: "Real estate platform",
    title: "Valora Homes",
    alt: "Valora Homes real estate platform screenshot",
    src: assetPath("/projects/valora-card.jpg"),
    content: (
      <div className="space-y-4 text-[17px] leading-relaxed text-[#86868b]">
        <p>
          Calgary builder platform for custom homes, infill, and multi family developments with
          listings, project storytelling, and inquiry flows.
        </p>
        <p>
          Focus: content heavy property catalogs, lead capture pipelines, and performant marketing
          surfaces backed by structured listing data.
        </p>
        <a
          href="https://valorahomes.ca/"
          target="_blank"
          rel="noopener noreferrer"
          className="apple-link inline-flex items-center gap-1 text-[15px]"
        >
          valorahomes.ca <span aria-hidden>›</span>
        </a>
      </div>
    ),
  },
  {
    category: "Homes & developments",
    title: "Uprising Homes",
    alt: "Uprising Homes development brand site screenshot",
    src: assetPath("/projects/uprising-card.jpg"),
    content: (
      <div className="space-y-4 text-[17px] leading-relaxed text-[#86868b]">
        <p>
          Real estate development brand site for modern builds and community facing project
          experiences.
        </p>
        <p>
          Focus: modular page systems, media delivery, and conversion oriented flows that stay fast
          under rich imagery.
        </p>
        <a
          href="https://uprisinghomes.ca/"
          target="_blank"
          rel="noopener noreferrer"
          className="apple-link inline-flex items-center gap-1 text-[15px]"
        >
          uprisinghomes.ca <span aria-hidden>›</span>
        </a>
      </div>
    ),
  },
  {
    category: "Clinic operations",
    title: "Gaesthetic Room",
    alt: "Gaesthetic Room clinic website screenshot",
    src: assetPath("/projects/gaesthetic-card.jpg"),
    content: (
      <div className="space-y-4 text-[17px] leading-relaxed text-[#86868b]">
        <p>
          Medical aesthetics clinic in Calgary with treatments, mobile services, content, and
          booking oriented journeys.
        </p>
        <p>
          Focus: appointment and inquiry workflows, service catalog architecture, and reliable CMS
          backed delivery for clinic ops.
        </p>
        <a
          href="https://gaestheticroom.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="apple-link inline-flex items-center gap-1 text-[15px]"
        >
          gaestheticroom.com <span aria-hidden>›</span>
        </a>
      </div>
    ),
  },
  {
    category: "Floral commerce",
    title: "Satnam Floral Design",
    alt: "Satnam Floral Design commerce site screenshot",
    src: assetPath("/projects/satnams-card.jpg"),
    content: (
      <div className="space-y-4 text-[17px] leading-relaxed text-[#86868b]">
        <p>
          Floral design brand experience for custom arrangements, events, and customer discovery.
        </p>
        <p>
          Focus: catalog and order inquiry systems, media first UX, and backend patterns that keep
          seasonal inventory and requests organized.
        </p>
        <a
          href="https://satnamsfloraldesign.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="apple-link inline-flex items-center gap-1 text-[15px]"
        >
          satnamsfloraldesign.com <span aria-hidden>›</span>
        </a>
      </div>
    ),
  },
  {
    category: "Fintech lending",
    title: "Calgary Lending",
    alt: "Calgary Lending mortgage platform screenshot",
    src: assetPath("/projects/calgarylending-card.jpg"),
    content: (
      <div className="space-y-4 text-[17px] leading-relaxed text-[#86868b]">
        <p>
          Strategic mortgage platform for investors covering investment purchases, consolidation,
          and creative finance across Canada.
        </p>
        <p>
          Focus: lead qualification pipelines, secure form processing, and structured routing from
          first conversation to funding handoff.
        </p>
        <a
          href="https://calgarylendingofficial.ca/"
          target="_blank"
          rel="noopener noreferrer"
          className="apple-link inline-flex items-center gap-1 text-[15px]"
        >
          calgarylendingofficial.ca <span aria-hidden>›</span>
        </a>
      </div>
    ),
  },
  {
    category: "Care operations",
    title: "Merge Community Services",
    alt: "Merge Community Services care operations platform screenshot",
    src: assetPath("/projects/mergecs-card.jpg"),
    content: (
      <div className="space-y-4 text-[17px] leading-relaxed text-[#86868b]">
        <p>
          Alberta agency platform for child and family transportation, supervised visits, and
          caseworker referrals.
        </p>
        <p>
          Focus: scheduling systems, referral intake, documentation workflows, and service
          coordination across caseworkers and support staff.
        </p>
        <a
          href="https://mergecs.ca/"
          target="_blank"
          rel="noopener noreferrer"
          className="apple-link inline-flex items-center gap-1 text-[15px]"
        >
          mergecs.ca <span aria-hidden>›</span>
        </a>
      </div>
    ),
  },
];

export function Work() {
  return (
    <section id="work" className="overflow-x-hidden bg-[#f5f5f7] py-20 md:py-28">
      <div className="mx-auto max-w-[980px] px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="apple-headline text-[40px] text-[#1d1d1f] md:text-[56px]">
            Built to ship.
          </h2>
          <p className="mx-auto mt-3 max-w-[620px] text-[15px] font-extralight leading-[1.55] tracking-[0.01em] text-[#6e6e73] [word-spacing:0.08em] md:text-[17px] md:leading-[1.6]">
            Real products across AI platforms, commerce integrations, and operational systems.
          </p>
        </motion.div>
      </div>

      <div className="mt-10">
        <Carousel
          items={cards.map((card, index) => (
            <Card key={card.title} card={card} index={index} layout />
          ))}
        />
      </div>
    </section>
  );
}
