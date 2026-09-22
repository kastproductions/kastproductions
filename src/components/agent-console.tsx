import type { CSSProperties } from "react";
import { mention } from "@/app/content";

/*
 * The hero's instrument: one standing agent, answering in a channel and
 * stopping at its gate. The three readings under the handle are the words the
 * rest of the page uses, so a reader meets channel, authority and the
 * deployment in the first object they see. It carries the "Example" tag until
 * a real exchange replaces it: see the Claims section of README.md.
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
      className="console"
      style={{ "--gate-delay": gateDelay } as CSSProperties}
    >
      <figcaption className="console__head" style={at(0)}>
        <b className="console__handle" id="console-title">
          {mention.handle}
        </b>
        <span className="tag">{mention.label}</span>
      </figcaption>

      <dl className="plate__reading" style={at(1)}>
        {mention.readings.map((reading) => (
          <div key={reading.label} className="plate__row">
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

      <ol className="thread" style={at(2)}>
        <li className="turn">
          <span className="turn__who">{mention.asker}</span>
          <p>
            <span className="handle">{mention.handle}</span> {mention.ask}
          </p>
        </li>
        <li className="turn turn--agent">
          <span className="turn__who">{mention.handle}</span>
          <p>{mention.reply}</p>
        </li>
      </ol>

      <div className="gate" style={at(3)}>
        <span className="gate__state">
          <span aria-hidden="true" className="lamp" />
          {mention.state}
        </span>
        <p>{mention.gate}</p>
        <span aria-hidden="true" className="gate__button">
          {mention.approve}
        </span>
      </div>
    </figure>
  );
}
