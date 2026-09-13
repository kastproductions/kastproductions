/*
 * Shared helpers for the suite. The one seam is the built export in `out/`:
 * every assertion reads a file the build emitted, so the suite fails on what a
 * crawler sees and not on how we wrote it. No page component, no metadata
 * object and no route handler is imported here.
 *
 * The content module is the exception, and it is imported for one reason: the
 * route list has to follow the same catalogue `src/app/sitemap.ts` follows, so
 * that a product entering the catalogue is covered with no test edit.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { products, siteUrl } from "../src/app/content";

/* The directory `output: "export"` writes. Run a build before the suite. */
export const exportRoot = join(import.meta.dir, "..", "out");

export { siteUrl };

export type Route = {
  /* The path a crawler asks for, as the canonical URL states it. */
  path: string;
  /* The absolute URL the page must name as its canonical. */
  url: string;
  /* The file the build emits for it, relative to the export root. */
  file: string;
};

/*
 * The home page's canonical is the bare site URL, with no trailing slash,
 * while its file is `index.html`. Every other route maps straight across.
 */
function route(path: string): Route {
  return {
    path,
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    file: path === "/" ? "index.html" : `${path.slice(1)}.html`,
  };
}

/*
 * The routes a crawler should index. The two written pages, then one page per
 * product in the catalogue. This is the list `src/app/sitemap.ts` states, and
 * both follow from `products`.
 */
export const indexableRoutes: Route[] = [
  route("/"),
  route("/custom"),
  ...products.map((product) => route(`/${product.slug}`)),
];

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
 * The inner text of every occurrence of one tag. Serves `<title>` and `<h1>`
 * in a page and `<loc>` in the sitemap. The whole document is parsed, not just
 * the head: the JSON-LD script sits in the body.
 */
export function tagTexts(document: string, tag: string): string[] {
  const pattern = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, "g");
  return [...document.matchAll(pattern)].map(([, text]) => decodeEntities(text.trim()));
}
