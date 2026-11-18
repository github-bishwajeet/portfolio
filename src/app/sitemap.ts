import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Keep this intentionally plain — image extensions + millisecond timestamps
  // have caused "Sitemap could not be read" for some Google crawlers.
  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date().toISOString().slice(0, 10),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
