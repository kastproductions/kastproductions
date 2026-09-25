import Link from "next/link";
import {
  Band,
  HeroCopy,
  HeroTitle,
  Lede,
  Note,
  Prose,
  Unit,
  UnitBody,
  UnitHead,
} from "@/components/section";
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

      <main id="main">
        <Band flush>
          <HeroCopy className="wrap">
            <HeroTitle>Privacy</HeroTitle>
            <Lede wide>
              This site is a set of static files. It counts visits, and every
              call to action on it opens a mail link. That is all of it, and
              this page says what each one means for you.
            </Lede>
          </HeroCopy>
        </Band>

        <Band aria-labelledby="holder-title">
          <Unit>
            <UnitHead title="Who holds it" titleId="holder-title" />
            <UnitBody>
              <Prose>
                {company.legalName} holds anything this site collects. The
                registration code, the registered address and the director are
                on the <Link href={imprintPage.path}>imprint</Link>.
              </Prose>
              <Prose>Write to {mailbox} about anything on this page.</Prose>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="counts-title">
          <Unit>
            <UnitHead title="What the site counts" titleId="counts-title" />
            <UnitBody>
              <Prose>
                The site counts visits with Vercel Web Analytics. The processor
                is Vercel Inc., the company that serves the site. The tracker
                sets no cookie, stores nothing on your device and gives you no
                identifier: a visit is tied to a hash of the incoming request,
                and that hash is discarded 24 hours later. What is kept for
                each visit is listed in{" "}
                <a href={analyticsDoc}>Vercel&rsquo;s privacy documentation</a>.
              </Prose>
              <Prose>
                This deployment counts page views. A click on a mail link also
                reports an event, and the plan this project runs on does not
                retain one, so nothing is kept from a click today.
              </Prose>
              <Prose>
                The tracker is served from this deployment&rsquo;s own address,
                so your browser contacts no third-party host for it. There is
                no advertising network here and no tracking pixel. Because
                nothing is stored on your device, the site asks for no consent
                and shows no banner.
              </Prose>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="mailbox-title">
          <Unit>
            <UnitHead title="What the mailbox receives" titleId="mailbox-title" />
            <UnitBody>
              <Prose>
                Every call to action on this site is a mail link. When you
                write to {mailbox}, we receive your address, the name your mail
                program sends with it, and whatever you put in the message.
              </Prose>
              <Prose>
                We read it to answer you, and to write the spec and the price
                you asked for.
              </Prose>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="basis-title">
          <Unit>
            <UnitHead title="Why we are allowed to" titleId="basis-title" />
            <UnitBody>
              <Prose>
                Under the GDPR, our lawful basis for the visit counts is
                legitimate interest: we need to know which pages are read to
                keep writing the right ones, and a count names nobody.
              </Prose>
              <Prose>
                Our lawful basis for your mail is the step you ask us to take
                before a contract. You wrote to us to get an answer, and the
                answer is what we use it for.
              </Prose>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="host-title">
          <Unit>
            <UnitHead title="Who serves the page" titleId="host-title" />
            <UnitBody>
              <Prose>
                Vercel Inc. hosts the site. A host receives the request your
                browser makes for a page, because that request is how the page
                reaches you. We run no server of our own and keep no log of our
                own. What Vercel keeps of a request, and for how long, is
                Vercel&rsquo;s to state, and it states it in its{" "}
                <a href={hostingNotice}>privacy notice</a>.
              </Prose>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="kept-title">
          <Unit>
            <UnitHead title="How long it stays" titleId="kept-title" />
            <UnitBody>
              <Prose>
                The hash behind a counted visit is discarded 24 hours later.
                What is left is a number of visits, which names nobody and
                points at nobody.
              </Prose>
              <Prose>
                Your mail stays in the mailbox while we are talking about the
                work. Ask us to delete a thread and we delete it.
              </Prose>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="ask-title">
          <Unit>
            <UnitHead title="What you can ask for" titleId="ask-title" />
            <UnitBody>
              <Prose>
                Write to {mailbox} and ask what we hold about you, ask us to
                correct it, ask us to delete it, or tell us to stop. The same
                mailbox answers.
              </Prose>
              <Prose>
                There is no account here to close and no profile to hand you.
                The visit counts name nobody, so there is nothing in them that
                is yours to take back.
              </Prose>
              <Prose>
                You can also complain to the data protection authority in your
                own country.
              </Prose>
              <Note>
                Last changed on{" "}
                <time className="font-mono text-[0.92em]" dateTime={privacyPage.date}>
                  {privacyPage.date}
                </time>
                .
              </Note>
            </UnitBody>
          </Unit>
        </Band>
      </main>

      <SiteFooter route={privacyPage.path} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />
    </>
  );
}
