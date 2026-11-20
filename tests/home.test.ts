/*
 * What a buyer meets on the home page, read off the export.
 *
 * The home page tells one story in a fixed order, and the order is the spec's,
 * so this file writes it out rather than reading it from the page: a section
 * moved or dropped in a refactor is the fault it catches. It also holds the
 * page to the one offer it sells. The plans our coding agents work under live
 * on the backlog page, and the home page links that page once from its price
 * list and offers neither plan in its graph.
 *
 * Every assertion reads `out/`. The plan names and the internal terms are
 * written here, not read from `content.ts`, so a plan filed under the wrong
 * page, or a heading that slips back into our own vocabulary, fails.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "bun:test";
import { backlogPage, prices as plans } from "../src/app/content";
import { decodeEntities, fileFor, type GraphNode, mainOf, nodesOfType, readExport } from "./export";

const home = () => readExport(fileFor("/"));

/* The markup of the one section with this id. */
function section(id: string): string {
  const found = new RegExp(`<section\\b[^>]*\\bid="${id}"[^>]*>([\\s\\S]*?)</section>`).exec(
    home(),
  );
  if (!found) {
    throw new Error(`The home page carries no section with the id ${id}.`);
  }
  return found[1];
}

/* Text with its tags taken out, as a reader hears it. */
function text(markup: string): string {
  return decodeEntities(markup.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

test("the home page tells its story in the order the spec lists", () => {
  /* Hero, client strip, work, how a build goes, why it is safe, where it
   * lives, pricing, who stands behind it, questions, closing call to action. */
  const ids = [...mainOf(fileFor("/")).matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map(
    ([, id]) => id,
  );
  expect(ids).toEqual([
    "hero",
    "clients",
    "work",
    "how",
    "safety",
    "channels",
    "pricing",
    "founder",
    "questions",
    "cta",
  ]);
});

test("the hero places the hero scene with its size set", () => {
  /* A drawing with a width and a height holds its place on the first paint,
   * so the hero does not move when it renders. */
  const svg = /<svg\b[^>]*\bdata-scene="hero"[^>]*>/.exec(section("hero"));
  if (!svg) {
    throw new Error("The hero carries no hero scene.");
  }
  expect(Number(/\bwidth="([\d.]+)"/.exec(svg[0])?.[1])).toBeGreaterThan(0);
  expect(Number(/\bheight="([\d.]+)"/.exec(svg[0])?.[1])).toBeGreaterThan(0);
});

test("the hero has one main call to action", () => {
  /* One filled button: the quiet second action is not drawn as a rival. */
  const filled = [...section("hero").matchAll(/<a\b[^>]*class="[^"]*\bbg-primary\b[^"]*"/g)];
  expect(filled.length).toBe(1);
});

test("the work section lists the ready-made agent first, then the five jobs", () => {
  const paths = [...section("work").matchAll(/<a\b[^>]*?\shref="(\/[^"#]*)"/g)].map(
    ([, href]) => href,
  );
  expect(paths).toEqual([
    "/issue-to-pull-request",
    "/content-publishing",
    "/social-scheduling",
    "/support-ticket-triage",
    "/failed-payment-recovery",
    "/shopify-operations",
    "/custom",
  ]);
});

test("the work section names the systems each item touches", () => {
  const body = text(section("work"));
  for (const systems of ["GitHub", "Notion", "Typefully", "Zendesk", "Stripe", "Shopify"]) {
    expect(body).toContain(systems);
  }
});

test("the safety section makes four points", () => {
  const points = [...section("safety").matchAll(/<h3\b/g)];
  expect(points.length).toBe(4);
});

test("the price list prints Self-run and Custom, and no other plan", () => {
  const titles = [...section("pricing").matchAll(/data-slot="card-title"[^>]*>([^<]*)</g)].map(
    ([, title]) => decodeEntities(title),
  );
  expect(titles).toEqual(["Self-run", "Custom agent"]);
});

test("the price list prints the lead time and the prerequisites", () => {
  const body = text(section("pricing"));
  expect(body).toContain("five working days");
  expect(body.toLowerCase()).toContain("sandbox provider");
});

test("the price list links the backlog page once", () => {
  const links = [...section("pricing").matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)].filter(
    ([, href]) => href === backlogPage.path,
  );
  expect(links.length).toBe(1);
});

test("the home graph offers neither Managed nor Sprint", () => {
  /* The two plans are named here, so a plan filed under the wrong page fails
   * rather than passing on the field that files it. */
  const sold = nodesOfType(home(), "Service");
  expect(sold.length).toBe(1);
  const offers = sold[0].offers as GraphNode[];
  for (const title of ["Managed", "Sprint"]) {
    const plan = plans.find((entry) => entry.title === title);
    if (!plan) throw new Error(`the price list has no plan called ${title}.`);
    expect(offers.map((offer) => offer.description)).not.toContain(plan.per);
  }
  expect(offers.length).toBe(2);
});

test("the questions section asks about six questions, and the graph marks up the same list", () => {
  const printed = [...section("questions").matchAll(/data-slot="accordion-trigger"[^>]*>([\s\S]*?)<\/button>/g)].map(
    ([, markup]) => text(markup),
  );
  expect(printed.length).toBeGreaterThanOrEqual(5);
  expect(printed.length).toBeLessThanOrEqual(7);

  const page = nodesOfType(home(), "FAQPage")[0];
  const asked = (page.mainEntity as GraphNode[]).map((question) => question.name);
  expect(asked).toEqual(printed);
});

test("no heading and no call to action uses our internal vocabulary", () => {
  /* "Door", "standing agent", "station" and "authority" are our words in
   * CONTEXT.md. A buyer should not have to learn them to follow the page. */
  const internal = /\bdoors?\b|\bstanding agents?\b|\bstations?\b|\bauthority\b/i;
  const main = mainOf(fileFor("/"));
  const headings = [...main.matchAll(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/g)].map(([, m]) =>
    text(m),
  );
  const actions = [...main.matchAll(/<(a|button)\b[^>]*>([\s\S]*?)<\/\1>/g)].map(([, , m]) =>
    text(m),
  );
  expect([...headings, ...actions].filter((line) => internal.test(line))).toEqual([]);
});

test("the example console keeps its Example label", () => {
  const console = /<figure\b[^>]*aria-labelledby="console-title"[^>]*>([\s\S]*?)<\/figure>/.exec(
    home(),
  );
  if (!console) {
    throw new Error("The home page carries no example console.");
  }
  expect(text(console[1])).toContain("Example");
});

test("the /work redirect lands on the work section", () => {
  const config = JSON.parse(
    readFileSync(join(import.meta.dir, "..", "vercel.json"), "utf8"),
  ) as { redirects: { source: string; destination: string }[] };
  const redirect = config.redirects.find((entry) => entry.source === "/work");
  expect(redirect?.destination).toBe("/#work");
  /* The anchor is the section that lists the work, not a stray id. */
  expect(section("work")).toContain("/issue-to-pull-request");
});
