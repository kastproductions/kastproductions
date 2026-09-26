/*
 * What a page tells a machine in its head, derived from that page's record:
 * the title and the description a search result prints, the canonical URL,
 * the picture a link unfurls with, and what we ask a crawler to do with the
 * page. None of it is a word a reader sees on the page, so none of it belongs
 * in `content.ts`, which holds the copy.
 *
 * Every page builds its `metadata` with `pageMetadata`, and states nothing
 * beside it. Next.js merges metadata shallowly, so a page that declares an
 * `openGraph` object of its own replaces the inherited one, the image with
 * it, and a page that says nothing about robots takes whatever the layout
 * says. The layout is the wrong place for both: the framework's not-found
 * route inherits from it, and that route has to say `noindex` and nothing
 * else.
 */
import type { Metadata } from "next";
import { brand, homePage, language, type PageRecord } from "./content";

/*
 * The unfurl image, named by the route that renders it.
 *
 * The URL carries no cache-busting query, while the framework's own URL for
 * the same file does: `/opengraph-image?e07326629fdb9f68`. Slack, X and
 * Facebook key their unfurl caches on the image URL and hold it for months, so
 * a redrawn image under this URL keeps unfurling the old picture. Whoever
 * redesigns `src/app/opengraph-image.tsx` bumps the `v` in this path in the
 * same commit, and every scraper then fetches the new picture.
 *
 * The picture is the same on every page, and it states the home page's
 * heading, but its `alt` names the page being shared: a reader who hears the
 * card read out hears which page the link goes to.
 */
const openGraphImage = {
  url: "/opengraph-image?v=3",
  width: 1200,
  height: 630,
  type: "image/png",
} as const;

/* What we ask a crawler to do with a page we publish. */
const indexedRobots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
} as const;

/*
 * The title a page states, which is the page's own title with the brand after
 * it, the way a search result reads. The home page states its title whole,
 * brand and all, because it is the site's title as well.
 */
function headTitle(page: PageRecord): string {
  return page.path === homePage.path ? page.title : `${page.title} | ${brand}`;
}

/*
 * Everything one page tells a machine, from its record. A page assigns this
 * to its `metadata` and writes nothing else: the title, the description, the
 * canonical URL, the indexing directive and every unfurl field follow the
 * record, so a page cannot state one title to a search engine and another to
 * a scraper.
 *
 * The title is absolute rather than a template the layout fills in, because
 * the home page's title already names the brand and a template would name it
 * twice. One rule, `headTitle`, then answers for every page.
 */
export function pageMetadata(page: PageRecord): Metadata {
  const title = headTitle(page);
  return {
    title: { absolute: title },
    description: page.description,
    alternates: { canonical: page.path },
    robots: indexedRobots,
    openGraph: {
      images: [{ ...openGraphImage, alt: title }],
      type: "website",
      url: page.path,
      siteName: brand,
      /* Open Graph spells a locale with an underscore: en_GB, not en-GB. */
      locale: language.replace("-", "_"),
      title,
      description: page.description,
    },
  };
}
