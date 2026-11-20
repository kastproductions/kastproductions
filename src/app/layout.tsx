import type { Metadata, Viewport } from "next";
import { Azeret_Mono, Chakra_Petch, Zen_Old_Mincho } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { Rail } from "@/components/site-chrome";
import { cn } from "@/lib/utils";
import { brand, founder, founderHandle, homePage, language, siteUrl } from "./content";
import { graphHtml, siteNodes } from "./structured-data";
import { paper } from "./theme";
import "./globals.css";

/*
 * The three families of the Neo Mirai world (ADR-0006), each on its own
 * --font-* variable: Chakra Petch for display, Zen Old Mincho for every word
 * a person reads at length, and Azeret Mono for labels and strings a machine
 * wrote. globals.css maps them onto Tailwind's font-heading, font-sans and
 * font-mono. next/font self-hosts them and preloads the Latin files, so no
 * request leaves for Google at runtime. Each loads `swap` with a
 * size-adjusted fallback, which keeps the hero from moving when a font
 * arrives after the first paint.
 *
 * Zen Old Mincho carries Latin Extended, and both Latin subsets of the
 * regular weight are preloaded, so a name such as "Povilas Nanevičius"
 * renders in the one face. Its fallback is a serif, so a letter the face
 * lacks still reads in a serif. The bold weight is a second call with no
 * preload: Google's stylesheet for it marks its Japanese files as Latin, and
 * preloading them would fetch 120 files nobody reads. next/font names both
 * calls' faces "Zen Old Mincho", so the bold call sets the same
 * --font-mincho variable, and one family carries both weights.
 */
const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const mincho = Zen_Old_Mincho({
  variable: "--font-mincho",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
  fallback: ["Noto Serif", "Georgia", "serif"],
});

const minchoBold = Zen_Old_Mincho({
  variable: "--font-mincho",
  weight: "700",
  display: "swap",
  preload: false,
  fallback: ["Noto Serif", "Georgia", "serif"],
});

const azeret = Azeret_Mono({
  variable: "--font-azeret",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: paper,
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
    <html
      lang={language}
      className={cn(chakra.variable, mincho.variable, minchoBold.variable, azeret.variable)}
    >
      <body>
        {/* The first stop of the Tab key: a night slip that drops in from above
         * the viewport when it takes focus, as the reference draws it. */}
        <a
          className="night fixed top-4 left-4 z-100 -translate-y-[160%] px-4 py-3 label-mono no-underline transition-transform duration-200 ease-settle focus:translate-y-0"
          href="#main"
        >
          Skip to content
        </a>
        <Rail />
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
