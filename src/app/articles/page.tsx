import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { PageShell } from "@/components/portfolio/page-shell";
import { articleTopicIdeas, publishedArticles } from "@/data/articles";
import {
  articlesIndexJsonLdGraph,
  createPageMetadata,
  siteConfig,
} from "@/lib/seo";
import { assetPath } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: `Articles | ${siteConfig.fullName} (Jeet)`,
  description: `Technical writing by ${siteConfig.fullName} (Jeet) on AI powered workflows, distributed systems, microservices, and production software engineering.`,
  path: "/articles/",
});

export default function ArticlesPage() {
  const posts = publishedArticles();

  return (
    <>
      <JsonLd data={articlesIndexJsonLdGraph()} />
      <PageShell
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Articles" },
        ]}
      >
        <div className="mx-auto max-w-[720px] px-5 pb-20 md:pb-28">
          <header className="text-center">
            <p className="text-[12px] font-medium tracking-[0.12em] text-[#6e6e73] uppercase">
              Writing
            </p>
            <h1 className="apple-headline mt-3 text-[40px] leading-[1.08] text-[#1d1d1f] md:text-[52px]">
              Articles.
            </h1>
            <p className="mx-auto mt-3 max-w-[560px] text-[15px] font-extralight leading-[1.55] text-[#6e6e73] md:text-[17px]">
              Original technical writing by {siteConfig.fullName}. Author
              profile:{" "}
              <Link href="/about/" className="apple-link font-normal">
                /about
              </Link>
              .
            </p>
          </header>

          {posts.length > 0 && (
            <ul className="mt-14 space-y-5">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/articles/${post.slug}/`}
                    className="block rounded-[22px] border border-[#d2d2d7]/80 bg-white px-6 py-6 transition hover:border-[#86868b]"
                  >
                    <p className="text-[12px] font-medium text-[#6e6e73]">
                      {post.category} · {post.datePublished}
                    </p>
                    <h2 className="mt-2 text-[22px] font-semibold tracking-tight text-[#1d1d1f]">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-[15px] leading-relaxed text-[#6e6e73]">
                      {post.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-14">
            <p className="text-[13px] font-semibold tracking-wide text-[#1d1d1f] uppercase">
              Research agenda
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-[#86868b]">
              Working titles and abstracts derived from systems shipped at
              StudioJadu / Scenarix. Public safe only. Full papers publish when
              the writeup is complete.
            </p>
            <ul className="mt-5 space-y-5">
              {articleTopicIdeas.map((topic) => (
                <li
                  key={topic.title}
                  className="flex items-start gap-4 border-b border-[#f0f0f2] pb-5 last:border-b-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1 text-[14px] leading-relaxed text-[#6e6e73]">
                    <p className="font-medium text-[#1d1d1f]">{topic.title}</p>
                    <p className="mt-1">{topic.why}</p>
                    <p className="mt-1 text-[12px] text-[#86868b]">
                      {topic.repos.join(" · ")}
                    </p>
                  </div>
                  <Image
                    src={assetPath(topic.icon)}
                    alt=""
                    width={96}
                    height={96}
                    className="mt-0.5 size-[72px] shrink-0 rounded-xl border-[3px] border-white bg-white md:size-20"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 flex flex-wrap gap-6 text-[17px]">
            <Link href="/about/" className="apple-link inline-flex items-center gap-1">
              About the author <span aria-hidden>›</span>
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
