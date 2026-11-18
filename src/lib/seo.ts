/**
 * Central SEO configuration for the portfolio.
 *
 * Production host defaults to the custom domain. Override with NEXT_PUBLIC_SITE_URL
 * if needed (no trailing slash).
 */

const DEFAULT_SITE_URL = "https://jeetstack.com";

function normalizeSiteUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "Jeet · Bishwajeet Kumar",
  shortName: "Jeet",
  fullName: "Bishwajeet Kumar",
  nickname: "Jeet",
  jobTitle: "Senior Fullstack Engineer",
  location: "Bengaluru, India",
  email: "bishwajeetk003@gmail.com",
  locale: "en_US",
  language: "en",
  /** Absolute site origin including path prefix (no trailing slash). */
  url: normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL,
  ),
  description:
    "Jeet (Bishwajeet Kumar) is a senior fullstack engineer in Bengaluru building distributed systems, microservices, job queues, and AI products. Currently at StudioJadu.",
  keywords: [
    "Bishwajeet Kumar",
    "Jeet",
    "Senior Fullstack Engineer",
    "Bengaluru",
    "distributed systems",
    "microservices",
    "Laravel",
    "Node.js",
    "React",
    "StudioJadu",
  ],
  sameAs: [
    "https://github.com/github-bishwajeet",
    "https://www.linkedin.com/in/bishwajeet-kumar-2b044a14a/",
    "https://www.crio.do/learn/portfolio/bishwajeetk003/",
  ] as const,
  ogImageAlt:
    "Jeet (Bishwajeet Kumar) — Senior Fullstack Engineer portfolio",
} as const;

export function absoluteUrl(path = "/") {
  const base = siteConfig.url;
  if (!path || path === "/") return `${base}/`;
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.fullName,
    alternateName: siteConfig.nickname,
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.description,
    url: `${siteConfig.url}/`,
    image: absoluteUrl("/bishwajeet-avatar.webp"),
    email: `mailto:${siteConfig.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressCountry: "IN",
    },
    sameAs: [...siteConfig.sameAs],
    knowsAbout: [
      "Distributed systems",
      "Microservices",
      "Job queues",
      "Laravel",
      "Node.js",
      "React",
      "AI product engineering",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: `${siteConfig.url}/`,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { "@id": `${siteConfig.url}/#person` },
  };
}

export function profilePageJsonLd() {
  return {
    "@type": "ProfilePage",
    "@id": `${siteConfig.url}/#profilepage`,
    url: `${siteConfig.url}/`,
    name: `${siteConfig.fullName} — ${siteConfig.jobTitle}`,
    description: siteConfig.description,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    mainEntity: { "@id": `${siteConfig.url}/#person` },
    about: { "@id": `${siteConfig.url}/#person` },
  };
}

export function portfolioItemListJsonLd(
  items: { title: string; description: string; href?: string }[],
) {
  return {
    "@type": "ItemList",
    "@id": `${siteConfig.url}/#projects`,
    name: "Selected work by Bishwajeet Kumar",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: item.title,
        description: item.description,
        ...(item.href ? { url: item.href } : {}),
        creator: { "@id": `${siteConfig.url}/#person` },
      },
    })),
  };
}

export function siteJsonLdGraph(
  projects: { title: string; description: string; href?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteJsonLd(),
      personJsonLd(),
      profilePageJsonLd(),
      portfolioItemListJsonLd(projects),
    ],
  };
}
