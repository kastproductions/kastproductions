import type { Metadata } from "next";
import NextLink from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with KastProductions for AI-native product work. Email hello@kastproductions.com.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — KastProductions",
    description:
      "Get in touch with KastProductions for AI-native product work. Email hello@kastproductions.com.",
    url: "/contact",
  },
};

export default function Contact() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
        <span aria-hidden className="size-1.5 rounded-full bg-klein" />
        Contact — always open
      </p>
      <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-balance md:text-6xl">
        Say hello<span className="text-klein">.</span>
      </h1>
      <a
        href="mailto:hello@kastproductions.com"
        className="font-display text-xl font-medium tracking-tight underline decoration-2 underline-offset-8 transition-colors hover:text-klein md:text-3xl"
      >
        hello@kastproductions.com
      </a>
      <NextLink
        href="/"
        className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase underline underline-offset-4 transition-colors hover:text-klein"
      >
        ← Back home
      </NextLink>
    </main>
  );
}
