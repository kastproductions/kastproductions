import Link from "next/link";
import { ClientsStrip } from "@/components/clients-strip";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  aboutPage,
  brand,
  company,
  founder,
  founderProfiles,
  imprintPage,
  location,
  references,
} from "../content";
import { pageMetadata } from "../head-directives";
import { graphHtml, pageNodes } from "../structured-data";

/* A profile as the page prints it: the host and the path, which is the
 * string a person types, without the scheme. */
const profiles = founderProfiles.map((href) => {
  const url = new URL(href);
  return { href, label: `${url.host}${url.pathname}` };
});

export const metadata = pageMetadata(aboutPage);

/* The page and the way here from the home page. It sells nothing, so it
 * states no offer. */
const graph = graphHtml(pageNodes(aboutPage));

/*
 * Who is behind the work, as three readings under the founder's name. Every
 * value comes from the content module: where the studio works is `location`,
 * the register line is `company`, which the imprint prints in full, and the
 * profiles are `founderProfiles`, the same list the founder node in the graph
 * carries. A host name is a string a machine reads, so it is set in mono.
 *
 * The seventeen companies and the six references are the founder's earlier
 * work, before this offer existed, and this page is where that is said.
 * The quotes are printed as written: the content module forbids editing
 * them, and `tests/about.test.ts` reads each one back out of the export.
 */
export default function About() {
  return (
    <>
      <SiteHeader route={aboutPage.path} />

      <main id="main">
        <section className="band band--flush hero">
          <div className="wrap hero__copy">
            <h1>{founder} owns the agents and signs the merges.</h1>
            <p className="lede">
              He founded {brand} in {location.city}, {location.country}. He
              owns the agents we build and signs the merges we make on a
              client&apos;s repository.
            </p>
          </div>
        </section>

        <section className="band" id="founder" aria-labelledby="founder-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="founder-title">The founder</h2>
              <p>
                He owns the agents we build. Where he works, what the register
                holds, and where else to find him.
              </p>
            </div>
            <div className="unit__body">
              <dl className="rows">
                <div className="row row--stack">
                  <dt className="row__label">Works from</dt>
                  <dd>
                    {location.city}, {location.country}
                  </dd>
                </div>
                <div className="row row--stack">
                  <dt className="row__label">In the register</dt>
                  <dd>Director of {company.legalName}</dd>
                  <Link className="pull" href={imprintPage.path}>
                    Read the register entry
                  </Link>
                </div>
                <div className="row row--stack">
                  <dt className="row__label">Profiles</dt>
                  <dd>His own, as against the company&apos;s. Both link back here.</dd>
                  {profiles.map((profile) => (
                    <a className="pull mono" href={profile.href} rel="me noreferrer" key={profile.href}>
                      {profile.label}
                    </a>
                  ))}
                </div>
              </dl>
            </div>
          </div>
        </section>

        <ClientsStrip heading={`Companies ${founder} has shipped for, across four continents`} />

        <section className="band" id="references" aria-labelledby="references-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="references-title">Six references, quoted as written</h2>
              <p>
                People who worked with {founder} wrote these about his earlier
                work. Nothing in them is edited.
              </p>
            </div>
            <ul className="unit__body refs">
              {references.map((reference) => (
                <li key={reference.name}>
                  <figure>
                    <blockquote>
                      <p>{reference.quote}</p>
                    </blockquote>
                    <figcaption>
                      <img
                        src={reference.portrait}
                        alt={`${reference.name}, ${reference.position}`}
                        width={176}
                        height={176}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="refs__who">
                        <b>{reference.name}</b>
                        <span>{reference.position}</span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter route={aboutPage.path} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />
    </>
  );
}
