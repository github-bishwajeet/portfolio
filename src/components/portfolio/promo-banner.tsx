export function PromoBanner() {
  return (
    <div className="fixed inset-x-0 top-12 z-40 bg-[#0071e3]">
      <p className="mx-auto flex min-h-10 max-w-[980px] flex-wrap items-center justify-center gap-x-1.5 px-0 py-2.5 text-center text-[12px] leading-snug text-white md:px-5 md:text-[14px]">
        <span className="md:hidden">
          Building AI systems at StudioJadu. Open to senior roles.
        </span>
        <span className="hidden md:inline">
          Building distributed AI pipelines and queued media systems at
          StudioJadu. Open to senior software engineering roles.
        </span>
        <a
          href="/contact/"
          className="inline-flex shrink-0 items-center gap-0.5 whitespace-nowrap font-normal text-white underline underline-offset-2"
        >
          Get in touch
          <span aria-hidden>›</span>
        </a>
      </p>
    </div>
  );
}
