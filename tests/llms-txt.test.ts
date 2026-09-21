/*
 * The plain-text index an answer engine reads. It is derived from the page
 * records, so the fault worth catching is a page that the sitemap lists and
 * this file leaves out: a reader of one file and not the other then sees a
 * different site.
 *
 * Everything here reads the emitted export.
 */
import { expect, test } from "bun:test";
import { indexableRoutes, readExport, sitemapUrls } from "./export";

test("llms.txt lists exactly the URLs the sitemap lists", () => {
  const sitemap = sitemapUrls();

  /* Every absolute URL the file states. The convention writes a page as a
   * Markdown link, so the URL sits in the parentheses. */
  const listed = [...readExport("llms.txt").matchAll(/\]\((https:\/\/[^)\s]+)\)/g)].map(
    ([, url]) => url,
  );

  /* A URL the sitemap has and this file misses is a page an answer engine
   * never learns about. A URL this file has and the sitemap does not is a
   * page we asked nobody to index. */
  expect(listed.toSorted()).toEqual(sitemap.toSorted());
});

test("llms.txt states each page's own description beside its URL", () => {
  const lines = readExport("llms.txt").split("\n");

  for (const route of indexableRoutes) {
    const line = lines.find((candidate) => candidate.includes(`(${route.url})`));
    if (line === undefined) {
      throw new Error(`llms.txt states no line for ${route.url}.`);
    }

    /* The record is the one place a page's description is written, so the
     * file is read back against it rather than against a copy of the
     * words. */
    expect(line).toContain(route.title);
    expect(line).toContain(route.description);
  }
});

test("llms.txt is plain text in the shape the convention describes", () => {
  const llms = readExport("llms.txt");
  const [heading, ...rest] = llms.split("\n");

  /* The convention opens with an H1 naming the site, and the line after it
   * says what the site is. An answer engine that finds neither has nothing
   * to read the page list against. */
  expect(heading).toMatch(/^# \S/);
  expect(rest.find((line) => line !== "")).toMatch(/^> \S/);

  /* A tag anywhere in the file means the build wrote a rendered page under
   * this name instead of the handler's text, and no answer engine reads
   * that. */
  expect(llms).not.toMatch(/<[a-z!][^>]*>/i);
});
