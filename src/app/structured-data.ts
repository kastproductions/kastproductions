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
 * A graph, ready for the inner HTML of a `<script type="application/ld+json">`.
 * `<` becomes `\u003c` so no string in the graph can close the script tag.
 */
export function graphHtml(nodes: Node[]): string {
  const graph = { "@context": "https://schema.org", "@graph": nodes };
  return JSON.stringify(graph).replace(/</g, "\\u003c");
}
