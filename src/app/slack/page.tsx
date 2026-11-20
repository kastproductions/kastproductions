import { AgentConsole } from "@/components/agent-console";
import {
  Band,
  HeadNote,
  HeroActions,
  HeroSplit,
  HeroTitle,
  Lede,
  Note,
  PullLink,
  Row,
  RowLabel,
  Rows,
  RowText,
  Unit,
  UnitBody,
  UnitHead,
} from "@/components/section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { channels, customPage, mailtoFor, slackPage, slackSubject } from "../content";
import { pageMetadata } from "../head-directives";
import { graphHtml, pageNodes } from "../structured-data";

export const metadata = pageMetadata(slackPage);

/* The page and the way here from the home page. It prints no price, so it
 * states no offer: an agent in Slack is custom work, and the door prices it. */
const graph = graphHtml(pageNodes(slackPage));

/*
 * Every sentence below about what Slack or Teams does is one Flue's channel
 * documentation states, and the page links that documentation so a reader
 * can check it. The Claims section of README.md holds the channel lists to
 * the same source. What Flue does not state, we do not either: the policy of
 * who may approve is ours, and the page says so.
 */
const slackDoc = "https://flueframework.com/docs/ecosystem/channels/slack/";
const teamsDoc = "https://flueframework.com/docs/ecosystem/channels/teams/";

/* Every call to action on the page carries the channel as its subject, so a
 * click is counted under the door a reader came in through. */
const brief = mailtoFor(slackSubject);

export default function Slack() {
  return (
    <>
      <SiteHeader route={slackPage.path} />

      <main id="main">
        <Band flush>
          {/* Beside the words, the exchange a reader is asked to picture: a
              mention, a reply and the approval it waits on. Synthetic, so it
              carries the "Example" label. */}
          <HeroSplit aside={<AgentConsole />}>
            <HeroTitle>An agent your team addresses in Slack.</HeroTitle>
            <Lede>
              Your team already works in Slack, so that is where the agent
              answers. A person mentions it by name in a channel, it replies
              in the thread, and anything that leaves your company waits there
              for a named person to approve it.
            </Lede>
            <HeroActions href={brief} />
          </HeroSplit>
        </Band>

        <Band aria-labelledby="address-title" id="address">
          <Unit>
            <UnitHead index={1} title="How your team asks it for work" titleId="address-title">
              <HeadNote>
                The agent has a name in your workspace, the way a colleague
                does. Nobody learns a new tool: they ask in the channel where
                the work already happens.
              </HeadNote>
            </UnitHead>
            <UnitBody>
              <Rows>
                <li>
                  <Row stack>
                    <RowLabel>Mention it by name</RowLabel>
                    <RowText>
                      A person writes the agent&rsquo;s name in a channel,
                      followed by what they want done. Slack sends that mention
                      to your agent, and the agent starts work on it.
                    </RowText>
                  </Row>
                </li>
                <li>
                  <Row stack>
                    <RowLabel>One thread, one piece of work</RowLabel>
                    <RowText>
                      Flue ties the agent to the thread under that message. The
                      agent replies in that thread, and a later mention in the
                      same thread reaches the same agent and not a new one.
                    </RowText>
                  </Row>
                </li>
                <li>
                  <Row stack>
                    <RowLabel>A slash command, if you prefer one</RowLabel>
                    <RowText>
                      A team that would rather type a command than a mention
                      can have one. Slack expects a fast answer to a command,
                      so the agent acknowledges it at once and does the work
                      after.
                    </RowText>
                  </Row>
                </li>
              </Rows>
              <PullLink href={slackDoc} rel="noreferrer">
                Read what Flue verifies for Slack
              </PullLink>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="gate-title" id="gate" tone="panel">
          <Unit>
            <UnitHead index={2} title="Where it stops for approval" titleId="gate-title">
              <HeadNote>
                Before the agent does anything that reaches outside your
                company, it stops and waits for a named person. In Slack, that
                is a message with a button under it.
              </HeadNote>
            </UnitHead>
            <UnitBody>
              <Rows>
                <li>
                  <Row stack>
                    <RowLabel>It says what it wants to do</RowLabel>
                    <RowText>
                      The agent posts in the thread what it is about to do and
                      for whom, with the draft or the figure attached, and a
                      button to approve it. Then it stops.
                    </RowText>
                  </Row>
                </li>
                <li>
                  <Row stack>
                    <RowLabel>A named person presses the button</RowLabel>
                    <RowText>
                      Flue passes the press to code we write. Flue sets no rule
                      about who may approve, so we write that rule: a press
                      counts only from the person your spec names.
                    </RowText>
                  </Row>
                </li>
                <li>
                  <Row stack>
                    <RowLabel>It cannot choose where it posts</RowLabel>
                    <RowText>
                      Code we write fixes the channel and the thread the agent
                      replies in, and the token it replies with. The model
                      writes the words of a message. It does not choose a
                      workspace, a channel or a credential.
                    </RowText>
                  </Row>
                </li>
              </Rows>
              <Note gate>
                Anything that reaches someone outside your company waits for
                this press: a sent email, a published page, a posted message, a
                payment. Only a named person at your company can approve one.
              </Note>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="prerequisites-title" id="prerequisites">
          <Unit>
            <UnitHead index={3} title="What you provide" titleId="prerequisites-title">
              <HeadNote>
                Three things, all of them yours. We set the agent up inside
                them with you, so the account, the keys and the code are yours
                from the first day.
              </HeadNote>
            </UnitHead>
            <UnitBody>
              <Rows>
                <li>
                  <Row>
                    <RowLabel>A Slack workspace</RowLabel>
                    <RowText>
                      The one your team already works in, and the channels the
                      agent answers in.
                    </RowText>
                  </Row>
                </li>
                <li>
                  <Row>
                    <RowLabel>A Slack app in that workspace</RowLabel>
                    <RowText>
                      The agent keeps two values from it. The signing secret
                      lets the agent check that each request comes from your
                      Slack app. The bot token is what the agent replies with.
                      Both stay in your project.
                    </RowText>
                  </Row>
                </li>
                <li>
                  <Row>
                    <RowLabel>Somewhere for it to run</RowLabel>
                    <RowText>
                      Your own Cloudflare account, or Node.js. Flue&rsquo;s
                      Slack channel runs on both.
                    </RowText>
                  </Row>
                </li>
              </Rows>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="teams-title" id="teams">
          <Unit>
            <UnitHead index={4} title="If your team is in Microsoft Teams" titleId="teams-title">
              <HeadNote>
                Your team uses it the same way: a person mentions the agent in
                a channel, and it replies in that conversation. The setup on
                your side is different.
              </HeadNote>
            </UnitHead>
            <UnitBody>
              <Rows>
                <li>
                  <Row>
                    <RowLabel>Slack needs two values</RowLabel>
                    <RowText>
                      The app&rsquo;s signing secret and its bot token, both
                      issued in your workspace.
                    </RowText>
                  </Row>
                </li>
                <li>
                  <Row>
                    <RowLabel>Teams needs three, and a registration</RowLabel>
                    <RowText>
                      An app ID, a tenant ID and an app password. Teams also
                      needs an Azure Bot registration whose messaging endpoint
                      points at your agent. Slack has no step like it.
                    </RowText>
                  </Row>
                </li>
              </Rows>
              <Note>{channels.teamsNote}</Note>
              <PullLink className="mt-4 inline-block" href={teamsDoc} rel="noreferrer">
                Read what Flue verifies for Teams
              </PullLink>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="slack-cost-title" id="cost" tone="panel">
          <Unit>
            <UnitHead index={5} title="What it costs" titleId="slack-cost-title">
              <HeadNote>
                An agent in Slack is built around the work your team asks it
                for, so it is a custom agent, at the custom price.
              </HeadNote>
            </UnitHead>
            <UnitBody>
              {/* The price to build, what the month buys and what a custom
                  agent needs from you are the door's own sentences, so this
                  page prints no number and sends the reader there. */}
              <Note className="mt-0">
                The custom page gives the price to build, what the monthly
                price pays for, and what you need before we start.
              </Note>
              <PullLink className="mt-4 inline-block" href={customPage.path}>
                What custom AI agent development costs
              </PullLink>
            </UnitBody>
          </Unit>
        </Band>
      </main>

      <SiteFooter route={slackPage.path} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />
    </>
  );
}
