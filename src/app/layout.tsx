import type { Metadata, Viewport } from "next";
import { Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const sans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jeet · Bishwajeet Kumar | Senior Fullstack Engineer",
  description:
    "Jeet (Bishwajeet Kumar). Senior Fullstack Engineer focused on distributed systems, microservices, queuing, and AI products. Currently at Studio Jadu.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full font-sans text-foreground">{children}</body>
    </html>
  );
}
