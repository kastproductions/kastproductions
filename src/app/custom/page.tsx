import { ChannelsSection } from "@/components/channels-section";
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
  Unit,
  UnitBody,
  UnitHead,
} from "@/components/section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { buttonVariants } from "@/components/ui/button";
import { callHref, custom, customPage, mailtoFor } from "../content";
import { pageMetadata } from "../head-directives";
import { graphHtml, pageNodes } from "../structured-data";

export const metadata = pageMetadata(customPage);

/* The door's own nodes, beside the site-wide ones the layout renders: the
 * page itself, the service it sells with the prices it prints, and the way
 * here from the home page. */
const graph = graphHtml(pageNodes(customPage, { prices: custom.prices }));

export default function Custom() {
  return (
    <>
      <SiteHeader route={customPage.path} />

      <main id="main">
        <Band flush>
          <HeroCopy className="wrap">
            <HeroTitle>{custom.heading}</HeroTitle>
            <Lede wide>{custom.lede}</Lede>
            <Actions>
              <a className={buttonVariants()} href={mailtoFor(custom.subject)}>
                Describe the work
              </a>
              <a className={buttonVariants({ variant: "outline" })} href={callHref}>
                Book a call
              </a>
            </Actions>
          </HeroCopy>
        </Band>

        <Band id="jobs" aria-labelledby="jobs-title">
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

        <Band tone="panel" id="pricing" aria-labelledby="custom-price-title">
          <Unit>
            <UnitHead title={custom.pricingHeading} titleId="custom-price-title">
              <HeadNote>
                The build price is a floor, because the work follows the number
                of systems your agent touches. The monthly price buys the eval
                suite, the changes and the report.
              </HeadNote>
            </UnitHead>
            <Plans>
              <PlanCard
                title="Custom agent"
                body={
                  <>
                    You describe the work. We write the spec and name the price,
                    then build the agent around how your company already runs.
                  </>
                }
                prices={custom.prices}
                includes={[
                  "A fixed price before we write any code",
                  "Your accounts, your keys, your code from the first commit",
                  "An eval suite, approval gates and a spend cap written for you",
                ]}
                href={mailtoFor(custom.subject)}
                cta="Describe the work"
              />
              <Note>
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
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph }}
      />
    </>
  );
}
