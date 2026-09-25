import {
  Band,
  FactRows,
  FactTerm,
  FactValue,
  HeroCopy,
  HeroTitle,
  Row,
  Unit,
  UnitBody,
  UnitHead,
} from "@/components/section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { cn } from "@/lib/utils";
import { company, contactEmail, imprintPage } from "../content";
import { pageMetadata } from "../head-directives";
import { graphHtml, pageNodes } from "../structured-data";

export const metadata = pageMetadata(imprintPage);

/* The page and the way here from the home page. It sells nothing, so it
 * states no offer. */
const graph = graphHtml(pageNodes(imprintPage));

/*
 * The register entry, line by line. Every value comes from `company` in the
 * content module, which holds what the Lithuanian register holds, and the
 * labels are the only words this page writes. A reader is here to check the
 * company against the register, so a line the register does not hold is worse
 * than a line missing: nothing is added to these six but the mailbox, which
 * the page renders under them so a reader who has finished checking can
 * write.
 *
 * A registration code and a VAT number are strings a machine issued and a
 * machine reads back, so they are set in mono. A name and an address are not.
 */
const entry = [
  { label: "Legal name", value: company.legalName },
  { label: "Legal form", value: company.legalForm },
  { label: "Registration code", value: company.registrationCode, machine: true },
  { label: "VAT number", value: company.vatNumber, machine: true },
  { label: "Registered address", value: company.registeredAddress },
  { label: "Director", value: company.director },
];

/* A machine string is set in mono at the size of the values around it. */
const machineValue = "font-mono";

export default function Imprint() {
  return (
    <>
      <SiteHeader route={imprintPage.path} />

      <main id="main">
        <Band flush>
          <HeroCopy className="wrap">
            <HeroTitle>Imprint</HeroTitle>
          </HeroCopy>
        </Band>

        <Band aria-labelledby="entry-title">
          <Unit>
            <UnitHead title="The company" titleId="entry-title" />
            <UnitBody>
              <FactRows>
                {entry.map((line) => (
                  <Row stack key={line.label}>
                    <FactTerm>{line.label}</FactTerm>
                    <FactValue className={cn(line.machine && machineValue)}>
                      {line.value}
                    </FactValue>
                  </Row>
                ))}
                <Row stack>
                  <FactTerm>Email</FactTerm>
                  <FactValue>
                    <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                  </FactValue>
                </Row>
              </FactRows>
            </UnitBody>
          </Unit>
        </Band>
      </main>

      <SiteFooter route={imprintPage.path} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />
    </>
  );
}
