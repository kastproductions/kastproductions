import Link from "next/link";
import type { Metadata } from "next";
import { AgentConsole } from "@/components/agent-console";
import { ChannelsSection } from "@/components/channels-section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  brand,
  callHref,
  clients,
  description,
  doors,
  fitDimensions,
  fitIntro,
  founder,
  hero,
  jobs,
  jobsIntro,
  location,
  mailtoFor,
  mechanism,
  mechanismIntro,
  prices,
  pricingIntro,
  products,
  questions,
  references,
  stack,
  title,
} from "./content";
import { indexedRobots, openGraphImage } from "./head-directives";
import { graphHtml, webPage } from "./structured-data";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  robots: indexedRobots,
  openGraph: {
    ...openGraphImage,
    type: "website",
    url: "/",
    siteName: brand,
    locale: "en_GB",
    title,
    description,
  },
};

/* A door and a price that depend on a ready-made product stay off the page
 * until one runs. See the Catalogue entry in CONTEXT.md. */
const openDoors = doors.filter((door) => !door.catalogue || products.length > 0);
const openPrices = prices.filter((plan) => !plan.catalogue || products.length > 0);

/* The home page's own node, beside the site-wide ones the layout renders. The
 * home page sells no one thing, so it states that it is a page and stops. */
const graph = graphHtml([webPage({ path: "/", name: title, description })]);

export default function Home() {
  return (
    <>
      <SiteHeader route="/" />

      <main id="main">
        <section className="band band--flush hero">
          <div className="wrap hero__grid">
            <div className="hero__copy">
              <h1>{hero.heading}</h1>
              <p className="lede">{hero.lede}</p>
              <div className="actions">
                <a className="btn btn--signal" href={callHref}>
                  Book a call
                </a>
                <a className="btn btn--line" href="#work">
                  See the work we take
                </a>
              </div>
            </div>
            <AgentConsole />
          </div>
        </section>

        <section className="band strip" id="clients" aria-labelledby="clients-title">
          <div className="wrap strip__grid">
            <h2 id="clients-title">
              Companies we have shipped for, across four continents
            </h2>
            <ul className="strip__list">
              {clients.map((client) => (
                <li key={client.name}>
                  <a href={client.url} rel="noreferrer">
                    {client.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="band" id="work" aria-labelledby="work-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="work-title">{jobsIntro.heading}</h2>
              <p>{jobsIntro.lede}</p>
            </div>
            <div className="unit__body">
              <ul className="rows">
                {jobs.map((job) => (
                  <li key={job.title}>
                    <div className="row">
                      <span className="row__label">{job.title}</span>
                      <p>{job.body}</p>
                      <span className="row__note">{job.systems}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <ul className="doors" id="doors">
                {openDoors.map((door) => (
                  <li className="door" key={door.name}>
                    <h3>{door.name}</h3>
                    <p className="door__promise">{door.promise}</p>
                    <p>{door.body}</p>
                    <Link className="pull" href={door.href}>
                      {door.more}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="band" id="fit" aria-labelledby="fit-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="fit-title">{fitIntro.heading}</h2>
              <p>{fitIntro.lede}</p>
            </div>
            <div className="unit__body">
              <ul className="rows">
                {fitDimensions.map((dimension) => (
                  <li key={dimension.title}>
                    <div className="row row--stack">
                      <span className="row__label">{dimension.title}</span>
                      <p>{dimension.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <ChannelsSection />

        <section className="band" id="mechanism" aria-labelledby="mechanism-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="mechanism-title">{mechanismIntro.heading}</h2>
              <p>{mechanismIntro.lede}</p>
            </div>
            <div className="unit__body">
              <ul className="rows">
                {mechanism.map((part) => (
                  <li key={part.title}>
                    <div className="row row--stack">
                      <span className="row__label">{part.title}</span>
                      <p>{part.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="band" id="stack" aria-labelledby="stack-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="stack-title">{stack.heading}</h2>
            </div>
            <div className="unit__body">
              <p className="lede">{stack.body}</p>
              <div className="pair">
                <h3>{stack.oursHeading}</h3>
                <ul className="marks">
                  {stack.ours.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              {stack.links.map((link) => (
                <a className="pull" href={link.url} rel="noreferrer" key={link.url}>
                  Read the {link.label} documentation
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="band" id="reviewer" aria-labelledby="reviewer-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="reviewer-title">Who puts their name on it</h2>
              <p>
                {founder} founded {brand} in {location.city} and has shipped for
                the companies listed above. He owns the agents we build and
                signs the merges we make on a client&apos;s repository. The
                references below are quoted as written.
              </p>
            </div>
            <ul className="unit__body refs">
              {references.map((reference) => (
                <li key={reference.name}>
                  <figure>
                    <blockquote>
                      <p>{reference.quote}</p>
                    </blockquote>
                    <figcaption>
                      <img
                        src={reference.portrait}
                        alt={`${reference.name}, ${reference.position}`}
                        width={176}
                        height={176}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="refs__who">
                        <b>{reference.name}</b>
                        <span>{reference.position}</span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="band band--panel"
          id="pricing"
          aria-labelledby="pricing-title"
        >
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="pricing-title">{pricingIntro.heading}</h2>
              <p>{pricingIntro.lede}</p>
            </div>
            <div className="unit__body plans">
              {openPrices.map((plan) => (
                <div className="plan" key={plan.title}>
                  <h3>{plan.title}</h3>
                  <p>{plan.body}</p>
                  <div className="plan__figures">
                    <div className="plan__price">
                      {plan.price} <span>{plan.per}</span>
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

        <section className="band" id="questions" aria-labelledby="questions-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="questions-title">Questions we get on the first call</h2>
            </div>
            <div className="unit__body">
              <div className="faq">
                {questions.map((item) => (
                  <details key={item.q}>
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter route="/" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph }}
      />
    </>
  );
}
