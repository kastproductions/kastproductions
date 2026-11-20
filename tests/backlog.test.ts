/*
 * The backlog page wears the theme every other page wears, read off the
 * export: plain section headings with no number over them.
 */
import { expect, test } from "bun:test";
import { backlogPage } from "../src/app/content";
import { fileFor, mainOf } from "./export";

const main = () => mainOf(fileFor(backlogPage.path));

/* The sections of the page's main content, in order. */
function sections(): string[] {
  return [...main().matchAll(/<section\b[^>]*>([\s\S]*?)<\/section>/g)].map(([, body]) => body);
}

test(`${backlogPage.path} numbers no section`, () => {
  /* ADR-0007: a number goes in front of steps in order, never in front of a
   * section heading. */
  for (const body of sections()) {
    expect(body).not.toMatch(/<span aria-hidden="true"[^>]*>\d{2}<span/);
  }
});
