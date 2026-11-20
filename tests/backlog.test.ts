/*
 * The backlog page wears the world every other page wears, read off the
 * export: numbered sections with mono labels, and an ornament in its own
 * content as well as in the shared header and footer.
 */
import { expect, test } from "bun:test";
import { backlogPage } from "../src/app/content";
import { fileFor, mainOf } from "./export";

const main = () => mainOf(fileFor(backlogPage.path));

/* The sections of the page's main content, in order. */
function sections(): string[] {
  return [...main().matchAll(/<section\b[^>]*>([\s\S]*?)<\/section>/g)].map(([, body]) => body);
}

test(`${backlogPage.path} numbers every section between the hero and the closing call`, () => {
  /* The first section is the hero and the last the closing call. Each one
   * between them carries its number over its heading, from 01, in order. */
  const middle = sections().slice(1, -1);
  expect(middle.length).toBeGreaterThan(0);
  const numbers = middle.map(
    (body) => /<span aria-hidden="true"[^>]*>(\d{2})<span/.exec(body)?.[1] ?? "none",
  );
  expect(numbers).toEqual(middle.map((_, index) => String(index + 1).padStart(2, "0")));
});

test(`${backlogPage.path} draws an ornament in its own content`, () => {
  expect(main()).toMatch(/<svg\b[^>]*\bdata-ornament="[^"]+"/);
});
