import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { brand, founder, founderHandle, homePage, siteUrl } from "./content";
import { graphHtml, siteNodes } from "./structured-data";
import "./globals.css";

/*
 * The four families the stylesheet reads, each on its own --font-* variable:
 * Inter Tight for headings, Inter for prose, Playfair Display for the italic
 * words inside a display heading, JetBrains Mono for strings a machine wrote.
 * next/font self-hosts them and preloads each one, so no request leaves for
 * Google at runtime. They load `swap` with size-adjusted fallbacks, which is
 * what keeps the hero from moving when a font arrives after the first paint.
 */
const interTight = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#efe7d2",
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
    <html lang="en" className={`${interTight.variable} ${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
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
