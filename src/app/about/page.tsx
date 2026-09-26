import { ClientsStrip } from "@/components/clients-strip";
import {
  Band,
  FactRows,
  FactTerm,
  FactValue,
  HeadNote,
  HeroCopy,
  HeroTitle,
  Lede,
  PullLink,
  Row,
  Unit,
  UnitBody,
  UnitHead,
} from "@/components/section";
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
        <Band flush>
          <HeroCopy className="wrap">
            <HeroTitle>{founder} owns the agents and signs the merges.</HeroTitle>
            <Lede>
              He founded {brand} in {location.city}, {location.country}. He
              owns the agents we build and signs the merges we make on a
              client’s repository.
            </Lede>
          </HeroCopy>
        </Band>

        <Band id="founder" aria-labelledby="founder-title">
          <Unit>
            <UnitHead title="The founder" titleId="founder-title">
              <HeadNote>
                He owns the agents we build. Where he works, what the register
                holds, and where else to find him.
              </HeadNote>
            </UnitHead>
            <UnitBody>
              <FactRows>
                <Row stack>
                  <FactTerm>Works from</FactTerm>
                  <FactValue>
                    {location.city}, {location.country}
                  </FactValue>
                </Row>
                <Row stack>
                  <FactTerm>In the register</FactTerm>
                  <FactValue>Director of {company.legalName}</FactValue>
                  <dd className="mt-0.5">
                    <PullLink href={imprintPage.path}>Read the register entry</PullLink>
                  </dd>
                </Row>
                <Row stack>
                  <FactTerm>Profiles</FactTerm>
                  <FactValue>
                    His own, as against the company’s. Both link back here.
                  </FactValue>
                  {profiles.map((profile) => (
                    <dd className="mt-0.5" key={profile.href}>
                      <PullLink
                        className="font-mono text-[0.92em]"
                        href={profile.href}
                        rel="me noreferrer"
                      >
                        {profile.label}
                      </PullLink>
                    </dd>
                  ))}
                </Row>
              </FactRows>
            </UnitBody>
          </Unit>
        </Band>

        <ClientsStrip heading={`Companies ${founder} has shipped for, across four continents`} />

        <Band id="references" aria-labelledby="references-title">
          <Unit>
            <UnitHead title="Six references, quoted as written" titleId="references-title">
              <HeadNote>
                People who worked with {founder} wrote these about his earlier
                work. Nothing in them is edited.
              </HeadNote>
            </UnitHead>
            <ul className="grid min-w-0 divide-y divide-hairline">
              {references.map((reference) => (
                <li className="py-7 first:pt-0" key={reference.name}>
                  <figure>
                    <blockquote>
                      <p className="max-w-[60ch] text-[1.15rem] leading-[1.5] font-medium tracking-[-0.01em] text-foreground">
                        {reference.quote}
                      </p>
                    </blockquote>
                    <figcaption className="mt-4 flex items-center gap-3.5">
                      <img
                        className="size-11 rounded-sm object-cover grayscale contrast-105"
                        src={reference.portrait}
                        alt={`${reference.name}, ${reference.position}`}
                        width={176}
                        height={176}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="flex flex-col text-[0.92rem] leading-[1.35]">
                        <b className="font-semibold text-foreground">{reference.name}</b>
                        <span className="text-[0.84rem] text-faint">{reference.position}</span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </Unit>
        </Band>
      </main>

      <SiteFooter route={aboutPage.path} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />
    </>
  );
}
