/**
 * Central SEO + personal entity configuration for jeetstack.com.
 *
 * Production host defaults to the custom domain. Override with NEXT_PUBLIC_SITE_URL
 * if needed (no trailing slash).
 *
 * TODO(confirm): LPU graduation year and field of study for alumniOf detail.
 * TODO(confirm): Additional sameAs profiles (X/Twitter, Medium, Dev.to) if any.
 * TODO(confirm): Whether public email should remain in Person JSON-LD.
 */

import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://jeetstack.com";

function normalizeSiteUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "Jeet · Bishwajeet Kumar",
  shortName: "Jeet",
  fullName: "Bishwajeet Kumar",
  nickname: "Jeet",
  /** Canonical professional designation for metadata + Person schema */
  jobTitle: "Senior Software Engineer",
  organization: {
    name: "StudioJadu",
    url: "https://studiojadu.com/",
  },
  location: {
    locality: "Bengaluru",
    region: "Karnataka",
    country: "IN",
    label: "Bengaluru, Karnataka, India",
  },
  email: "bishwajeetk003@gmail.com",
  locale: "en_US",
  language: "en",
  /** Absolute site origin (no trailing slash). */
  url: normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL,
  ),
  description:
    "Bishwajeet Kumar (Jeet) is a Senior Software Engineer at StudioJadu in Bengaluru building full-stack systems, AI creative workflows, and distributed architectures.",
  keywords: [
    "Bishwajeet Kumar",
    "Bishwajeet Kumar Jeet",
    "Jeet",
    "Jeet Software Engineer",
    "Senior Software Engineer",
    "Bengaluru",
    "StudioJadu",
    "full-stack engineer",
    "distributed systems",
    "microservices",
    "AI engineer",
    "Laravel",
    "Node.js",
    "Next.js",
    "Spring Boot",
  ],
  /**
   * Confirmed public profiles only (also linked in the UI).
   * Do not invent URLs here.
   */
  sameAs: [
    "https://github.com/github-bishwajeet",
    "https://www.linkedin.com/in/bishwajeet-kumar-2b044a14a/",
    "https://www.crio.do/learn/portfolio/bishwajeetk003/",
  ] as const,
  profileImage: "/bishwajeet-avatar.webp",
  profileImageAlt:
    "Bishwajeet Kumar (Jeet), Senior Software Engineer",
  ogImage: "/og-image.png",
  ogImageAlt:
    "Jeet (Bishwajeet Kumar) — Senior Software Engineer portfolio",
  knowsAbout: [
    "Full-Stack Engineering",
    "Distributed Systems",
    "Microservices",
    "Software Architecture",
    "Job Queues",
    "Laravel",
    "Node.js",
    "Next.js",
    "React",
    "Java",
    "Spring Boot",
    "Artificial Intelligence",
    "AI-powered Creative Workflows",
  ],
} as const;

export const indexableRoutes = [
  { path: "/", priority: 1, changeFrequency: "monthly" as const },
  { path: "/about/", priority: 0.9, changeFrequency: "monthly" as const },
  {
    path: "/experience/",
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  { path: "/articles/", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/contact/", priority: 0.7, changeFrequency: "yearly" as const },
] as const;

export function absoluteUrl(path = "/") {
  const base = siteConfig.url;
  if (!path || path === "/") return `${base}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function personId() {
  return `${siteConfig.url}/#person`;
}

export function organizationId() {
  return `${siteConfig.url}/#organization-studiojadu`;
}

export function websiteId() {
  return `${siteConfig.url}/#website`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** Use absolute title (no template suffix). Default true for unique SERP titles. */
  absoluteTitle?: boolean;
  type?: "website" | "profile" | "article";
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = true,
  type = "website",
  image = siteConfig.ogImage,
  imageAlt = siteConfig.ogImageAlt,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: type === "article" ? "article" : type === "profile" ? "profile" : "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      ...(type === "profile"
        ? {
            firstName: "Bishwajeet",
            lastName: "Kumar",
            username: "Jeet",
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": organizationId(),
    name: siteConfig.organization.name,
    url: siteConfig.organization.url,
  };
}

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": personId(),
    name: siteConfig.fullName,
    alternateName: [siteConfig.nickname, `${siteConfig.fullName} ${siteConfig.nickname}`],
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.description,
    url: `${siteConfig.url}/`,
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.profileImage),
      caption: siteConfig.profileImageAlt,
    },
    email: `mailto:${siteConfig.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.locality,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.country,
    },
    worksFor: {
      "@id": organizationId(),
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Lovely Professional University",
    },
    // TODO(confirm): graduation year + field of study for richer alumniOf / credential markup
    sameAs: [...siteConfig.sameAs],
    knowsAbout: [...siteConfig.knowsAbout],
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": websiteId(),
    name: siteConfig.name,
    url: `${siteConfig.url}/`,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { "@id": personId() },
    author: { "@id": personId() },
  };
}

export function profilePageJsonLd() {
  return {
    "@type": "ProfilePage",
    "@id": `${siteConfig.url}/#profilepage`,
    url: `${siteConfig.url}/`,
    name: `${siteConfig.fullName} — ${siteConfig.jobTitle}`,
    description: siteConfig.description,
    isPartOf: { "@id": websiteId() },
    mainEntity: { "@id": personId() },
    about: { "@id": personId() },
  };
}

export function aboutPageJsonLd() {
  return {
    "@type": "AboutPage",
    "@id": absoluteUrl("/about/#webpage"),
    url: absoluteUrl("/about/"),
    name: `About ${siteConfig.fullName} (Jeet)`,
    description: `Professional biography of ${siteConfig.fullName}, known as Jeet — ${siteConfig.jobTitle} at ${siteConfig.organization.name}.`,
    isPartOf: { "@id": websiteId() },
    mainEntity: { "@id": personId() },
    about: { "@id": personId() },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(items[items.length - 1]?.path ?? "/")}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function portfolioItemListJsonLd(
  items: {
    title: string;
    description: string;
    href?: string;
    /** creator = personal/open-source; contributor = employer or client work */
    credit?: "creator" | "contributor";
  }[],
) {
  return {
    "@type": "ItemList",
    "@id": `${siteConfig.url}/#projects`,
    name: "Selected work involving Bishwajeet Kumar",
    itemListElement: items.map((item, index) => {
      const credit = item.credit ?? "contributor";
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: item.title,
          description: item.description,
          ...(item.href ? { url: item.href } : {}),
          [credit]: { "@id": personId() },
        },
      };
    }),
  };
}

export function siteJsonLdGraph(
  projects: { title: string; description: string; href?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteJsonLd(),
      organizationJsonLd(),
      personJsonLd(),
      profilePageJsonLd(),
      portfolioItemListJsonLd(projects),
    ],
  };
}

export function aboutJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      personJsonLd(),
      aboutPageJsonLd(),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "About", path: "/about/" },
      ]),
    ],
  };
}

export function experienceJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": absoluteUrl("/experience/#webpage"),
        url: absoluteUrl("/experience/"),
        name: `Experience — ${siteConfig.fullName}`,
        description: `Career timeline for ${siteConfig.fullName} (Jeet), ${siteConfig.jobTitle} at ${siteConfig.organization.name}.`,
        isPartOf: { "@id": websiteId() },
        about: { "@id": personId() },
        mainEntity: { "@id": personId() },
      },
      organizationJsonLd(),
      personJsonLd(),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Experience", path: "/experience/" },
      ]),
    ],
  };
}

export function articlesIndexJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": absoluteUrl("/articles/#webpage"),
        url: absoluteUrl("/articles/"),
        name: `Articles by ${siteConfig.fullName}`,
        description: `Technical writing by ${siteConfig.fullName} (Jeet) on AI workflows, distributed systems, and software engineering.`,
        isPartOf: { "@id": websiteId() },
        author: { "@id": personId() },
      },
      personJsonLd(),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Articles", path: "/articles/" },
      ]),
    ],
  };
}

/**
 * Helper for future BlogPosting pages. Connects author to the stable Person @id.
 * Only call when publishing a real article with verified dates.
 */
export function articleJsonLd(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": absoluteUrl(`${input.path}#article`),
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { "@id": personId() },
    publisher: { "@id": personId() },
    mainEntityOfPage: absoluteUrl(input.path),
    image: absoluteUrl(input.image ?? siteConfig.ogImage),
    inLanguage: siteConfig.language,
  };
}
