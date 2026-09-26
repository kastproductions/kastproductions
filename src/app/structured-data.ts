/*
 * The structured data graph: what a crawler is told about the company in
 * machine-readable form. It lives in one module so that every page serialises
 * its graph the same way, and so a page can add the nodes that are true only on
 * that page without restating the ones that are true everywhere.
 *
 * A node states only what the company can support. A claim we cannot back is
 * worse than no claim: it fails validation and costs trust.
 */
import {
  aboutPage,
  brand,
  companyProfiles,
  contactEmail,
  founder,
  founderProfiles,
  homePage,
  location,
  type PageRecord,
  pageUrl,
  type Price,
  type Question,
  siteUrl,
} from "./content";

/* A schema.org node. The shape is free-form on purpose: schema.org vocabulary
 * is wider than any type we would write here, and the graph is data, not code. */
export type GraphNode = Record<string, unknown>;

/*
 * The key a node carries: the page's URL, then a fragment naming the node. One
 * function writes every key in the graph, so the site URL is spelled one way
 * throughout: `https://www.kastproductions.com/#organization` for a node true
 * of the whole site, `…/custom#webpage` for a node about a page below it.
 *
 * `pageUrl` leaves the home page's trailing slash off, because a canonical tag
 * has to name one address and that is the address this site names. A key is not
 * an address, though, and two spellings of one key are two entities to whoever
 * reads the graph, so the home page's key keeps the slash the site-wide keys
 * carry. Nodes point at each other by key, so a page node can say it belongs to
 * the company without repeating the company.
 */
function nodeId(path: string, fragment: string): string {
  return `${path === homePage.path ? `${siteUrl}/` : pageUrl(path)}#${fragment}`;
}

/* The three nodes true of the whole site key off its root, which is the path
 * the home page holds. */
export const organizationId = nodeId(homePage.path, "organization");
export const founderId = nodeId(homePage.path, "founder");
export const websiteId = nodeId(homePage.path, "website");

/*
 * The logo a search engine may show beside the company. It has to be a raster
 * image of at least 512 pixels square, so it is a committed PNG in `public/`
 * drawn from `src/app/icon.svg`. The SVG stays as the favicon, where a browser
 * wants a vector and a crawler never looks. Regenerate the PNG with:
 *
 *   rsvg-convert -w 512 -h 512 src/app/icon.svg -o public/logo.png
 */
const logo = { path: "/logo.png", width: 512, height: 512 };

const organization: GraphNode = {
  "@type": "Organization",
  "@id": organizationId,
  name: brand,
  url: siteUrl,
  email: contactEmail,
  description: homePage.description,
  founder: { "@id": founderId },
  /* The city we work from. There is no street address and no telephone, which
   * is why this is an Organization and not a LocalBusiness subtype: nobody
   * walks in, and a subtype we cannot furnish invites validation it fails. */
  address: {
    "@type": "PostalAddress",
    addressLocality: location.city,
    addressCountry: location.countryCode,
  },
  areaServed: "Worldwide",
  /* The mailbox people already write to. */
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: contactEmail,
  },
  /* The company's own public profiles, so a crawler can corroborate that the
   * entity exists off this website. The founder's personal profiles are his,
   * and stay on the Person node. */
  sameAs: companyProfiles,
  knowsAbout: [
    "Standing agents",
    "Agent development",
    "Coding agents",
    "Eval suites",
    "Approval gates",
    "Flue",
    "Cloudflare Workers",
    "TypeScript",
    "Software development",
  ],
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}${logo.path}`,
    width: logo.width,
    height: logo.height,
  },
};

const person: GraphNode = {
  "@type": "Person",
  "@id": founderId,
  name: founder,
  jobTitle: "Founder",
  /* The page that describes him, so a crawler that follows the node lands
   * where the founder is written about and not on the home page. */
  url: pageUrl(aboutPage.path),
  worksFor: { "@id": organizationId },
  sameAs: founderProfiles,
};

const website: GraphNode = {
  "@type": "WebSite",
  "@id": websiteId,
  url: siteUrl,
  name: brand,
  description: homePage.description,
  publisher: { "@id": organizationId },
  inLanguage: "en-GB",
};

/* The nodes that are true on every route. The root layout renders these, and a
 * page adds its own on top rather than repeating them. */
export const siteNodes: GraphNode[] = [organization, person, website];

/*
 * One question the page answers, in the words it prints. Both strings come off
 * the same list the page renders, so an answer engine that lifts the answer
 * lifts what a reader reads.
 */
function question(item: Question): GraphNode {
  return {
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  };
}

/*
 * The page itself, as a node. It points at the site and the company by `@id`
 * rather than restating either: the layout already said both, on this route
 * and on every other one.
 *
 * A page that answers questions says so on this node rather than on a second
 * node beside it: two nodes claiming one address are two pages to whoever
 * reads the graph, and only one of them is real.
 */
function webPage(page: PageRecord, questions?: Question[]): GraphNode {
  return {
    "@type": questions ? ["WebPage", "FAQPage"] : "WebPage",
    "@id": nodeId(page.path, "webpage"),
    url: pageUrl(page.path),
    name: page.title,
    description: page.description,
    /* The day this page's copy last changed, off the page record, which is the
     * one place it is written. Never the clock the build runs on: a date
     * stamped at build time tells a crawler that every page changed on every
     * deploy, and a crawler that learns our dates are worthless stops reading
     * them. */
    dateModified: page.date,
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    inLanguage: "en-GB",
    /* The trail from the home page to this one, on every page but the home
     * page, which is where the trail starts. */
    ...(page.path === homePage.path
      ? {}
      : { breadcrumb: { "@id": nodeId(page.path, "breadcrumbs") } }),
    ...(questions ? { mainEntity: questions.map(question) } : {}),
  };
}

/* The currency each symbol in the price list means. A symbol we have no code
 * for is a price the graph cannot state, and `printedPrice` throws on it. */
const currencyCodes: Record<string, string> = { "\u20ac": "EUR" };

/* A price as a reader sees it: `From`, a currency symbol, then digits grouped
 * by commas. `"From \u20ac40,000"` is the whole grammar, and the `From` is
 * required: see `offer`. */
const priceFormat = /^From (\p{Sc})\s?(\d[\d,]*)$/u;

/*
 * The number and the currency a printed price states. The printed string is
 * the only place either fact lives, so it is read rather than restated: a
 * price the page shows and a price the graph offers cannot drift apart.
 *
 * A string this cannot read throws and fails the build. An offer without a
 * number and a currency is not an offer, and a new price format is worth a
 * loud failure rather than an offer nobody notices is missing.
 */
function printedPrice(amount: string): { currency: string; value: number } {
  const match = priceFormat.exec(amount);
  const currency = match ? currencyCodes[match[1]] : undefined;
  if (!match || !currency) {
    throw new Error(
      `Cannot read a floor and a currency out of the price "${amount}". ` +
        `Every price we print is a floor, and an offer states a number and a ` +
        `currency. Teach \`priceFormat\` and \`currencyCodes\` in ` +
        `src/app/structured-data.ts the new format, or the graph loses the price.`,
    );
  }
  return { currency, value: Number(match[2].replaceAll(",", "")) };
}

/*
 * One printed price as an offer, always as a floor: `minPrice` and never
 * `price`. Every price this company prints starts with `From`, because the
 * work follows the number of systems the agent touches, which is the rule the
 * Content section of README.md states. A price that is not a floor therefore
 * fails the build on purpose: the alternative is a graph that quietly calls a
 * fixed price a floor, and a price we do not hold to is the kind of claim that
 * costs trust.
 */
function offer(price: Price): GraphNode {
  const { currency, value } = printedPrice(price.amount);
  return {
    "@type": "Offer",
    /* What the money buys, in the words the page prints: "to build", "a month
     * to operate". */
    description: price.per,
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: currency,
      minPrice: value,
    },
  };
}

/*
 * What the page sells, with the prices it prints. The company provides it, by
 * `@id`, so the service hangs off the same organisation everywhere.
 */
function service(page: PageRecord & { prices: Price[] }): GraphNode {
  return {
    "@type": "Service",
    "@id": nodeId(page.path, "service"),
    name: page.title,
    description: page.description,
    url: pageUrl(page.path),
    provider: { "@id": organizationId },
    areaServed: "Worldwide",
    offers: page.prices.map(offer),
  };
}

/*
 * Where the page sits: the home page, then the page. Two levels is the whole
 * depth of this site, and a crumb trail that claims more than that is wrong.
 */
function breadcrumbs(page: PageRecord): GraphNode {
  return {
    "@type": "BreadcrumbList",
    "@id": nodeId(page.path, "breadcrumbs"),
    itemListElement: [
      { "@type": "ListItem", position: 1, name: brand, item: siteUrl },
      { "@type": "ListItem", position: 2, name: page.title, item: pageUrl(page.path) },
    ],
  };
}

/*
 * The nodes one page adds to the site-wide ones, from that page's record and
 * from what the page prints: the page itself with the questions it answers, the
 * thing it sells where it prints a price for it, and the trail back to the home
 * page.
 *
 * A page states no offer where it prints no price, and no question where it
 * answers none, so it passes only what it has. The home page carries no trail,
 * because it is where every trail starts, and a crumb trail of one item claims
 * a depth this site does not have.
 */
export function pageNodes(
  page: PageRecord,
  printed: { prices?: Price[]; questions?: Question[] } = {},
): GraphNode[] {
  return [
    webPage(page, printed.questions),
    ...(printed.prices ? [service({ ...page, prices: printed.prices })] : []),
    ...(page.path === homePage.path ? [] : [breadcrumbs(page)]),
  ];
}

/*
 * A graph, ready for the inner HTML of a `<script type="application/ld+json">`.
 * `<` becomes `\u003c` so no string in the graph can close the script tag.
 */
export function graphHtml(nodes: GraphNode[]): string {
  const graph = { "@context": "https://schema.org", "@graph": nodes };
  return JSON.stringify(graph).replace(/</g, "\\u003c");
}
