import type { Metadata, Viewport } from "next";
import { Anybody, Archivo } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { LevelEngine } from "@/components/desk/level-engine";
import "./globals.css";

const SITE_URL = "https://www.kastproductions.com";
const SITE_NAME = "KastProductions";
const DESCRIPTION =
  "AI-native product studio in Vilnius. Senior designers and engineers who use AI across the build to ship high-quality websites, APIs and AI features — fast.";

/*
 * The direction contract, emitted into the built markup so it can be audited
 * after the production build rather than taken on trust. React has no comment
 * node, so it rides in a hidden element in the root layout — not inside a
 * slotted child, where a compiler could strip it.
 */
const DIRECTION_CONTRACT = `
  IMPECCABLE DIRECTION CONTRACT — seed key kastprod-redesign-01

  THESIS: Speed and judgment are ganged on this desk, not traded against each
  other. The page is the instrument that proves it. Refuses the agency default:
  dark hero, bento capability cards, logo marquee, one neon accent.

  OWN-WORLD: Anodised graphite chassis, machined bevels, ivory meter faces and
  printed label tape, walnut end cheek, brass screws. Anybody condensed as
  silkscreen legend, Archivo as body. Colour is hardware: amber = signal
  present, green = routed, red = past 0 dB and the one committing action.

  STORY: A founder recognises a real instrument, reads 17 patched clients and
  six named references, and sends one email.

  FIRST VIEWPORT: The master section. Two large VU meters centre stage, labelled
  SPEED and JUDGMENT, with a lit LINK lamp between them; four corner readouts on
  the frame; the claim set below in condensed badging; the red commit button at
  the bottom of the module.

  FORM: Mixing console / control surface — candidate 5 of 7 on the grounded
  list, assigned by concept-seed, seed key kastprod-redesign-01.

  FINISH: unreviewed and undocumented is unfinished; this build ends with the
  finish review, the verdict, DESIGN.md, and every shipping raster carrying its
  provenance.
`;

export const viewport: Viewport = {
  themeColor: "#151413",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/* Anybody carries a width axis, so the console's condensed silkscreen is a
 * real cut of the face rather than type squashed with a transform. */
const anybody = Anybody({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-anybody",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "KastProductions — AI-native product studio",
    template: "%s — KastProductions",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Karolis Stulgys", url: SITE_URL }],
  creator: "Karolis Stulgys",
  publisher: SITE_NAME,
  category: "technology",
  keywords: [
    "AI-native product studio",
    "AI product development",
    "LLM integration",
    "RAG",
    "AI agents",
    "Next.js development",
    "React development",
    "TypeScript",
    "UI/UX design",
    "API development",
    "React Native",
    "Playwright testing",
    "Vilnius",
    "Lithuania",
    "product studio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: "KastProductions — AI-native product studio",
    description: DESCRIPTION,
    locale: "en",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "KastProductions — AI-native product studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KastProductions — AI-native product studio",
    description: DESCRIPTION,
    images: ["/og.png"],
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      email: "hello@kastproductions.com",
      description: DESCRIPTION,
      founder: { "@type": "Person", name: "Karolis Stulgys" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Vilnius",
        addressCountry: "LT",
      },
      areaServed: "Worldwide",
      knowsAbout: [
        "Artificial intelligence",
        "LLM integration",
        "Retrieval-augmented generation",
        "AI agents",
        "Frontend development",
        "React",
        "Next.js",
        "TypeScript",
        "UI/UX design",
        "Full-stack development",
      ],
      logo: `${SITE_URL}/favicon.ico`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${anybody.variable}`}>
      <body>
        <div
          hidden
          dangerouslySetInnerHTML={{ __html: `<!--${DIRECTION_CONTRACT}-->` }}
        />
        <LevelEngine />
        {children}
        <script
          type="application/ld+json"
          // Structured data for search engines; static, trusted content.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
