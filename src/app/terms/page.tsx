import Link from "next/link";
import {
  Band,
  FactRows,
  FactTerm,
  FactValue,
  HeadNote,
  HeroCopy,
  HeroTitle,
  Lede,
  Note,
  Prose,
  Row,
  Unit,
  UnitBody,
  UnitHead,
} from "@/components/section";
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

      <main id="main">
        <Band flush>
          <HeroCopy className="wrap">
            <HeroTitle>Terms of service</HeroTitle>
            <Lede wide>
              These terms say what the prices on this site buy and what both
              sides can expect. The spec and the order you sign cover your own
              work, and where the two differ, the order is what binds us.
            </Lede>
          </HeroCopy>
        </Band>

        <Band aria-labelledby="parties-title">
          <Unit>
            <UnitHead title="Who these terms are between" titleId="parties-title" />
            <UnitBody>
              <Prose>
                They are between {company.legalName}, called &ldquo;we&rdquo;
                below, and the company that orders work from us. The
                registration code, the registered address and the director are
                on the <Link href={imprintPage.path}>imprint</Link>.
              </Prose>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="sell-title">
          <Unit>
            <UnitHead title="What we sell" titleId="sell-title" />
            <UnitBody>
              <Prose>
                A build is the work of building one standing agent and
                deploying it into your own accounts, at a price we fix before
                the work starts. One agent is one deployment with one name: a
                second name is a second agent and a second build.
              </Prose>
              <Prose>
                The monthly work keeps that agent correct and current after it
                is live. It buys the eval suite, the changes we make and the
                monthly report of what your agent did.
              </Prose>
              <Prose>
                Two words in your order say who runs the agent once it is
                live. Self-run means we build it, deploy it into your own
                accounts and hand over the keys, and your engineers sign the
                merges. Managed means we run it on your work, our coding agents
                take the runs, and our reviewer signs every merge. Your order
                names one of the two.
              </Prose>
              <Prose>
                A sprint is neither. It is one brief, worked over two weeks on
                your repository, with our reviewer signing the merge. Nothing
                is deployed and nothing is connected, so a sprint buys one
                piece of finished work rather than an agent.
              </Prose>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="price-title">
          <Unit>
            <UnitHead title="What a price means" titleId="price-title">
              <HeadNote>
                The prices this site prints today, and what each of them is a
                price for.
              </HeadNote>
            </UnitHead>
            <UnitBody>
              <FactRows>
                {openPrices.map((way) => (
                  <Row stack key={way.title}>
                    <FactTerm>{way.title}</FactTerm>
                    <FactValue>
                      {way.amount} {way.per}
                    </FactValue>
                  </Row>
                ))}
              </FactRows>
              {/* The last row's padding already parts the list from the copy. */}
              <Prose className="mt-0">
                Every one of them is a floor rather than a quote. A build price
                is a floor because the work follows the number of systems your
                agent touches. The price we then name in your spec is fixed,
                and we name it before any work starts.
              </Prose>
              <Prose>
                Lead time is the working days from a signed order to the agent
                answering in your own channel. A ready-made agent&rsquo;s is{" "}
                {leadTime}, printed beside its price.
              </Prose>
              <Prose>
                Your spec names every account, key and subscription your agent
                needs before you commit to anything, and says whether you
                already own it or we set it up. Those that are yours stay in
                your name: we deploy into them.
              </Prose>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="own-title">
          <Unit>
            <UnitHead title="What you own" titleId="own-title" />
            <UnitBody>
              <Prose>
                You own the agent and the code. It lives in your repository and
                deploys into your own accounts, with your keys, from the first
                commit.
              </Prose>
              <Prose>
                Stop paying us and your agent keeps running. What stops is our
                work on it.
              </Prose>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="authority-title">
          <Unit>
            <UnitHead title="What the agent may do" titleId="authority-title" />
            <UnitBody>
              <Prose>
                A named person at your company approves every outward action:
                anything that reaches a customer, an inbox, a published page or
                a payment. The agent stops at that gate and waits.
              </Prose>
              <Prose>
                Every session runs under a spend cap we agree with you. A
                session that reaches the cap stops and asks you, or stops and
                reports when there is nobody to ask.
              </Prose>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="promise-title">
          <Unit>
            <UnitHead title="What we promise" titleId="promise-title" />
            <UnitBody>
              <Prose>
                We do not promise uptime, and nobody honestly can for software
                running in your own cloud account.
              </Prose>
              <Prose>
                We promise four things: a named engineer, an answer inside
                business hours, a green eval suite on every change we make, and
                a monthly report of what your agent did.
              </Prose>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="end-title">
          <Unit>
            <UnitHead title="Ending it" titleId="end-title" />
            <UnitBody>
              <Prose>
                Cancel the monthly work at the end of any month. Your agent
                keeps running, because it is your code in your accounts.
              </Prose>
              <Prose>
                Questions about these terms go to {mailbox}, and how we handle
                what you send is on the{" "}
                <Link href={privacyPage.path}>privacy page</Link>.
              </Prose>
              <Note>
                Last changed on{" "}
                <time className="font-mono text-[0.92em]" dateTime={termsPage.date}>
                  {termsPage.date}
                </time>
                .
              </Note>
            </UnitBody>
          </Unit>
        </Band>
      </main>

      <SiteFooter route={termsPage.path} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />
    </>
  );
}
