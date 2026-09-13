import { channels } from "@/app/content";

/*
 * Where a standing agent is reachable, and what wakes it. Both lists are what
 * Flue verifies, so a reader can check them, which is the reason the section
 * prints names rather than a count. Every page that describes an agent shows
 * it, so it lives here rather than in three page files.
 */
export function ChannelsSection() {
  return (
    <section className="section" id="channels" aria-labelledby="channels-title">
      <div className="wrap">
        <div className="section__head">
          <h2 id="channels-title">{channels.heading}</h2>
          <p>{channels.lede}</p>
        </div>
        <div className="split">
          <div className="pair">
            <h3>Reachable in</h3>
            <ul className="chips">
              {channels.reachable.map((channel) => (
                <li className="chip chip--strong" key={channel}>
                  {channel}
                </li>
              ))}
            </ul>
            <p className="note">{channels.teamsNote}</p>
          </div>
          <div className="pair">
            <h3>Woken by events from</h3>
            <ul className="chips">
              {channels.events.map((source) => (
                <li className="chip" key={source}>
                  {source}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
