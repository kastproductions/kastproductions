import Link from "next/link";
import type { Metadata } from "next";
import { MentionCard } from "@/components/mention-card";
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
  indexedRobots,
  location,
  mailtoFor,
  mechanism,
  mechanismIntro,
  openGraphImage,
  prices,
  pricingIntro,
  products,
  questions,
  references,
  stack,
  title,
} from "./content";

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

export default function Home() {
  return (
    <>
      <SiteHeader home />

      <main id="main">
        <section className="hero field">
          <div className="wrap hero__grid">
            <div className="hero__copy">
              <h1>{hero.heading}</h1>
              <p className="lede">{hero.lede}</p>
              <div className="actions">
                <a className="button button--paper" href={callHref}>
                  Book a call
                </a>
                <a className="button button--ghost" href="#doors">
                  See where it starts
                </a>
              </div>
            </div>
            <MentionCard />
          </div>
        </section>

        <section className="clients" id="clients" aria-labelledby="clients-title">
          <div className="wrap">
            <h2 id="clients-title">
              Companies we have shipped for, across four continents
            </h2>
            <ul className="clients__list">
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

        <section className="section" id="doors" aria-labelledby="doors-title">
          <div className="wrap">
            <div className="section__head">
              <h2 id="doors-title">Where your agent starts</h2>
              <p>
                Every build ends the same way: one standing agent, deployed
                into your own accounts, answering to one name in a channel your
                team already has open.
              </p>
            </div>
            <ul className="doors">
              {openDoors.map((door) => (
                <li className="door" key={door.name}>
                  <h3>{door.name}</h3>
                  <p className="door__promise">{door.promise}</p>
                  <p>{door.body}</p>
                  <Link className="door__more" href={door.href}>
                    {door.name === "Custom"
                      ? "What custom looks like"
                      : "What it does"}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="fit" aria-labelledby="fit-title">
          <div className="wrap">
            <div className="section__head">
              <h2 id="fit-title">{fitIntro.heading}</h2>
              <p>{fitIntro.lede}</p>
            </div>
            <div className="specs">
              {fitDimensions.map((dimension) => (
                <div className="spec" key={dimension.title}>
                  <h3>{dimension.title}</h3>
                  <p>{dimension.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="mechanism" aria-labelledby="mechanism-title">
          <div className="wrap">
            <div className="section__head">
              <h2 id="mechanism-title">{mechanismIntro.heading}</h2>
              <p>{mechanismIntro.lede}</p>
            </div>
            <div className="specs">
              {mechanism.map((part) => (
                <div className="spec" key={part.title}>
                  <h3>{part.title}</h3>
                  <p>{part.body}</p>
                </div>
              ))}
            </div>
            <div className="split stack">
              <div className="pair">
                <h3>{stack.heading}</h3>
                <p>{stack.body}</p>
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
              <div className="pair">
                <h3>{stack.oursHeading}</h3>
                <ul className="marks">
                  {stack.ours.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section refs"
          id="reviewer"
          aria-labelledby="reviewer-title"
        >
          <div className="wrap">
            <div className="section__head">
              <h2 id="reviewer-title">Who puts their name on it</h2>
              <p>
                {founder} founded {brand} in {location.city} and has shipped for
                the companies listed above. He owns the agents we build and
                signs the merges we make on a client&apos;s repository. Below
                are references from people who have worked with him, quoted as
                written.
              </p>
            </div>
            <ul className="refs__list">
              {references.map((reference) => (
                <li key={reference.name}>
                  <figure>
                    <blockquote>
                      <p>{reference.quote}</p>
                    </blockquote>
                    <figcaption>
                      <img
                        src={reference.portrait}
                        alt=""
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

        <section className="section" id="pricing" aria-labelledby="pricing-title">
          <div className="wrap">
            <div className="section__head">
              <h2 id="pricing-title">{pricingIntro.heading}</h2>
              <p>{pricingIntro.lede}</p>
            </div>
            <div className="plans">
              {openPrices.map((plan) => (
                <div className="plan" key={plan.title}>
                  <h3>{plan.title}</h3>
                  <p>{plan.body}</p>
                  <div className="plan__price">
                    {plan.price} <small>{plan.per}</small>
                  </div>
                  <ul>
                    {plan.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a
                    className={`button ${plan.buttonStyle}`}
                    href={mailtoFor(plan.subject)}
                  >
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section"
          id="questions"
          aria-labelledby="questions-title"
        >
          <div className="wrap">
            <div className="section__head">
              <h2 id="questions-title">Questions we get on the first call</h2>
            </div>
            <div className="faq">
              {questions.map((item) => (
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
