/*
 * The plain-text index an answer engine reads before it reads the pages,
 * following the llms.txt convention: an H1 naming the site, a blockquote
 * saying what the site is, then one Markdown link per page with the sentence
 * that page states about itself.
 *
 * Every line below the heading comes from the page records, which is the same
 * list the sitemap walks and the same list carrying the metadata that asks a
 * crawler to index a page. A page added to `indexablePages` is therefore
 * listed here in that one edit, and a page we do not ask anyone to index is
 * absent from both files without a second rule saying so.
 *
 * `output: "export"` renders a route handler once at build time and writes
 * its body to a file named after the route, so this one emits `out/llms.txt`.
 * The extension is the whole of the content type on a static host: the
 * `Content-Type` below serves `next dev` and `next start`, and the file the
 * export writes is served as text because it ends in `.txt`. That is why
 * `vercel.json` needs no header for it, while `/opengraph-image`, which the
 * framework writes with no extension at all, does.
 */
import { brand, homePage, indexablePages, pageUrl } from "../content";

export const dynamic = "force-static";

export function GET(): Response {
  const listing = indexablePages.map(
    (page) => `- [${page.title}](${pageUrl(page.path)}): ${page.description}`,
  );

  /* The home page's description is the site's own sentence, so the summary is
   * read off that record rather than written a second time here. */
  const body = [
    `# ${brand}`,
    "",
    `> ${homePage.description}`,
    "",
    "## Pages",
    "",
    ...listing,
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
