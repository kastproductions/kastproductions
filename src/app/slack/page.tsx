import {
  Actions,
  Band,
  HeadNote,
  HeroCopy,
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
import { buttonVariants } from "@/components/ui/button";
import { callHref, channels, customPage, mailtoFor, slackPage, slackSubject } from "../content";
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
          <HeroCopy className="wrap">
            <HeroTitle>An agent your team addresses in Slack.</HeroTitle>
            <Lede wide>
              Your team already works in Slack, so that is where the agent
              answers. A person mentions it by name in a channel, it works in
              the thread that opens, and anything that leaves your company
              waits there for a named person to approve it.
            </Lede>
            <Actions>
              <a className={buttonVariants()} href={brief}>
                Describe the work
              </a>
              <a className={buttonVariants({ variant: "outline" })} href={callHref}>
                Book a call
              </a>
            </Actions>
          </HeroCopy>
        </Band>

        <Band id="address" aria-labelledby="address-title">
          <Unit>
            <UnitHead title="How a person addresses it" titleId="address-title">
              <HeadNote>
                The agent has a name in your workspace, the way a colleague
                does. Nobody installs anything or learns a new tool: they ask
                in the channel where the work already happens.
              </HeadNote>
            </UnitHead>
            <UnitBody>
              <Rows>
                <li>
                  <Row stack>
                    <RowLabel>Mention it by name</RowLabel>
                    <RowText>
                      A person writes the agent&rsquo;s name in a channel it has
                      been added to, followed by what they want done. Slack
                      delivers that mention to your agent, and the agent starts
                      work on it.
                    </RowText>
                  </Row>
                </li>
                <li>
                  <Row stack>
                    <RowLabel>The thread is the session</RowLabel>
                    <RowText>
                      The thread under that message is one session. The agent
                      answers in that thread and no other, and a second mention
                      in the same thread continues the same session rather than
                      starting a new one.
                    </RowText>
                  </Row>
                </li>
                <li>
                  <Row stack>
                    <RowLabel>A slash command, where you prefer one</RowLabel>
                    <RowText>
                      A team that would rather type a command than a mention
                      can have one. Slack sends the command to the agent, which
                      acknowledges it at once and starts the work.
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

        <Band id="gate" aria-labelledby="gate-title">
          <Unit>
            <UnitHead title="What the approval gate looks like" titleId="gate-title">
              <HeadNote>
                An approval gate is where the agent stops and waits for a named
                person. In a channel, it is a message with a button under it.
              </HeadNote>
            </UnitHead>
            <UnitBody>
              <Rows>
                <li>
                  <Row stack>
                    <RowLabel>The agent states what it wants to do</RowLabel>
                    <RowText>
                      Before an outward action, the agent posts in the thread
                      what it is about to do and for whom, with the draft or the
                      figure attached, and a button to approve it. Then it
                      stops.
                    </RowText>
                  </Row>
                </li>
                <li>
                  <Row stack>
                    <RowLabel>A named person presses the button</RowLabel>
                    <RowText>
                      Slack delivers the press to your agent. The rule that only
                      a named person&rsquo;s press counts is ours to write,
                      because Flue delivers the press and leaves the policy to
                      us.
                    </RowText>
                  </Row>
                </li>
                <li>
                  <Row stack>
                    <RowLabel>The agent cannot choose where it posts</RowLabel>
                    <RowText>
                      The channel and the thread it answers in, and the token it
                      answers with, are bound in code we write. The model
                      chooses the words of a message and nothing else: not a
                      workspace, not a channel, not a credential.
                    </RowText>
                  </Row>
                </li>
              </Rows>
              <Note gate>
                An outward action is anything that reaches someone outside your
                company: a sent email, a published page, a posted message, a
                payment. Only a named person at your company approves one, and
                the press in Slack is that approval.
              </Note>
            </UnitBody>
          </Unit>
        </Band>

        <Band id="prerequisites" aria-labelledby="prerequisites-title">
          <Unit>
            <UnitHead title="What you provide" titleId="prerequisites-title">
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
                      agent is to answer in.
                    </RowText>
                  </Row>
                </li>
                <li>
                  <Row>
                    <RowLabel>A Slack app in that workspace</RowLabel>
                    <RowText>
                      The agent holds two values from it. The first is the
                      app&rsquo;s signing secret: the agent verifies the
                      signature on every request before it reads a word of it.
                      The second is the bot token the agent
                      answers with. Both stay in your project.
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

        <Band id="teams" aria-labelledby="teams-title">
          <Unit>
            <UnitHead title="If your team is in Microsoft Teams" titleId="teams-title">
              <HeadNote>
                The agent reads the same way to your team: a person mentions it
                in a channel, and it answers where it was asked. What changes
                is what you provide, and it changes on your side of it.
              </HeadNote>
            </UnitHead>
            <UnitBody>
              <Rows>
                <li>
                  <Row>
                    <RowLabel>Slack holds two values</RowLabel>
                    <RowText>
                      The app&rsquo;s signing secret and its bot token, both
                      issued in your workspace.
                    </RowText>
                  </Row>
                </li>
                <li>
                  <Row>
                    <RowLabel>Teams holds three, and one registration</RowLabel>
                    <RowText>
                      An app ID, a tenant ID and an app password, and an Azure
                      Bot registration whose messaging endpoint points at your
                      agent before Teams sends it anything. The registration is
                      the step Slack does not have.
                    </RowText>
                  </Row>
                </li>
              </Rows>
              <Note>{channels.teamsNote}</Note>
              <PullLink href={teamsDoc} rel="noreferrer">
                Read what Flue verifies for Teams
              </PullLink>
            </UnitBody>
          </Unit>
        </Band>

        <Band tone="panel" id="cost" aria-labelledby="slack-cost-title">
          <Unit>
            <UnitHead title="What it costs" titleId="slack-cost-title">
              <HeadNote>
                An agent in Slack is shaped around the work your team asks it
                for, so it is custom work, and the custom door prices it.
              </HeadNote>
            </UnitHead>
            <UnitBody>
              {/* The floor, the month and what a custom agent needs from you
                  are the door's own sentences, so this page prints no number
                  and sends the reader there. */}
              <Note>
                The door states the floor to build, what the month buys, and
                what a custom agent needs from you before we start.{" "}
                <PullLink href={customPage.path}>
                  What custom AI agent development costs
                </PullLink>
              </Note>
            </UnitBody>
          </Unit>
        </Band>
      </main>

      <SiteFooter route={slackPage.path} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />
    </>
  );
}
