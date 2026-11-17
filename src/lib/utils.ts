export { cn } from "cn";

/** Prefix public asset paths with the GitHub Pages basePath in production. */
export function assetPath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path) return base || "/";
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}
