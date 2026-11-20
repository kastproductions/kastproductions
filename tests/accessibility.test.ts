/*
 * Whether a screen reader can find its way through every page.
 *
 * A screen reader user moves through a page by its headings, so a heading
 * that skips a level (an h2 followed by an h4) reads as a missing section.
 * An icon says nothing the words beside it do not, so it must be hidden, or a
 * screen reader announces an unnamed graphic. A drawing that does say
 * something marks itself `role="img"` and carries a name:
 * `tests/images.test.ts` holds it to that.
 */
import { expect, test } from "bun:test";
import { everyPage, readExport } from "./export";

/* The page as the browser reads it, without the scripts. */
function documentOf(file: string): string {
  return readExport(file).replace(/<script\b[\s\S]*?<\/script>/g, "");
}

for (const file of everyPage) {
  test(`${file}: no heading skips a level`, () => {
    const levels = [...documentOf(file).matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i++) {
      expect(levels[i]).toBeLessThanOrEqual(levels[i - 1] + 1);
    }
  });

  test(`${file}: every drawing is a named image or hidden`, () => {
    const svgs = documentOf(file).match(/<svg\b[^>]*>/g) ?? [];
    for (const svg of svgs) {
      expect(svg).toMatch(/aria-hidden="true"|role="img"/);
    }
  });
}
