import { channels } from "@/app/content";

/*
 * Where a standing agent is reachable, and what wakes it. Both lists are what
 * Flue verifies, so a reader can check them, which is the reason the section
 * prints names rather than a count. They are drawn as a hairline grid rather
 * than a bag of pills, because a compatibility list is what they are.
 *
 * Every page that describes an agent shows it, so it lives here rather than in
 * three page files.
 */
export function ChannelsSection() {
  return (
    <section className="band" id="channels" aria-labelledby="channels-title">
      <div className="wrap unit">
        <div className="unit__head">
          <h2 id="channels-title">{channels.heading}</h2>
          <p>{channels.lede}</p>
        </div>
        <div className="unit__body">
          <div className="split">
            <div className="pair">
              <h3>A person reaches it in</h3>
              <ul className="names">
                {channels.reachable.map((channel) => (
                  <li key={channel}>{channel}</li>
                ))}
              </ul>
              <p className="note">{channels.teamsNote}</p>
            </div>
            <div className="pair">
              <h3>An event wakes it from</h3>
              <ul className="names names--muted">
                {channels.events.map((source) => (
                  <li key={source}>{source}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
