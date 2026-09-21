import { SiteFooter, SiteHeader } from "@/components/site-chrome";
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

export default function Imprint() {
  return (
    <>
      <SiteHeader route={imprintPage.path} />

      <main className="legal" id="main">
        <section className="band band--flush hero">
          <div className="wrap hero__copy">
            <h1>Imprint</h1>
          </div>
        </section>

        <section className="band" aria-labelledby="entry-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="entry-title">The company</h2>
            </div>
            <div className="unit__body">
              <dl className="rows">
                {entry.map((line) => (
                  <div className="row row--stack" key={line.label}>
                    <dt className="row__label">{line.label}</dt>
                    <dd className={line.machine ? "mono" : undefined}>{line.value}</dd>
                  </div>
                ))}
                <div className="row row--stack">
                  <dt className="row__label">Email</dt>
                  <dd>
                    <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter route={imprintPage.path} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />
    </>
  );
}
