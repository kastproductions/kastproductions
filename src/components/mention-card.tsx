import { mention } from "@/app/content";

/*
 * The convenience claim, shown rather than described: someone types the agent's
 * name in a channel they already have open, and the agent stops at the gate
 * before anything reaches a customer.
 *
 * Labelled as an example until @brief is live in our own Slack.
 */
export function MentionCard() {
  return (
    <figure className="mention" aria-labelledby="mention-title">
      <figcaption className="mention__head">
        <span className="mono" id="mention-title">
          {mention.channel}
        </span>
        <span className="tag">{mention.label}</span>
      </figcaption>
      <ol className="mention__thread">
        <li className="mention__turn">
          <b>Nadia</b>
          <p>
            <span className="mention__handle">{mention.handle}</span>{" "}
            {mention.ask}
          </p>
        </li>
        <li className="mention__turn mention__turn--agent">
          <b>
            {mention.handle}
            <span className="mention__app">app</span>
          </b>
          <p>{mention.reply}</p>
          <p className="mention__gate">{mention.gate}</p>
          <span className="mention__approve" aria-hidden="true">
            {mention.approve}
          </span>
        </li>
      </ol>
    </figure>
  );
}
