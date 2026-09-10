import type { Metadata } from "next";
import { MentionCard } from "@/components/mention-card";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  brand,
  channels,
  eyebrow,
  fitDimensions,
  fitIntro,
  ladder,
  mailtoFor,
  mechanism,
  stack,
  standingQuestions,
  tiers,
} from "../content";

const pageTitle = "Standing agents";
const pageDescription =
  "We build one agent for one company, on the workflow that company already has, deploy it into your own accounts, and operate it month to month.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/standing-agents",
  },
  openGraph: {
    type: "website",
    url: "/standing-agents",
    siteName: brand,
    locale: "en_GB",
    title: `${pageTitle} | ${brand}`,
    description: pageDescription,
  },
};

export default function StandingAgents() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <section className="hero field">
          <div className="wrap hero__grid">
            <div className="hero__copy">
              <p className="eyebrow">{eyebrow}</p>
              <h1>One agent, built on how your company actually works.</h1>
              <p className="lede">
                We build it, deploy it into your own accounts, and operate it
                month to month. Your team reaches it by name in the channel they
                already have open, and it waits for a name before anything
                reaches your customers.
              </p>
              <div className="actions">
                <a
                  className="button button--paper"
                  href={mailtoFor("Standing agents: first call")}
                >
                  Book a 30-minute call
                </a>
                <a className="button button--ghost" href="#tiers">
                  See the four tiers
                </a>
              </div>
            </div>
            <MentionCard />
          </div>
        </section>

        <section className="section" aria-labelledby="fit-title">
          <div className="wrap">
            <div className="section__head">
              <h2 id="fit-title">{fitIntro.heading}</h2>
              <p>{fitIntro.lede}</p>
            </div>
            <div className="reasons">
              {fitDimensions.map((dimension) => (
                <div className="reason" key={dimension.title}>
                  <h3>{dimension.title}</h3>
                  <p>{dimension.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="channels-title">
          <div className="wrap">
            <div className="section__head">
              <h2 id="channels-title">
                It lives where your team already works
              </h2>
              <p>
                An agent nobody opens is worth nothing, so we put it in the
                place your team is already in. It arrives as{" "}
                {channels.primary.join(" or ")}, addressed by name.
              </p>
            </div>
            <div className="split">
              <ul className="chips">
                {channels.primary.map((channel) => (
                  <li className="chip chip--strong" key={channel}>
                    {channel}
                  </li>
                ))}
                {channels.others.map((channel) => (
                  <li className="chip" key={channel}>
                    {channel}
                  </li>
                ))}
              </ul>
              <p className="note">{channels.teamsNote}</p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="mechanism-title">
          <div className="wrap">
            <div className="section__head">
              <h2 id="mechanism-title">
                How we prove it is right, and keep it right
              </h2>
              <p>
                A generic agent has never been told what your company means by
                correct, so it cannot be held to it. This is how yours is.
              </p>
            </div>
            <div className="reasons">
              {mechanism.map((part) => (
                <div className="reason" key={part.title}>
                  <h3>{part.title}</h3>
                  <p>{part.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="tiers" aria-labelledby="tiers-title">
          <div className="wrap">
            <div className="section__head">
              <h2 id="tiers-title">{ladder.heading}</h2>
              <p>{ladder.lede}</p>
            </div>
            <ol className="tiers">
              {tiers.map((tier) => (
                <li className="tier" key={tier.name}>
                  <div className="tier__head">
                    <h3>{tier.name}</h3>
                    <p>{tier.promise}</p>
                    <p className="tier__boundary">{tier.boundary}</p>
                  </div>
                  <div className="tier__body">
                    <ul className="tier__includes">
                      {tier.includes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    {tier.kits.length > 0 ? (
                      <ul className="tier__kits">
                        {tier.kits.map((kit) => (
                          <li key={kit.name}>
                            <a
                              className="mono"
                              href={kit.url}
                              rel="noreferrer"
                            >
                              {kit.name}
                            </a>{" "}
                            {kit.note}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  <div className="tier__buy">
                    {tier.prices.map((price) => (
                      <p className="tier__price" key={price.per}>
                        {price.amount} <small>{price.per}</small>
                      </p>
                    ))}
                    <a
                      className={`button ${tier.buttonStyle}`}
                      href={mailtoFor(`Standing agents: ${tier.name}`)}
                    >
                      {tier.name === "Bespoke"
                        ? "Describe the work"
                        : `Ask about ${tier.name}`}
                    </a>
                  </div>
                </li>
              ))}
            </ol>
            <p className="note">{ladder.kitNote}</p>
            <p className="proof">{ladder.bespokeInvite}</p>
          </div>
        </section>

        <section className="section" aria-labelledby="stack-title">
          <div className="wrap">
            <div className="section__head">
              <h2 id="stack-title">{stack.heading}</h2>
              <p>{stack.body}</p>
            </div>
            <ul className="chips">
              {stack.links.map((link) => (
                <li className="chip" key={link.url}>
                  <a href={link.url} rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="section"
          id="agent-questions"
          aria-labelledby="agent-questions-title"
        >
          <div className="wrap">
            <div className="section__head">
              <h2 id="agent-questions-title">
                Questions we get about standing agents
              </h2>
            </div>
            <div className="faq">
              {standingQuestions.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
