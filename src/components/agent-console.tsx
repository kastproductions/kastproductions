import type { CSSProperties } from "react";
import { mention } from "@/app/content";
import { Badge } from "@/components/ui/badge";

/*
 * The hero's instrument: one standing agent, answering in a channel and
 * stopping at its gate. The three readings under the handle are the words the
 * rest of the page uses, so a reader meets channel, authority and the
 * deployment in the first object they see. It carries the "Example" badge
 * until a real exchange replaces it: see the Claims section of README.md.
 *
 * The four parts rise in order on load and the gate lamp lights last. That is
 * the one entrance the home page has.
 */
const PARTS = 4;
const gateDelay = `${PARTS * 140 + 200}ms`;

const at = (i: number) => ({ "--i": i }) as CSSProperties;

export function AgentConsole() {
  return (
    <figure
      aria-labelledby="console-title"
      className="relative flex flex-col gap-4 rounded-xl border bg-card px-4 pt-4.5 pb-5 shadow-plate *:[--rise-delay:calc(var(--i,0)*140ms_+_80ms)] sm:px-5.5 sm:pt-5.5 sm:pb-6 motion-safe:*:animate-rise"
      style={{ "--gate-delay": gateDelay } as CSSProperties}
    >
      <figcaption
        className="flex items-center justify-between gap-4 border-b border-hairline pb-3.5"
        style={at(0)}
      >
        <b className="font-mono text-base font-semibold" id="console-title">
          {mention.handle}
        </b>
        <Badge variant="signal">{mention.label}</Badge>
      </figcaption>

      <dl
        className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-4.5 gap-y-1.75 text-[0.85rem]"
        style={at(1)}
      >
        {mention.readings.map((reading) => (
          <div className="contents" key={reading.label}>
            <dt className="pt-px font-heading font-semibold text-faint">
              {reading.label}
            </dt>
            <dd className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className={reading.mono ? "font-mono text-[0.92em]" : undefined}>
                {reading.value}
              </span>
              {reading.note ? (
                <span className="text-[0.8rem] text-faint">{reading.note}</span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>

      <ol className="flex flex-col gap-2.5" style={at(2)}>
        <li className="max-w-full rounded-[10px] bg-background px-4 py-3 text-[0.9rem] leading-normal text-prose sm:max-w-[92%]">
          <span className="mb-1 block font-heading text-[0.72rem] font-semibold text-faint">
            {mention.asker}
          </span>
          <p>
            <span className="font-mono text-[0.86em] font-semibold text-signal-foreground">
              {mention.handle}
            </span>{" "}
            {mention.ask}
          </p>
        </li>
        <li className="max-w-full self-end rounded-[10px] border border-hairline bg-secondary px-4 py-3 text-[0.9rem] leading-normal text-prose sm:max-w-[92%]">
          <span className="mb-1 block font-heading text-[0.72rem] font-semibold text-faint">
            {mention.handle}
          </span>
          <p>{mention.reply}</p>
        </li>
      </ol>

      <div
        className="flex flex-col gap-2 rounded-[10px] border border-signal bg-card bg-linear-to-t from-signal-tint to-signal-tint px-4 py-3.5"
        style={at(3)}
      >
        <span className="inline-flex items-center gap-2 font-heading text-[0.78rem] font-bold text-signal-foreground">
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-signal shadow-[0_0_0_3px_var(--signal-tint)] motion-safe:animate-lamp"
          />
          {mention.state}
        </span>
        <p className="text-[0.88rem] text-prose">{mention.gate}</p>
        <span
          aria-hidden="true"
          className="self-start rounded-full bg-signal px-3.5 py-1.75 font-heading text-[0.82rem] font-semibold text-card"
        >
          {mention.approve}
        </span>
      </div>
    </figure>
  );
}
