import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { brand, founder, founderHandle, homePage, siteUrl } from "./content";
import { graphHtml, siteNodes } from "./structured-data";
import "./globals.css";

/*
 * Both families load `optional`, which is what holds the first paint still.
 * The browser draws the page once: it uses a web font if that font is already
 * in hand, and otherwise keeps the fallback for the rest of the pageview. A
 * swap can therefore never move the hero lede, the buttons under it or the
 * console. `swap` moved all three, because Archivo carries the display sizes
 * on its width axis, no fallback has a width axis, and a heading that rewraps
 * one line taller pushes every band under it down. Each family sets text that
 * sits in the flow, so each one has to load this way for the page to hold.
 *
 * The preload stays on. It gives a font its one chance to arrive before the
 * paint, and it puts the font in the cache for the next page either way.
 */

/*
 * One text family, used through its width axis: the display sizes run expanded,
 * the prose runs normal, and a spec label runs narrowed. The width axis does
 * the work a second family or an all-caps label would otherwise do.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "optional",
});

/* Machine-emitted text only: a handle, a channel, a timestamp, a diff, a path. */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: "400",
  subsets: ["latin"],
  display: "optional",
});

export const viewport: Viewport = {
  themeColor: "#0d1330",
  width: "device-width",
  initialScale: 1,
};

/*
 * Site-wide defaults. Every written page states its own title, description,
 * canonical URL and unfurl fields through `pageMetadata`, so what is left
 * here is what holds for the whole site.
 *
 * The title serves the one route with no page record: the framework's
 * not-found route, which states its own heading and takes the brand from the
 * template. The default beside it is the home page's title, which is the
 * site's. Robots stays out for a different reason: that same not-found route
 * inherits this object, and an `index, follow` here would sit next to the
 * `noindex` the route emits.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homePage.title,
    template: `%s | ${brand}`,
  },
  description: homePage.description,
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
