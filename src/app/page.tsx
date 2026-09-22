import Link from "next/link";
import { AgentConsole } from "@/components/agent-console";
import { ChannelsSection } from "@/components/channels-section";
import { ClientsStrip } from "@/components/clients-strip";
import { JobRows } from "@/components/job-rows";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  aboutPage,
  briefHref,
  callHref,
  contactEmail,
  custom,
  customPage,
  doors,
  evalSuitePage,
  fitDimensions,
  fitIntro,
  founder,
  hero,
  homePage,
  jobsIntro,
  leadTime,
  location,
  mailtoFor,
  mechanism,
  mechanismIntro,
  openPrices,
  pricingIntro,
  products,
  questions,
  references,
  stack,
} from "./content";
import { pageMetadata } from "./head-directives";
import { graphHtml, pageNodes } from "./structured-data";

export const metadata = pageMetadata(homePage);

const graph = graphHtml(pageNodes(homePage, { prices: openPrices, questions }));

/* The ready-made door opens only while the catalogue holds a product. */
const readyMade = doors.find((door) => door.catalogue);
const customDoor = doors.find((door) => !door.catalogue)!;
const product = products[0];

/* The shortest reference, for the band that says who signs the merge. The
 * about page prints all six as written. */
const reference = references.reduce((a, b) =>
  a.quote.length <= b.quote.length ? a : b,
);

/* The stack paragraph, with the framework's name linked the one time it is
 * named. README.md: Flue is written in text with a link, never as a logo. */
const [flue] = stack.links;
const flueAt = stack.body.indexOf(flue.label);
const stackBefore = stack.body.slice(0, flueAt);
const stackAfter = stack.body.slice(flueAt + flue.label.length);

/* One static element, drawn once and placed in both actions. */
const arrow = (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M6 18L18 6M18 6H9M18 6v9" />
  </svg>
);

/*
 * The home page reads top to bottom as one argument: what a standing agent
 * is, the two doors in, the work we take, what we shape an agent around, how
 * we keep it right, where it lives, who signs, what it costs, and the
 * questions a buyer asks on the first call. Every word of the offer comes
 * from content.ts, so the page and the graph cannot state two things.
 */
export default function Home() {
  return (
    <>
      <SiteHeader route={homePage.path} />

      <main id="main">
        <section className="band band--flush" id="hero">
          <div className="wrap hero__grid">
            <div className="hero__copy">
              <h1>
                An agent that works the way <em>your company</em> works
                <span className="dot">.</span>
              </h1>
              <p className="lede">{hero.lede}</p>
              <div className="actions">
                <a className="btn btn--signal" href={briefHref}>
                  Send us a brief
                  {arrow}
                </a>
                <a className="btn btn--line" href={callHref}>
                  Book a call
                </a>
              </div>
              <dl className="facts">
                <div>
                  <dt>Spec and fixed price</dt>
                  <dd>Within one working day</dd>
                </div>
                <div>
                  <dt>Ready-made agent live</dt>
                  <dd>In {leadTime}</dd>
                </div>
                <div>
                  <dt>Who owns it</dt>
                  <dd>Your accounts, your keys, your code</dd>
                </div>
              </dl>
            </div>

            <AgentConsole />
          </div>
        </section>

        <ClientsStrip
          heading={`Companies ${founder} shipped for before this offer, across four continents`}
        />

        <section aria-labelledby="doors-title" className="band" id="doors">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="doors-title">Two ways in</h2>
              <p>
                Take an agent we have already built, or describe work that
                matches nothing on a shelf. Both end the same way: one agent,
                in your accounts, kept right after it is live.
              </p>
            </div>
            <div className="unit__body doors">
              {readyMade && product ? (
                <Link className="door" href={`/${product.slug}`}>
                  <span className="door__kind">{readyMade.name}</span>
                  <h3>{product.name}</h3>
                  <p>{product.promise}</p>
                  <p>{readyMade.body}</p>
                  <div className="door__figures">
                    {product.prices.map((price) => (
                      <div key={price.per}>
                        <span>{price.per}</span>
                        <b>{price.amount}</b>
                      </div>
                    ))}
                  </div>
                  <span className="pull">{readyMade.more}</span>
                </Link>
              ) : null}
              <Link className="door" href={customDoor.href}>
                <span className="door__kind">{customDoor.name}</span>
                <h3>
                  Shaped around <em>your workflow</em>
                </h3>
                <p>{customDoor.body}</p>
                <div className="door__figures">
                  {custom.prices.map((price) => (
                    <div key={price.per}>
                      <span>{price.per}</span>
                      <b>{price.amount}</b>
                    </div>
                  ))}
                </div>
                <span className="pull">{customDoor.more}</span>
              </Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="work-title" className="band" id="work">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="work-title">{jobsIntro.heading}</h2>
              <p>{jobsIntro.lede}</p>
              <Link className="pull" href={customPage.path}>
                Describe a job that is not here
              </Link>
            </div>
            <div className="unit__body">
              <JobRows />
            </div>
          </div>
        </section>

        <section aria-labelledby="fit-title" className="band band--panel" id="fit">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="fit-title">{fitIntro.heading}</h2>
              <p>{fitIntro.lede}</p>
            </div>
            <ol className="unit__body grid-2">
              {fitDimensions.map((dimension) => (
                <li key={dimension.title}>
                  <h3>{dimension.title}</h3>
                  <p>{dimension.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          aria-labelledby="mechanism-title"
          className="band"
          id="mechanism"
        >
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="mechanism-title">{mechanismIntro.heading}</h2>
              <p>{mechanismIntro.lede}</p>
              <Link className="pull" href={evalSuitePage.path}>
                {mechanismIntro.more}
              </Link>
            </div>
            <div className="unit__body">
              <ul className="grid-2">
                {mechanism.map((entry) => (
                  <li key={entry.title}>
                    <h3>{entry.title}</h3>
                    <p>{entry.body}</p>
                  </li>
                ))}
                <li>
                  <h3>{stack.heading}</h3>
                  <p>
                    {stackBefore}
                    <a href={flue.url} rel="noreferrer">
                      {flue.label}
                    </a>
                    {stackAfter}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <ChannelsSection />

        <section
          aria-labelledby="reviewer-title"
          className="band band--panel"
          id="reviewer"
        >
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="reviewer-title">Who puts their name on it</h2>
              <p>
                {founder} founded the company in {location.city}. He owns the
                agents we build and signs the merges we make on a client&rsquo;s
                repository.
              </p>
              <Link className="pull" href={aboutPage.path}>
                The founder and six references
              </Link>
            </div>
            <div className="unit__body reviewer">
              <figure>
                <blockquote>
                  <p>&ldquo;{reference.quote}&rdquo;</p>
                  <figcaption>
                    <img
                      alt=""
                      decoding="async"
                      height={176}
                      loading="lazy"
                      src={reference.portrait}
                      width={176}
                    />
                    <span className="refs__who">
                      <b>{reference.name}</b>
                      <span>{reference.position}</span>
                    </span>
                  </figcaption>
                </blockquote>
              </figure>
              <p className="note">
                Written about his earlier work, before this offer existed. There
                is no case study for an agent we have built yet, and we would
                rather print nothing than invent one.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="pricing-title" className="band" id="pricing">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="pricing-title">{pricingIntro.heading}</h2>
              <p>{pricingIntro.lede}</p>
            </div>
            <div className="unit__body plans">
              {openPrices.map((plan) => (
                <div
                  className={
                    plan.buttonStyle === "button--ink" ? "plan plan--lead" : "plan"
                  }
                  key={plan.title}
                >
                  <h3>{plan.title}</h3>
                  <p>{plan.body}</p>
                  <div className="plan__figures">
                    <div className="plan__price">
                      {plan.amount} <span>{plan.per}</span>
                    </div>
                    <ul className="plan__includes">
                      {plan.includes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <a className="btn btn--line" href={mailtoFor(plan.subject)}>
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="questions-title"
          className="band"
          id="questions"
        >
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="questions-title">Questions we get on the first call</h2>
              <p>
                The answers as we give them. Anything not here, ask on the call
                or in the brief.
              </p>
            </div>
            <div className="unit__body faq">
              {questions.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="cta-title" className="band band--ink" id="cta">
          <div className="wrap cta">
            <div>
              <h2 id="cta-title">
                Send us the issue you would hand to a{" "}
                <em>new senior engineer</em>
                <span className="dot">.</span>
              </h2>
              <p>
                Or describe the work you want an agent to take over. We reply
                within one working day with a short spec and a fixed price.
              </p>
              <div className="actions">
                <a className="btn btn--signal" href={briefHref}>
                  Send us a brief
                  {arrow}
                </a>
                <a className="btn btn--line" href={callHref}>
                  Book a call
                </a>
              </div>
            </div>
            <div className="cta__side">
              <div>
                <b>Write to</b>
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </div>
              <div>
                <b>What comes back</b>A spec that names every account the agent
                needs, and one price.
              </div>
              <div>
                <b>Then</b>A ready-made agent answers in your own channel in{" "}
                {leadTime}.
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter route={homePage.path} />

      <script
        dangerouslySetInnerHTML={{ __html: graph }}
        type="application/ld+json"
      />
    </>
  );
}
