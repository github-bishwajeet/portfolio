import type { Metadata, Viewport } from "next";
import { Geist_Mono, Outfit } from "next/font/google";
import { absoluteUrl, siteConfig } from "@/lib/seo";
import "./globals.css";

const sans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
  creator: siteConfig.fullName,
  publisher: siteConfig.fullName,
  keywords: [...siteConfig.keywords],
  category: "technology",
  alternates: {
    canonical: "./",
  },
  robots: {
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
    type: "profile",
    locale: siteConfig.locale,
    url: `${siteConfig.url}/`,
    siteName: siteConfig.name,
    title: `${siteConfig.fullName} (Jeet) | ${siteConfig.jobTitle}`,
    description: siteConfig.description,
    firstName: "Bishwajeet",
    lastName: "Kumar",
    username: "Jeet",
    images: [
      {
        // Absolute URL avoids basePath + metadataBase double-prefixing
        url: absoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: siteConfig.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.fullName} (Jeet) | ${siteConfig.jobTitle}`,
    description: siteConfig.description,
    images: [absoluteUrl("/og-image.png")],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // HTML-tag verification — TXT is not available on *.pages.dev (Cloudflare-owned DNS)
  verification: {
    google: "BCwpcunxVSJne9oVBuoRbNT6QXcZooh7XRbprh8TiiA",
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
      <body className="min-h-full font-sans text-foreground">{children}</body>
    </html>
  );
}
