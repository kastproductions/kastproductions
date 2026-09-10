import Link from "next/link";
import type { Metadata } from "next";
import { RunRecord } from "@/components/run-record";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  brand,
  callHref,
  clients,
  description,
  founder,
  ladder,
  location,
  mailtoFor,
  method,
  plans,
  questions,
  reasons,
  references,
  standingIntro,
  tiers,
  title,
  work,
} from "./content";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: brand,
    locale: "en_GB",
    title,
    description,
  },
};

export default function Home() {
  return (
    <>
      <SiteHeader home />

      <main id="main">
        <section className="hero field">
          <div className="wrap hero__grid">
            <div className="hero__copy">
              <h1>Coding agents do the work. Engineers put their name on it.</h1>
              <p className="lede">
                {brand} is a software factory on demand, based in{" "}
                {location.city}, {location.country}. Coding agents work your
                backlog and a named engineer signs every merge. Or we build one
                standing agent for your team and keep it running.
              </p>
              <div className="actions">
                <a className="button button--paper" href={callHref}>
                  Book a call
                </a>
                <a className="button button--ghost" href="#method">
                  See how a run works
                </a>
              </div>
            </div>
            <RunRecord />
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

        <section className="section" aria-labelledby="why-title">
          <div className="wrap">
            <div className="section__head">
              <h2 id="why-title">What changes when coding agents write the code</h2>
            </div>
            <div className="reasons">
              {reasons.map((reason) => (
                <div className="reason" key={reason.title}>
                  <h3>{reason.title}</h3>
                  <p>{reason.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="method" aria-labelledby="method-title">
          <div className="wrap">
            <div className="section__head">
              <h2 id="method-title">How a run works</h2>
              <p>
                Every feature goes through the same five steps. You can watch
                any of them live.
              </p>
            </div>
            <ol className="steps">
              {method.map((step) => (
                <li key={step.title}>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                  <p className="you">
                    <strong>You:</strong> {step.you}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section work" id="work" aria-labelledby="work-title">
          <div className="wrap">
            <div className="section__head">
              <h2 id="work-title">
                What a run looks like <span className="tag">Example</span>
              </h2>
              <p>Days count from approved brief to merged pull request.</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th scope="col">Kind of company</th>
                  <th scope="col">Brief</th>
                  <th scope="col">Days</th>
                  <th scope="col">Result</th>
                </tr>
              </thead>
              <tbody>
                {work.map((run) => (
                  <tr key={run.brief}>
                    <td data-label="Client">{run.client}</td>
                    <td data-label="Brief">{run.brief}</td>
                    <td data-label="Days" className="num">
                      {run.days}
                    </td>
                    <td data-label="Result">{run.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                {founder} founded {brand} and has shipped for the companies
                listed above. He reviews every run himself. Below are references
                from people who have worked with him, quoted as written.
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

        <section className="section" id="agents" aria-labelledby="agents-title">
          <div className="wrap">
            <div className="section__head">
              <h2 id="agents-title">{standingIntro.heading}</h2>
              <p>{standingIntro.lede}</p>
            </div>
            <ul className="doors">
              {tiers.map((tier) => (
                <li className="door" key={tier.name}>
                  <h3>{tier.name}</h3>
                  <p>{tier.promise}</p>
                </li>
              ))}
            </ul>
            <div className="actions">
              <Link className="button button--ink" href="/standing-agents">
                See what each tier does
              </Link>
            </div>
          </div>
        </section>

        <section className="section" id="pricing" aria-labelledby="pricing-title">
          <div className="wrap">
            <div className="section__head">
              <h2 id="pricing-title">How to work with us</h2>
              <p>
                Backlog runs go by the sprint or by the month. A standing agent
                is priced once to build and then monthly to operate.{" "}
                {ladder.entry}{" "}
                <Link href="/standing-agents">See what each tier does</Link>.
              </p>
            </div>
            <div className="plans">
              {plans.map((plan) => (
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
