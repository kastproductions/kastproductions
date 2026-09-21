import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { company, contactEmail, imprintPage, privacyPage } from "../content";
import { pageMetadata } from "../head-directives";
import { graphHtml, pageNodes } from "../structured-data";

export const metadata = pageMetadata(privacyPage);

/* The page and the way here from the home page. It sells nothing, so it
 * states no offer. */
const graph = graphHtml(pageNodes(privacyPage));

/* What Vercel keeps for each visit it counts. README's Analytics section
 * names this document as the source a privacy policy states, rather than a
 * list copied here that nobody would update. */
const analyticsDoc = "https://vercel.com/docs/analytics/privacy-policy";

/* What Vercel keeps as the host, which is a different document and a wider
 * one: a host sees the request itself. We link it rather than summarise it,
 * because the retention is Vercel's to state and ours to point at. */
const hostingNotice = "https://vercel.com/legal/privacy-notice";

const mailbox = <a href={`mailto:${contactEmail}`}>{contactEmail}</a>;

export default function Privacy() {
  return (
    <>
      <SiteHeader route={privacyPage.path} />

      <main className="legal" id="main">
        <section className="band band--flush hero">
          <div className="wrap hero__copy">
            <h1>Privacy</h1>
            <p className="lede lede--wide">
              This site is a set of static files. It counts visits, and every
              call to action on it opens a mail link. That is all of it, and
              this page says what each one means for you.
            </p>
          </div>
        </section>

        <section className="band" aria-labelledby="holder-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="holder-title">Who holds it</h2>
            </div>
            <div className="unit__body">
              <p>
                {company.legalName} holds anything this site collects. The
                registration code, the registered address and the director are
                on the <Link href={imprintPage.path}>imprint</Link>.
              </p>
              <p>Write to {mailbox} about anything on this page.</p>
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="counts-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="counts-title">What the site counts</h2>
            </div>
            <div className="unit__body">
              <p>
                The site counts visits with Vercel Web Analytics. The processor
                is Vercel Inc., the company that serves the site. The tracker
                sets no cookie, stores nothing on your device and gives you no
                identifier: a visit is tied to a hash of the incoming request,
                and that hash is discarded 24 hours later. What is kept for
                each visit is listed in{" "}
                <a href={analyticsDoc}>Vercel&rsquo;s privacy documentation</a>.
              </p>
              <p>
                This deployment counts page views. A click on a mail link also
                reports an event, and the plan this project runs on does not
                retain one, so nothing is kept from a click today.
              </p>
              <p>
                The tracker is served from this deployment&rsquo;s own address,
                so your browser contacts no third-party host for it. There is
                no advertising network here and no tracking pixel. Because
                nothing is stored on your device, the site asks for no consent
                and shows no banner.
              </p>
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="mailbox-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="mailbox-title">What the mailbox receives</h2>
            </div>
            <div className="unit__body">
              <p>
                Every call to action on this site is a mail link. When you
                write to {mailbox}, we receive your address, the name your mail
                program sends with it, and whatever you put in the message.
              </p>
              <p>
                We read it to answer you, and to write the spec and the price
                you asked for.
              </p>
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="basis-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="basis-title">Why we are allowed to</h2>
            </div>
            <div className="unit__body">
              <p>
                Under the GDPR, our lawful basis for the visit counts is
                legitimate interest: we need to know which pages are read to
                keep writing the right ones, and a count names nobody.
              </p>
              <p>
                Our lawful basis for your mail is the step you ask us to take
                before a contract. You wrote to us to get an answer, and the
                answer is what we use it for.
              </p>
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="host-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="host-title">Who serves the page</h2>
            </div>
            <div className="unit__body">
              <p>
                Vercel Inc. hosts the site. A host receives the request your
                browser makes for a page, because that request is how the page
                reaches you. We run no server of our own and keep no log of our
                own. What Vercel keeps of a request, and for how long, is
                Vercel&rsquo;s to state, and it states it in its{" "}
                <a href={hostingNotice}>privacy notice</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="kept-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="kept-title">How long it stays</h2>
            </div>
            <div className="unit__body">
              <p>
                The hash behind a counted visit is discarded 24 hours later.
                What is left is a number of visits, which names nobody and
                points at nobody.
              </p>
              <p>
                Your mail stays in the mailbox while we are talking about the
                work. Ask us to delete a thread and we delete it.
              </p>
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="ask-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="ask-title">What you can ask for</h2>
            </div>
            <div className="unit__body">
              <p>
                Write to {mailbox} and ask what we hold about you, ask us to
                correct it, ask us to delete it, or tell us to stop. The same
                mailbox answers.
              </p>
              <p>
                There is no account here to close and no profile to hand you.
                The visit counts name nobody, so there is nothing in them that
                is yours to take back.
              </p>
              <p>
                You can also complain to the data protection authority in your
                own country.
              </p>
              <p className="note">
                Last changed on{" "}
                <time className="mono" dateTime={privacyPage.date}>
                  {privacyPage.date}
                </time>
                .
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter route={privacyPage.path} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />
    </>
  );
}
