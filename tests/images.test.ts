/*
 * Whether every image on the site reaches a reader.
 *
 * An image a crawler, a screen reader or a slow phone gets wrong fails without
 * a word in the source. An `img` with no alt text is a hole to a screen reader
 * and to image search. An `img` with no width or height makes the page jump
 * when the file arrives. A `src` that points at a file the export does not
 * hold is a broken image on the live site. So this reads every page the build
 * wrote and every `img` tag on it, the reference portraits included.
 *
 * A drawing a page marks as an image (`role="img"`) has to carry a name, or a
 * screen reader says "image" and nothing more. It also has to set a
 * `viewBox`, because a drawing with no viewBox cannot scale to its column.
 * The site draws no pictures today (ADR-0007), so this holds a drawing that
 * comes back to the same rule.
 */
import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { expect, test } from "bun:test";
import { decodeEntities, exportRoot, readExport } from "./export";

/* Every HTML file the build wrote, relative to the export root. */
function htmlFiles(directory = exportRoot): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      return htmlFiles(path);
    }
    return entry.name.endsWith(".html") ? [relative(exportRoot, path)] : [];
  });
}

/* The attributes of one tag, decoded the way a browser reads them. */
function attributes(tag: string): Record<string, string> {
  const found: Record<string, string> = {};
  for (const [, name, value] of tag.matchAll(/([\w:.-]+)="([^"]*)"/g)) {
    found[name] = decodeEntities(value);
  }
  return found;
}

/* Whether a root-relative path names a file in the export. */
function inExport(src: string): boolean {
  try {
    return statSync(join(exportRoot, decodeURI(src.split(/[?#]/)[0]))).isFile();
  } catch {
    return false;
  }
}

const pages = htmlFiles();

test("the export holds pages to read", () => {
  /* An empty export would pass every check below without reading a tag. */
  expect(pages.length).toBeGreaterThan(0);
});

for (const file of pages) {
  const images = [...readExport(file).matchAll(/<img\b[^>]*>/g)].map(([tag]) => attributes(tag));

  for (const [index, image] of images.entries()) {
    const name = `${file} img ${index + 1} (${image.src ?? "no src"})`;

    test(`${name} has alt text, a width and a height`, () => {
      expect(image.alt?.trim() ?? "").not.toBe("");
      expect(Number(image.width)).toBeGreaterThan(0);
      expect(Number(image.height)).toBeGreaterThan(0);
    });

    test(`${name} points at a file in the export`, () => {
      expect(image.src ?? "").toStartWith("/");
      expect(inExport(image.src)).toBe(true);
    });
  }
}

/*
 * The accessible name of an SVG drawing, the way a browser computes it for
 * `role="img"`: `aria-labelledby` names the elements whose text is the name,
 * and `aria-label` gives the name itself. A `<title>` that no attribute points
 * at is a tooltip in some readers and silence in others, so it does not count.
 */
function svgName(document: string, svg: Record<string, string>): string {
  if (svg["aria-labelledby"]) {
    return svg["aria-labelledby"]
      .split(/\s+/)
      .map((id) => {
        const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const found = new RegExp(`<(\\w+)\\b[^>]*\\bid="${escaped}"[^>]*>([\\s\\S]*?)</\\1>`).exec(document);
        return found ? decodeEntities(found[2].replace(/<[^>]*>/g, "")) : "";
      })
      .join(" ")
      .trim();
  }
  return svg["aria-label"]?.trim() ?? "";
}

for (const file of pages) {
  const document = readExport(file);
  const drawings = [...document.matchAll(/<svg\b[^>]*>/g)]
    .map(([tag]) => attributes(tag))
    .filter((svg) => svg.role === "img");

  for (const [index, svg] of drawings.entries()) {
    const name = `${file} drawing ${index + 1}`;

    test(`${name} has an accessible name and a viewBox`, () => {
      expect(svgName(document, svg)).not.toBe("");
      expect(svg.viewBox ?? "").toMatch(/^[\d.]+ [\d.]+ [\d.]+ [\d.]+$/);
    });
  }
}
