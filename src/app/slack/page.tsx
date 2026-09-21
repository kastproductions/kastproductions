import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { callHref, channels, customPage, mailtoFor, slackPage } from "../content";
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
const brief = mailtoFor("Agent in Slack");

export default function Slack() {
  return (
    <>
      <SiteHeader route={slackPage.path} />

      <main id="main">
        <section className="band band--flush hero">
          <div className="wrap hero__copy">
            <h1>An agent your team addresses in Slack.</h1>
            <p className="lede lede--wide">
              Your team already works in Slack, so that is where the agent
              answers. A person mentions it by name in a channel, it works in
              the thread that opens, and anything that leaves your company
              waits there for a named person to approve it.
            </p>
            <div className="actions">
              <a className="btn btn--signal" href={brief}>
                Describe the work
              </a>
              <a className="btn btn--line" href={callHref}>
                Book a call
              </a>
            </div>
          </div>
        </section>

        <section className="band" id="address" aria-labelledby="address-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="address-title">How a person addresses it</h2>
              <p>
                The agent has a name in your workspace, the way a colleague
                does. Nobody learns a command language: they ask in the channel
                where the work already happens.
              </p>
            </div>
            <div className="unit__body">
              <ul className="rows">
                <li>
                  <div className="row row--stack">
                    <span className="row__label">Mention it by name</span>
                    <p>
                      A person writes the agent&rsquo;s name in a channel it has
                      been added to, followed by what they want done. Slack
                      delivers that mention to your agent, and the agent starts
                      work on it.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="row row--stack">
                    <span className="row__label">The thread is the session</span>
                    <p>
                      The thread under that message is one session. The agent
                      answers in that thread and no other, and a second mention
                      in the same thread continues the same session rather than
                      starting a new one.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="row row--stack">
                    <span className="row__label">A slash command, where you prefer one</span>
                    <p>
                      A team that would rather type a command than a mention
                      can have one. Slack sends it to the agent the same way,
                      and the agent answers where it was asked.
                    </p>
                  </div>
                </li>
              </ul>
              <a className="pull" href={slackDoc} rel="noreferrer">
                Read what Flue verifies for Slack
              </a>
            </div>
          </div>
        </section>

        <section className="band" id="gate" aria-labelledby="gate-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="gate-title">What the approval gate looks like</h2>
              <p>
                An approval gate is where the agent stops and waits for a named
                person. In a channel, it is a message with a button under it.
              </p>
            </div>
            <div className="unit__body">
              <ul className="rows">
                <li>
                  <div className="row row--stack">
                    <span className="row__label">The agent states what it wants to do</span>
                    <p>
                      Before an outward action, the agent posts in the thread
                      what it is about to do and for whom, with the draft or the
                      figure attached, and a button to approve it. Then it
                      stops.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="row row--stack">
                    <span className="row__label">A named person presses the button</span>
                    <p>
                      Slack delivers the press to your agent, with who pressed
                      it. The rule that only a named person&rsquo;s press counts
                      is ours to write, because the framework delivers the
                      press and leaves the policy to us.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="row row--stack">
                    <span className="row__label">The agent cannot choose where it posts</span>
                    <p>
                      The channel and the thread it answers in, and the token it
                      answers with, are bound in code we write. The model
                      chooses the words of a message and nothing else: not a
                      workspace, not a channel, not a credential.
                    </p>
                  </div>
                </li>
              </ul>
              <p className="note note--gate">
                An outward action is anything that reaches someone outside your
                company: a sent email, a published page, a posted message, a
                payment. Only a named person at your company approves one, and
                the press in Slack is that approval.
              </p>
            </div>
          </div>
        </section>

        <section className="band" id="prerequisites" aria-labelledby="prerequisites-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="prerequisites-title">What you provide</h2>
              <p>
                Three things, all of them yours. We set the agent up inside
                them with you, so the account, the keys and the code are yours
                from the first day.
              </p>
            </div>
            <div className="unit__body">
              <ul className="rows">
                <li>
                  <div className="row">
                    <span className="row__label">A Slack workspace</span>
                    <p>
                      The one your team already works in, and the channels the
                      agent is to answer in.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <span className="row__label">A Slack app in that workspace</span>
                    <p>
                      The agent holds two values from it. Slack signs every
                      request it sends, and the agent checks the signature
                      before it reads a word, so the first is the app&rsquo;s
                      signing secret. The second is the bot token the agent
                      answers with. Both stay in your project.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <span className="row__label">Somewhere for it to run</span>
                    <p>
                      Your own Cloudflare account, or Node.js where your
                      platform needs it there instead. The Slack channel runs
                      in both.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="band" id="teams" aria-labelledby="teams-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="teams-title">If your team is in Microsoft Teams</h2>
              <p>
                The agent reads the same way to your team: a person mentions it
                in a channel, and it answers in that conversation. What changes
                is the set-up, and it changes on your side of it.
              </p>
            </div>
            <div className="unit__body">
              <ul className="rows">
                <li>
                  <div className="row">
                    <span className="row__label">Slack holds two values</span>
                    <p>
                      The app&rsquo;s signing secret and its bot token, both
                      issued in your workspace.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <span className="row__label">Teams holds three, and one registration</span>
                    <p>
                      An app ID, a tenant ID and an app password, and before
                      Teams sends the agent anything, an Azure Bot registration
                      whose messaging endpoint points at your agent. None of
                      that exists in a Teams tenant until somebody creates it.
                    </p>
                  </div>
                </li>
              </ul>
              <p className="note">{channels.teamsNote}</p>
              <a className="pull" href={teamsDoc} rel="noreferrer">
                Read what Flue verifies for Teams
              </a>
            </div>
          </div>
        </section>

        <section className="band band--panel" id="pricing" aria-labelledby="slack-price-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="slack-price-title">What it costs</h2>
              <p>
                An agent in Slack is shaped around the work your team asks it
                for, so it is custom work and the custom door prices it: a
                floor to build, a monthly price to operate, and one fixed price
                once we have read your workflow.
              </p>
            </div>
            <div className="unit__body">
              {/* The floor, the month and what a custom agent needs from you
                  are the door's own sentences, so this page prints no number
                  and sends the reader there. */}
              <p className="note">
                The door states the floor to build, what the month buys, and
                what a custom agent needs from you before we start.{" "}
                <Link className="pull" href={customPage.path}>
                  What custom AI agent development costs
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter route={slackPage.path} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />
    </>
  );
}
