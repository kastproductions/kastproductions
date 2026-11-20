/*
 * The words CONTEXT.md fixes, as every page prints them.
 *
 * A spend cap is the ceiling on model cost for one session, and a session is
 * one piece of work from the message that starts it to the answer that ends
 * it. "Task" is not our word for either, so a page that caps a task, or says
 * what starts one, tells a buyer something the terms page does not.
 */
import { expect, test } from "bun:test";
import { decodeEntities, everyPage, mainOf } from "./export";

/* The sentences of a page's main content, as a reader hears them. */
function sentences(file: string): string[] {
  return decodeEntities(mainOf(file).replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .split(/(?<=[.?!])\s+/);
}

for (const file of everyPage) {
  test(`${file} caps a session, never a task, and says what starts a session`, () => {
    const wrong = sentences(file).filter(
      (sentence) => /spend cap|\bstarts? a\b/i.test(sentence) && /\btasks?\b/i.test(sentence),
    );
    expect(wrong).toEqual([]);
  });
}
