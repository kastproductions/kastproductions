import type { MetadataRoute } from "next";
import { pageUrl, products, writtenPages } from "./content";

export const dynamic = "force-static";

/*
 * One entry per route: the pages we write by hand, then one page per product
 * in the catalogue. Both lists live in the content module, so a page or a
 * product added there is listed here with no edit.
 *
 * An entry states the date that page's copy last changed, which the content
 * module holds beside the copy. The build clock never touches it: a date
 * stamped at build time tells a crawler that every page changed on every
 * deploy, and a crawler that learns our dates are worthless stops recrawling
 * on them.
 *
 * No `changeFrequency` and no `priority`. Google ignores both.
 */
function entry(path: string, date: string): MetadataRoute.Sitemap[number] {
  return { url: pageUrl(path), lastModified: date };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...writtenPages.map((page) => entry(page.path, page.date)),
    ...products.map((product) => entry(`/${product.slug}`, product.date)),
  ];
}
