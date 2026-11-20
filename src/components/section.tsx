import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { briefCta, callHref } from "@/app/content";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/*
 * The shapes every page is built from, so a page states what a block is and
 * never restates how it looks. A page is a stack of bands. A band holds a
 * unit: the heading column and the body column, under one rule that runs the
 * width of the content.
 * Type that recurs across pages (the hero heading, a lede, a note, a pull
 * link, a row of label and body) is a component here rather than a string of
 * utilities copied into twelve files.
 */

type Tone = "paper" | "panel" | "ink";

const tones: Record<Tone, string> = {
  paper: "",
  panel: "bg-secondary",
  /* `ink` turns the theme over for everything inside the band: the band is
   * set in the ink colour. */
  ink: "inverse",
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
        "wrap grid items-start gap-6 border-t border-line pt-8 lg:grid-cols-[var(--head-col)_minmax(0,1fr)] lg:gap-(--split) lg:pt-10",
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
        className="font-heading text-headline font-semibold text-balance"
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
        "mt-4 max-w-(--measure) text-note leading-relaxed text-muted-foreground lg:max-w-[36ch]",
        className,
      )}
      {...props}
    />
  );
}

/* The body column. A paragraph set straight in it reads as body copy, a
 * `Note` included, and its links are the signature blue. */
export function UnitBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "min-w-0 [&>p]:max-w-(--measure) [&>p]:text-body [&>p]:leading-[1.65] [&>p]:text-prose [&>p_a]:text-signal-foreground [&>p+p]:mt-4",
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
        "mt-4 max-w-(--measure) text-body leading-[1.65] text-prose first:mt-0 [&_a]:text-signal-foreground",
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

/* The first screen of a page with words only: the hero column, left aligned
 * at reading width. */
export function HeroFrame({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("wrap", className)}>
      <HeroCopy className="max-w-[52rem]">{children}</HeroCopy>
    </div>
  );
}

/* The first screen of a page with an example beside its words: the hero
 * column, and the example in the wider column from lg up. Below lg the
 * example goes under the words. */
export function HeroSplit({ aside, children }: { aside: ReactNode; children: ReactNode }) {
  return (
    <div className="wrap grid grid-cols-1 items-center gap-(--split) lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <HeroCopy>{children}</HeroCopy>
      {aside}
    </div>
  );
}

export function HeroTitle({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "max-w-[18ch] font-heading text-display font-semibold text-balance",
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
        "max-w-[54ch] text-lede leading-[1.5] text-pretty text-prose",
        wide && "max-w-(--measure)",
        className,
      )}
      {...props}
    />
  );
}

/* The blue rule and the wash a gate carries everywhere (DESIGN.md, the
 * Signature Rule): a `Note` with `gate`, the stop point on a product or job
 * page, and the merge line of an example run. */
export const gateClass = "border-l-2 border-signal bg-signal-tint";

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
        "mt-5 max-w-(--measure) text-note leading-relaxed text-muted-foreground",
        gate && cn(gateClass, "rounded-r-md py-3 pr-4 pl-4 text-foreground"),
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

/* The calls to action under a hero heading: the one action a reader can
 * take, filled in the signature blue and named by what comes back, the call
 * beside it in outline, and the reply time under both. `href` carries the
 * page's own mail subject, so a click counts under the door a reader came
 * through. */
export function HeroActions({ href, cta = briefCta }: { href: string; cta?: ReactNode }) {
  return (
    <>
      <Actions>
        <a className={buttonVariants()} href={href}>
          {cta}
          <ArrowUpRightIcon data-icon="inline-end" />
        </a>
        <a className={buttonVariants({ variant: "outline" })} href={callHref}>
          Book a call
        </a>
      </Actions>
      <p className="meta text-faint">We reply within one working day.</p>
    </>
  );
}

const pullClass =
  "font-heading text-note font-semibold text-signal-foreground underline decoration-signal/35 decoration-1 underline-offset-[0.3em] transition-[text-decoration-color] hover:decoration-signal";

/* A link onward, in the signature blue. A page on this site goes through
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
  "font-heading text-body font-semibold text-foreground";
const rowTextClass =
  "max-w-(--measure) text-body leading-relaxed text-prose [&_a]:text-signal-foreground";

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
      "[counter-reset:seq] *:[counter-increment:seq] **:data-[slot=row-label]:before:mr-2.5 **:data-[slot=row-label]:before:font-medium **:data-[slot=row-label]:before:text-faint **:data-[slot=row-label]:before:tabular-nums **:data-[slot=row-label]:before:content-[counter(seq)'.']",
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
      className={cn("font-mono text-caption text-faint", className)}
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
