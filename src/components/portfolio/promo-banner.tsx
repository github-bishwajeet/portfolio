export function PromoBanner() {
  return (
    <div className="fixed inset-x-0 top-12 z-40 bg-[#0071e3]">
      <p className="mx-auto flex min-h-10 max-w-[980px] flex-wrap items-center justify-center gap-x-1.5 px-5 py-2.5 text-center text-[12px] leading-snug text-white md:text-[14px]">
        <span className="md:hidden" style={{ wordSpacing: "0.18em" }}>
          Building AI systems at Studio Jadu. Open to senior roles.
        </span>
        <span className="hidden md:inline" style={{ wordSpacing: "0.22em" }}>
          Building distributed AI pipelines and queued media systems at Studio Jadu. Open to senior fullstack roles.
        </span>
        <a
          href="#contact"
          className="inline-flex shrink-0 items-center gap-0.5 whitespace-nowrap font-normal text-white underline underline-offset-2"
        >
          Get in touch
          <span aria-hidden>›</span>
        </a>
      </p>
    </div>
  );
}
