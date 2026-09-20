import type { CSSProperties } from "react";
import { mention } from "@/app/content";

/*
 * The console: the hero's one bold element, and the whole offer in one object.
 * A standing agent has a name, a channel and an authority; it answers where a
 * team already works; and it stops at a gate before anything reaches a
 * customer. Describing that takes a paragraph nobody reads, so the page shows
 * it instead.
 *
 * Each part rises in at its own `--i` on load, and the gate lamp flashes twice
 * once the exchange has landed. That is the only motion on the site.
 *
 * Labelled as an example until @brief is live in our own Slack.
 */

/* The gate is the last part in, so its lamp waits for the parts above it. */
const PARTS = 3;
const gateDelay = `${PARTS * 130 + 120}ms`;

export function AgentConsole() {
  return (
    <figure
      className="console"
      aria-labelledby="console-title"
      style={{ "--gate-delay": gateDelay } as CSSProperties}
    >
      <figcaption className="plate" style={{ "--i": 0 } as CSSProperties}>
        <span className="plate__id">
          <b className="plate__handle" id="console-title">
            {mention.handle}
          </b>
          <span className="tag">{mention.label}</span>
        </span>
        <dl className="plate__reading">
          {mention.readings.map((reading) => (
            <div key={reading.label} style={{ display: "contents" }}>
              <dt>{reading.label}</dt>
              <dd>
                <span className={reading.mono ? "mono" : undefined}>
                  {reading.value}
                </span>
                {reading.note ? (
                  <span className="plate__note">{reading.note}</span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </figcaption>

      <ol className="thread">
        <li className="turn" style={{ "--i": 1 } as CSSProperties}>
          <span className="turn__who">{mention.asker}</span>
          <p>
            <span className="handle">{mention.handle}</span> {mention.ask}
          </p>
        </li>
        <li className="turn turn--agent" style={{ "--i": 2 } as CSSProperties}>
          <span className="turn__who">
            <span className="mono">{mention.handle}</span>
          </span>
          <p>{mention.reply}</p>
        </li>
      </ol>

      <div className="gate" style={{ "--i": 3 } as CSSProperties}>
        <span className="gate__state">
          <span className="lamp" aria-hidden="true" />
          {mention.state}
        </span>
        <p>{mention.gate}</p>
        <span className="gate__button" aria-hidden="true">
          {mention.approve}
        </span>
      </div>
    </figure>
  );
}
