/*
 * What a crawler reads first: one heading, a canonical URL that points at the
 * page itself, a title and a description, on every route we ask to be indexed.
 * Then the two files that tell a crawler which routes exist.
 *
 * Every assertion reads the emitted export. Nothing here pins page copy.
 */
import { expect, test } from "bun:test";
import { brand } from "../src/app/content";
import {
  indexableRoutes,
  linkHrefs,
  metaContents,
  readExport,
  siteUrl,
  sitemapUrls,
  tagTexts,
} from "./export";

for (const route of indexableRoutes) {
  test(`${route.path} emits one h1`, () => {
    /* More than one, and a crawler has to guess what the page is about. */
    expect(tagTexts(readExport(route.file), "h1")).toHaveLength(1);
  });

  test(`${route.path} emits a canonical URL for its own path`, () => {
    /* A canonical naming another page hands that page our ranking. */
    expect(linkHrefs(readExport(route.file), "canonical")).toEqual([route.url]);
  });

  test(`${route.path} emits the title and the description its record states`, () => {
    const document = readExport(route.file);

    /* One each: a second of either leaves the crawler to choose the search
     * result a person reads. */
    const titles = tagTexts(document, "title");
    expect(titles).toHaveLength(1);

    /* The page record is the one place the title and the description are
     * written, so the export is read back against it rather than against a
     * copy of the words. The title the record states is the page's own, and
     * the brand follows it, which is how a search result reads. */
    expect(titles[0]).toContain(route.title);
    expect(titles[0]).toContain(brand);

    expect(metaContents(document, "description")).toEqual([route.description]);
  });

  test(`${route.path} states a title and a description a search result prints whole`, () => {
    const document = readExport(route.file);

    /* A result prints about 60 characters of the title and about 160 of the
     * description, and cuts the rest mid-word. The custom door shipped a
     * 181-character description for months, because nothing measured one. */
    expect(tagTexts(document, "title")[0].length).toBeLessThan(60);
    expect(metaContents(document, "description")[0].length).toBeLessThan(160);
  });
}

test("no two routes state the same title or description", () => {
  /* One snippet on two pages leaves a crawler to choose which of them answers
   * the query, and it may choose neither. Every record is written by hand,
   * and copying a neighbour's line is the easy mistake. */
  const documents = indexableRoutes.map((route) => readExport(route.file));
  const titles = documents.map((document) => tagTexts(document, "title")[0]);
  const descriptions = documents.map((document) => metaContents(document, "description")[0]);

  expect(new Set(titles).size).toBe(titles.length);
  expect(new Set(descriptions).size).toBe(descriptions.length);
});

test("the sitemap lists exactly the indexable routes", () => {
  const listed = sitemapUrls();

  /* A crawler spends a fetch on every URL here, and misses any route we leave
   * out, so the list has to be the routes and nothing else. */
  expect(listed.toSorted()).toEqual(indexableRoutes.map((route) => route.url).toSorted());
});

test("every sitemap entry resolves to an emitted page", () => {
  for (const listed of sitemapUrls()) {
    const route = indexableRoutes.find((candidate) => candidate.url === listed);
    if (!route) {
      throw new Error(`the sitemap lists ${listed}, which is not a route this site has.`);
    }
    expect(readExport(route.file)).toStartWith("<!DOCTYPE html>");
  }
});

test("the robots file allows crawling and names the sitemap", () => {
  const robots = readExport("robots.txt");

  expect(robots).toMatch(/^User-Agent:\s*\*$/im);
  expect(robots).toMatch(/^Allow:\s*\/$/im);
  /* A blanket disallow would hide the whole site. */
  expect(robots).not.toMatch(/^Disallow:\s*\/$/im);
  expect(robots).toContain(`Sitemap: ${siteUrl}/sitemap.xml`);
});
