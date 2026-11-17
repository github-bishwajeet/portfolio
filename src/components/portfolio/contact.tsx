"use client";

import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

export function Contact() {
  return (
    <section id="contact" className="bg-black px-5 py-24 text-center md:py-32">
      <div className="mx-auto max-w-[820px]">
        <h2 className="apple-headline text-[40px] text-white md:text-[56px]">
          Let&apos;s talk.
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-[19px] leading-[1.55] font-normal text-[#a1a1a6] md:text-[21px] md:leading-[1.6]">
          Best for product teams hiring Jeet (Bishwajeet Kumar) as a senior fullstack engineer.
          Also open to a few well scoped collaborations.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:bishwajeetk003@gmail.com"
            className="rounded-full bg-[#0071e3] px-6 py-3 text-[17px] font-medium text-white transition hover:bg-[#0077ed]"
          >
            Email Jeet
          </a>
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/Bishwajeet-Resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#424245] px-6 py-3 text-[17px] font-medium text-white transition hover:bg-[#525255]"
          >
            Resume
          </a>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-[#a1a1a6]">
          <a
            href="https://www.linkedin.com/in/bishwajeet-kumar-2b044a14a/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[14px] transition hover:text-white"
          >
            <IconBrandLinkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href="https://github.com/github-bishwajeet"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[14px] transition hover:text-white"
          >
            <IconBrandGithub className="h-4 w-4" />
            GitHub
          </a>
        </div>

        <p className="mt-16 text-[12px] text-[#6e6e73]">
          Copyright © 2026 Bishwajeet Kumar (Jeet). Bengaluru.
        </p>
      </div>
    </section>
  );
}
