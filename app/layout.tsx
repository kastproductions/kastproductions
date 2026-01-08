import type { Metadata } from "next";
import { Poppins, Cormorant_Infant } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { Provider } from "@/components/ui/provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KastProductions",
  description:
    "KastProductions is design and frontend web development consultancy based in Lithuania.",
  metadataBase: new URL("https://www.kastproductions.com"),
  openGraph: {
    url: "https://www.kastproductions.com/",
    title: "KastProductions",
    description:
      "KastProductions is design and frontend web development consultancy based in Lithuania.",
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
      suppressHydrationWarning
      className={`${poppins.variable} ${cormorantInfant.variable}`}
    >
      <body>
        <Provider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </Provider>
        <Analytics />
      </body>
    </html>
  );
}
