/*
 * What a person sees when someone drops a link to us in Slack, and what a
 * crawler is told to do with each page.
 *
 * A page that unfurls bare has no image. A page that says both `noindex` and
 * `index, follow` leaves the crawler to pick. Both faults are invisible in the
 * source and plain in the export, so every assertion here reads the export.
 */
import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { inflateSync } from "node:zlib";
import { expect, test } from "bun:test";
import {
  exportRoot,
  indexableRoutes,
  metaContents,
  notFoundFiles,
  readExport,
  siteUrl,
  documentTitles,
} from "./export";

/*
 * The file an image URL asks for. The Open Graph route carries no extension
 * and the file convention appends a cache-busting query, so the path is taken
 * from the URL and the query dropped.
 */
function imageFile(imageUrl: string): string {
  const path = new URL(imageUrl).pathname;
  return path.slice(1);
}

/*
 * The pixels of a PNG, as RGBA rows. The exported image is 8-bit RGB or RGBA
 * with no interlace, so this reads that and refuses anything else rather than
 * guessing. Enough of the format to ask what colour the picture is.
 */
type Pixels = { width: number; height: number; rgba: Uint8Array };

const pngSignature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

function decodePng(bytes: Buffer): Pixels {
  if (!pngSignature.every((byte, index) => bytes[index] === byte)) {
    throw new Error("The unfurl image does not start with the PNG signature.");
  }
  let width = 0;
  let height = 0;
  let colourType = 0;
  const data: Buffer[] = [];
  for (let at = 8; at < bytes.length; ) {
    const length = bytes.readUInt32BE(at);
    const type = bytes.toString("latin1", at + 4, at + 8);
    const body = bytes.subarray(at + 8, at + 8 + length);
    if (type === "IHDR") {
      width = body.readUInt32BE(0);
      height = body.readUInt32BE(4);
      colourType = body[9];
      if (body[8] !== 8 || body[12] !== 0 || (colourType !== 2 && colourType !== 6)) {
        throw new Error("The unfurl image is not 8-bit, non-interlaced RGB or RGBA.");
      }
    }
    if (type === "IDAT") data.push(body);
    at += 12 + length;
  }
  const channels = colourType === 6 ? 4 : 3;
  const stride = width * channels;
  const raw = inflateSync(Buffer.concat(data));
  const rows = new Uint8Array(height * stride);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    for (let x = 0; x < stride; x++) {
      const value = raw[y * (stride + 1) + 1 + x];
      const left = x >= channels ? rows[y * stride + x - channels] : 0;
      const up = y > 0 ? rows[(y - 1) * stride + x] : 0;
      const corner = x >= channels && y > 0 ? rows[(y - 1) * stride + x - channels] : 0;
      let predicted = 0;
      if (filter === 1) predicted = left;
      else if (filter === 2) predicted = up;
      else if (filter === 3) predicted = (left + up) >> 1;
      else if (filter === 4) {
        const estimate = left + up - corner;
        const toLeft = Math.abs(estimate - left);
        const toUp = Math.abs(estimate - up);
        const toCorner = Math.abs(estimate - corner);
        predicted = toLeft <= toUp && toLeft <= toCorner ? left : toUp <= toCorner ? up : corner;
      }
      rows[y * stride + x] = (value + predicted) & 0xff;
    }
  }
  const rgba = new Uint8Array(width * height * 4);
  for (let pixel = 0; pixel < width * height; pixel++) {
    for (let channel = 0; channel < 3; channel++) {
      rgba[pixel * 4 + channel] = rows[pixel * channels + channel];
    }
    rgba[pixel * 4 + 3] = channels === 4 ? rows[pixel * channels + 3] : 255;
  }
  return { width, height, rgba };
}

/* `#f8e9d2` as three channel values. */
function channels(hex: string): number[] {
  return [1, 3, 5].map((start) => Number.parseInt(hex.slice(start, start + 2), 16));
}

/* The share of the picture's pixels within a few steps of one colour. */
function shareOf(pixels: Pixels, hex: string): number {
  const [red, green, blue] = channels(hex);
  let near = 0;
  const count = pixels.width * pixels.height;
  for (let pixel = 0; pixel < count; pixel++) {
    const at = pixel * 4;
    if (
      Math.abs(pixels.rgba[at] - red) <= 6 &&
      Math.abs(pixels.rgba[at + 1] - green) <= 6 &&
      Math.abs(pixels.rgba[at + 2] - blue) <= 6
    ) {
      near++;
    }
  }
  return near / count;
}

/*
 * The picture every page unfurls with. Its URL carries a version query, so
 * the file is the URL's path with the query dropped.
 */
const unfurlImage = imageFile(metaContents(readExport(indexableRoutes[0].file), "og:image")[0]);

test("the unfurl image is a 1200 by 630 PNG", () => {
  /* The header in `vercel.json` says `image/png` for this file. A scraper that
   * receives other bytes under that type shows a broken card. */
  const pixels = decodePng(readFileSync(join(exportRoot, unfurlImage)));
  expect({ width: pixels.width, height: pixels.height }).toEqual({ width: 1200, height: 630 });
});

test("the unfurl image is set on the paper the site is set on", () => {
  /* A card that shows a white page links to a gold one: the reader sees two
   * different companies. The manifest states the paper colour the browser
   * chrome takes, so the picture is read against that. Most of the card is
   * bare paper; the type, the seal and the sun take the rest. */
  const manifest = JSON.parse(readExport("manifest.webmanifest")) as { background_color: string };
  const pixels = decodePng(readFileSync(join(exportRoot, unfurlImage)));
  expect(shareOf(pixels, manifest.background_color)).toBeGreaterThan(0.5);
});

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
    expect(metaContents(document, "og:title")).toEqual(documentTitles(document));
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
