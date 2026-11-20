import Link from "next/link";
import { siteConfig } from "@/lib/seo";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/experience/", label: "Experience" },
  { href: "/articles/", label: "Articles" },
  { href: "/contact/", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-[#d2d2d7] bg-[#f5f5f7] px-5 py-12">
      <div className="mx-auto flex max-w-[980px] flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-[420px]">
          <p className="text-[17px] font-semibold tracking-tight text-[#1d1d1f]">
            {siteConfig.fullName}
          </p>
          <p className="mt-1 text-[14px] text-[#6e6e73]">
            Known as {siteConfig.nickname} · {siteConfig.jobTitle} at{" "}
            {siteConfig.organization.name}
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-[#86868b]">
            Canonical professional identity:{" "}
            <a href={siteConfig.url} className="apple-link">
              jeetstack.com
            </a>
            . {siteConfig.location.label}.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] text-[#1d1d1f]/80 transition hover:text-[#1d1d1f]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-[980px] flex-wrap items-center justify-between gap-3 border-t border-[#d2d2d7] pt-6 text-[12px] text-[#6e6e73]">
        <p>
          Copyright © {new Date().getFullYear()} {siteConfig.fullName} (
          {siteConfig.nickname}).
        </p>
        <div className="flex flex-wrap gap-4">
          {siteConfig.sameAs.map((url) => {
            const label = url.includes("linkedin")
              ? "LinkedIn"
              : url.includes("github")
                ? "GitHub"
                : url.includes("crio")
                  ? "Crio"
                  : "Profile";
            return (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer me"
                className="transition hover:text-[#1d1d1f]"
              >
                {label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
