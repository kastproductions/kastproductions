/*
 * What a page tells a machine in its head: the picture a link unfurls with,
 * and what we ask a crawler to do with the page. Neither is a word a reader
 * sees, so neither belongs in `content.ts`, which holds the copy and changes
 * when the copy changes.
 *
 * Every written page spreads both into its own `metadata`. Next.js merges
 * metadata shallowly, so a page that declares an `openGraph` object of its own
 * replaces the inherited one, the image with it, and a page that says nothing
 * about robots takes whatever the layout says. The layout is the wrong place
 * for both: the framework's not-found route inherits from it, and that route
 * has to say `noindex` and nothing else.
 */
import { title } from "./content";

/*
 * The unfurl image, named by the route that renders it.
 *
 * The URL carries no cache-busting query, while the framework's own URL for
 * the same file does: `/opengraph-image?e07326629fdb9f68`. Slack, X and
 * Facebook key their unfurl caches on the image URL and hold it for months, so
 * a redrawn image under this URL keeps unfurling the old picture. Whoever
 * redesigns `src/app/opengraph-image.tsx` changes this path in the same
 * commit, `/opengraph-image?v=2` being enough, and every scraper then fetches
 * the new picture.
 */
export const openGraphImage = {
  images: [
    { url: "/opengraph-image?v=2", width: 1200, height: 630, alt: title, type: "image/png" },
  ],
};

/* What we ask a crawler to do with a page we publish. */
export const indexedRobots = {
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
