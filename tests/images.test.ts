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
 * The scenes are the illustrations the content module lists for the pages to
 * place. A scene that no page places yet is still a file the site ships, so
 * each one is checked where it lands in the export: it is a webp, it is the
 * size the content module says it renders at, and it stays inside the weight
 * a first screen can afford.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { expect, test } from "bun:test";
import { scenes } from "../src/app/content";
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
 * The pixel size a webp file declares, read from its header. The three
 * encodings put it in three places: lossy (`VP8 `), lossless (`VP8L`) and
 * extended (`VP8X`, which carries alpha or animation).
 */
function webpSize(bytes: Buffer): { width: number; height: number } {
  if (bytes.toString("ascii", 0, 4) !== "RIFF" || bytes.toString("ascii", 8, 12) !== "WEBP") {
    throw new Error("the file is not a webp.");
  }
  const chunk = bytes.toString("ascii", 12, 16);
  if (chunk === "VP8 ") {
    return { width: bytes.readUInt16LE(26) & 0x3fff, height: bytes.readUInt16LE(28) & 0x3fff };
  }
  if (chunk === "VP8L") {
    const bits = bytes.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (chunk === "VP8X") {
    return { width: bytes.readUIntLE(24, 3) + 1, height: bytes.readUIntLE(27, 3) + 1 };
  }
  throw new Error(`the webp has an unknown first chunk, ${chunk}.`);
}

/* The weight each scene may have. The hero paints on the first screen, so it
 * gets more room than a scene a reader scrolls to. */
const kilobyte = 1024;
const budget = (key: string) => (key === "hero" ? 250 : 150) * kilobyte;

for (const [key, scene] of Object.entries(scenes)) {
  test(`the ${key} scene ships as a webp at the size it renders at`, () => {
    expect(scene.src).toStartWith("/");
    expect(scene.src).toEndWith(".webp");
    expect(inExport(scene.src)).toBe(true);
    const bytes = readFileSync(join(exportRoot, scene.src));
    expect(webpSize(bytes)).toEqual({ width: scene.width, height: scene.height });
    expect(bytes.length).toBeLessThanOrEqual(budget(key));
  });

  test(`the ${key} scene has alt text that describes it`, () => {
    /* A sentence, not a label: a screen reader reads it in place of the
     * picture. */
    expect(scene.alt.trim().split(/\s+/).length).toBeGreaterThanOrEqual(8);
  });
}
