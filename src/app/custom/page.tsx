import { ChannelsSection } from "@/components/channels-section";
import { JobRows } from "@/components/job-rows";
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
  RowText,
  Rows,
  Unit,
  UnitBody,
  UnitHead,
} from "@/components/section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { custom, customPage, evalSuitePage, homePlans, mailtoFor } from "../content";
import { pageMetadata } from "../head-directives";
import { graphHtml, pageNodes } from "../structured-data";

export const metadata = pageMetadata(customPage);

/* The custom plan's body and what it includes, as the home price list prints
 * them. The prices are the door's own two, as every job page prints them, so
 * the custom plan has one price in one form wherever a card shows it. */
function customPlan() {
  const found = homePlans.find((entry) => entry.title === custom.title);
  if (!found) {
    throw new Error("The home price list holds no custom plan for the custom door to print.");
  }
  return found;
}
const plan = customPlan();

/* The door's own nodes, beside the site-wide ones the layout renders: the
 * page itself, the service it sells with the prices it prints, and the way
 * here from the home page. */
const graph = graphHtml(pageNodes(customPage, { prices: custom.prices }));

const brief = mailtoFor(custom.subject);

export default function Custom() {
  return (
    <>
      <SiteHeader route={customPage.path} />

      <main id="main">
        <Band flush>
          <HeroFrame>
            <HeroTitle>{custom.heading}</HeroTitle>
            <Lede wide>{custom.lede}</Lede>
            <HeroActions href={brief} />
          </HeroFrame>
        </Band>

        <Band aria-labelledby="how-title" id="how">
          <Unit>
            <UnitHead title={custom.howHeading} titleId="how-title">
              <HeadNote>{custom.howLede}</HeadNote>
            </UnitHead>
            <UnitBody>
              <Rows sequence>
                {custom.steps.map((step) => (
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
            <UnitHead title={custom.specHeading} titleId="spec-title">
              <HeadNote>{custom.specLede}</HeadNote>
              <PullLink className="mt-4" href={evalSuitePage.path}>
                {custom.specMore}
              </PullLink>
            </UnitHead>
            <UnitBody>
              <Rows>
                {custom.spec.map((line) => (
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
            <UnitHead title={custom.jobsHeading} titleId="jobs-title">
              <HeadNote>{custom.jobsLede}</HeadNote>
            </UnitHead>
            <UnitBody>
              <JobRows />
            </UnitBody>
          </Unit>
        </Band>

        <ChannelsSection />

        <Band aria-labelledby="custom-price-title" id="pricing">
          <Unit>
            <UnitHead title={custom.pricingHeading} titleId="custom-price-title">
              <HeadNote>{custom.pricingLede}</HeadNote>
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
                prices={custom.prices}
                title={custom.title}
              />
              <Note className="xl:mt-0">{custom.pricingNote}</Note>
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
