import Link from "next/link";
import { ChannelsSection } from "@/components/channels-section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
/* The record is the job's page, and this component draws it, so the two carry
 * one name between them: the record is aliased here rather than renamed
 * everywhere else. */
import type { JobPage as JobPageRecord } from "@/app/content";
import { callHref, custom, customPage, mailtoFor } from "@/app/content";
import { graphHtml, pageNodes } from "@/app/structured-data";

/*
 * One job we take, on its own page.
 *
 * The markup lives here rather than in a route file because the five jobs are
 * one shape: a reader who arrives from a search for one of them asks the same
 * questions in the same order, and five hand-written pages would answer them
 * a word further apart every time one was edited. A job page is therefore one
 * record on the job in `content.ts` and one route file that hands that record
 * to this component, which the A job page section of README.md sets out. Every
 * word about one job is on the record; the prose the five pages share, their
 * section headings among it, is here.
 *
 * The page prints the custom door's prices and no others. A job we shape an
 * agent around is custom work, so a price of its own would be a number the
 * door does not state. `custom.prices` is read here rather than copied, which
 * is also what the graph states, so the page, the door and the crawler cannot
 * drift apart.
 *
 * The page carries no console and no run record, so it carries no entrance
 * either: the motion rule in README.md gives a page one or the other, and this
 * one is a sheet a reader reads.
 */
export function JobPage({ page }: { page: JobPageRecord }) {
  /* The page's own nodes, beside the site-wide ones the layout renders: the
   * page itself, the custom work it sells at the door's prices, and the way
   * here from the home page. */
  const graph = graphHtml(pageNodes(page, { prices: custom.prices }));
  /* Every call to action on the page carries this job as its subject, so a
   * click is counted under the job a reader came in on. */
  const brief = mailtoFor(page.subject);

  return (
    <>
      <SiteHeader route={page.path} />

      <main id="main">
        <section className="band band--flush hero">
          <div className="wrap hero__copy">
            <h1>{page.heading}</h1>
            <p className="lede lede--wide">{page.lede}</p>
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

        <section className="band" id="work" aria-labelledby="job-work-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="job-work-title">What the agent does</h2>
              <p>{page.authority}</p>
            </div>
            <div className="unit__body">
              <ul className="rows">
                {page.steps.map((step) => (
                  <li key={step.title}>
                    <div className="row row--stack">
                      <span className="row__label">{step.title}</span>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="note note--gate">{page.gate}</p>
            </div>
          </div>
        </section>

        <section className="band" id="systems" aria-labelledby="job-systems-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="job-systems-title">What it touches</h2>
              <p>
                Your agent works in the systems your team already pays for. We
                connect it to each one, and the spec names every account it
                needs before you commit to anything.
              </p>
            </div>
            <div className="unit__body">
              <ul className="rows">
                {page.systems.map((system) => (
                  <li key={system.name}>
                    <div className="row">
                      <span className="row__label">{system.name}</span>
                      <p>{system.role}</p>
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
          aria-labelledby="job-price-title"
        >
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="job-price-title">What it costs</h2>
              {/* The floor, and what the month buys, are the door's own
                  sentences. This page states which price list a job like this
                  one is on and sends a reader there for the rest. */}
              <p>
                A job we have not built before is custom work, so this one is
                priced at the custom door. The numbers below are floors: we
                read your workflow first, then name one fixed price.
              </p>
            </div>
            <div className="unit__body plans">
              <div className="plan">
                <h3>Custom agent</h3>
                <p>
                  You describe this job as your company runs it. We write the
                  spec, name the price, and build the agent around it.
                </p>
                <div className="plan__figures">
                  {custom.prices.map((price) => (
                    <div className="plan__price" key={price.per}>
                      {price.amount} <span>{price.per}</span>
                    </div>
                  ))}
                </div>
                <a className="btn btn--line" href={brief}>
                  Describe the work
                </a>
              </div>
              <p className="note">
                The door says what a custom agent needs from you, and what the
                month after it goes live buys.{" "}
                <Link className="pull" href={customPage.path}>
                  How a custom agent is built
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter route={page.path} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph }}
      />
    </>
  );
}
