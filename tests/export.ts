/*
 * Shared helpers for the suite. The one seam is the built export in `out/`:
 * every assertion reads a file the build emitted, so the suite fails on what a
 * crawler sees and not on how we wrote it. No page component, no metadata
 * object and no route handler is imported here.
 *
 * The content module is the exception, and it is imported for one reason: the
 * route list has to follow the same two lists `src/app/sitemap.ts` follows, so
 * that a page or a product added there is covered with no test edit.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { indexablePages, type PageRecord, pageUrl, siteUrl } from "../src/app/content";

/* The directory `output: "export"` writes. Run a build before the suite. */
export const exportRoot = join(import.meta.dir, "..", "out");

export { siteUrl };

/* A route the suite reads: the record the content module holds for that page,
 * and where the export puts it. */
export type Route = PageRecord & {
  /* The absolute URL the page must name as its canonical. */
  url: string;
  /* The file the build emits for it, relative to the export root. */
  file: string;
};

/*
 * A route, from its page record. The URL follows `pageUrl`, the one rule the
 * canonical, the sitemap and the graph all follow, so the suite never argues
 * with the export about how a page's URL is spelled. The file is the export's
 * own naming: the home page is `index.html`, and every other route maps
 * straight across.
 */
function route(page: PageRecord): Route {
  return {
    ...page,
    url: pageUrl(page.path),
    file: page.path === "/" ? "index.html" : `${page.path.slice(1)}.html`,
  };
}

/*
 * The routes a crawler should index: the pages we write by hand, then one page
 * per product in the catalogue. That is `indexablePages`, the list
 * `src/app/sitemap.ts` walks, so a written page or a product added to the
 * content module is checked here, canonical, title, description, unfurl image
 * and graph, with no edit.
 */
export const indexableRoutes: Route[] = indexablePages.map(route);

/*
 * The two files one 404 is written to. `out/404.html` is what a static host
 * serves; `out/_not-found.html` is the route file the build also emits. They
 * are byte-identical, and both are cheap to check.
 */
export const notFoundFiles = ["404.html", "_not-found.html"];

/*
 * Reads a file from the export. A missing file throws, because a route the
 * build did not emit is the fault this suite exists to catch, never a skip.
 */
export function readExport(file: string): string {
  try {
    return readFileSync(join(exportRoot, file), "utf8");
  } catch {
    throw new Error(
      `${file} is missing from the export. Build first with \`bun run build\`; a route that emits no file is a failure.`,
    );
  }
}

/* React escapes these five when it writes an attribute or a text node. */
const entities: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  "#x27": "'",
  "#39": "'",
};

export function decodeEntities(text: string): string {
  return text.replace(/&(amp|lt|gt|quot|#x27|#39);/g, (_, name: string) => entities[name]);
}

function attributes(tag: string): Record<string, string> {
  const found: Record<string, string> = {};
  for (const [, name, value] of tag.matchAll(/([\w:.-]+)="([^"]*)"/g)) {
    found[name] = decodeEntities(value);
  }
  return found;
}

/*
 * Every `content` a document gives for one meta key, in document order. Open
 * Graph uses `property`, everything else uses `name`; both are read, because a
 * crawler reads the tag rather than the attribute we chose.
 *
 * A list rather than a single value, so a test can say how many it expects.
 * Two canonicals or two robots directives is itself a fault.
 */
export function metaContents(document: string, key: string): string[] {
  return [...document.matchAll(/<meta\b[^>]*>/g)]
    .map(([tag]) => attributes(tag))
    .filter((attrs) => attrs.name === key || attrs.property === key)
    .map((attrs) => attrs.content ?? "");
}

/* Every `href` a document gives for one link relation, in document order. */
export function linkHrefs(document: string, rel: string): string[] {
  return [...document.matchAll(/<link\b[^>]*>/g)]
    .map(([tag]) => attributes(tag))
    .filter((attrs) => attrs.rel === rel)
    .map((attrs) => attrs.href ?? "");
}

/*
 * Every `<script>` a document carries, in document order: the attributes of
 * the tag, and the code between the tags. A tag that loads a file has a `src`
 * and an empty body; a tag that carries code has a body and no `src`. Both
 * matter here, so both are read, and a boolean attribute such as `defer`
 * reads as an empty string.
 */
export type ScriptTag = { attributes: Record<string, string>; body: string };

export function scriptTags(document: string): ScriptTag[] {
  return [...document.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].map(([, tag, body]) => ({
    attributes: attributes(tag),
    body,
  }));
}

/*
 * The inner text of every occurrence of one tag. Serves `<title>` and `<h1>`
 * in a page and `<loc>` in the sitemap. The whole document is parsed, not just
 * the head: the JSON-LD script sits in the body.
 */
export function tagTexts(document: string, tag: string): string[] {
  const pattern = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, "g");
  return [...document.matchAll(pattern)].map(([, text]) => decodeEntities(text.trim()));
}

/* A node in a JSON-LD graph, read as free-form data: schema.org vocabulary is
 * wider than a type written here would be. */
export type GraphNode = Record<string, unknown>;

/*
 * Every JSON-LD payload in a document, parsed. The script sits in the body, so
 * the whole document is read. A payload that does not parse is the fault this
 * reader exists to catch: a crawler drops the graph without a word.
 */
export function jsonLdPayloads(document: string): GraphNode[] {
  const scripts = document.matchAll(
    /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  );
  return [...scripts].map(([, json]) => {
    try {
      return JSON.parse(json) as GraphNode;
    } catch (error) {
      throw new Error(`a JSON-LD payload does not parse: ${String(error)}`);
    }
  });
}

/* Every node a document declares, across all of its payloads. */
export function graphNodes(document: string): GraphNode[] {
  return jsonLdPayloads(document).flatMap((payload) => (payload["@graph"] as GraphNode[]) ?? []);
}

/* Every node of one `@type`. A node states one type or several, so both are
 * read as a list. */
export function nodesOfType(document: string, type: string): GraphNode[] {
  return graphNodes(document).filter((node) => [node["@type"]].flat().includes(type));
}
