import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics";
import {
  brand,
  contactEmail,
  description,
  founder,
  founderHandle,
  founderProfiles,
  location,
  siteUrl,
  title,
} from "./content";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1b2b63",
  width: "device-width",
  initialScale: 1,
};

/*
 * Site-wide defaults. Page-specific fields (canonical, og:url, og:title)
 * live in each page's `metadata` so a new page never inherits the home
 * page's canonical URL.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${brand}`,
  },
  description,
  applicationName: brand,
  authors: [{ name: founder, url: siteUrl }],
  creator: founder,
  publisher: brand,
  category: "technology",
  twitter: {
    card: "summary_large_image",
    creator: founderHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${siteUrl}/#organization`,
      name: brand,
      url: siteUrl,
      email: contactEmail,
      description,
      founder: { "@id": `${siteUrl}/#founder` },
      address: {
        "@type": "PostalAddress",
        addressLocality: location.city,
        addressCountry: location.countryCode,
      },
      areaServed: "Worldwide",
      priceRange: "€€€",
      knowsAbout: [
        "Standing agents",
        "Agent development",
        "Coding agents",
        "Eval suites",
        "Approval gates",
        "Flue",
        "Cloudflare Workers",
        "TypeScript",
        "Software development",
      ],
      logo: `${siteUrl}/icon.svg`,
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#founder`,
      name: founder,
      jobTitle: "Founder",
      url: siteUrl,
      worksFor: { "@id": `${siteUrl}/#organization` },
      sameAs: founderProfiles,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: brand,
      description,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en",
    },
  ],
};

/* `<` becomes `\u003c` so no string in the graph can close the script tag. */
const jsonLdHtml = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${plexMono.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdHtml }}
        />
        <Analytics />
      </body>
    </html>
  );
}
