import { ChannelsSection } from "@/components/channels-section";
import { PlanCard, Plans } from "@/components/plan-card";
import {
  Actions,
  Band,
  HeadNote,
  HeroCopy,
  HeroTitle,
  Lede,
  Note,
  PullLink,
  Row,
  RowLabel,
  Rows,
  RowText,
  Unit,
  UnitBody,
  UnitHead,
} from "@/components/section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { buttonVariants } from "@/components/ui/button";
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
        <Band flush>
          <HeroCopy className="wrap">
            <HeroTitle>{page.heading}</HeroTitle>
            <Lede wide>{page.lede}</Lede>
            <Actions>
              <a className={buttonVariants()} href={brief}>
                Describe the work
              </a>
              <a className={buttonVariants({ variant: "outline" })} href={callHref}>
                Book a call
              </a>
            </Actions>
          </HeroCopy>
        </Band>

        <Band id="work" aria-labelledby="job-work-title">
          <Unit>
            <UnitHead title="What the agent does" titleId="job-work-title">
              <HeadNote>{page.authority}</HeadNote>
            </UnitHead>
            <UnitBody>
              <Rows>
                {page.steps.map((step) => (
                  <li key={step.title}>
                    <Row stack>
                      <RowLabel>{step.title}</RowLabel>
                      <RowText>{step.body}</RowText>
                    </Row>
                  </li>
                ))}
              </Rows>
              <Note gate>{page.gate}</Note>
            </UnitBody>
          </Unit>
        </Band>

        <Band id="systems" aria-labelledby="job-systems-title">
          <Unit>
            <UnitHead title="What it touches" titleId="job-systems-title">
              <HeadNote>
                Your agent works in the systems your team already pays for. We
                connect it to each one, and the spec names every account it
                needs before you commit to anything.
              </HeadNote>
            </UnitHead>
            <UnitBody>
              <Rows>
                {page.systems.map((system) => (
                  <li key={system.name}>
                    <Row>
                      <RowLabel>{system.name}</RowLabel>
                      <RowText>{system.role}</RowText>
                    </Row>
                  </li>
                ))}
              </Rows>
            </UnitBody>
          </Unit>
        </Band>

        <ChannelsSection />

        <Band tone="panel" id="pricing" aria-labelledby="job-price-title">
          <Unit>
            <UnitHead title="What it costs" titleId="job-price-title">
              {/* The floor, and what the month buys, are the door's own
                  sentences. This page states which price list a job like this
                  one is on and sends a reader there for the rest. */}
              <HeadNote>
                A job we have not built before is custom work, so this one is
                priced at the custom door. The numbers below are floors: we
                read your workflow first, then name one fixed price.
              </HeadNote>
            </UnitHead>
            <Plans>
              <PlanCard
                title="Custom agent"
                body={
                  <>
                    You describe this job as your company runs it. We write the
                    spec, name the price, and build the agent around it.
                  </>
                }
                prices={custom.prices}
                href={brief}
                cta="Describe the work"
              />
              <Note>
                The door says what a custom agent needs from you, and what the
                month after it goes live buys.{" "}
                <PullLink href={customPage.path}>
                  How a custom agent is built
                </PullLink>
              </Note>
            </Plans>
          </Unit>
        </Band>
      </main>

      <SiteFooter route={page.path} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph }}
      />
    </>
  );
}
