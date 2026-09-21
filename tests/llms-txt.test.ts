/*
 * The plain-text index an answer engine reads. It is derived from the page
 * records, so the fault worth catching is a page that the sitemap lists and
 * this file leaves out: a reader of one file and not the other then sees a
 * different site.
 *
 * Everything here reads the emitted export.
 */
import { expect, test } from "bun:test";
import { indexableRoutes, readExport, tagTexts } from "./export";

test("llms.txt lists exactly the URLs the sitemap lists", () => {
  const sitemap = tagTexts(readExport("sitemap.xml"), "loc");

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

  /* The convention opens with one H1 naming the site, then a blockquote
   * saying what the site is. A file that opens with markup is a page the
   * build rendered by mistake, and no answer engine reads it. */
  expect(llms.split("\n")[0]).toMatch(/^# \S/);
  expect(llms).toMatch(/^> \S/m);
  expect(llms).not.toMatch(/<[a-z!][^>]*>/i);
});
