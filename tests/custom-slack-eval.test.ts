/*
 * What a buyer reads on the custom page, the Slack page and the eval suite
 * page, read off the export.
 *
 * The custom page prints the custom prices the way every job page prints
 * them, so the custom plan has one price in one form. The Slack page states only what
 * Flue's channel documentation states, so it keeps the links to that
 * documentation, and it prints no price. The eval suite page sells nothing and
 * explains one part of the work in a buyer's words.
 *
 * The prices come from `custom.prices` in `content.ts`, so a price change
 * moves the page and the suite together. The links and the internal terms
 * are written here, so a lost link or a term that slips back into the copy
 * fails.
 */
import { expect, test } from "bun:test";
import { custom, customPage, evalSuitePage, jobPages, slackPage } from "../src/app/content";
import { decodeEntities, fileFor, mainOf } from "./export";

/* Text with its tags taken out, as a reader hears it. */
function text(markup: string): string {
  return decodeEntities(markup.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

/* The markup of the one section on a page with this id. */
function section(path: string, id: string): string {
  const found = new RegExp(`<section\\b[^>]*\\bid="${id}"[^>]*>([\\s\\S]*?)</section>`).exec(
    mainOf(fileFor(path)),
  );
  if (!found) {
    throw new Error(`${path} carries no section with the id ${id}.`);
  }
  return found[1];
}

/* "Door", "standing agent", "station" and "authority" are our words in
 * CONTEXT.md. A buyer should not have to learn them to follow a page. */
const internal = /\bdoors?\b|\bstanding agents?\b|\bstations?\b|\bauthority\b/i;

for (const page of [customPage, slackPage, evalSuitePage]) {
  test(`${page.path} uses none of our internal vocabulary`, () => {
    const words = text(mainOf(fileFor(page.path)));
    expect(words.match(internal)).toBeNull();
  });
}

for (const page of [customPage, ...jobPages]) {
  test(`${page.path} prints the custom prices in one shape, one line per price`, () => {
    const pricing = section(page.path, "pricing");
    const titles = [...pricing.matchAll(/data-slot="card-title"[^>]*>([^<]*)</g)].map(
      ([, title]) => decodeEntities(title),
    );
    expect(titles).toEqual([custom.subject]);
    const words = text(pricing);
    for (const price of custom.prices) {
      expect(words).toContain(`${price.amount} ${price.per}`);
    }
    /* One figure per price, and no second line that restates them. */
    expect(words.match(/€/g)?.length).toBe(custom.prices.length);
  });
}

test(`${customPage.path} says what comes back and when`, () => {
  expect(text(mainOf(fileFor(customPage.path)))).toContain(
    "a spec and a fixed price within one working day",
  );
});

test(`${slackPage.path} links the Flue documentation for Slack and for Teams`, () => {
  const main = mainOf(fileFor(slackPage.path));
  expect(main).toContain('href="https://flueframework.com/docs/ecosystem/channels/slack/"');
  expect(main).toContain('href="https://flueframework.com/docs/ecosystem/channels/teams/"');
});

for (const page of [slackPage, evalSuitePage]) {
  test(`${page.path} prints no price`, () => {
    /* Every price on the site is a floor, written "From €…". A figure in an
     * example exchange is not a price, so the test looks for the floor. */
    expect(text(mainOf(fileFor(page.path)))).not.toMatch(/From €\d/);
  });
}
