import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * The shapes every page is built from, so a page states what a block is and
 * never restates how it looks. A page is a stack of bands. A band holds a
 * unit: the heading column and the body column, under one black rule that
 * runs the width of the content, the way a form rules off each of its parts.
 * Type that recurs across pages (the hero heading, a lede, a note, a pull
 * link, a row of label and body) is a component here rather than a string of
 * utilities copied into twelve files.
 */

type Tone = "paper" | "panel" | "signal";

const tones: Record<Tone, string> = {
  paper: "",
  panel: "bg-secondary",
  /* `dark` turns the theme over for everything inside the band: the band is
   * set in the signature blue. */
  signal: "dark bg-background text-foreground",
};

/* A full-width section with the band rhythm. `flush` is the first band on a
 * page, with a shorter top. */
export function Band({
  tone = "paper",
  flush = false,
  className,
  ...props
}: ComponentProps<"section"> & { tone?: Tone; flush?: boolean }) {
  return (
    <section
      className={cn(
        "py-(--band)",
        flush && "pt-[clamp(2.5rem,5vw,4.5rem)]",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

/* A heading column and a body column under the section's rule. They stack
 * below lg. */
export function Unit({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "wrap grid items-start gap-6 border-t border-foreground pt-6 lg:grid-cols-[var(--head-col)_minmax(0,1fr)] lg:gap-(--split) lg:pt-8",
        className,
      )}
      {...props}
    />
  );
}

/* The heading column: the section's h2, then whatever the page says beside
 * it. It stays in view while the body scrolls, from lg up. */
export function UnitHead({
  title,
  titleId,
  children,
}: {
  title: ReactNode;
  titleId?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-start lg:sticky lg:top-24">
      <h2
        className="font-heading text-[clamp(1.75rem,1.15rem+1.7vw,2.6rem)] leading-[1.04] font-bold tracking-[-0.035em] text-balance"
        id={titleId}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

/* The short paragraph under a section's h2. */
export function HeadNote({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "mt-4 max-w-(--measure) text-[0.98rem] leading-relaxed text-muted-foreground lg:max-w-[36ch]",
        className,
      )}
      {...props}
    />
  );
}

/* The body column. A paragraph set straight in it reads as body copy, a
 * `Note` included, and its links are the blue. */
export function UnitBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "min-w-0 [&>p]:max-w-(--measure) [&>p]:text-[1.05rem] [&>p]:leading-[1.65] [&>p]:text-prose [&>p_a]:text-signal-foreground [&>p+p]:mt-4",
        className,
      )}
      {...props}
    />
  );
}

/* A paragraph of body copy at reading measure. */
export function Prose({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "mt-4 max-w-(--measure) text-[1.05rem] leading-[1.65] text-prose first:mt-0 [&_a]:text-signal-foreground",
        className,
      )}
      {...props}
    />
  );
}

/* The hero column: heading, lede, actions, stacked. */
export function HeroCopy({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-6", className)} {...props} />;
}

export function HeroTitle({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "max-w-[17ch] font-heading text-[clamp(2.5rem,1.4rem+3.4vw,4.35rem)] leading-[1] font-extrabold tracking-[-0.042em] text-balance",
        className,
      )}
      {...props}
    />
  );
}

export function Lede({
  wide = false,
  className,
  ...props
}: ComponentProps<"p"> & { wide?: boolean }) {
  return (
    <p
      className={cn(
        "max-w-[54ch] text-[clamp(1.1rem,1rem+0.4vw,1.28rem)] leading-[1.5] text-pretty text-prose",
        wide && "max-w-(--measure)",
        className,
      )}
      {...props}
    />
  );
}

/* A side remark under a block. `gate` marks the sentence that says where a
 * person has to sign, with the blue rule a gate carries everywhere. */
export function Note({
  gate = false,
  className,
  ...props
}: ComponentProps<"p"> & { gate?: boolean }) {
  return (
    <p
      className={cn(
        "mt-5 max-w-(--measure) text-[0.92rem] leading-relaxed text-muted-foreground",
        gate && "border-l-2 border-signal bg-signal-tint py-3 pr-4 pl-4 text-foreground",
        className,
      )}
      {...props}
    />
  );
}

/* The row of calls to action. Below sm each button takes the full row. */
export function Actions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mt-2 flex flex-wrap items-center gap-3 max-sm:*:flex-[1_1_100%]",
        className,
      )}
      {...props}
    />
  );
}

const pullClass =
  "font-heading text-[0.95rem] font-semibold text-foreground underline decoration-signal decoration-2 underline-offset-[0.3em] transition-colors hover:text-signal-foreground";

/* A link onward, underlined in the blue. A page on this site goes through
 * next/link; a mailbox or another site is a plain anchor. */
export function PullLink({
  href,
  className,
  ...props
}: Omit<ComponentProps<"a">, "href"> & { href: string }) {
  const classes = cn(pullClass, className);
  return href.startsWith("/") ? (
    <Link className={classes} href={href} {...props} />
  ) : (
    <a className={classes} href={href} {...props} />
  );
}

/* A pull that is not itself a link, inside a card that is one. */
export function PullLabel({ className, ...props }: ComponentProps<"span">) {
  return <span className={cn(pullClass, className)} {...props} />;
}

const rowsClass = "flex flex-col divide-y divide-hairline";
const rowLabelClass =
  "font-heading text-[1.05rem] font-semibold tracking-[-0.015em] text-foreground";
const rowTextClass =
  "max-w-(--measure) text-[1rem] leading-relaxed text-prose [&_a]:text-signal-foreground";

/* Rows of a label and its body on hairlines. `sequence` numbers them, which
 * only a list that really is steps in order may do. A person wrote the
 * numbers, so they are in the text face, not the mono. */
export function Rows({
  sequence = false,
  className,
  ...props
}: ComponentProps<"ul"> & { sequence?: boolean }) {
  const classes = cn(
    rowsClass,
    sequence &&
      "[counter-reset:seq] *:[counter-increment:seq] **:data-[slot=row-label]:before:mr-3 **:data-[slot=row-label]:before:font-medium **:data-[slot=row-label]:before:text-faint **:data-[slot=row-label]:before:tabular-nums **:data-[slot=row-label]:before:content-[counter(seq,decimal-leading-zero)]",
    className,
  );
  return sequence ? (
    <ol className={classes} {...(props as ComponentProps<"ol">)} />
  ) : (
    <ul className={classes} {...props} />
  );
}

/* One row. From md the label takes its own column unless `stack` is set.
 * Anything after the body (a note, a pull link) sits under the body. */
export function Row({
  stack = false,
  className,
  ...props
}: ComponentProps<"div"> & { stack?: boolean }) {
  return (
    <div
      className={cn(
        "grid items-baseline gap-1.5 py-5",
        !stack && "md:grid-cols-[12rem_minmax(0,1fr)] md:gap-x-8 md:[&>*:nth-child(n+3)]:col-start-2",
        className,
      )}
      {...props}
    />
  );
}

export function RowLabel({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="row-label"
      className={cn(rowLabelClass, className)}
      {...props}
    />
  );
}

export function RowText({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(rowTextClass, className)}
      {...props}
    />
  );
}

/* The machine string under a row: the systems a job touches. */
export function RowNote({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn("font-mono text-[0.78rem] text-faint", className)}
      {...props}
    />
  );
}

/* The same rows as a definition list, for a page that states facts as a
 * term and its value: each `Row` inside holds one `FactTerm` and its
 * `FactValue`. */
export function FactRows({ className, ...props }: ComponentProps<"dl">) {
  return <dl className={cn(rowsClass, className)} {...props} />;
}

export function FactTerm({ className, ...props }: ComponentProps<"dt">) {
  return <dt className={cn(rowLabelClass, className)} {...props} />;
}

export function FactValue({ className, ...props }: ComponentProps<"dd">) {
  return <dd className={cn(rowTextClass, className)} {...props} />;
}
