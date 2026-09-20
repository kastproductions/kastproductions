import type { MetadataRoute } from "next";
import { indexablePages, pageUrl } from "./content";

export const dynamic = "force-static";

/*
 * One entry per page a crawler should index: the pages we write by hand, then
 * one page per product in the catalogue. That is `indexablePages` in the
 * content module, so a page added to a record there is listed here with no
 * edit.
 *
 * An entry states the date that page's copy last changed, which the page's
 * own record holds. The build clock never touches it: a date stamped at build
 * time tells a crawler that every page changed on every deploy, and a crawler
 * that learns our dates are worthless stops recrawling on them.
 *
 * No `changeFrequency` and no `priority`. Google ignores both.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePages.map((page) => ({ url: pageUrl(page.path), lastModified: page.date }));
}
