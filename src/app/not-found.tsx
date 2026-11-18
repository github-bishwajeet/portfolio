import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Page not found",
  description: `The page you requested was not found on ${siteConfig.name}.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f5f5f7] px-5 text-center">
      <p className="text-[15px] font-semibold tracking-wide text-[#86868b] uppercase">
        404
      </p>
      <h1 className="apple-headline mt-3 text-[40px] text-[#1d1d1f] md:text-[56px]">
        Page not found.
      </h1>
      <p className="mt-4 max-w-[420px] text-[17px] text-[#86868b]">
        That URL is not part of Jeet&apos;s portfolio. Head back to the homepage.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-[#0071e3] px-6 py-3 text-[17px] font-medium text-white transition hover:bg-[#0077ed]"
      >
        Back to portfolio
      </Link>
    </main>
  );
}
