/*
 * What a person sees when someone drops a link to us in Slack, and what a
 * crawler is told to do with each page.
 *
 * A page that unfurls bare has no image. A page that says both `noindex` and
 * `index, follow` leaves the crawler to pick. Both faults are invisible in the
 * source and plain in the export, so every assertion here reads the export.
 */
import { statSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "bun:test";
import {
  exportRoot,
  indexableRoutes,
  metaContents,
  readExport,
  siteUrl,
  tagTexts,
} from "./export";

/*
 * The two files one 404 is written to. `out/404.html` is what a static host
 * serves; `out/_not-found.html` is the route file the build also emits. They
 * are byte-identical, and both are cheap to check.
 */
const notFoundFiles = ["404.html", "_not-found.html"];

/*
 * The file an image URL asks for. The Open Graph route carries no extension
 * and the file convention appends a cache-busting query, so the path is taken
 * from the URL and the query dropped.
 */
function imageFile(imageUrl: string): string {
  const path = new URL(imageUrl).pathname;
  return path.slice(1);
}

for (const route of indexableRoutes) {
  test(`${route.path} unfurls with an image that exists`, () => {
    const document = readExport(route.file);

    const open = metaContents(document, "og:image");
    const twitter = metaContents(document, "twitter:image");

    /* One each: a page with none unfurls bare, and a second confuses the
     * scraper about which one to show. */
    expect(open).toHaveLength(1);
    expect(twitter).toHaveLength(1);

    for (const imageUrl of [...open, ...twitter]) {
      /* A scraper never sees our host, so a relative URL is a dead image. */
      expect(imageUrl.startsWith(`${siteUrl}/`)).toBe(true);

      const file = imageFile(imageUrl);
      let bytes = 0;
      try {
        bytes = statSync(join(exportRoot, file)).size;
      } catch {
        throw new Error(`${route.path} points at ${imageUrl}, which the export does not hold.`);
      }
      expect(bytes).toBeGreaterThan(0);
    }
  });

  test(`${route.path} unfurls with its own title and description`, () => {
    const document = readExport(route.file);

    /* Next.js merges metadata shallowly, so a page that declares an
     * `openGraph` object of its own and forgets a field unfurls with the
     * field missing rather than with the one the layout states. Both come
     * from the page record, so both are read back against it. */
    expect(metaContents(document, "og:title")).toEqual(tagTexts(document, "title"));
    expect(metaContents(document, "og:description")).toEqual([route.description]);
  });

  test(`${route.path} asks to be indexed, once`, () => {
    /* The directive lives in each page's own metadata, because the layout
     * hands its metadata to the not-found route as well. A page that loses it
     * is left to the crawler's own judgement. */
    const directives = metaContents(readExport(route.file), "robots");

    expect(directives).toHaveLength(1);
    /* A directive is a comma-separated list, so each one is read whole:
     * `noindex` contains the four letters of `index` and means the opposite. */
    const stated = directives[0].split(/\s*,\s*/);
    expect(stated).toContain("index");
    expect(stated).toContain("follow");
    expect(stated).not.toContain("noindex");
    expect(stated).not.toContain("none");
  });
}

for (const file of notFoundFiles) {
  test(`${file} says noindex and nothing against it`, () => {
    const document = readExport(file);

    /* The framework writes this one. Anything else beside it is a page we
     * publish contradicting a page that does not exist. */
    expect(metaContents(document, "robots")).toEqual(["noindex"]);
    /* Google reads its own name in preference to `robots`. */
    expect(metaContents(document, "googlebot")).toEqual([]);
  });
}
