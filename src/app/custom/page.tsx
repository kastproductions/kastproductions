import Link from "next/link";
import { ChannelsSection } from "@/components/channels-section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { callHref, custom, customPage, jobs, mailtoFor } from "../content";
import { pageMetadata } from "../head-directives";
import { graphHtml, pageNodes } from "../structured-data";

export const metadata = pageMetadata(customPage);

/* The door's own nodes, beside the site-wide ones the layout renders: the
 * page itself, the service it sells with the prices it prints, and the way
 * here from the home page. */
const graph = graphHtml(pageNodes(customPage, { prices: custom.prices }));

export default function Custom() {
  return (
    <>
      <SiteHeader route={customPage.path} />

      <main id="main">
        <section className="band band--flush hero">
          <div className="wrap hero__copy">
            <h1>{custom.heading}</h1>
            <p className="lede lede--wide">{custom.lede}</p>
            <div className="actions">
              <a className="btn btn--signal" href={mailtoFor(custom.subject)}>
                Describe the work
              </a>
              <a className="btn btn--line" href={callHref}>
                Book a call
              </a>
            </div>
          </div>
        </section>

        <section className="band" id="jobs" aria-labelledby="jobs-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="jobs-title">{custom.jobsHeading}</h2>
              <p>{custom.jobsLede}</p>
            </div>
            <div className="unit__body">
              <ul className="rows">
                {jobs.map((job) => (
                  <li key={job.title}>
                    <div className="row">
                      <span className="row__label">{job.title}</span>
                      <p>{job.body}</p>
                      <span className="row__note">{job.systems}</span>
                      {job.page && (
                        <Link className="pull" href={job.page.path}>
                          {job.page.more}
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <ChannelsSection />

        <section
          className="band band--panel"
          id="pricing"
          aria-labelledby="custom-price-title"
        >
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="custom-price-title">What custom AI agent development costs</h2>
              <p>
                The build price is a floor, because the work follows the number
                of systems your agent touches. The monthly price buys the eval
                suite, the changes and the report.
              </p>
            </div>
            <div className="unit__body plans">
              <div className="plan">
                <h3>Custom agent</h3>
                <p>
                  You describe the work. We write the spec and name the price,
                  then build the agent around how your company already runs.
                </p>
                <div className="plan__figures">
                  {custom.prices.map((price) => (
                    <div className="plan__price" key={price.per}>
                      {price.amount} <span>{price.per}</span>
                    </div>
                  ))}
                  <ul className="plan__includes">
                    <li>A fixed price before we write any code</li>
                    <li>Your accounts, your keys, your code from the first commit</li>
                    <li>An eval suite, approval gates and a spend cap written for you</li>
                  </ul>
                </div>
                <a
                  className="btn btn--line"
                  href={mailtoFor(custom.subject)}
                >
                  Describe the work
                </a>
              </div>
              <p className="note">
                Which accounts you need depends on the systems your agent
                touches. The spec names every one of them, next to the price,
                before you commit to anything.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter route={customPage.path} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph }}
      />
    </>
  );
}
