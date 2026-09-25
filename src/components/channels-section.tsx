import { channels, slackPage } from "@/app/content";
import {
  Band,
  HeadNote,
  Note,
  PullLink,
  Unit,
  UnitBody,
  UnitHead,
} from "@/components/section";
import { Badge } from "@/components/ui/badge";

/*
 * Where a standing agent is reachable, and what wakes it. Both lists are what
 * Flue verifies, so a reader can check them, which is the reason the section
 * prints names rather than a count. They are drawn as a hairline grid rather
 * than a bag of pills, because a compatibility list is what they are.
 *
 * Every page that describes an agent shows it, so it lives here rather than in
 * three page files. The Slack page is the one channel with a page of its own,
 * and this section is where a reader finds it, so the link is here rather than
 * on each of those pages.
 */
export function ChannelsSection() {
  return (
    <Band aria-labelledby="channels-title" id="channels">
      <Unit>
        <UnitHead title={channels.heading} titleId="channels-title">
          <HeadNote>{channels.lede}</HeadNote>
        </UnitHead>
        <UnitBody>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="mb-3.5 font-heading text-[0.85rem] font-semibold text-faint">
                A person reaches it in
              </h3>
              <ul className="flex flex-wrap gap-2">
                {channels.reachable.map((channel) => (
                  <li key={channel}>
                    <Badge size="lg" variant="panel">
                      {channel}
                    </Badge>
                  </li>
                ))}
              </ul>
              <Note>
                <PullLink href={slackPage.path}>{channels.slackMore}</PullLink>
              </Note>
              <Note>{channels.teamsNote}</Note>
            </div>
            <div>
              <h3 className="mb-3.5 font-heading text-[0.85rem] font-semibold text-faint">
                An event wakes it from
              </h3>
              <ul className="flex flex-wrap gap-2">
                {channels.events.map((source) => (
                  <li key={source}>
                    <Badge className="text-prose" size="lg" variant="outline">
                      {source}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </UnitBody>
      </Unit>
    </Band>
  );
}
