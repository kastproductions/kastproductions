import Link from "next/link";
import {
  Actions,
  Band,
  FactRows,
  FactTerm,
  FactValue,
  HeadNote,
  HeroCopy,
  HeroTitle,
  Lede,
  Row,
  Unit,
  UnitBody,
  UnitHead,
} from "@/components/section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  callHref,
  company,
  contactEmail,
  contactPage,
  contactSubject,
  imprintPage,
  leadTime,
  location,
  mailtoFor,
} from "../content";
import { pageMetadata } from "../head-directives";
import { graphHtml, pageNodes } from "../structured-data";

export const metadata = pageMetadata(contactPage);

/* The page and the way here from the home page. It sells nothing, so it
 * states no offer. */
const graph = graphHtml(pageNodes(contactPage));

/* The mailbox, with the subject that names this door: a click here is counted
 * under the contact page, and the first line of the mail says where the
 * reader came from. */
const mailbox = <a href={mailtoFor(contactSubject)}>{contactEmail}</a>;

/*
 * Who the reader is writing to, line by line. Every value comes from
 * `company` and `location` in the content module, and the labels are the only
 * words this page writes. The register holds the legal name, the numbers and
 * the registered address; the studio works in Vilnius, which is why the two
 * addresses differ. The full entry, legal form and director included, is on
 * the imprint, and this page points there rather than printing it twice.
 *
 * A registration code and a VAT number are strings a machine issued and a
 * machine reads back, so they are set in mono. A name and an address are not.
 */
const identity = [
  { label: "Legal name", value: company.legalName },
  { label: "Registration code", value: company.registrationCode, machine: true },
  { label: "VAT number", value: company.vatNumber, machine: true },
  { label: "Registered address", value: company.registeredAddress },
  { label: "Studio", value: `${location.city}, ${location.country}` },
];

/* A machine string is set in mono at the size of the values around it. */
const machineValue = "font-mono";

/* A link in the copy is set in the coral, as on the legal pages. The two
 * buttons are not copy and keep their own colours. */
const coralLinks = "[&_a]:text-signal-foreground";

export default function Contact() {
  return (
    <>
      <SiteHeader route={contactPage.path} />
      <main id="main">
        <Band flush>
          <HeroCopy className="wrap">
            <HeroTitle>Contact</HeroTitle>
            <Lede wide className={coralLinks}>
              Two ways in: book a call, or write to {mailbox}. Send the issue
              you would hand to a new senior engineer, or describe the work you
              want an agent to take over.
            </Lede>
            <Actions>
              <a className={buttonVariants()} href={callHref}>
                Book a call
              </a>
              <a className={buttonVariants({ variant: "outline" })} href={mailtoFor(contactSubject)}>
                Write to us
              </a>
            </Actions>
          </HeroCopy>
        </Band>

        <Band aria-labelledby="next-title">
          <Unit>
            <UnitHead title="What happens after you write" titleId="next-title" />
            <UnitBody>
              <FactRows>
                <Row stack>
                  <FactTerm>Within one working day</FactTerm>
                  <FactValue>
                    A short spec and a fixed price for the work you described.
                    The price is fixed before any work starts.
                  </FactValue>
                </Row>
                <Row stack>
                  <FactTerm>Before you sign</FactTerm>
                  <FactValue>
                    The spec names every account, key and subscription your
                    agent needs, and says whether you already own it or we set
                    it up. Those that are yours stay in your name: we deploy
                    into them.
                  </FactValue>
                </Row>
                <Row stack>
                  <FactTerm>After you sign</FactTerm>
                  <FactValue>
                    A ready-made agent answers in your own channel {leadTime}{" "}
                    after you sign the order.
                  </FactValue>
                </Row>
              </FactRows>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="identity-title">
          <Unit>
            <UnitHead title="Who you are writing to" titleId="identity-title">
              <HeadNote className={coralLinks}>
                The full register entry is on the{" "}
                <Link href={imprintPage.path}>imprint</Link>.
              </HeadNote>
            </UnitHead>
            <UnitBody>
              <FactRows>
                {identity.map((line) => (
                  <Row stack key={line.label}>
                    <FactTerm>{line.label}</FactTerm>
                    <FactValue className={cn(line.machine && machineValue)}>
                      {line.value}
                    </FactValue>
                  </Row>
                ))}
                <Row stack>
                  <FactTerm>Email</FactTerm>
                  <FactValue>{mailbox}</FactValue>
                </Row>
              </FactRows>
            </UnitBody>
          </Unit>
        </Band>
      </main>

      <SiteFooter route={contactPage.path} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />
    </>
  );
}
