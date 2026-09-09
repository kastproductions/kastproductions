import type { Metadata } from "next";
import { RunRecord } from "@/components/run-record";
import {
  brand,
  callHref,
  clients,
  contactEmail,
  description,
  founder,
  location,
  method,
  plans,
  proof,
  questions,
  reasons,
  references,
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

function Brand() {
  return (
    <a className="brand" href="#top">
      <span className="brand__mark" aria-hidden="true" />
      {brand}
    </a>
  );
}

export default function Home() {
  return (
    <>
      <div className="field" id="top">
        <header className="wrap top__row">
          <Brand />
          <nav className="nav" aria-label="Sections">
            <a href="#method">Method</a>
            <a href="#work">Work</a>
            <a href="#pricing">Pricing</a>
            <a href="#questions">Questions</a>
          </nav>
          <a className="button button--paper" href="#contact">
            Book a call
          </a>
        </header>
      </div>

      <main id="main">
        <section className="hero field">
          <div className="wrap hero__grid">
            <div className="hero__copy">
              <h1>Agents write the code. Engineers put their name on it.</h1>
              <p className="lede">
                {brand} is a software development agency in {location.city},{" "}
                {location.country}. Coding agents work your backlog, and a
                named engineer reviews every change before it merges. Each
                feature is one run. You get the full record of that run.
              </p>
              <div className="actions">
                <a className="button button--paper" href="#contact">
                  Book a 30-minute call
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
              Teams we have shipped with, across three continents
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
              <h2 id="why-title">What changes when agents write the code</h2>
            </div>
            <div className="reasons">
              {reasons.map((reason) => (
                <div className="reason" key={reason.title}>
                  <h3>{reason.title}</h3>
                  <p>{reason.body}</p>
                </div>
              ))}
            </div>
            <p className="proof">{proof}</p>
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
              <h2 id="work-title">Recent runs</h2>
              <p>Days count from approved brief to merged pull request.</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th scope="col">Client</th>
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
                {founder} founded {brand} and has shipped for the teams listed
                above. He reviews runs himself. People who have worked with
                him, quoted as written.
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
              <h2 id="pricing-title">Two ways to work with us</h2>
              <p>
                Both use the same process, the same review, and the same run
                records.
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
                  <a className={`button ${plan.buttonStyle}`} href="#contact">
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

      <footer className="field close" id="contact">
        <div className="wrap">
          <div className="close__grid">
            <h2>Bring us a brief.</h2>
            <p className="lede">
              Send the issue you would hand to a new senior engineer. We reply
              within one working day with a spec and a fixed price.
            </p>
            <div className="actions">
              <a className="button button--paper" href={callHref}>
                Book a 30-minute call
              </a>
            </div>
            <p className="contact">
              Or write to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>
          </div>
          <div className="foot">
            <Brand />
            <span>
              Software development agency in {location.city},{" "}
              {location.country}. Copyright {new Date().getFullYear()}.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
