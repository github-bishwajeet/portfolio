import type { MetadataRoute } from "next";
import { absoluteUrl, indexableRoutes } from "@/lib/seo";
import { publishedArticles } from "@/data/articles";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Keep entries plain — exotic extensions / ms timestamps have broken GSC reads.
  const buildDay = new Date().toISOString().slice(0, 10);

  const pages: MetadataRoute.Sitemap = indexableRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: buildDay,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const articlePages: MetadataRoute.Sitemap = publishedArticles().map(
    (article) => ({
      url: absoluteUrl(`/articles/${article.slug}/`),
      lastModified: article.dateModified ?? article.datePublished,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [...pages, ...articlePages];
}
