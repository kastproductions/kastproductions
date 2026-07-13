import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
