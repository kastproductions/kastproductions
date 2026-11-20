import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * Where the agent stops for a named person, under the steps of a run on the
 * product page and on every job page. It is the one block a buyer worried
 * about risk looks for, so it carries its own heading and the stamp red rule
 * that marks a gate everywhere on the site (DESIGN.md, the Stamp Rule).
 *
 * CONTEXT.md calls this place the approval gate. The heading says it in a
 * buyer's words, because a buyer should not have to learn our term first.
 */
export function StopPoint({
  titleId,
  className,
  children,
}: {
  titleId: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      aria-labelledby={titleId}
      className={cn(
        "mt-8 max-w-(--measure) border-l-2 border-signal bg-signal-tint py-5 pr-5 pl-5 sm:pl-6",
        className,
      )}
      role="group"
    >
      <h3
        className="font-heading text-[1.05rem] font-semibold text-balance text-foreground"
        id={titleId}
      >
        Where it stops for a person
      </h3>
      <p className="mt-2 text-[1.05rem] leading-relaxed text-foreground">{children}</p>
    </div>
  );
}
