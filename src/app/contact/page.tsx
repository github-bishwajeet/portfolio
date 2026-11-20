import type { Metadata } from "next";
import Link from "next/link";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { JsonLd } from "@/components/seo/json-ld";
import { PageShell } from "@/components/portfolio/page-shell";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
  personId,
  personJsonLd,
  siteConfig,
  websiteId,
} from "@/lib/seo";
import { assetPath } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: `Contact ${siteConfig.fullName} (Jeet)`,
  description: `Contact ${siteConfig.fullName} (Jeet), ${siteConfig.jobTitle} at ${siteConfig.organization.name}. Email, resume, LinkedIn, and GitHub.`,
  path: "/contact/",
});

function contactJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": absoluteUrl("/contact/#webpage"),
        url: absoluteUrl("/contact/"),
        name: `Contact ${siteConfig.fullName}`,
        description: `Get in touch with ${siteConfig.fullName} (Jeet).`,
        isPartOf: { "@id": websiteId() },
        mainEntity: { "@id": personId() },
      },
      personJsonLd(),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact/" },
      ]),
    ],
  };
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactJsonLd()} />
      <PageShell
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Contact" },
        ]}
      >
        <div className="mx-auto max-w-[720px] px-5 pb-20 text-center md:pb-28">
          <p className="text-[12px] font-medium tracking-[0.12em] text-[#6e6e73] uppercase">
            Contact
          </p>
          <h1 className="apple-headline mt-3 text-[40px] leading-[1.08] text-[#1d1d1f] md:text-[52px]">
            Let&apos;s talk.
          </h1>
          <p className="mx-auto mt-4 max-w-[520px] text-[17px] leading-[1.55] text-[#6e6e73] md:text-[19px]">
            Best for product teams hiring {siteConfig.nickname} (
            {siteConfig.fullName}) as a {siteConfig.jobTitle.toLowerCase()}.
            Also open to a few well-scoped collaborations.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="rounded-full bg-[#0071e3] px-6 py-3 text-[17px] font-medium text-white transition hover:bg-[#0077ed]"
            >
              Email {siteConfig.nickname}
            </a>
            <a
              href={assetPath("/Bishwajeet-Resume.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#424245] px-6 py-3 text-[17px] font-medium text-white transition hover:bg-[#525255]"
            >
              Resume
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-[#6e6e73]">
            <a
              href="https://www.linkedin.com/in/bishwajeet-kumar-2b044a14a/"
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex items-center gap-2 text-[14px] transition hover:text-[#1d1d1f]"
            >
              <IconBrandLinkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href="https://github.com/github-bishwajeet"
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex items-center gap-2 text-[14px] transition hover:text-[#1d1d1f]"
            >
              <IconBrandGithub className="h-4 w-4" />
              GitHub
            </a>
          </div>

          <div className="mt-14 flex flex-wrap justify-center gap-6 text-[17px]">
            <Link href="/about/" className="apple-link inline-flex items-center gap-1">
              About <span aria-hidden>›</span>
            </Link>
            <Link href="/experience/" className="apple-link inline-flex items-center gap-1">
              Experience <span aria-hidden>›</span>
            </Link>
          </div>
        </div>
      </PageShell>
    </>
  );
}
