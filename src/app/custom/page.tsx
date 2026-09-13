import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { brand, callHref, channels, custom, mailtoFor } from "../content";

const pageTitle = "Custom agents";

export const metadata: Metadata = {
  title: pageTitle,
  description: custom.lede,
  alternates: {
    canonical: "/custom",
  },
  openGraph: {
    type: "website",
    url: "/custom",
    siteName: brand,
    locale: "en_GB",
    title: `${pageTitle} | ${brand}`,
    description: custom.lede,
  },
};

export default function Custom() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <section className="hero field">
          <div className="wrap hero__copy hero__copy--wide">
            <h1>{custom.heading}</h1>
            <p className="lede">{custom.lede}</p>
            <div className="actions">
              <a className="button button--paper" href={mailtoFor(custom.subject)}>
                Describe the work
              </a>
              <a className="button button--ghost" href={callHref}>
                Book a call
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="jobs" aria-labelledby="jobs-title">
          <div className="wrap">
            <div className="section__head">
              <h2 id="jobs-title">{custom.jobsHeading}</h2>
              <p>{custom.jobsLede}</p>
            </div>
            <div className="specs">
              {custom.jobs.map((job) => (
                <div className="spec" key={job.title}>
                  <div>
                    <h3>{job.title}</h3>
                    <p className="spec__meta">{job.systems}</p>
                  </div>
                  <p>{job.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="channels" aria-labelledby="channels-title">
          <div className="wrap">
            <div className="section__head">
              <h2 id="channels-title">{channels.heading}</h2>
              <p>{channels.lede}</p>
            </div>
            <div className="split">
              <div className="pair">
                <h3>Reachable in</h3>
                <ul className="chips">
                  {channels.reachable.map((channel) => (
                    <li className="chip chip--strong" key={channel}>
                      {channel}
                    </li>
                  ))}
                </ul>
                <p className="note">{channels.teamsNote}</p>
              </div>
              <div className="pair">
                <h3>Woken by events from</h3>
                <ul className="chips">
                  {channels.events.map((source) => (
                    <li className="chip" key={source}>
                      {source}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="pricing" aria-labelledby="custom-price-title">
          <div className="wrap">
            <div className="section__head">
              <h2 id="custom-price-title">What a custom build costs</h2>
              <p>
                The build price is a floor, because the work follows the number
                of systems your agent touches. The monthly price buys the eval
                suite, the changes and the report.
              </p>
            </div>
            <div className="plans">
              <div className="plan">
                <h3>Custom</h3>
                <p>
                  You describe the work. We write the spec and name the price
                  within one working day, then build the agent around how your
                  company already runs.
                </p>
                <div className="plan__price">
                  {custom.prices[0].amount} <small>{custom.prices[0].per}</small>
                </div>
                <div className="plan__price">
                  {custom.prices[1].amount} <small>{custom.prices[1].per}</small>
                </div>
                <ul>
                  <li>A spec and a fixed price within one working day</li>
                  <li>Your accounts, your keys, your code from the first commit</li>
                  <li>An eval suite, approval gates and a spend cap written for you</li>
                </ul>
                <a
                  className="button button--ink"
                  href={mailtoFor(custom.subject)}
                >
                  Describe the work
                </a>
              </div>
            </div>
            <p className="note">
              Which accounts you need depends on the systems your agent touches.
              The spec names every one of them, next to the price, before you
              commit to anything.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
