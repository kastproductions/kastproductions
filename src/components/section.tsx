import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * The shapes every page is built from, so a page states what a block is and
 * never restates how it looks. A page is a stack of bands. A band holds a
 * unit: the heading column and the body column, on one hairline. Type that
 * recurs across pages (the hero heading, a lede, a note, a pull link, a row
 * of label and body) is a component here rather than a string of utilities
 * copied into twelve files.
 */

type Tone = "paper" | "panel" | "ink";

const tones: Record<Tone, string> = {
  paper: "",
  panel: "bg-secondary",
  /* `dark` turns the theme over for everything inside the band. */
  ink: "dark border-t-0 bg-background text-foreground",
};

/* A full-width section with the band rhythm and a top hairline. `flush` is
 * the first band on a page: no hairline, a shorter top. */
export function Band({
  tone = "paper",
  flush = false,
  className,
  ...props
}: ComponentProps<"section"> & { tone?: Tone; flush?: boolean }) {
  return (
    <section
      className={cn(
        "border-t py-(--band)",
        flush && "border-t-0 pt-[clamp(2.5rem,5vw,4.5rem)]",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

/* A heading column and a body column. They stack below lg. */
export function Unit({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "wrap grid items-start gap-6 lg:grid-cols-[var(--head-col)_minmax(0,1fr)] lg:gap-(--split)",
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
    <div className="flex flex-col items-start lg:sticky lg:top-22">
      <h2
        className="font-heading text-[clamp(1.6rem,1.2rem+1.2vw,2.1rem)] leading-[1.12] font-bold tracking-[-0.025em] text-balance"
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
        "mt-3.5 max-w-(--measure) text-[0.95rem] leading-relaxed text-muted-foreground lg:max-w-[34ch]",
        className,
      )}
      {...props}
    />
  );
}

/* The body column. A paragraph set straight in it reads as body copy, a
 * `Note` included, and its links are the coral. */
export function UnitBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "min-w-0 [&>p]:max-w-(--measure) [&>p]:text-[1.02rem] [&>p]:leading-[1.65] [&>p]:text-prose [&>p_a]:text-signal-foreground [&>p+p]:mt-4",
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
        "mt-4 max-w-(--measure) text-[1.02rem] leading-[1.65] text-prose first:mt-0 [&_a]:text-signal-foreground",
        className,
      )}
      {...props}
    />
  );
}

/* The hero column: heading, lede, actions, stacked. */
export function HeroCopy({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-5", className)} {...props} />;
}

export function HeroTitle({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "max-w-[16ch] font-heading text-[clamp(2.4rem,1.4rem+3.6vw,4.6rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-balance lg:max-w-[14ch]",
        className,
      )}
      {...props}
    />
  );
}

/* The coral full stop a display heading ends on. */
export function Dot() {
  return <span className="text-signal">.</span>;
}

export function Lede({
  wide = false,
  className,
  ...props
}: ComponentProps<"p"> & { wide?: boolean }) {
  return (
    <p
      className={cn(
        "max-w-[58ch] text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] leading-[1.55] text-pretty text-prose",
        wide && "max-w-(--measure)",
        className,
      )}
      {...props}
    />
  );
}

/* A side remark under a block. `gate` marks the sentence that says where a
 * person has to sign. */
export function Note({
  gate = false,
  className,
  ...props
}: ComponentProps<"p"> & { gate?: boolean }) {
  return (
    <p
      className={cn(
        "mt-4.5 max-w-(--measure) text-[0.9rem] leading-relaxed text-muted-foreground",
        gate && "border-l border-signal pl-4 text-foreground",
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
        "mt-7 flex flex-wrap items-center gap-3 max-sm:*:flex-[1_1_100%]",
        className,
      )}
      {...props}
    />
  );
}

const pullClass =
  "group/pull inline-flex items-center gap-1.5 font-heading text-[0.9rem] font-semibold text-signal-foreground no-underline after:transition-transform after:duration-250 after:ease-settle after:content-['→'] hover:after:translate-x-0.75";

/* A link onward, in the coral, with an arrow. A page on this site goes
 * through next/link; a mailbox or another site is a plain anchor. */
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
  "font-heading text-base font-bold tracking-[-0.01em] text-foreground";
const rowTextClass =
  "max-w-(--measure) text-[0.98rem] leading-relaxed text-prose [&_a]:text-signal-foreground";

/* Rows of a label and its body on hairlines. `sequence` numbers them, which
 * only a list that really is steps in order may do. */
export function Rows({
  sequence = false,
  className,
  ...props
}: ComponentProps<"ul"> & { sequence?: boolean }) {
  const classes = cn(
    rowsClass,
    sequence &&
      "[counter-reset:seq] *:[counter-increment:seq] **:data-[slot=row-label]:before:mr-3 **:data-[slot=row-label]:before:font-mono **:data-[slot=row-label]:before:font-medium **:data-[slot=row-label]:before:text-faint **:data-[slot=row-label]:before:content-[counter(seq,decimal-leading-zero)]",
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
        "grid items-baseline gap-1.5 py-4.5",
        !stack && "md:grid-cols-[11rem_minmax(0,1fr)] md:gap-x-6 md:[&>*:nth-child(n+3)]:col-start-2",
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
