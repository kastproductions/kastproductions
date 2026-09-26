import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { AgentConsole } from "@/components/agent-console";
import { ChannelsSection } from "@/components/channels-section";
import { ClientsStrip } from "@/components/clients-strip";
import { JobRows } from "@/components/job-rows";
import { PlanCard, Plans } from "@/components/plan-card";
import {
  Actions,
  Band,
  HeadNote,
  HeroCopy,
  HeroTitle,
  Lede,
  Note,
  PullLabel,
  PullLink,
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
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  aboutPage,
  briefHref,
  callHref,
  contactEmail,
  custom,
  customPage,
  doors,
  evalSuitePage,
  fitDimensions,
  fitIntro,
  founder,
  hero,
  homePage,
  jobsIntro,
  leadTime,
  location,
  mailtoFor,
  mechanism,
  mechanismIntro,
  openPrices,
  type Price,
  pricingIntro,
  products,
  questions,
  references,
  stack,
} from "./content";
import { pageMetadata } from "./head-directives";
import { graphHtml, pageNodes } from "./structured-data";

export const metadata = pageMetadata(homePage);

const graph = graphHtml(pageNodes(homePage, { prices: openPrices, questions }));

/* The ready-made door opens only while the catalogue holds a product. */
const readyMade = doors.find((door) => door.catalogue);
const customDoor = doors.find((door) => !door.catalogue)!;
const product = products[0];

/* The shortest reference, for the band that says who signs the merge. The
 * about page prints all six as written. */
const reference = references.reduce((a, b) =>
  a.quote.length <= b.quote.length ? a : b,
);

/* The stack paragraph, with the framework's name linked the one time it is
 * named. README.md: Flue is written in text with a link, never as a logo. */
const [flue] = stack.links;
const flueAt = stack.body.indexOf(flue.label);
const stackBefore = stack.body.slice(0, flueAt);
const stackAfter = stack.body.slice(flueAt + flue.label.length);

/*
 * The home page reads top to bottom as one argument: what a standing agent
 * is, the two doors in, the work we take, what we shape an agent around, how
 * we keep it right, where it lives, who signs, what it costs, and the
 * questions a buyer asks on the first call. Every word of the offer comes
 * from content.ts, so the page and the graph cannot state two things.
 */
export default function Home() {
  return (
    <>
      <SiteHeader route={homePage.path} />

      <main id="main">
        <Band flush id="hero">
          <div className="wrap grid items-center gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <HeroCopy>
              <HeroTitle>{hero.heading}</HeroTitle>
              <Lede>{hero.lede}</Lede>
              <Actions>
                <a className={buttonVariants()} href={briefHref}>
                  Send us a brief
                  <ArrowUpRightIcon data-icon="inline-end" />
                </a>
                <a className={buttonVariants({ variant: "outline" })} href={callHref}>
                  Book a call
                </a>
              </Actions>
              <dl className="mt-3 grid rounded-md border border-foreground md:grid-cols-3">
                <Fact label="Spec and fixed price">Within one working day</Fact>
                <Fact label="Ready-made agent live">In {leadTime}</Fact>
                <Fact label="Who owns it">Your accounts, your keys, your code</Fact>
              </dl>
            </HeroCopy>

            <AgentConsole />
          </div>
        </Band>

        <ClientsStrip
          heading={`Companies ${founder} shipped for before this offer, across four continents`}
        />

        <Band aria-labelledby="doors-title" id="doors">
          <Unit>
            <UnitHead title="Two ways in" titleId="doors-title">
              <HeadNote>
                Take an agent we have already built, or describe work that
                matches nothing on a shelf. Both end the same way: one agent,
                in your accounts, kept right after it is live.
              </HeadNote>
            </UnitHead>
            <UnitBody className="grid gap-5 md:grid-cols-2">
              {readyMade && product ? (
                <Door
                  body={
                    <>
                      <p>{product.promise}</p>
                      <p>{readyMade.body}</p>
                    </>
                  }
                  href={`/${product.slug}`}
                  kind={readyMade.name}
                  more={readyMade.more}
                  prices={product.prices}
                  title={product.name}
                />
              ) : null}
              <Door
                body={<p>{customDoor.body}</p>}
                href={customDoor.href}
                kind={customDoor.name}
                more={customDoor.more}
                prices={custom.prices}
                title="Shaped around your workflow"
              />
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="work-title" id="work">
          <Unit>
            <UnitHead title={jobsIntro.heading} titleId="work-title">
              <HeadNote>{jobsIntro.lede}</HeadNote>
              <PullLink className="mt-4" href={customPage.path}>
                Describe a job that is not here
              </PullLink>
            </UnitHead>
            <UnitBody>
              <JobRows />
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="fit-title" id="fit" tone="panel">
          <Unit>
            <UnitHead title={fitIntro.heading} titleId="fit-title">
              <HeadNote>{fitIntro.lede}</HeadNote>
            </UnitHead>
            <ol className={pointGrid}>
              {fitDimensions.map((dimension) => (
                <li key={dimension.title}>
                  <h3 className={pointTitle}>{dimension.title}</h3>
                  <p className={pointText}>{dimension.body}</p>
                </li>
              ))}
            </ol>
          </Unit>
        </Band>

        <Band aria-labelledby="mechanism-title" id="mechanism">
          <Unit>
            <UnitHead title={mechanismIntro.heading} titleId="mechanism-title">
              <HeadNote>{mechanismIntro.lede}</HeadNote>
              <PullLink className="mt-4" href={evalSuitePage.path}>
                {mechanismIntro.more}
              </PullLink>
            </UnitHead>
            <UnitBody>
              <ul className={pointGrid}>
                {mechanism.map((entry) => (
                  <li key={entry.title}>
                    <h3 className={pointTitle}>{entry.title}</h3>
                    <p className={pointText}>{entry.body}</p>
                  </li>
                ))}
                <li>
                  <h3 className={pointTitle}>{stack.heading}</h3>
                  <p className={pointText}>
                    {stackBefore}
                    <a href={flue.url} rel="noreferrer">
                      {flue.label}
                    </a>
                    {stackAfter}
                  </p>
                </li>
              </ul>
            </UnitBody>
          </Unit>
        </Band>

        <ChannelsSection />

        <Band aria-labelledby="reviewer-title" id="reviewer" tone="panel">
          <Unit>
            <UnitHead title="Who puts their name on it" titleId="reviewer-title">
              <HeadNote>
                {founder} founded the company in {location.city}. He owns the
                agents we build and signs the merges we make on a client&rsquo;s
                repository.
              </HeadNote>
              <PullLink className="mt-4" href={aboutPage.path}>
                The founder and six references
              </PullLink>
            </UnitHead>
            <UnitBody>
              <figure className="border-l-2 border-foreground pl-6 sm:pl-8">
                <blockquote>
                  <p className="text-[clamp(1.2rem,1rem+0.8vw,1.6rem)] leading-[1.35] font-medium tracking-[-0.02em] text-pretty">
                    &ldquo;{reference.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3.5">
                  <img
                    alt={`${reference.name}, ${reference.position}`}
                    className="size-11 rounded-sm object-cover contrast-105 grayscale"
                    decoding="async"
                    height={176}
                    loading="lazy"
                    src={reference.portrait}
                    width={176}
                  />
                  <span className="flex flex-col text-[0.92rem] leading-[1.35]">
                    <b className="font-semibold">{reference.name}</b>
                    <span className="text-[0.84rem] text-faint">{reference.position}</span>
                  </span>
                </figcaption>
              </figure>
              <Note className="mt-6">
                Written about his earlier work, before this offer existed. There
                is no case study for an agent we have built yet, and we would
                rather print nothing than invent one.
              </Note>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="pricing-title" id="pricing">
          <Unit>
            <UnitHead title={pricingIntro.heading} titleId="pricing-title">
              <HeadNote>{pricingIntro.lede}</HeadNote>
            </UnitHead>
            <Plans>
              {openPrices.map((plan) => (
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
            </Plans>
          </Unit>
        </Band>

        <Band aria-labelledby="questions-title" id="questions">
          <Unit>
            <UnitHead title="Questions we get on the first call" titleId="questions-title">
              <HeadNote>
                The answers as we give them. Anything not here, ask on the call
                or in the brief.
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

        <Band aria-labelledby="cta-title" id="cta" tone="signal">
          <div className="wrap grid items-end gap-(--split) lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
            <div className="flex flex-col gap-6">
              <h2
                className="max-w-[18ch] font-heading text-[clamp(2.2rem,1.2rem+3.4vw,4.2rem)] leading-[0.98] font-extrabold tracking-[-0.045em] text-balance"
                id="cta-title"
              >
                Send us the issue you would hand to a new senior engineer
              </h2>
              <p className="max-w-[52ch] text-[1.08rem] leading-relaxed text-prose">
                Or describe the work you want an agent to take over. We reply
                within one working day with a short spec and a fixed price.
              </p>
              <Actions>
                <a className={buttonVariants()} href={briefHref}>
                  Send us a brief
                  <ArrowUpRightIcon data-icon="inline-end" />
                </a>
                <a className={buttonVariants({ variant: "outline" })} href={callHref}>
                  Book a call
                </a>
              </Actions>
            </div>
            <div className="grid gap-3 text-[0.92rem] text-prose *:border-t *:border-hairline *:pt-3 [&_b]:block [&_b]:font-semibold [&_b]:text-foreground">
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

/* The two-column grid of titled points the fit and mechanism sections share. */
const pointGrid =
  "grid min-w-0 md:grid-cols-2 md:gap-x-(--split) *:border-t *:border-hairline *:py-5 *:first:border-t-0 *:first:pt-0 md:*:nth-2:border-t-0 md:*:nth-2:pt-0";
const pointTitle =
  "mb-1.5 font-heading text-[1.1rem] font-semibold tracking-[-0.015em] text-balance";
const pointText = "text-[0.97rem] leading-relaxed text-prose";

/* One of the three readings under the hero copy: facts a reader can check on
 * the pages below, drawn as the fields of a form, the same fields the hero
 * slip beside them uses. */
function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3 not-first:border-t not-first:border-hairline md:not-first:border-t-0 md:not-first:border-l">
      <dt className="text-[0.75rem] font-medium text-faint">{label}</dt>
      <dd className="text-[0.98rem] leading-snug font-semibold tracking-[-0.01em] text-balance">
        {children}
      </dd>
    </div>
  );
}

/* One of the two ways in: a card that is a link to its door. */
function Door({
  kind,
  title,
  body,
  prices,
  more,
  href,
}: {
  kind: string;
  title: ReactNode;
  body: ReactNode;
  prices: Price[];
  more: string;
  href: string;
}) {
  return (
    <Link className="group/door flex rounded-lg text-inherit no-underline" href={href}>
      <Card
        className="w-full transition-colors duration-150 group-hover/door:border-foreground"
        size="lg"
      >
        <CardHeader>
          <span className="text-[0.84rem] font-medium text-faint">{kind}</span>
          <CardTitle className="text-[1.65rem] leading-[1.08] tracking-[-0.035em]">{title}</CardTitle>
          <CardDescription className="flex flex-col gap-3">{body}</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <div className="grid gap-1.5 border-t border-hairline pt-4">
            {prices.map((price) => (
              <div
                className="flex items-baseline justify-between gap-4 text-[0.88rem] text-muted-foreground"
                key={price.per}
              >
                <span>{price.per}</span>
                <b className="font-heading font-bold text-foreground">
                  {price.amount}
                </b>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <PullLabel>{more}</PullLabel>
        </CardFooter>
      </Card>
    </Link>
  );
}
