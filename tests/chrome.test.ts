/*
 * The header and the footer every page shares, read in buyer words.
 *
 * "Door", "standing agent", "station", "authority" and "approval gate" are our
 * words in CONTEXT.md. A buyer reads the header and the footer on every page,
 * so a term there costs a reader on every page at once. The terms are written
 * here, not read from the source, so a sentence that slips back into our own
 * vocabulary fails.
 */
import { expect, test } from "bun:test";
import { decodeEntities, everyPage, readExport } from "./export";

const internal =
  /\bdoors?\b|\bstanding agents?\b|\bstations?\b|\bauthority\b|\bapproval gates?\b/i;

/* The text of the one element with this tag, as a reader hears it. */
function textOf(file: string, tag: "header" | "footer"): string {
  const found = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`).exec(readExport(file));
  if (!found) {
    throw new Error(`${file} emits no ${tag}.`);
  }
  return decodeEntities(found[1].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");
}

for (const file of everyPage) {
  test(`${file}: the header and the footer use no internal term`, () => {
    expect(textOf(file, "header")).not.toMatch(internal);
    expect(textOf(file, "footer")).not.toMatch(internal);
  });
}
