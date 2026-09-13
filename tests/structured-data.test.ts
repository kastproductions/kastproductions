/*
 * What a crawler is told about the company. The graph is a machine-readable
 * claim, so every assertion here is about a claim we can back: the company
 * states no premises it does not have, its logo is an image a search engine
 * will accept, and the profiles it points at are its own.
 *
 * Every assertion reads the emitted export. Nothing here pins page copy, and
 * nothing counts nodes for the sake of counting.
 */
import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { companyProfiles, contactEmail, founderProfiles } from "../src/app/content";
import { exportRoot, indexableRoutes, readExport, siteUrl } from "./export";

type Node = Record<string, unknown>;

/*
 * Every JSON-LD payload in a document, parsed. The script sits in the body,
 * so the whole document is read. A payload that does not parse is the fault
 * this file exists to catch: a crawler drops the graph without a word.
 */
function payloads(document: string): Node[] {
  const scripts = document.matchAll(
    /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  );
  return [...scripts].map(([, json]) => {
    try {
      return JSON.parse(json) as Node;
    } catch (error) {
      throw new Error(`a JSON-LD payload does not parse: ${String(error)}`);
    }
  });
}

/* Every node a document declares, across all of its payloads. */
function nodes(document: string): Node[] {
  return payloads(document).flatMap((payload) => (payload["@graph"] as Node[]) ?? []);
}

function nodeById(document: string, id: string): Node {
  const found = nodes(document).find((node) => node["@id"] === id);
  if (!found) {
    throw new Error(`no node with @id ${id}; the graph names ${nodes(document).map((node) => node["@id"]).join(", ")}`);
  }
  return found;
}

const organizationId = `${siteUrl}/#organization`;
const founderId = `${siteUrl}/#founder`;

/* The home page carries the site-wide nodes like every other route; it is the
 * one this file reads them from. */
function organization(): Node {
  return nodeById(readExport("index.html"), organizationId);
}

/*
 * A PNG states its size in the IHDR chunk, at a fixed offset after the 8-byte
 * signature. Reading those bytes keeps the suite free of an image library.
 */
function pngSize(bytes: Buffer): { width: number; height: number } {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (!bytes.subarray(0, 8).equals(signature)) {
    throw new Error("the logo file is not a PNG; a search engine needs a raster image here.");
  }
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

/* The logo file the graph points at, read out of the export. */
function logoFile(): Buffer {
  const logo = organization().logo as Node;
  const url = String(logo.url);
  if (!url.startsWith(`${siteUrl}/`)) {
    throw new Error(`the logo URL ${url} is not served from this site.`);
  }
  const file = url.slice(siteUrl.length + 1);
  try {
    return readFileSync(join(exportRoot, file));
  } catch {
    throw new Error(`the logo URL ${url} resolves to no file in the export.`);
  }
}

for (const route of indexableRoutes) {
  test(`${route.path} emits structured data that parses as JSON`, () => {
    const found = payloads(readExport(route.file));
    expect(found.length).toBeGreaterThan(0);
    for (const payload of found) {
      expect(payload["@context"]).toBe("https://schema.org");
    }
  });

  test(`${route.path} names the company, the founder and the site`, () => {
    /* These three are true wherever a crawler lands, so the layout states them
     * on every route rather than a page repeating them. */
    const declared = nodes(readExport(route.file)).map((node) => node["@id"]);
    expect(declared).toContain(organizationId);
    expect(declared).toContain(founderId);
    expect(declared).toContain(`${siteUrl}/#website`);
  });
}

test("the organisation claims no LocalBusiness subtype and no price range", () => {
  /* A LocalBusiness subtype is validated against premises, a street address and
   * opening hours. We have none of those, and a price range we cannot hold to
   * is a claim rather than a fact. `@type` is one name or several; read either
   * as a list. */
  expect([organization()["@type"]].flat()).toEqual(["Organization"]);
  expect(organization()).not.toHaveProperty("priceRange");
});

test("the logo is a raster file in the export, at least 512 square", () => {
  const url = String((organization().logo as Node).url);
  /* An SVG is refused for structured data images, whatever its size. */
  expect(url).toMatch(/\.(png|jpe?g|webp)$/);

  const { width, height } = pngSize(logoFile());
  expect(width).toBeGreaterThanOrEqual(512);
  expect(height).toBeGreaterThanOrEqual(512);
});

test("the logo is declared as an ImageObject with the size the file really is", () => {
  const logo = organization().logo as Node;
  const { width, height } = pngSize(logoFile());

  expect(logo["@type"]).toBe("ImageObject");
  expect(logo.width).toBe(width);
  expect(logo.height).toBe(height);
});

test("the organisation carries a sales contact point with the contact email", () => {
  expect(organization().contactPoint).toMatchObject({
    "@type": "ContactPoint",
    contactType: "sales",
    email: contactEmail,
  });
});

test("the organisation names its own GitHub organisation in sameAs", () => {
  const sameAs = organization().sameAs as string[];

  /* The profiles a crawler follows to corroborate the company, starting with
   * the GitHub organisation that hosts this site. */
  expect(sameAs).toEqual(companyProfiles);
  expect(sameAs).toContain("https://github.com/kastproductions");
});

test("the founder's personal profiles sit on the Person node and nowhere else", () => {
  const person = nodeById(readExport("index.html"), founderId);
  expect(person.sameAs).toEqual(founderProfiles);

  /* They belong to him, not to the company. */
  for (const profile of founderProfiles) {
    expect(organization().sameAs).not.toContain(profile);
  }
});
