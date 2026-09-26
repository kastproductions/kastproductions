import type { CSSProperties } from "react";
import { mention } from "@/app/content";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/*
 * The hero's instrument: one standing agent, answering in a channel and
 * stopping at its gate, drawn as the slip a person signs. The three readings
 * under the handle are form fields holding the words the rest of the page
 * uses, so a reader meets channel, authority and the deployment in the first
 * object they see. The exchange is a transcript, and the gate at the foot is
 * the signature field: blue, because it is where a person acts. It carries
 * the "Example" badge until a real exchange replaces it: see the Claims
 * section of README.md.
 *
 * The four parts rise in order on load and the signature line draws last.
 * That is the one entrance the home page has.
 */
const PARTS = 4;
const signDelay = `${PARTS * 130 + 250}ms`;

const riseOrder = (i: number) => ({ "--i": i }) as CSSProperties;

export function AgentConsole() {
  return (
    <figure
      aria-labelledby="console-title"
      className="relative flex flex-col overflow-hidden rounded-lg border border-foreground bg-card *:[--rise-delay:calc(var(--i,0)*130ms_+_80ms)] motion-safe:*:animate-rise"
      style={{ "--sign-delay": signDelay } as CSSProperties}
    >
      <figcaption
        className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-5"
        style={riseOrder(0)}
      >
        <b className="font-mono text-[1.05rem] font-semibold" id="console-title">
          {mention.handle}
        </b>
        <Badge variant="signal">{mention.label}</Badge>
      </figcaption>

      <dl
        className="grid border-y border-foreground sm:grid-cols-3"
        style={riseOrder(1)}
      >
        {mention.readings.map((reading) => (
          <div
            className="flex flex-col gap-1 border-hairline px-4 py-3 not-first:border-t sm:px-5 sm:not-first:border-t-0 sm:not-first:border-l"
            key={reading.label}
          >
            <dt className="text-[0.75rem] font-medium text-faint">{reading.label}</dt>
            <dd className="flex flex-col gap-0.5 text-[0.9rem] leading-snug font-semibold">
              <span className={cn(reading.mono && "font-mono text-[0.92em]")}>
                {reading.value}
              </span>
              {reading.note ? (
                <span className="text-[0.78rem] font-normal text-muted-foreground">
                  {reading.note}
                </span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>

      <ol
        className="grid divide-y divide-hairline px-4 text-[0.92rem] leading-normal sm:px-5"
        style={riseOrder(2)}
      >
        <li className="grid gap-1 py-3.5 sm:grid-cols-[4.75rem_minmax(0,1fr)] sm:gap-3">
          <span className="font-semibold">{mention.asker}</span>
          <p className="text-prose">
            <span className="font-mono text-[0.88em] font-semibold text-foreground">
              {mention.handle}
            </span>{" "}
            {mention.ask}
          </p>
        </li>
        <li className="grid gap-1 py-3.5 sm:grid-cols-[4.75rem_minmax(0,1fr)] sm:gap-3">
          <span className="font-mono text-[0.88em] font-semibold">{mention.handle}</span>
          <p className="text-prose">{mention.reply}</p>
        </li>
      </ol>

      <div
        className="flex flex-col gap-3 border-t-2 border-signal bg-signal-tint px-4 pt-3.5 pb-4.5 sm:px-5"
        style={riseOrder(3)}
      >
        <div className="flex flex-col gap-1">
          <span className="inline-flex items-center gap-2 text-[0.82rem] font-semibold text-signal-foreground">
            <span aria-hidden="true" className="size-2 rounded-full bg-signal" />
            {mention.state}
          </span>
          <p className="text-[0.9rem] text-prose">{mention.gate}</p>
        </div>
        <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
          <div aria-hidden="true" className="flex min-w-40 flex-1 flex-col gap-1 pt-5">
            <span className="h-px origin-left bg-foreground motion-safe:animate-sign" />
            <span className="text-[0.72rem] text-faint">Signature</span>
          </div>
          <span
            aria-hidden="true"
            className="rounded-md bg-signal px-4 py-2 text-[0.85rem] font-semibold text-background"
          >
            {mention.approve}
          </span>
        </div>
      </div>
    </figure>
  );
}
