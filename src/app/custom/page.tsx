import { ArrowUpRightIcon } from "lucide-react";
import { ChannelsSection } from "@/components/channels-section";
import { JobRows } from "@/components/job-rows";
import { SunDisc } from "@/components/ornaments";
import { PlanCard, Plans } from "@/components/plan-card";
import {
  Actions,
  Band,
  HeadNote,
  HeroFrame,
  HeroTitle,
  Lede,
  Note,
  PullLink,
  Row,
  RowLabel,
  RowText,
  Rows,
  Unit,
  UnitBody,
  UnitHead,
} from "@/components/section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { buttonVariants } from "@/components/ui/button";
import { callHref, custom, customPage, evalSuitePage, homePlans, mailtoFor } from "../content";
import { pageMetadata } from "../head-directives";
import { graphHtml, pageNodes } from "../structured-data";

export const metadata = pageMetadata(customPage);

/* The custom plan, as the home page's price list prints it. The door prints
 * the same card, so the two pages state one price in one form. */
function customPlan() {
  const found = homePlans.find((entry) => entry.subject === custom.subject);
  if (!found) {
    throw new Error("The home price list holds no custom plan for the custom door to print.");
  }
  return found;
}
const plan = customPlan();
const planPrices = [{ amount: plan.amount, per: plan.per }];

/* The door's own nodes, beside the site-wide ones the layout renders: the
 * page itself, the service it sells with the price it prints, and the way
 * here from the home page. */
const graph = graphHtml(pageNodes(customPage, { prices: planPrices }));

const brief = mailtoFor(custom.subject);

/* The words a buyer asks with, as on the home page: what comes back is the
 * reason to write, so the button names it. */
const briefCta = "Get a spec and a fixed price";

/* How a custom build goes, from the first email to the monthly upkeep. Only
 * this page prints these steps, so they live here (ADR-0004). */
const steps = [
  {
    title: "You describe the work",
    body: "A few lines are enough: what comes in, what should come out, and who checks it today.",
  },
  {
    title: "A spec and a fixed price",
    body: "Within one working day we send a short spec and one fixed price for the build. We write no code before you accept the price.",
  },
  {
    title: "Built around your workflow",
    body: "We write the eval suite first: the tasks the agent must get right, and what a correct result for each one contains. Then we build the agent in your repository, deploy it into your own cloud account and connect it to the chat your team already uses.",
  },
  {
    title: "Kept correct after launch",
    body: "One of our engineers owns your agent. Every change we make must pass the eval suite, and each month you get a report of what the agent did, what it cost and what we changed.",
  },
];

/* What the spec settles before the build. Each line is a mechanism from
 * CONTEXT.md (the job, the agent's authority, the approval gate, the spend
 * cap, the eval suite), stated in buyer words. */
const spec = [
  {
    title: "The work",
    body: "What starts a task, what the agent produces, and what done looks like, written from your description.",
  },
  {
    title: "The systems",
    body: "Every account the agent reads from or writes to, and the ones it never touches.",
  },
  {
    title: "Where it stops",
    body: "Each action that reaches someone outside your company, and the named person at your company who approves it.",
  },
  {
    title: "The spend cap",
    body: "A ceiling on model cost for each task. A task that reaches it stops and asks a person.",
  },
  {
    title: "The test of correct",
    body: "The tasks the eval suite checks. Work we cannot write a test for goes to a person, and the spec says which work that is.",
  },
];

export default function Custom() {
  return (
    <>
      <SiteHeader route={customPage.path} />

      <main id="main">
        <Band flush>
          <HeroFrame ornament={<SunDisc className="w-36 lg:w-44" />}>
            <HeroTitle>{custom.heading}</HeroTitle>
            <Lede wide>{custom.lede}</Lede>
            <Actions>
              <a className={buttonVariants()} href={brief}>
                {briefCta}
                <ArrowUpRightIcon data-icon="inline-end" />
              </a>
              <a className={buttonVariants({ variant: "ghost" })} href={callHref}>
                Or book a call
              </a>
            </Actions>
          </HeroFrame>
        </Band>

        <Band aria-labelledby="how-title" id="how">
          <Unit>
            <UnitHead index={1} title="How a custom build goes" titleId="how-title">
              <HeadNote>
                From your first email to a live agent, and what we do after it
                is live.
              </HeadNote>
            </UnitHead>
            <UnitBody>
              <Rows sequence>
                {steps.map((step) => (
                  <li key={step.title}>
                    <Row>
                      <RowLabel>{step.title}</RowLabel>
                      <RowText>{step.body}</RowText>
                    </Row>
                  </li>
                ))}
              </Rows>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="spec-title" id="spec" tone="panel">
          <Unit>
            <UnitHead index={2} title="What the spec settles" titleId="spec-title">
              <HeadNote>
                The spec is short, and you can check every line of it before
                you accept the price.
              </HeadNote>
              <PullLink className="mt-4" href={evalSuitePage.path}>
                What an eval suite is
              </PullLink>
            </UnitHead>
            <UnitBody>
              <Rows>
                {spec.map((line) => (
                  <li key={line.title}>
                    <Row>
                      <RowLabel>{line.title}</RowLabel>
                      <RowText>{line.body}</RowText>
                    </Row>
                  </li>
                ))}
              </Rows>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="jobs-title" id="jobs">
          <Unit>
            <UnitHead index={3} title={custom.jobsHeading} titleId="jobs-title">
              <HeadNote>{custom.jobsLede}</HeadNote>
            </UnitHead>
            <UnitBody>
              <JobRows />
            </UnitBody>
          </Unit>
        </Band>

        <ChannelsSection index={4} />

        <Band aria-labelledby="custom-price-title" id="pricing">
          <Unit>
            <UnitHead index={5} title={custom.pricingHeading} titleId="custom-price-title">
              <HeadNote>
                The build price is a floor, because the work grows with the
                number of systems your agent touches. The spec states the exact
                price. The monthly price pays an engineer to keep the agent
                correct: the eval suite on every change, the fixes and a report
                each month.
              </HeadNote>
            </UnitHead>
            {/* One card, so the note takes the column beside it from xl up
                rather than a row of its own under a narrow card. */}
            <Plans className="xl:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] xl:items-start xl:[&>p]:col-span-1">
              <PlanCard
                body={plan.body}
                cta={plan.cta}
                href={brief}
                includes={plan.includes}
                lead={plan.lead}
                prices={planPrices}
                title={plan.title}
              />
              <Note className="xl:mt-0">
                Which accounts you need depends on the systems your agent
                touches. The spec names every one of them, next to the price,
                before you commit to anything.
              </Note>
            </Plans>
          </Unit>
        </Band>
      </main>

      <SiteFooter route={customPage.path} />
      <script
        dangerouslySetInnerHTML={{ __html: graph }}
        type="application/ld+json"
      />
    </>
  );
}
