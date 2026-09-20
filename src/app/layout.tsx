import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { brand, description, founder, founderHandle, siteUrl, title } from "./content";
import { graphHtml, siteNodes } from "./structured-data";
import "./globals.css";

/*
 * One text family, used through its width axis: the display sizes run expanded,
 * the prose runs normal, and a spec label runs narrowed. The width axis does
 * the work a second family or an all-caps label would otherwise do.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

/* Machine-emitted text only: a handle, a channel, a timestamp, a diff, a path. */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0d1330",
  width: "device-width",
  initialScale: 1,
};

/*
 * Site-wide defaults. Page-specific fields (canonical, og:url, og:title)
 * live in each page's `metadata` so a new page never inherits the home
 * page's canonical URL. Robots stays out for a different reason: the
 * framework's not-found route inherits this object, and an `index, follow`
 * here would sit next to the `noindex` that route emits.
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
  formatDetection: {
    telephone: false,
  },
};

/* The nodes true on every route, serialised once. A page adds its own nodes in
 * its own script rather than restating these. */
const jsonLdHtml = graphHtml(siteNodes);

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
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
