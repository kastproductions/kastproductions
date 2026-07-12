import type { Metadata } from "next";
import NextLink from "next/link";

export const metadata: Metadata = {
  title: "Work",
};

export default function Work() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
        Sheet: Work — in preparation
      </p>
      <h1 className="font-display text-4xl font-bold tracking-tight text-balance md:text-6xl">
        Amazing things coming soon.
      </h1>
      <NextLink
        href="/"
        className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase underline underline-offset-4 transition-colors hover:text-foreground"
      >
        ← Back to the drawing board
      </NextLink>
    </main>
  );
}
