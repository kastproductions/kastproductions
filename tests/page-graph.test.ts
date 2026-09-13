/*
 * What each page says about itself. The site-wide nodes are the same wherever a
 * crawler lands, so this file reads the ones a route adds on top: the page, the
 * service it sells with the prices it prints, and the way here from the home
 * page.
 *
 * The route list comes from the catalogue, so a product entering it is covered
 * with no edit here. Prices are read out of `content.ts` rather than written
 * down a second time: the suite tracks the copy instead of pinning it.
 */
import { expect, test } from "bun:test";
import { custom, type Price, products } from "../src/app/content";
import {
  type GraphNode,
  graphNodes,
  indexableRoutes,
  nodesOfType,
  readExport,
  siteUrl,
} from "./export";

function only(found: GraphNode[], type: string, path: string): GraphNode {
  if (found.length !== 1) {
    throw new Error(`${path} declares ${found.length} ${type} nodes; it promises one.`);
  }
  return found[0];
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
 * What a route sells, from the content module. The home page sells no one
 * thing, so it has no price list; a door and a product page each have their
 * own. A route the suite cannot answer for is a failure, not a skip: that is a
 * page shipped with nobody watching what it claims.
 */
function pricesFor(path: string): Price[] | null {
  if (path === "/") return null;
  if (path === "/custom") return custom.prices;
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
    expect(page["@id"]).toBe(`${route.url}#webpage`);
    /* It belongs to the site the layout declares, rather than restating it. */
    expect(page.isPartOf).toEqual({ "@id": `${siteUrl}/#website` });
  });

  const prices = pricesFor(route.path);
  if (!prices) continue;

  test(`${route.path} offers the prices it prints`, () => {
    const sold = nodesOfType(readExport(route.file), "Service");
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

test("the home page offers nothing of its own", () => {
  /* The home page prints the four ways to buy, and they price work a product
   * page and the custom door describe. A machine-readable offer belongs on the
   * page that sells the one thing, so the home page states no Service and no
   * Offer. */
  const home = readExport("index.html");
  expect(nodesOfType(home, "Service")).toEqual([]);
  expect(JSON.stringify(graphNodes(home))).not.toContain("Offer");
});
