import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
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

export default function Contact() {
  return (
    <>
      <SiteHeader route={contactPage.path} />
      <main className="contact-page" id="main">
        <section className="band band--flush hero">
          <div className="wrap hero__copy">
            <h1>Contact</h1>
            <p className="lede lede--wide">
              Two ways in: book a call, or write to {mailbox}. Send the issue
              you would hand to a new senior engineer, or describe the work you
              want an agent to take over.
            </p>
            <div className="actions">
              <a className="btn btn--signal" href={callHref}>
                Book a call
              </a>
              <a className="btn btn--line" href={mailtoFor(contactSubject)}>
                Write to us
              </a>
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="next-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="next-title">What happens after you write</h2>
            </div>
            <div className="unit__body">
              <dl className="rows">
                <div className="row row--stack">
                  <dt className="row__label">Within one working day</dt>
                  <dd>
                    A short spec and a fixed price for the work you described.
                    The price is fixed before any work starts.
                  </dd>
                </div>
                <div className="row row--stack">
                  <dt className="row__label">Before you sign</dt>
                  <dd>
                    The spec names every account, key and subscription your
                    agent needs, and says whether you already own it or we set
                    it up. Those that are yours stay in your name: we deploy
                    into them.
                  </dd>
                </div>
                <div className="row row--stack">
                  <dt className="row__label">After you sign</dt>
                  <dd>
                    A ready-made agent answers in your own channel {leadTime}{" "}
                    after you sign the order.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="identity-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="identity-title">Who you are writing to</h2>
              <p>
                The full register entry is on the{" "}
                <Link href={imprintPage.path}>imprint</Link>.
              </p>
            </div>
            <div className="unit__body">
              <dl className="rows">
                {identity.map((line) => (
                  <div className="row row--stack" key={line.label}>
                    <dt className="row__label">{line.label}</dt>
                    <dd className={line.machine ? "mono" : undefined}>{line.value}</dd>
                  </div>
                ))}
                <div className="row row--stack">
                  <dt className="row__label">Email</dt>
                  <dd>{mailbox}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter route={contactPage.path} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />
    </>
  );
}
