/*
 * What a crawler reads first: one heading, a canonical URL that points at the
 * page itself, a title and a description, on every route we ask to be indexed.
 * Then the two files that tell a crawler which routes exist.
 *
 * Every assertion reads the emitted export. Nothing here pins page copy.
 */
import { expect, test } from "bun:test";
import { indexableRoutes, linkHrefs, metaContents, readExport, siteUrl, tagTexts } from "./export";

for (const route of indexableRoutes) {
  test(`${route.path} emits one h1`, () => {
    /* More than one, and a crawler has to guess what the page is about. */
    expect(tagTexts(readExport(route.file), "h1")).toHaveLength(1);
  });

  test(`${route.path} emits a canonical URL for its own path`, () => {
    /* A canonical naming another page hands that page our ranking. */
    expect(linkHrefs(readExport(route.file), "canonical")).toEqual([route.url]);
  });

  test(`${route.path} emits one title and one description`, () => {
    const document = readExport(route.file);

    const titles = tagTexts(document, "title");
    expect(titles).toHaveLength(1);
    expect(titles[0]).not.toBe("");

    /* Both are the search result a person decides to click on. */
    const descriptions = metaContents(document, "description");
    expect(descriptions).toHaveLength(1);
    expect(descriptions[0]).not.toBe("");
  });
}

test("the sitemap lists exactly the indexable routes", () => {
  const listed = tagTexts(readExport("sitemap.xml"), "loc");

  /* A crawler spends a fetch on every URL here, and misses any route we leave
   * out, so the list has to be the routes and nothing else. */
  expect(listed.toSorted()).toEqual(indexableRoutes.map((route) => route.url).toSorted());
});

test("every sitemap entry resolves to an emitted page", () => {
  for (const listed of tagTexts(readExport("sitemap.xml"), "loc")) {
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
