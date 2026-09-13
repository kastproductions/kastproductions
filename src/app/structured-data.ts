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
  brand,
  companyProfiles,
  contactEmail,
  description,
  founder,
  founderProfiles,
  location,
  siteUrl,
} from "./content";

/* A schema.org node. The shape is free-form on purpose: schema.org vocabulary
 * is wider than any type we would write here, and the graph is data, not code. */
export type Node = Record<string, unknown>;

/* Nodes point at each other by `@id`, so a page node can say it belongs to the
 * company without repeating the company. */
export const organizationId = `${siteUrl}/#organization`;
export const founderId = `${siteUrl}/#founder`;
export const websiteId = `${siteUrl}/#website`;

/*
 * The logo a search engine may show beside the company. It has to be a raster
 * image of at least 512 pixels square, so it is a committed PNG in `public/`
 * drawn from `src/app/icon.svg`. The SVG stays as the favicon, where a browser
 * wants a vector and a crawler never looks. Regenerate the PNG with:
 *
 *   rsvg-convert -w 512 -h 512 src/app/icon.svg -o public/logo.png
 */
const logo = { path: "/logo.png", width: 512, height: 512 };

const organization: Node = {
  "@type": "Organization",
  "@id": organizationId,
  name: brand,
  url: siteUrl,
  email: contactEmail,
  description,
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

const person: Node = {
  "@type": "Person",
  "@id": founderId,
  name: founder,
  jobTitle: "Founder",
  url: siteUrl,
  worksFor: { "@id": organizationId },
  sameAs: founderProfiles,
};

const website: Node = {
  "@type": "WebSite",
  "@id": websiteId,
  url: siteUrl,
  name: brand,
  description,
  publisher: { "@id": organizationId },
  inLanguage: "en",
};

/* The nodes that are true on every route. The root layout renders these, and a
 * page adds its own on top rather than repeating them. */
export const siteNodes: Node[] = [organization, person, website];

/*
 * What a page knows about itself: the route it answers, the heading a reader
 * sees at the top of it and the sentence underneath. Every per-page node is
 * built from this, so a page states one set of facts and not three.
 */
export type PageFacts = {
  path: string;
  name: string;
  description: string;
};

/* A printed price, the shape `content.ts` writes: `custom.prices` and the
 * `prices` field on a product both hold these. */
type Price = { amount: string; per: string };

/* The page's own URL, as its canonical states it. The home page is the bare
 * site URL with no trailing slash, so a node and a canonical never disagree. */
function pageUrl(path: string): string {
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}

/*
 * The page itself, as a node. It points at the site and the company by `@id`
 * rather than restating either: the layout already said both, on this route
 * and on every other one.
 */
export function webPage(page: PageFacts): Node {
  return {
    "@type": "WebPage",
    "@id": `${pageUrl(page.path)}#webpage`,
    url: pageUrl(page.path),
    name: page.name,
    description: page.description,
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    inLanguage: "en",
  };
}

/* The currency each symbol in the price list means. A symbol we have no code
 * for is a price the graph cannot state, and `printedPrice` throws on it. */
const currencyCodes: Record<string, string> = { "\u20ac": "EUR" };

/* A price as a reader sees it: an optional `From`, a currency symbol, then
 * digits grouped by commas. `"From \u20ac40,000"` is the whole grammar. */
const priceFormat = /^(From )?(\p{Sc})\s?(\d[\d,]*)$/u;

/*
 * The number and the currency a printed price states. The printed string is
 * the only place either fact lives, so it is read rather than restated: a
 * price the page shows and a price the graph offers cannot drift apart.
 *
 * A string this cannot read throws and fails the build. An offer without a
 * number and a currency is not an offer, and a new price format is worth a
 * loud failure rather than an offer nobody notices is missing.
 */
function printedPrice(amount: string): { floor: boolean; currency: string; value: number } {
  const match = priceFormat.exec(amount);
  const currency = match ? currencyCodes[match[2]] : undefined;
  if (!match || !currency) {
    throw new Error(
      `Cannot read a number and a currency out of the price "${amount}". ` +
        `An offer states both. Teach \`priceFormat\` and \`currencyCodes\` in ` +
        `src/app/structured-data.ts the new format, or the graph loses the price.`,
    );
  }
  return {
    floor: Boolean(match[1]),
    currency,
    value: Number(match[3].replaceAll(",", "")),
  };
}

/*
 * One printed price as an offer. `From` means a floor, so it becomes a
 * `minPrice` rather than a `price`: a fixed price we do not hold to is the
 * kind of claim that costs trust.
 */
function offer(price: Price): Node {
  const { floor, currency, value } = printedPrice(price.amount);
  return {
    "@type": "Offer",
    /* What the money buys, in the words the page prints: "to build", "a month
     * to operate". */
    description: price.per,
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: currency,
      ...(floor ? { minPrice: value } : { price: value }),
    },
  };
}

/*
 * What the page sells, with the prices it prints. The company provides it, by
 * `@id`, so the service hangs off the same organisation everywhere.
 */
export function service(page: PageFacts & { prices: Price[] }): Node {
  return {
    "@type": "Service",
    "@id": `${pageUrl(page.path)}#service`,
    name: page.name,
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
export function breadcrumbs(page: PageFacts): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl(page.path)}#breadcrumbs`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: brand, item: siteUrl },
      { "@type": "ListItem", position: 2, name: page.name, item: pageUrl(page.path) },
    ],
  };
}

/*
 * A graph, ready for the inner HTML of a `<script type="application/ld+json">`.
 * `<` becomes `\u003c` so no string in the graph can close the script tag.
 */
export function graphHtml(nodes: Node[]): string {
  const graph = { "@context": "https://schema.org", "@graph": nodes };
  return JSON.stringify(graph).replace(/</g, "\\u003c");
}
