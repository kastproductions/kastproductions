import { ChannelsSection } from "@/components/channels-section";
import { PlanCard, Plans } from "@/components/plan-card";
import {
  Band,
  HeadNote,
  HeroActions,
  HeroFrame,
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
import { StopPoint } from "@/components/stop-point";
/* The record is the job's page, and this component draws it, so the two carry
 * one name between them: the record is aliased here rather than renamed
 * everywhere else. */
import type { JobPage as JobPageRecord } from "@/app/content";
import { briefCta, custom, customPage, mailtoFor } from "@/app/content";
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
 * The page reads in the order a buyer asks: what the agent does, in numbered
 * steps, and where it stops for a named person; which systems it touches;
 * where the team reaches it; and what it costs. The first screen is words
 * only: the job's heading, what it does, and the one action.
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
        <Band aria-labelledby="hero-title" flush id="hero">
          <HeroFrame>
            <HeroTitle id="hero-title">{page.heading}</HeroTitle>
            <Lede>{page.lede}</Lede>
            <HeroActions href={brief} />
          </HeroFrame>
        </Band>

        <Band aria-labelledby="job-steps-title" id="steps">
          <Unit>
            <UnitHead title="What the agent does" titleId="job-steps-title">
              <HeadNote>{page.authority}</HeadNote>
            </UnitHead>
            <UnitBody>
              {/* Numbered, because the agent does these in order. */}
              <Rows sequence>
                {page.steps.map((step) => (
                  <li key={step.title}>
                    <Row stack>
                      <RowLabel>{step.title}</RowLabel>
                      <RowText>{step.body}</RowText>
                    </Row>
                  </li>
                ))}
              </Rows>
              <StopPoint titleId="job-stop-title">{page.gate}</StopPoint>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="job-systems-title" id="systems" tone="panel">
          <Unit>
            <UnitHead title="What it touches" titleId="job-systems-title">
              <HeadNote>
                It works in the systems your team already uses. We connect it
                to each one, and the spec names every account it needs before
                you commit to anything.
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

        <Band aria-labelledby="job-price-title" id="pricing" tone="panel">
          <Unit>
            <UnitHead title="What it costs" titleId="job-price-title">
              {/* The floor, and what the month buys, are the custom page's
                  own sentences. This page says which price list a job like
                  this one is on and sends a reader there for the rest. */}
              <HeadNote>
                We build an agent for this job around how your team runs it, so
                it is priced as a custom agent. The prices are floors: we read
                your workflow first, then name one fixed price.
              </HeadNote>
            </UnitHead>
            <Plans>
              <PlanCard
                title={custom.title}
                body={
                  <>
                    You describe this job as your company runs it. We write the
                    spec, name the price, and build the agent around it.
                  </>
                }
                prices={custom.prices}
                href={brief}
                cta={briefCta}
              />
              <Note>
                The custom page says what a custom agent needs from you, and
                what the monthly price pays for once it is live.{" "}
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
