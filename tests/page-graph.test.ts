/*
 * What each page says about itself. The site-wide nodes are the same wherever a
 * crawler lands, so this file reads the ones a route adds on top: the page with
 * the date its copy last changed, the questions it answers, the service it
 * sells with the prices it prints, and the way here from the home page.
 *
 * The route list comes from the catalogue, so a product entering it is covered
 * with no edit here. Prices, questions and dates are read out of `content.ts`
 * rather than written down a second time: the suite tracks the copy instead of
 * pinning it.
 */
import { expect, test } from "bun:test";
import {
  contactPage,
  custom,
  jobPages,
  legalPages,
  openPrices,
  type Price,
  products,
  questions,
} from "../src/app/content";
import {
  type GraphNode,
  graphNodes,
  indexableRoutes,
  nodesOfType,
  readExport,
  type Route,
  siteUrl,
} from "./export";

function only(found: GraphNode[], type: string, path: string): GraphNode {
  if (found.length !== 1) {
    throw new Error(`${path} declares ${found.length} ${type} nodes; it promises one.`);
  }
  return found[0];
}

/*
 * The key a node of this page carries. Every identifier in the graph keys off
 * the site URL with the slash after the host, which the identifier test below
 * holds the whole graph to. A page below the home page carries that slash in
 * its path already; the home page's own address ends at the host, so its key
 * is the one place the two spellings part.
 */
function keyFor(route: Route, fragment: string): string {
  return `${route.path === "/" ? `${siteUrl}/` : route.url}#${fragment}`;
}

/*
 * What a printed price claims, read the way a person reads it: the digits are
 * the number, and the euro sign is euros. This is deliberately not the way
 * `src/app/structured-data.ts` reads a price. That module parses the string
 * with one regular expression and a table of currency symbols; if the suite
 * ran the same rule, it would only prove the graph agrees with a second copy
 * of it, and a misreading of `"From \u20ac3,500"` would pass on both sides.
 * Two different readings can disagree, which is the whole point of checking.
 */
function claim(amount: string): { currency: string; value: number } {
  const digits = amount.replace(/\D/g, "");
  if (digits === "" || !amount.includes("\u20ac")) {
    throw new Error(`the suite cannot read a number and a currency out of the price "${amount}"`);
  }
  return { currency: "EUR", value: Number(digits) };
}

/*
 * The offers a route owes, from the content module. A door and a product page
 * each sell one thing and state it, and the home page offers the plans it
 * prints. A legal page offers nothing: the terms print the same list of plans
 * to say what a build buys, which is a description and not an offer, and the
 * other two print no price at all. The contact page prints no price either.
 *
 * A route the suite cannot answer for is a failure, not a skip: that is a
 * page shipped with nobody watching what it claims.
 */
const statesNoOffer = [...legalPages, contactPage].map((page) => page.path);

function pricesFor(path: string): Price[] | null {
  if (statesNoOffer.includes(path)) return null;
  if (path === "/") return openPrices;
  if (path === "/custom") return custom.prices;
  /* A job page sells the custom door's work at the door's own prices: a job
   * we shape an agent around carries no price of its own, and a second number
   * for it would be one the door does not state. */
  if (jobPages.some((job) => job.path === path)) return custom.prices;
  const product = products.find((entry) => `/${entry.slug}` === path);
  if (!product) {
    throw new Error(`${path} is an indexable route the suite knows no price list for.`);
  }
  return product.prices;
}

for (const route of indexableRoutes) {
  test(`${route.path} describes itself as a page`, () => {
    const page = only(nodesOfType(readExport(route.file), "WebPage"), "WebPage", route.path);
    expect(page.url).toBe(route.url);
    expect(page["@id"]).toBe(keyFor(route, "webpage"));
    /* It belongs to the site the layout declares, rather than restating it. */
    expect(page.isPartOf).toEqual({ "@id": `${siteUrl}/#website` });
  });

  test(`${route.path} states the date its copy last changed`, () => {
    const page = only(nodesOfType(readExport(route.file), "WebPage"), "WebPage", route.path);
    /* The date comes off the page record, which is the one place it is written.
     * A date the build stamps tells a crawler that every page changed on every
     * deploy, and a crawler that learns our dates are worthless stops reading
     * them: the reason `sitemap.test.ts` checks the sitemap for a clock too. */
    expect(page.dateModified).toBe(route.date);
  });

  test(`${route.path} spells the site URL one way in every identifier`, () => {
    const stated = JSON.stringify(graphNodes(readExport(route.file)));
    const ids = [...stated.matchAll(/"@id":"([^"]+)"/g)].map(([, id]) => id);
    expect(ids.length).toBeGreaterThan(0);
    /* An identifier is a key rather than an address, and two spellings of one
     * key are two entities to a crawler: a page keyed as `…com#webpage` beside
     * a company keyed as `…com/#organization` describes two sites. Every key
     * carries the slash after the host. */
    expect(ids.filter((id) => !id.startsWith(`${siteUrl}/`))).toEqual([]);
  });

  test(`${route.path} offers the prices it prints`, () => {
    const prices = pricesFor(route.path);
    const sold = nodesOfType(readExport(route.file), "Service");
    if (!prices) {
      /* A page that sells nothing says so by carrying no service node. The
       * terms print the plans to say what a build buys, and a crawler that
       * read that as an offer would list the same price twice. */
      expect(sold).toEqual([]);
      return;
    }
    if (sold.length !== 1) {
      /* Say which prices go unstated, so a page that loses its service node
       * fails with the offers it owes rather than a count. */
      const printed = prices.map((price) => `${price.amount} ${price.per}`).join(", ");
      throw new Error(
        `${route.path} declares ${sold.length} Service nodes, so it offers none of the prices it prints: ${printed}.`,
      );
    }
    expect(sold[0].provider).toEqual({ "@id": `${siteUrl}/#organization` });

    const offers = sold[0].offers as GraphNode[];
    for (const price of prices) {
      const stated = claim(price.amount);
      /* Every price the site prints is a floor, because the work follows the
       * number of systems the agent touches, so the offer states a minimum and
       * never a fixed price. The number and the currency come from the printed
       * string, so a price edited in `content.ts` is checked here as written. */
      expect(offers).toContainEqual({
        "@type": "Offer",
        description: price.per,
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: stated.currency,
          minPrice: stated.value,
        },
      });
    }
  });

  /* The home page is where every trail starts, and a crumb trail of one item
   * claims a depth this site does not have. */
  if (route.path === "/") continue;

  test(`${route.path} says how a reader got here from the home page`, () => {
    const trail = only(
      nodesOfType(readExport(route.file), "BreadcrumbList"),
      "BreadcrumbList",
      route.path,
    );
    const items = trail.itemListElement as GraphNode[];
    expect(items.map((item) => item.item)).toEqual([siteUrl, route.url]);
    expect(items.map((item) => item.position)).toEqual([1, 2]);
  });
}

test("the home page marks up every question it answers", () => {
  /* The page prints its questions from the same list, so what this catches is
   * drift: a question added to the copy and left out of the graph, an answer
   * cut short, or a pair that arrives in an order the page does not show. */
  const page = only(nodesOfType(readExport("index.html"), "WebPage"), "WebPage", "/");
  expect([page["@type"]].flat()).toContain("FAQPage");

  const asked = page.mainEntity as GraphNode[];
  expect(asked.map((question) => question.name)).toEqual(questions.map((item) => item.q));
  expect(asked.map((question) => (question.acceptedAnswer as GraphNode).text)).toEqual(
    questions.map((item) => item.a),
  );
});
