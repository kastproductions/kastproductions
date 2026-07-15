import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import { Analytics } from "@/components/analytics";
import "./globals.css";

const SITE_URL = "https://www.kastproductions.com";
const SITE_NAME = "KastProductions";
const DESCRIPTION =
  "AI-native product studio in Vilnius. Senior designers and engineers who use AI across the build to ship high-quality websites, APIs and AI features — fast.";

export const viewport: Viewport = {
  themeColor: "#fbfbfb",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-mono",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "KastProductions — AI-Native Product Studio",
    template: "%s — KastProductions",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Karolis Stulgys", url: SITE_URL }],
  creator: "Karolis Stulgys",
  publisher: SITE_NAME,
  category: "technology",
  keywords: [
    "AI-native studio",
    "AI integration",
    "AI development",
    "LLM integration",
    "RAG",
    "AI agents",
    "frontend development",
    "Next.js development",
    "React development",
    "UI/UX design",
    "full-stack development",
    "Vilnius",
    "Lithuania",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "KastProductions — AI-Native Product Studio",
    description: DESCRIPTION,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "KastProductions — AI-native product studio in Vilnius",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KastProductions — AI-Native Product Studio",
    description: DESCRIPTION,
    images: ["/og.png"],
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
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${bricolage.variable}`}
    >
      <body>
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
