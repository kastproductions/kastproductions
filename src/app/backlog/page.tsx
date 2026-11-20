import { ArrowUpRightIcon } from "lucide-react";
import type { ReactNode } from "react";
import { PlanCard, Plans } from "@/components/plan-card";
import {
  Actions,
  Band,
  HeadNote,
  HeroCopy,
  HeroTitle,
  Lede,
  Note,
  Prose,
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
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  backlogPage,
  backlogPlans,
  backlogSubject,
  callHref,
  contactEmail,
  customPage,
  issueToPullRequest,
  mailtoFor,
  productPage,
} from "../content";
import { pageMetadata } from "../head-directives";
import { graphHtml, pageNodes } from "../structured-data";

export const metadata = pageMetadata(backlogPage);

/* The page's own nodes, beside the site-wide ones the layout renders: the
 * page itself, the work it sells with the plans it prints, and the way here
 * from the home page. The cards below print the same list. */
const graph = graphHtml(pageNodes(backlogPage, { prices: backlogPlans }));

/* Managed runs the issue to pull request agent, so a run on this page is that
 * product's run, and the steps are read off the product rather than written a
 * second time. */
const product = issueToPullRequest;
const productPath = productPage(product).path;

const briefHref = mailtoFor(backlogSubject);

/* One run as a slip, with every line made up. It shows what a run reports,
 * not a client's work, so it carries the "Example" label: see the Claims
 * section of README.md. */
const exampleRun: { label: string; value: ReactNode }[] = [
  { label: "Triage", value: "Actionable. Three acceptance criteria." },
  { label: "Plan", value: "Four files, one new module, six tests." },
  { label: "Implement", value: "The repository’s own checks pass." },
  { label: "Review", value: "Each criterion met, with the evidence." },
  { label: "Pull request", value: "Opened as a draft, with the run record." },
];

export default function Backlog() {
  return (
    <>
      <SiteHeader route={backlogPage.path} />

      <main id="main">
        <Band flush>
          <div className="wrap grid grid-cols-1 items-center gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <HeroCopy>
              <HeroTitle>Your backlog, worked by our coding agents</HeroTitle>
              <Lede>
                You label an issue. Our coding agents plan it, build it and
                test it on your repository, then open a draft pull request with
                a record of everything they did. One of our engineers reads the
                whole diff and signs the merge. You do not need an agent of
                your own.
              </Lede>
              <Actions>
                <a className={buttonVariants()} href={briefHref}>
                  Send us an issue
                  <ArrowUpRightIcon data-icon="inline-end" />
                </a>
                <a className={buttonVariants({ variant: "outline" })} href={callHref}>
                  Book a call
                </a>
              </Actions>
            </HeroCopy>

            <figure
              aria-labelledby="example-run-title"
              data-example
              className="overflow-hidden rounded-md border border-foreground bg-card"
            >
              <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-foreground px-5 py-3.5">
                <span className="font-heading text-note font-semibold" id="example-run-title">
                  Issue 212
                </span>
                <span className="font-mono text-caption text-faint">
                  Add CSV export to invoices
                </span>
                <Badge className="ml-auto" variant="signal">
                  Example
                </Badge>
              </figcaption>
              <dl className="divide-y divide-hairline">
                {exampleRun.map((line) => (
                  <div
                    className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-3 px-5 py-3"
                    key={line.label}
                  >
                    <dt className="pt-0.5 label-mono text-faint">{line.label}</dt>
                    <dd className="text-note leading-snug">{line.value}</dd>
                  </div>
                ))}
                <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-3 border-l-2 border-signal bg-signal-tint px-5 py-3">
                  <dt className="pt-0.5 label-mono text-signal-foreground">Merge</dt>
                  <dd className="text-note leading-snug font-semibold">
                    Waits for our engineer to sign it
                  </dd>
                </div>
              </dl>
            </figure>
          </div>
        </Band>

        <Band aria-labelledby="run-title" id="run">
          <Unit>
            <UnitHead title="From an issue to a signed pull request" titleId="run-title">
              <HeadNote>
                Every issue goes through the same four steps. A separate agent
                does each step and stops at the end of it, and one of our
                engineers signs what comes out.
              </HeadNote>
            </UnitHead>
            <UnitBody>
              <Rows sequence>
                {product.stations.map((station) => (
                  <li key={station.title}>
                    <Row>
                      <RowLabel>{station.title}</RowLabel>
                      <RowText>{station.body}</RowText>
                    </Row>
                  </li>
                ))}
              </Rows>
              <Note gate>
                The merge waits for one of our engineers. The review step
                reports what it found, and the engineer reads the whole diff
                against the issue before signing it.
              </Note>
              <Prose className="mt-6">{product.record}</Prose>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="fit-title" id="fit" tone="panel">
          <Unit>
            <UnitHead title="Which one fits" titleId="fit-title">
              <HeadNote>
                Both plans end in a pull request our engineer signs. Sprint is
                one brief over two weeks. Managed runs month to month on a
                backlog that keeps growing.
              </HeadNote>
            </UnitHead>
            <UnitBody>
              <Rows>
                <li>
                  <Row>
                    <RowLabel>Sprint</RowLabel>
                    <RowText>
                      You have one piece of work with a clear end. We name a
                      fixed price before we start and finish it in two weeks.
                      Nothing is deployed and nothing is connected to your
                      systems. Anything we merged has a 30-day fix window.
                    </RowText>
                  </Row>
                </li>
                <li>
                  <Row>
                    <RowLabel>Managed</RowLabel>
                    <RowText>
                      Issues keep arriving faster than your team can close
                      them. We build the agent into your own accounts and run
                      it on your backlog, in the order we agree with you each
                      week. Cancel at the end of any month: our work stops, and
                      the agent keeps running in your accounts.
                    </RowText>
                  </Row>
                </li>
                <li>
                  <Row>
                    <RowLabel>Run it yourself</RowLabel>
                    <RowText>
                      You want your own engineers to sign the merges. Buy the
                      same agent as Self-run: we build it, deploy it into your
                      accounts and hand over the keys.{" "}
                      <a href={productPath}>See the agent and its price</a>.
                    </RowText>
                  </Row>
                </li>
              </Rows>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="pricing-title" id="pricing">
          <Unit>
            <UnitHead title="What coding agents on your backlog cost" titleId="pricing-title">
              <HeadNote>
                Every price is a floor. The price in your spec is fixed, and we
                name it before any work starts.
              </HeadNote>
            </UnitHead>
            <Plans>
              {backlogPlans.map((plan) => (
                <PlanCard
                  body={plan.body}
                  cta={plan.cta}
                  href={mailtoFor(plan.subject)}
                  includes={plan.includes}
                  key={plan.title}
                  lead={plan.lead}
                  prices={[{ amount: plan.amount, per: plan.per }]}
                  title={plan.title}
                />
              ))}
              <Note>
                Managed runs in your own accounts, so it needs the accounts the
                agent needs. The{" "}
                <a className="text-signal-foreground" href={productPath}>
                  {product.name.toLowerCase()} page
                </a>{" "}
                lists each one and says who sets it up.
              </Note>
            </Plans>
          </Unit>
        </Band>

        <Band aria-labelledby="cta-title" id="cta" tone="night">
          <div className="wrap grid items-end gap-(--split) lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
            <div className="flex flex-col gap-6">
              <h2
                className="max-w-[18ch] font-heading text-display leading-[0.98] font-light uppercase text-balance"
                id="cta-title"
              >
                Send us one issue from your backlog
              </h2>
              <p className="max-w-[52ch] text-body leading-relaxed text-prose">
                Pick one your team keeps putting off. We reply within one
                working day with a short spec and a fixed price.
              </p>
              <Actions>
                <a className={buttonVariants()} href={briefHref}>
                  Send us an issue
                  <ArrowUpRightIcon data-icon="inline-end" />
                </a>
                <a className={buttonVariants({ variant: "outline" })} href={callHref}>
                  Book a call
                </a>
              </Actions>
            </div>
            <div className="grid gap-3 text-note text-prose *:border-t *:border-hairline *:pt-3 [&_b]:block [&_b]:font-semibold [&_b]:text-foreground">
              <div>
                <b>Write to</b>
                <a
                  className="text-foreground decoration-1 underline-offset-[0.3em] hover:decoration-2"
                  href={`mailto:${contactEmail}`}
                >
                  {contactEmail}
                </a>
              </div>
              <div>
                <b>Work that is not code</b>
                <PullLink href={customPage.path}>An agent built for your own workflow</PullLink>
              </div>
            </div>
          </div>
        </Band>
      </main>

      <SiteFooter route={backlogPage.path} />
      <script
        dangerouslySetInnerHTML={{ __html: graph }}
        type="application/ld+json"
      />
    </>
  );
}
