import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  company,
  contactEmail,
  imprintPage,
  leadTime,
  openPrices,
  privacyPage,
  termsPage,
} from "../content";
import { pageMetadata } from "../head-directives";
import { graphHtml, pageNodes } from "../structured-data";

export const metadata = pageMetadata(termsPage);

/* The page and the way here from the home page. The terms state what the
 * printed prices buy; the page that prints a price is the one that offers it,
 * so this page states no offer of its own. */
const graph = graphHtml(pageNodes(termsPage));

const mailbox = <a href={`mailto:${contactEmail}`}>{contactEmail}</a>;

export default function Terms() {
  return (
    <>
      <SiteHeader route={termsPage.path} />

      <main className="legal" id="main">
        <section className="band band--flush hero">
          <div className="wrap hero__copy">
            <h1>Terms of service</h1>
            <p className="lede lede--wide">
              These terms say what the prices on this site buy and what both
              sides can expect. The spec and the order you sign cover your own
              work, and where the two differ, the order is what binds us.
            </p>
          </div>
        </section>

        <section className="band" aria-labelledby="parties-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="parties-title">Who these terms are between</h2>
            </div>
            <div className="unit__body">
              <p>
                They are between {company.legalName}, called &ldquo;we&rdquo;
                below, and the company that orders work from us. The
                registration code, the registered address and the director are
                on the <Link href={imprintPage.path}>imprint</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="sell-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="sell-title">What we sell</h2>
            </div>
            <div className="unit__body">
              <p>
                A build is the work of building one standing agent and
                deploying it into your own accounts, at a price we fix before
                the work starts. One agent is one deployment with one name: a
                second name is a second agent and a second build.
              </p>
              <p>
                The monthly work keeps that agent correct and current after it
                is live. It buys the eval suite, the changes we make and the
                monthly report of what your agent did.
              </p>
              <p>
                Two words in your order say who runs the agent once it is
                live. Self-run means we build it, deploy it into your own
                accounts and hand over the keys, and your engineers sign the
                merges. Managed means we run it on your work, our coding agents
                take the runs, and our reviewer signs every merge. Your order
                names one of the two.
              </p>
              <p>
                A sprint is neither. It is one brief, worked over two weeks on
                your repository, with our reviewer signing the merge. Nothing
                is deployed and nothing is connected, so a sprint buys one
                piece of finished work rather than an agent.
              </p>
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="price-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="price-title">What a price means</h2>
              <p>
                The prices this site prints today, and what each of them is a
                price for.
              </p>
            </div>
            <div className="unit__body">
              <dl className="rows">
                {openPrices.map((way) => (
                  <div className="row row--stack" key={way.title}>
                    <dt className="row__label">{way.title}</dt>
                    <dd>
                      {way.price} {way.per}
                    </dd>
                  </div>
                ))}
              </dl>
              <p>
                Every one of them is a floor rather than a quote. A build price
                is a floor because the work follows the number of systems your
                agent touches. The price we then name in your spec is fixed,
                and we name it before any work starts.
              </p>
              <p>
                Lead time is the working days from a signed order to the agent
                answering in your own channel. A ready-made agent&rsquo;s is{" "}
                {leadTime}, printed beside its price.
              </p>
              <p>
                Your spec names every account, key and subscription your agent
                needs before you commit to anything, and says whether you
                already own it or we set it up. Those that are yours stay in
                your name: we deploy into them.
              </p>
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="own-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="own-title">What you own</h2>
            </div>
            <div className="unit__body">
              <p>
                You own the agent and the code. It lives in your repository and
                deploys into your own accounts, with your keys, from the first
                commit.
              </p>
              <p>
                Stop paying us and your agent keeps running. What stops is our
                work on it.
              </p>
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="authority-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="authority-title">What the agent may do</h2>
            </div>
            <div className="unit__body">
              <p>
                A named person at your company approves every outward action:
                anything that reaches a customer, an inbox, a published page or
                a payment. The agent stops at that gate and waits.
              </p>
              <p>
                Every session runs under a spend cap we agree with you. A
                session that reaches the cap stops and asks you, or stops and
                reports when there is nobody to ask.
              </p>
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="promise-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="promise-title">What we promise</h2>
            </div>
            <div className="unit__body">
              <p>
                We do not promise uptime, and nobody honestly can for software
                running in your own cloud account.
              </p>
              <p>
                We promise four things: a named engineer, an answer inside
                business hours, a green eval suite on every change we make, and
                a monthly report of what your agent did.
              </p>
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="end-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="end-title">Ending it</h2>
            </div>
            <div className="unit__body">
              <p>
                Cancel the monthly work at the end of any month. Your agent
                keeps running, because it is your code in your accounts.
              </p>
              <p>
                Questions about these terms go to {mailbox}, and how we handle
                what you send is on the{" "}
                <Link href={privacyPage.path}>privacy page</Link>.
              </p>
              <p className="note">
                Last changed on{" "}
                <time className="mono" dateTime={termsPage.date}>
                  {termsPage.date}
                </time>
                .
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter route={termsPage.path} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />
    </>
  );
}
