#!/usr/bin/env node
/**
 * Lightweight post-build SEO checks for the static export in /out.
 * Run: npm run build && npm run seo:check
 */

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "out");
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://jeet-portfolio-5q5.pages.dev"
).replace(/\/+$/, "");

const errors = [];
const warnings = [];

function fail(msg) {
  errors.push(msg);
}
function warn(msg) {
  warnings.push(msg);
}

function mustExist(rel) {
  const path = join(outDir, rel);
  if (!existsSync(path)) fail(`Missing required file: out/${rel}`);
  return path;
}

function read(rel) {
  return readFileSync(join(outDir, rel), "utf8");
}

if (!existsSync(outDir)) {
  console.error("out/ not found. Run `npm run build` first.");
  process.exit(1);
}

mustExist("index.html");
mustExist("robots.txt");
mustExist("sitemap.xml");
mustExist("og-image.png");
mustExist("bishwajeet-avatar.png");
mustExist("404.html");

const html = read("index.html");
const robots = read("robots.txt");
const sitemap = read("sitemap.xml");

// Title
const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
if (!titleMatch?.[1]?.trim()) fail("Homepage missing <title>");
else if (titleMatch[1].length < 15) warn(`Title looks short: "${titleMatch[1]}"`);
else if (titleMatch[1].length > 70) warn(`Title may be long for SERPs (${titleMatch[1].length} chars)`);

// Description
const descMatch = html.match(
  /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,
) || html.match(
  /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i,
);
if (!descMatch?.[1]?.trim()) fail("Homepage missing meta description");
else if (descMatch[1].length < 50) warn("Meta description is short");
else if (descMatch[1].length > 170) warn(`Meta description may be long (${descMatch[1].length} chars)`);

// Canonical
const canonicalMatch = html.match(
  /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
) || html.match(
  /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i,
);
if (!canonicalMatch?.[1]) fail("Homepage missing canonical link");
else if (!canonicalMatch[1].startsWith(siteUrl)) {
  fail(`Canonical does not use production site URL: ${canonicalMatch[1]}`);
}

// Robots meta should allow indexing
const robotsMeta = html.match(
  /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i,
);
if (robotsMeta?.[1] && /noindex/i.test(robotsMeta[1])) {
  fail(`Homepage accidentally noindex: ${robotsMeta[1]}`);
}

// OG basics
for (const prop of ["og:title", "og:description", "og:image", "og:url"]) {
  const re = new RegExp(
    `<meta[^>]+property=["']${prop}["'][^>]+content=["']([^"']+)["']`,
    "i",
  );
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${prop}["']`,
    "i",
  );
  const m = html.match(re) || html.match(re2);
  if (!m?.[1]) fail(`Missing Open Graph tag: ${prop}`);
  else if ((prop === "og:image" || prop === "og:url") && !/^https?:\/\//i.test(m[1])) {
    fail(`${prop} must be absolute URL, got: ${m[1]}`);
  } else if (/\/portfolio\/portfolio\//i.test(m[1])) {
    fail(`${prop} has doubled basePath: ${m[1]}`);
  }
}

// JSON-LD
const ldBlocks = [...html.matchAll(
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi,
)];
if (!ldBlocks.length) fail("Missing JSON-LD structured data");
else {
  for (const [, raw] of ldBlocks) {
    try {
      const data = JSON.parse(raw);
      const types = new Set();
      const collect = (node) => {
        if (!node || typeof node !== "object") return;
        if (Array.isArray(node)) {
          node.forEach(collect);
          return;
        }
        if (node["@type"]) types.add(node["@type"]);
        if (node["@graph"]) collect(node["@graph"]);
      };
      collect(data);
      for (const needed of ["Person", "WebSite", "ProfilePage"]) {
        if (![...types].some((t) => String(t).includes(needed))) {
          fail(`JSON-LD missing ${needed} schema`);
        }
      }
    } catch (e) {
      fail(`Invalid JSON-LD: ${e.message}`);
    }
  }
}

// H1
const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
if (!h1s.length) fail("Homepage missing H1");
else if (h1s.length > 1) warn(`Homepage has ${h1s.length} H1 elements`);

// robots.txt
if (!/User-Agent:\s*\*/i.test(robots)) fail("robots.txt missing User-Agent: *");
if (/Disallow:\s*\/\s*$/m.test(robots) && !/Allow:\s*\//i.test(robots)) {
  fail("robots.txt appears to block the whole site");
}
if (!robots.includes(`${siteUrl}/sitemap.xml`)) {
  fail(`robots.txt sitemap URL should include ${siteUrl}/sitemap.xml`);
}

// sitemap.xml
if (!sitemap.includes("<urlset")) fail("sitemap.xml missing urlset");
if (!sitemap.includes(`${siteUrl}/`)) fail(`sitemap.xml missing homepage ${siteUrl}/`);
if (/localhost|127\.0\.0\.1/i.test(sitemap)) fail("sitemap.xml contains localhost URLs");

// 404 should not be in sitemap
if (/404\.html|\/_not-found/i.test(sitemap)) fail("sitemap.xml should not include 404 routes");

console.log("SEO check against", siteUrl);
if (warnings.length) {
  console.log("\nWarnings:");
  for (const w of warnings) console.log(" -", w);
}
if (errors.length) {
  console.log("\nFailures:");
  for (const e of errors) console.log(" -", e);
  process.exit(1);
}

console.log("\nAll SEO checks passed.");
