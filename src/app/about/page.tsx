import { ClientsStrip } from "@/components/clients-strip";
import { Seal } from "@/components/ornaments";
import {
  Actions,
  Band,
  FactRows,
  FactTerm,
  FactValue,
  HeadNote,
  HeroFrame,
  HeroTitle,
  Lede,
  PullLink,
  Row,
  SectionNumber,
  Unit,
  UnitBody,
  UnitHead,
} from "@/components/section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { buttonVariants } from "@/components/ui/button";
import {
  aboutPage,
  brand,
  briefHref,
  callHref,
  clients,
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
 * Who is behind the work. Every fact comes from the content module: where the
 * studio works is `location`, the register line is `company`, which the
 * imprint prints in full, and the profiles are `founderProfiles`, the same
 * list the founder node in the graph carries. A host name is a string a
 * machine reads, so it is set in mono.
 *
 * The seventeen companies and the six references are the founder's earlier
 * work as a developer, before he built agents, and this page is where that is
 * said. The quotes are printed as written: the content module forbids editing
 * them, and `tests/about.test.ts` reads each one back out of the export.
 *
 * The hero carries the seal, because the seal is the mark of the person who
 * signs the work, and this page is about that person.
 */
export default function About() {
  return (
    <>
      <SiteHeader route={aboutPage.path} />

      <main id="main">
        <Band flush>
          <HeroFrame ornament={<Seal className="size-32 lg:size-40" />}>
            <HeroTitle>{founder} builds your agent and puts his name on it.</HeroTitle>
            <Lede>
              He founded {brand} in {location.city}, {location.country}. Before
              that, he shipped software for {clients.length} companies on four
              continents. Now he builds agents that work in a client’s own
              accounts, and he signs every merge we make on a client’s
              repository.
            </Lede>
          </HeroFrame>
        </Band>

        <Band id="founder" aria-labelledby="founder-title">
          <Unit>
            <UnitHead index={1} title="The founder" titleId="founder-title">
              <HeadNote>
                He runs the company from {location.city}. The register names
                him as its director.
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
                    His own accounts, apart from the company’s. Both link back
                    to this site.
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

        <ClientsStrip
          heading={`The ${clients.length} companies ${founder} shipped software for before he built agents, on four continents`}
        />

        <Band id="references" aria-labelledby="references-title">
          <Unit>
            <UnitHead index={2} title="Six references, quoted as written" titleId="references-title">
              <HeadNote>
                People who worked with {founder} wrote these about his earlier
                work as a developer. Nothing in them is edited.
              </HeadNote>
            </UnitHead>
            <ul className="grid min-w-0 divide-y divide-hairline">
              {references.map((reference, at) => (
                <li className="py-7 first:pt-0" key={reference.name}>
                  <figure>
                    <SectionNumber className="mb-3" index={at + 1} />
                    <blockquote>
                      <p className="max-w-[60ch] text-title leading-[1.55] text-foreground">
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
                      <span className="flex flex-col text-note leading-[1.35]">
                        <b className="font-heading font-semibold text-foreground">{reference.name}</b>
                        <span className="text-small text-faint">{reference.position}</span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </Unit>
        </Band>

        <Band aria-labelledby="write-title" tone="panel">
          <Unit>
            <UnitHead index={3} title="Send us the work" titleId="write-title">
              <HeadNote>
                Describe the work you want an agent to take off your team. A
                short spec and a fixed price come back within one working day.
              </HeadNote>
            </UnitHead>
            <UnitBody>
              <Actions className="mt-0">
                <a className={buttonVariants()} href={briefHref}>
                  Send us a brief
                </a>
                <a className={buttonVariants({ variant: "outline" })} href={callHref}>
                  Book a call
                </a>
              </Actions>
            </UnitBody>
          </Unit>
        </Band>
      </main>

      <SiteFooter route={aboutPage.path} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />
    </>
  );
}
