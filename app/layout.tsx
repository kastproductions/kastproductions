import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  IBM_Plex_Mono,
  Instrument_Sans,
} from "next/font/google";
import { Analytics } from "@/components/analytics";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0f0f13",
};

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KastProductions",
    template: "%s — KastProductions",
  },
  description:
    "KastProductions is a design and frontend web development consultancy based in Lithuania.",
  metadataBase: new URL("https://www.kastproductions.com"),
  openGraph: {
    url: "https://www.kastproductions.com/",
    title: "KastProductions",
    description:
      "KastProductions is a design and frontend web development consultancy based in Lithuania.",
    siteName: "KastProductions",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${bricolage.variable} ${instrument.variable} ${plexMono.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
