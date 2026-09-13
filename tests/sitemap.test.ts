/*
 * What the sitemap and the robots file tell a crawler about the site as a
 * whole. `head.test.ts` already checks which routes the sitemap lists and that
 * robots allows crawling and names the sitemap; this file checks that what
 * those two files say is true.
 *
 * Everything here reads the emitted export.
 */
import { expect, test } from "bun:test";
import { products, writtenPages } from "../src/app/content";
import { readExport, siteUrl, tagTexts } from "./export";

type Entry = { url: string; lastModified: string | undefined };

/* Every `<url>` block of the sitemap, in the order the file states them. A
 * block with no `<lastmod>` yields no date, which is a fact the suite checks
 * rather than a gap in the parsing. */
function sitemapEntries(): Entry[] {
  return [...readExport("sitemap.xml").matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => ({
    url: tagTexts(block, "loc")[0],
    lastModified: tagTexts(block, "lastmod")[0],
  }));
}

/* The date the content module holds for a URL, and `undefined` where it holds
 * none. A written page and a product are both looked up by their own record,
 * so a page or a product added to the content module is covered here with no
 * test edit. */
function contentDate(url: string): string | undefined {
  const path = url === siteUrl ? "/" : url.slice(siteUrl.length);
  const product = products.find((candidate) => path === `/${candidate.slug}`);
  return product ? product.date : writtenPages.find((page) => page.path === path)?.date;
}

test("every sitemap entry states the date the content module holds, or no date", () => {
  const stated = sitemapEntries();
  const owned = stated.map(({ url }) => ({ url, lastModified: contentDate(url) }));

  /* A date the content module does not hold is a date nobody maintains. */
  expect(stated).toEqual(owned);
});

test("no sitemap entry states a build time", () => {
  const sitemap = readExport("sitemap.xml");

  /* A build stamp is a clock reading, so the file carries no time of day. Were
   * one there, every deploy would tell a crawler that every page changed, and
   * a crawler that learns our dates are worthless stops reading them. */
  expect(sitemap).not.toMatch(/\d:\d/);

  for (const entry of sitemapEntries()) {
    if (entry.lastModified !== undefined) {
      expect(entry.lastModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  }
});

test("the sitemap states no changefreq and no priority", () => {
  const sitemap = readExport("sitemap.xml");

  /* Google reads neither. Both only invite an argument with a crawler about
   * numbers we made up. */
  expect(sitemap).not.toContain("<changefreq>");
  expect(sitemap).not.toContain("<priority>");
});

test("the robots file states no Host directive", () => {
  /* Only Yandex reads it, and it names a host the canonical already names. */
  expect(readExport("robots.txt")).not.toMatch(/^Host:/im);
});
