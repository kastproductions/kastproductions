/*
 * The fact rows on the about, contact, imprint and terms pages are definition
 * lists, and so are the readings on the home page. A screen reader announces
 * a `<dl>` as a list of terms and values, and it reads a term and a value only
 * when they sit in a `<dt>` or a `<dd>`. Content placed straight in the list,
 * or in one of the `<div>` groups that hold a term and its value, is outside
 * any term or value, and some screen readers skip it or read it out of order.
 * A pull link added after a value is the easy way to make this mistake.
 *
 * The check reads every emitted page and walks its tags. Inside a `<dl>`, each
 * element must be a `<div>` group, a `<dt>` or a `<dd>`, or be inside a
 * `<dt>` or a `<dd>`.
 */
import { expect, test } from "bun:test";
import { everyPage, readExport } from "./export";

const voidTags: Record<string, true> = {
  area: true, base: true, br: true, col: true, embed: true, hr: true, img: true,
  input: true, link: true, meta: true, source: true, track: true, wbr: true,
};
const groupTags: Record<string, true> = { div: true, dt: true, dd: true, script: true, template: true };

/* Every element inside a `<dl>` that is not inside a `<dt>` or a `<dd>` and is
 * not a group, as `tag` with the path from the list to it. */
function strayChildren(document: string): string[] {
  const stray: string[] = [];
  const stack: string[] = [];
  for (const [, closing, name] of document.matchAll(/<(\/?)([a-zA-Z][\w-]*)[^>]*>/g)) {
    const tag = name.toLowerCase();
    if (closing) {
      const at = stack.lastIndexOf(tag);
      if (at !== -1) stack.length = at;
      continue;
    }
    const list = stack.lastIndexOf("dl");
    if (list !== -1) {
      const path = stack.slice(list + 1);
      const inValue = path.includes("dt") || path.includes("dd");
      if (!inValue && !groupTags[tag]) stray.push(["dl", ...path, tag].join(" > "));
    }
    if (!voidTags[tag]) stack.push(tag);
  }
  return stray;
}

for (const file of everyPage) {
  test(`${file} puts everything in a definition list inside a term or a value`, () => {
    expect(strayChildren(readExport(file))).toEqual([]);
  });
}
