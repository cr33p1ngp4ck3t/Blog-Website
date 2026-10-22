import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import "./styles/globals.css";
import "./styles/magazine.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { ThemeProvider } from "./components/ThemeProvider";
import { jsonLd, siteDescription, siteUrl } from "@/lib/site";

const display = localFont({
  src: "../../public/display.ttf",
  variable: "--font-display",
  display: "swap",
});
const body = localFont({
  src: "../../public/body.ttf",
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FinAid Hub — Make your money make sense",
    template: "%s | FinAid Hub",
  },
  description: siteDescription,
  openGraph: {
    title: "FinAid Hub — Make your money make sense",
    description: siteDescription,
    url: siteUrl,
    siteName: "FinAid Hub",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FinAid Hub — Make your money make sense",
    description: siteDescription,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body id="top" className={`${display.variable} ${body.variable}`}>
        <ThemeProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <Header />
          {children}
          <Footer />
          <Analytics />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "FinAid Hub",
              url: siteUrl,
              description: siteDescription,
            }),
          }}
        />
      </body>
    </html>
  );
}
