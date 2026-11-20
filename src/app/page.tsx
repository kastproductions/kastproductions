import { ArrowUpRightIcon } from "lucide-react";
import { AgentConsole } from "@/components/agent-console";
import { ChannelsSection } from "@/components/channels-section";
import { ClientsStrip } from "@/components/clients-strip";
import { JobRows } from "@/components/job-rows";
import { PlanCard, Plans } from "@/components/plan-card";
import {
  Actions,
  Band,
  HeadNote,
  HeroActions,
  HeroSplit,
  HeroTitle,
  Lede,
  Note,
  PullLink,
  Row,
  RowLabel,
  RowNote,
  RowText,
  Rows,
  Unit,
  UnitBody,
  UnitHead,
} from "@/components/section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  aboutPage,
  backlogPage,
  briefCta,
  briefHref,
  callHref,
  contactEmail,
  customPage,
  evalSuitePage,
  founder,
  hero,
  homePage,
  homePlans,
  jobsIntro,
  leadTime,
  location,
  mailtoFor,
  pricingIntro,
  products,
  productPage,
  questions,
  references,
  safety,
  safetyIntro,
  stack,
} from "./content";
import { pageMetadata } from "./head-directives";
import { graphHtml, pageNodes } from "./structured-data";

export const metadata = pageMetadata(homePage);

const graph = graphHtml(pageNodes(homePage, { prices: homePlans, questions }));

/* The ready-made agent leads the work list while the catalogue holds it. */
const product = products[0];

/* The shortest reference, for the band that says who signs the work. The
 * about page prints all six as written. */
const reference = references.reduce((a, b) =>
  a.quote.length <= b.quote.length ? a : b,
);

/* The framework, linked the one time the page names it. README.md: Flue is
 * written in text with a link, never as a logo. */
const [flue] = stack.links;


/* How a build goes, from the first email to the monthly upkeep. Only the home
 * page prints these steps, so they live here (ADR-0004). */
const buildSteps = [
  {
    title: "You describe the work",
    body: "Write a few lines about the work you want off your team: what comes in, what should come out, and who checks it today.",
  },
  {
    title: "A spec and a fixed price",
    body: "Within one working day we reply with a short spec that names every account the agent needs, and one fixed price for the build.",
  },
  {
    title: "Live in your accounts",
    body: `We build the agent into your own accounts and connect it to the chat your team already uses. The ready-made agent answers there in ${leadTime}.`,
  },
  {
    title: "Kept correct every month",
    body: "The monthly price pays one of our engineers to own your agent. The eval suite runs on every change, we fix what breaks, and you get a report of what the agent did, what it cost and what we changed. Cancel at the end of any month: our work stops and the agent keeps running.",
  },
];

/*
 * The home page tells one story, in the order the site rewrite spec sets:
 * what a buyer gets, who the founder has shipped for, the work an agent can
 * take, how a build goes, why it is safe, where the agent lives, what it
 * costs, who stands behind it, the questions buyers ask, and the one action.
 * The offer's facts come from content.ts, so the page and the graph cannot
 * state two things. The plans our coding agents work under are sold on the
 * backlog page, which the price list links once.
 */
export default function Home() {
  return (
    <>
      <SiteHeader route={homePage.path} />

      <main id="main">
        <Band aria-labelledby="hero-title" flush id="hero">
          <HeroSplit aside={<AgentConsole />}>
            <HeroTitle id="hero-title">{hero.heading}</HeroTitle>
            <Lede>{hero.lede}</Lede>
            <HeroActions href={briefHref} />
          </HeroSplit>
        </Band>

        <ClientsStrip
          heading={`Companies ${founder} shipped for before this offer, across four continents`}
        />

        <Band aria-labelledby="work-title" id="work">
          <Unit>
            <UnitHead title={jobsIntro.heading} titleId="work-title">
              <HeadNote>{jobsIntro.lede}</HeadNote>
            </UnitHead>
            <UnitBody>
              <JobRows
                first={
                  product ? (
                    <li>
                      <Row>
                        <span className="flex flex-col items-start gap-2">
                          <RowLabel>{product.name}</RowLabel>
                          <Badge variant="outline">Built already</Badge>
                        </span>
                        <RowText>
                          {product.promise} A named person on your team signs
                          the merge. It is live in {leadTime}.
                        </RowText>
                        <RowNote>{product.systems}</RowNote>
                        <PullLink className="mt-0.5" href={productPage(product).path}>
                          What it does and what it costs
                        </PullLink>
                      </Row>
                    </li>
                  ) : null
                }
              />
              <div className="border-t border-line pt-5">
                <PullLink href={customPage.path}>{jobsIntro.more}</PullLink>
              </div>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="how-title" id="how" tone="panel">
          <Unit>
            <UnitHead title="How a build goes" titleId="how-title">
              <HeadNote>
                From your first email to a live agent, and what the monthly
                price pays for after that.
              </HeadNote>
            </UnitHead>
            <UnitBody>
              <Rows sequence>
                {buildSteps.map((step) => (
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

        <Band aria-labelledby="safety-title" id="safety">
          <Unit>
            <UnitHead title={safetyIntro.heading} titleId="safety-title">
              <HeadNote>{safetyIntro.lede}</HeadNote>
              <PullLink className="mt-4" href={evalSuitePage.path}>
                {safetyIntro.more}
              </PullLink>
            </UnitHead>
            <UnitBody>
              <ul className={pointGrid}>
                {safety.map((point, i) => (
                  <li key={point.title}>
                    <h3 className={pointTitle}>{point.title}</h3>
                    <p className={pointText}>
                      {point.body}
                      {i === safety.length - 1 ? (
                        <>
                          {" "}It is built on{" "}
                          <a className="text-signal-foreground" href={flue.url} rel="noreferrer">
                            {flue.label}
                          </a>
                          , the open agent harness the Astro organisation
                          publishes.
                        </>
                      ) : null}
                    </p>
                  </li>
                ))}
              </ul>
            </UnitBody>
          </Unit>
        </Band>

        <ChannelsSection />

        <Band aria-labelledby="pricing-title" id="pricing">
          <Unit>
            <UnitHead title={pricingIntro.heading} titleId="pricing-title">
              <HeadNote>{pricingIntro.lede}</HeadNote>
            </UnitHead>
            <Plans>
              {homePlans.map((plan) => (
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
              {product ? (
                <Note className="mt-1">
                  Self-run needs accounts you own: a GitHub organisation, a
                  tracker, a sandbox provider, a model provider key and a
                  Cloudflare account. The{" "}
                  <a className="text-signal-foreground" href={productPage(product).path}>
                    {product.name.toLowerCase()} page
                  </a>{" "}
                  lists each one and says who sets it up.
                </Note>
              ) : null}
              <Note className="mt-0">
                Want our coding agents to work through your backlog, with no
                agent of your own?{" "}
                <a className="text-signal-foreground" href={backlogPage.path}>
                  See coding agents for your backlog
                </a>
                .
              </Note>
            </Plans>
          </Unit>
        </Band>

        <Band aria-labelledby="founder-title" id="founder" tone="panel">
          <Unit>
            <UnitHead title="Who puts their name on it" titleId="founder-title">
              <HeadNote>
                {founder} founded the company in {location.city}. He owns the
                agents we build and answers for every change we make to them.
              </HeadNote>
              <PullLink className="mt-4" href={aboutPage.path}>
                The founder and six references
              </PullLink>
            </UnitHead>
            <UnitBody>
              <div className="max-w-[44rem]">
                <figure>
                  <blockquote>
                    <p className="text-quote leading-[1.35] font-medium text-pretty">
                      &ldquo;{reference.quote}&rdquo;
                    </p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3.5">
                    <img
                      alt={`${reference.name}, ${reference.position}`}
                      className="size-11 rounded-full object-cover"
                      decoding="async"
                      height={176}
                      loading="lazy"
                      src={reference.portrait}
                      width={176}
                    />
                    <span className="flex flex-col text-note leading-[1.35]">
                      <b className="font-heading font-semibold">{reference.name}</b>
                      <span className="text-small text-faint">{reference.position}</span>
                    </span>
                  </figcaption>
                </figure>
                <Note className="mt-6">
                  Written about his earlier work, before this offer existed.
                  There is no case study for an agent we have built yet, and we
                  would rather print nothing than invent one.
                </Note>
              </div>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="questions-title" id="questions">
          <Unit>
            <UnitHead title="Questions buyers ask first" titleId="questions-title">
              <HeadNote>
                The answers as we give them on a first call. Ask anything else
                in your brief.
              </HeadNote>
            </UnitHead>
            <UnitBody>
              {/* Every answer is in the HTML, hidden until opened or found by
                  the browser's find-in-page, so a crawler and a reader who
                  searches the page both reach it. */}
              <Accordion hiddenUntilFound multiple>
                {questions.map((item) => (
                  <AccordionItem key={item.q} value={item.q}>
                    <AccordionTrigger>{item.q}</AccordionTrigger>
                    <AccordionContent>
                      <p>{item.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="cta-title" id="cta" tone="ink">
          <div className="wrap grid items-end gap-(--split) lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
            <div className="flex flex-col gap-6">
              <h2
                className="max-w-[18ch] font-heading text-display font-semibold text-balance"
                id="cta-title"
              >
                Tell us the work you want off your team
              </h2>
              <p className="max-w-[52ch] text-body leading-relaxed text-prose">
                A few lines are enough. Within one working day you get a short
                spec and one fixed price for the build.
              </p>
              <Actions>
                <a className={buttonVariants()} href={briefHref}>
                  {briefCta}
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
                <b>What comes back</b>A spec that names every account the agent
                needs, and one price.
              </div>
              <div>
                <b>Then</b>A ready-made agent answers in your own channel in{" "}
                {leadTime}.
              </div>
            </div>
          </div>
        </Band>
      </main>

      <SiteFooter route={homePage.path} />

      <script
        dangerouslySetInnerHTML={{ __html: graph }}
        type="application/ld+json"
      />
    </>
  );
}

/* The two-column grid of titled points the safety section prints. */
const pointGrid =
  "grid min-w-0 md:grid-cols-2 md:gap-x-(--split) *:border-t *:border-hairline *:py-5 *:first:border-t-0 *:first:pt-0 md:*:nth-2:border-t-0 md:*:nth-2:pt-0";
const pointTitle =
  "mb-1.5 font-heading text-title font-semibold text-balance";
const pointText = "text-note leading-relaxed text-prose";
