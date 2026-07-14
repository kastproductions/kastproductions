import type { Metadata } from "next";
import NextLink from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "About KastProductions — an AI-native product studio in Vilnius: senior designers and engineers who build with AI.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — KastProductions",
    description:
      "About KastProductions — an AI-native product studio in Vilnius: senior designers and engineers who build with AI.",
    url: "/about",
  },
};

export default function About() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
        <span aria-hidden className="size-1.5 rounded-full bg-klein" />
        About — in preparation
      </p>
      <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-[-0.02em] text-balance md:text-6xl">
        Something worth the wait<span className="text-klein">.</span>
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
        The full story is being written. In the meantime, the work speaks first.
      </p>
      <NextLink
        href="/"
        className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase underline underline-offset-4 transition-colors hover:text-klein"
      >
        ← Back home
      </NextLink>
    </main>
  );
}
