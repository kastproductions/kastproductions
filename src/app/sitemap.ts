import type { MetadataRoute } from "next";
import { products, routeDates, siteUrl } from "./content";

export const dynamic = "force-static";

/*
 * One entry per route. It states the date the content module holds for that
 * route, and states nothing when the module holds none. The build clock never
 * touches it: a date stamped at build time tells a crawler that every page
 * changed on every deploy, and a crawler that learns our dates are worthless
 * stops recrawling on them.
 *
 * No `changeFrequency` and no `priority`. Google ignores both.
 */
function entry(path: string, date: string | undefined): MetadataRoute.Sitemap[number] {
  const url = path === "/" ? siteUrl : `${siteUrl}${path}`;
  return date ? { url, lastModified: date } : { url };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry("/", routeDates["/"]),
    entry("/custom", routeDates["/custom"]),
    /* A product enters the sitemap when it enters the catalogue, and brings
     * its own date with it. */
    ...products.map((product) => entry(`/${product.slug}`, product.date)),
  ];
}
