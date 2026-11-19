/*
 * The visual world every page wears, as the browser receives it.
 *
 * ADR-0006 sets one light theme. A reader whose system asks for dark mode gets
 * the same gold paper, so the stylesheet the export ships must hold no second
 * theme: no `dark` class, no dark colour scheme, and no rule that answers a
 * dark system preference. The three families load from the export itself,
 * because a request to Google at runtime is a request a reader did not agree
 * to, and the body face must carry the Latin Extended letters in the names the
 * site prints.
 *
 * Every assertion reads the emitted export: the HTML of every page and the
 * stylesheets that HTML links.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "bun:test";
import { references } from "../src/app/content";
import { everyPage, exportRoot, linkHrefs, metaContents, readExport, siteUrl } from "./export";

/* Every stylesheet any page links, read once. A page that links none is a
 * page with no world, which is a failure. */
function stylesheets(): Map<string, string> {
  const sheets = new Map<string, string>();
  for (const file of everyPage) {
    const hrefs = linkHrefs(readExport(file), "stylesheet");
    if (hrefs.length === 0) {
      throw new Error(`${file} links no stylesheet.`);
    }
    for (const href of hrefs) {
      if (!sheets.has(href)) sheets.set(href, readExport(href.replace(/^\//, "")));
    }
  }
  return sheets;
}

const sheets = stylesheets();
const css = [...sheets.values()].join("\n");

test("the stylesheet holds no dark theme", () => {
  /* The class that turned the variables over, and the variant built on it. */
  expect(css).not.toMatch(/\.dark\b/);
  /* A colour scheme of dark tells the browser to draw its own controls and
   * scrollbars dark on gold paper. */
  expect(css).not.toMatch(/color-scheme:\s*dark/);
  /* A rule that answers a dark system preference is a second theme. */
  expect(css).not.toMatch(/prefers-color-scheme:\s*dark/);
});

for (const file of everyPage) {
  test(`${file} sets no element in the dark theme`, () => {
    const classes = [...readExport(file).matchAll(/\bclass="([^"]*)"/g)].flatMap(([, value]) =>
      value.split(/\s+/),
    );
    expect(classes).not.toContain("dark");
  });
}

/* One @font-face rule as the stylesheet states it. */
type FontFace = { family: string; weight: string; src: string[]; ranges: [number, number][] };

/* Every @font-face in every stylesheet, with each `src` resolved against the
 * stylesheet that states it, the way a browser resolves it. */
function fontFaces(): FontFace[] {
  return [...sheets].flatMap(([href, sheet]) => [...sheet.matchAll(/@font-face\s*{([^}]*)}/g)].map(([, body]) => {
    const value = (name: string) =>
      new RegExp(`${name}:\\s*([^;]+)`).exec(body)?.[1].trim().replace(/^["']|["']$/g, "") ?? "";
    const ranges = value("unicode-range")
      .split(",")
      .filter(Boolean)
      .map((range): [number, number] => {
        const [start, end] = range.trim().replace(/^U\+/i, "").split("-");
        return [parseInt(start, 16), parseInt(end ?? start, 16)];
      });
    return {
      family: value("font-family"),
      weight: value("font-weight"),
      src: [...body.matchAll(/url\(([^)]+)\)/g)].map(([, url]) => {
        const resolved = new URL(url.replace(/^["']|["']$/g, ""), `${siteUrl}${href}`);
        return resolved.origin === siteUrl ? resolved.pathname : resolved.href;
      }),
      ranges,
    };
  }));
}

const faces = fontFaces();

for (const family of ["Chakra Petch", "Zen Old Mincho", "Azeret Mono"]) {
  test(`${family} loads from the export`, () => {
    const own = faces.filter((face) => face.family === family);
    expect(own.length).toBeGreaterThan(0);
    for (const face of own) {
      for (const src of face.src) {
        /* A file the export holds, never a URL on another host. */
        expect(src).toStartWith("/");
        expect(existsSync(join(exportRoot, decodeURIComponent(src)))).toBe(true);
      }
    }
  });
}

test("no page and no stylesheet asks Google for a font", () => {
  for (const file of everyPage) {
    expect(readExport(file)).not.toMatch(/fonts\.(googleapis|gstatic)\.com/);
  }
  expect(css).not.toMatch(/fonts\.(googleapis|gstatic)\.com/);
});

test("the body face carries every letter of every reference's name", () => {
  /* The regular weight of the body face is the one a name in running text is
   * set in. A letter outside every range it states falls to another face. */
  const regular = faces.filter((face) => face.family === "Zen Old Mincho" && face.weight === "400");
  const covered = (code: number) =>
    regular.some((face) => face.ranges.some(([start, end]) => code >= start && code <= end));
  for (const { name } of references) {
    for (const letter of name) {
      expect({ name, letter, covered: covered(letter.codePointAt(0) ?? 0) }).toEqual({
        name,
        letter,
        covered: true,
      });
    }
  }
});

test("the browser chrome takes the paper colour the manifest states", () => {
  /* A phone tints its toolbar with the theme colour and paints the splash
   * screen with the manifest's colours. Three places, one paper. */
  const manifest = JSON.parse(readExport("manifest.webmanifest")) as {
    theme_color: string;
    background_color: string;
  };
  for (const file of everyPage) {
    expect(metaContents(readExport(file), "theme-color")).toEqual([manifest.theme_color]);
  }
  expect(manifest.background_color).toBe(manifest.theme_color);
  /* White was the old paper; the gold paper is not white. */
  expect(manifest.theme_color.toLowerCase()).not.toBe("#ffffff");
});

/* A colour written straight into a class or a style, rather than read from a
 * theme token: a hex value, or a colour function, in an arbitrary value. */
const statedColour = /#[0-9a-f]{3,8}\b|\b(rgb|rgba|hsl|hsla|oklch|oklab|lab|lch|color-mix)\(/i;

for (const file of everyPage) {
  test(`${file} states no colour outside the theme tokens`, () => {
    /* An ornament is read like the rest of the page: an SVG paints with a
     * token class or `currentColor`, so a fill, a stroke or a stop colour
     * written as a value is a colour outside the tokens. */
    const document = readExport(file);
    const painted = [...document.matchAll(/\b(fill|stroke|stop-color|color)="([^"]*)"/g)].map(
      ([, , value]) => value,
    );
    expect(painted.filter((value) => statedColour.test(value))).toEqual([]);
    const classes = [...document.matchAll(/\bclass="([^"]*)"/g)].flatMap(([, value]) =>
      value.split(/\s+/).filter((name) => name.includes("[")),
    );
    const styles = [...document.matchAll(/\bstyle="([^"]*)"/g)].map(([, value]) => value);
    expect(classes.filter((name) => statedColour.test(name))).toEqual([]);
    expect(styles.filter((value) => statedColour.test(value))).toEqual([]);
  });
}

/* The markup of the first element of one tag, or a failure naming the page. */
function first(file: string, tag: string): string {
  const found = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`).exec(readExport(file));
  if (!found) {
    throw new Error(`${file} emits no ${tag} element.`);
  }
  return found[0];
}

/* The ornaments a page draws, by the name each one carries. */
function ornaments(markup: string): string[] {
  return [...markup.matchAll(/<svg\b[^>]*\bdata-ornament="([^"]+)"/g)].map(([, name]) => name);
}

for (const file of everyPage) {
  test(`${file} opens with a skip link to its main content`, () => {
    const document = readExport(file);
    /* The first link in the body is the first stop of the Tab key. The
     * framework writes an empty hidden element before it, which takes no
     * focus. */
    const body = /<body\b[^>]*>[\s\S]*?(<a\b[^>]*>[\s\S]*?<\/a>)/.exec(document);
    expect(body?.[1]).toMatch(/href="#main"/);
    expect(body?.[1]).toContain("Skip to content");
    expect(document).toMatch(/<main\b[^>]*\bid="main"/);
  });

  test(`${file} stamps the KP seal on its header and its footer`, () => {
    expect(ornaments(first(file, "header"))).toContain("seal");
    expect(ornaments(first(file, "footer"))).toContain("seal");
  });

  test(`${file} draws the sun and the eclipse`, () => {
    const drawn = ornaments(readExport(file));
    expect(drawn).toContain("sun");
    expect(drawn).toContain("eclipse");
  });

  test(`${file} hides every ornament from a screen reader`, () => {
    /* An ornament says nothing the page does not say in words. */
    const tags = [...readExport(file).matchAll(/<svg\b[^>]*\bdata-ornament="[^"]+"[^>]*>/g)];
    expect(tags.length).toBeGreaterThan(0);
    for (const [tag] of tags) {
      expect(tag).toContain('aria-hidden="true"');
    }
  });
}
