"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { assetPath, cn } from "@/lib/utils";

const links = [
  { name: "Work", href: "#work" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "About", href: "#about" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-12 border-b transition-colors",
        scrolled
          ? "border-black/5 bg-[rgba(251,251,253,0.8)] backdrop-blur-[20px]"
          : "border-transparent bg-[rgba(251,251,253,0.72)] backdrop-blur-[20px]",
      )}
    >
      <div className="mx-auto flex h-full max-w-[980px] items-center justify-between px-5 text-[12px]">
        <a href="#top" className="flex items-center gap-2 text-[#1d1d1f]" aria-label="Jeet home">
          <Image
            src={assetPath("/bishwajeet-avatar.png")}
            alt=""
            width={22}
            height={22}
            className="h-[22px] w-[22px] rounded-full object-cover"
            priority
          />
          <span className="text-[14px] font-semibold tracking-tight">Jeet</span>
        </a>

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#1d1d1f]/80 transition hover:text-[#1d1d1f]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3.5">
          <a
            href="https://www.crio.do/learn/portfolio/bishwajeetk003/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-1 py-1 text-[12px] font-medium text-[#1d1d1f]/80 transition hover:text-[#1d1d1f]"
          >
            Crio
          </a>
          <a
            href="https://www.linkedin.com/in/bishwajeet-kumar-2b044a14a/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-1 py-1 text-[12px] font-medium text-[#1d1d1f]/80 transition hover:text-[#1d1d1f]"
          >
            <IconBrandLinkedin className="h-3.5 w-3.5" />
            LinkedIn
          </a>
          <a
            href="https://github.com/github-bishwajeet"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#1d1d1f] px-2.5 py-1 text-[12px] font-medium text-white transition hover:bg-black"
          >
            <IconBrandGithub className="h-3.5 w-3.5" />
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
