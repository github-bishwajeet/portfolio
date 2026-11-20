import type { Metadata, Viewport } from "next";
import { Geist_Mono, Outfit } from "next/font/google";
import { absoluteUrl, siteConfig } from "@/lib/seo";
import { assetPath } from "@/lib/utils";
import "./globals.css";

const sans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`${siteConfig.url}/`),
  title: {
    default: `${siteConfig.fullName} (Jeet) | ${siteConfig.jobTitle}`,
    template: `%s | ${siteConfig.fullName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.fullName, url: absoluteUrl("/about/") }],
  creator: siteConfig.fullName,
  publisher: siteConfig.fullName,
  keywords: [...siteConfig.keywords],
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "BCwpcunxVSJne9oVBuoRbNT6QXcZooh7XRbprh8TiiA",
    other: {
      "msvalidate.01": "2F3200181643C645706D914A5AC1EB3F",
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1d1d1f" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.language}
      className={`${sans.variable} ${mono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          as="image"
          href={assetPath("/bishwajeet-avatar.webp")}
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-full font-sans text-foreground">{children}</body>
    </html>
  );
}
