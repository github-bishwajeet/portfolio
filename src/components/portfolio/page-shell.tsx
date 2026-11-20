import Link from "next/link";
import { SiteNav } from "@/components/portfolio/site-nav";
import { SiteFooter } from "@/components/portfolio/site-footer";

type Crumb = { href?: string; label: string };

export function PageShell({
  children,
  crumbs,
}: {
  children: React.ReactNode;
  crumbs?: Crumb[];
}) {
  return (
    <main className="relative min-h-screen bg-white">
      <SiteNav />
      <div className="bg-[#f5f5f7] pt-24 md:pt-28">
        {crumbs && crumbs.length > 0 ? (
          <nav
            aria-label="Breadcrumb"
            className="mx-auto max-w-[720px] px-5 pb-2 text-[13px] text-[#6e6e73]"
          >
            <ol className="flex flex-wrap items-center gap-1.5">
              {crumbs.map((crumb, index) => (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
                  {index > 0 ? <span aria-hidden>›</span> : null}
                  {crumb.href ? (
                    <Link href={crumb.href} className="apple-link">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[#1d1d1f]">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        {children}
      </div>
      <SiteFooter />
    </main>
  );
}
