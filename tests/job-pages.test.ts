/*
 * What a buyer meets on the product page and the five job pages, read off the
 * export.
 *
 * A buyer clicks an item in the home page's work list and lands on one of
 * these six pages. Each page says what the agent does in steps, where it stops
 * for a named person, and which systems it touches, in that order. The product
 * page also prints its prerequisites with who owns each one, its price and its
 * lead time.
 *
 * Every assertion reads `out/`. The section order, the titles, the prices and
 * the internal terms are written here, not read from `content.ts`, so a page
 * that drops a section or slips back into our own vocabulary fails.
 */
import { expect, test } from "bun:test";
import { decodeEntities, documentTitles, fileFor, mainOf, readExport } from "./export";

const jobPaths = [
  "/content-publishing",
  "/social-scheduling",
  "/support-ticket-triage",
  "/failed-payment-recovery",
  "/shopify-operations",
];
const productPath = "/issue-to-pull-request";
const allPaths = [productPath, ...jobPaths];

/* The systems each page names in its section on what the agent touches, as
 * the home page's work list names them beside each item. */
const systemsOn: Record<string, string[]> = {
  [productPath]: ["GitHub", "Linear", "Cloudflare"],
  "/content-publishing": ["Notion", "CMS"],
  "/social-scheduling": ["Slack", "Typefully"],
  "/support-ticket-triage": ["Zendesk", "Intercom", "GitHub"],
  "/failed-payment-recovery": ["Stripe", "outbox"],
  "/shopify-operations": ["Shopify"],
};

/* The markup of the one section with this id on a page. */
function section(path: string, id: string): string {
  const found = new RegExp(`<section\\b[^>]*\\bid="${id}"[^>]*>([\\s\\S]*?)</section>`).exec(
    mainOf(fileFor(path)),
  );
  if (!found) {
    throw new Error(`${path} carries no section with the id ${id}.`);
  }
  return found[1];
}

const readExportOf = (path: string) => readExport(fileFor(path));

/* Text with its tags taken out, as a reader hears it. */
function text(markup: string): string {
  return decodeEntities(markup.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function sectionIds(path: string): string[] {
  return [...mainOf(fileFor(path)).matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map(([, id]) => id);
}

for (const path of jobPaths) {
  test(`${path} says what the agent does, then what it touches, then what it costs`, () => {
    expect(sectionIds(path)).toEqual(["hero", "steps", "systems", "channels", "pricing"]);
  });
}

test(`${productPath} says how a run goes, shows an example, then what it touches and costs`, () => {
  expect(sectionIds(productPath)).toEqual([
    "hero",
    "steps",
    "work",
    "systems",
    "channels",
    "pricing",
  ]);
});

for (const path of allPaths) {
  test(`${path} numbers the steps and says where the agent stops for a named person`, () => {
    const steps = section(path, "steps");
    const numbered = /<ol\b[^>]*>([\s\S]*?)<\/ol>/.exec(steps);
    if (!numbered) throw new Error(`${path} prints its steps in no numbered list.`);
    expect([...numbered[1].matchAll(/<li\b/g)].length).toBe(4);

    const stop = /<h3\b[^>]*>([\s\S]*?)<\/h3>\s*<p\b[^>]*>([\s\S]*?)<\/p>/.exec(steps);
    if (!stop) throw new Error(`${path} has no heading for where the agent stops.`);
    expect(text(stop[1])).toBe("Where it stops for a person");
    expect(text(stop[2])).toContain("named person");
  });

  test(`${path} names the systems the agent touches`, () => {
    const body = text(section(path, "systems"));
    for (const system of systemsOn[path]) {
      expect(body).toContain(system);
    }
  });

  test(`${path} uses none of our internal terms in a heading or a call to action`, () => {
    /* "Door", "standing agent", "station" and "authority" are our words in
     * CONTEXT.md. A buyer should not have to learn them to follow the page. */
    const internal = /\bdoors?\b|\bstanding agents?\b|\bstations?\b|\bauthority\b/i;
    const main = mainOf(fileFor(path));
    const headings = [...main.matchAll(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/g)].map(([, m]) =>
      text(m),
    );
    const actions = [...main.matchAll(/<(a|button)\b[^>]*>([\s\S]*?)<\/\1>/g)].map(([, , m]) =>
      text(m),
    );
    expect([...headings, ...actions].filter((line) => internal.test(line))).toEqual([]);
  });
}

test("each page keeps the title it had before the rewrite", () => {
  /* The titles are what a search result prints, and the rewrite changed no
   * page's subject, so none of them moves. */
  const titles = allPaths.map((path) => documentTitles(readExportOf(path))[0]);
  expect(titles).toEqual([
    "Issue to pull request agent | KastProductions",
    "Content publishing agent | KastProductions",
    "Social scheduling agent | KastProductions",
    "Support ticket triage agent | KastProductions",
    "Failed payment recovery agent | KastProductions",
    "Shopify operations agent | KastProductions",
  ]);
});

test(`${productPath} prints You or We against each prerequisite`, () => {
  const rows = [...section(productPath, "systems").matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)]
    .map(([, row]) => [...row.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/g)].map(([, cell]) => text(cell)))
    .filter((cells) => cells.length > 0);
  expect(rows.length).toBe(8);
  for (const [who, what] of rows) {
    expect(["You", "We"]).toContain(who);
    expect(what.length).toBeGreaterThan(0);
  }
});

test(`${productPath} prints its price and its lead time`, () => {
  const pricing = text(section(productPath, "pricing"));
  expect(pricing).toContain("€7,500");
  expect(pricing).toContain("€1,500");
  expect(pricing).toContain("five working days");
});

test(`${productPath} keeps the Example label on its example run table`, () => {
  const work = section(productPath, "work");
  expect(work).toContain("<table");
  expect(text(work)).toContain("Example");
});
