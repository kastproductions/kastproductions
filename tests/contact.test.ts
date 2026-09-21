/*
 * How a reader reaches us, read off the export.
 *
 * Three things have to hold that no page's source shows. Every "Book a call"
 * on the site points where the content module points, so setting the booking
 * URL there turns all of them at once and a page cannot keep a mailto of its
 * own. Every page a reader can land on leads to the contact page, because a
 * page nothing links to is one a crawler finds last and a reader never. And
 * the contact page prints who the reader is writing to: a buyer checks the
 * company before sending money, and a fact dropped in a refactor is a defect
 * nothing else in the suite would notice.
 *
 * Nothing here pins page copy. The href and the facts come out of
 * `content.ts`, so an edit there is checked as written.
 */
import { expect, test } from "bun:test";
import { callHref, company, contactEmail, contactPage, location } from "../src/app/content";
import { decodeEntities, indexableRoutes, notFoundFiles, readExport } from "./export";

/* Every page a reader can land on: the routes we ask to be indexed, and the
 * ones a wrong address lands on. */
const pages = [...indexableRoutes.map((route) => route.file), ...notFoundFiles];

/* Where the export put the contact page. A page a crawler is not asked to
 * index has no sitemap entry and nothing watching its canonical, so being
 * absent from the indexable list is the failure, never a reason to skip. */
function contactFile(): string {
  const found = indexableRoutes.find((route) => route.path === contactPage.path);
  if (!found) {
    throw new Error(`${contactPage.path} is published but is not an indexable route.`);
  }
  return found.file;
}

for (const file of pages) {
  test(`${file} sends every Book a call where the content module points`, () => {
    const hrefs = [
      ...readExport(file).matchAll(/<a\b[^>]*?\shref="([^"]*)"[^>]*>Book a call<\/a>/g),
    ].map(([, href]) => decodeEntities(href));
    /* The footer carries one on every page, so a page with none lost its
     * footer rather than its wiring. */
    expect(hrefs.length).toBeGreaterThan(0);
    expect(hrefs.filter((href) => href !== callHref)).toEqual([]);
  });

  test(`${file} links the contact page from its footer`, () => {
    const found = /<footer[^>]*>([\s\S]*?)<\/footer>/.exec(readExport(file));
    if (!found) {
      throw new Error(`${file} emits no footer.`);
    }
    expect(found[1]).toContain(`href="${contactPage.path}"`);
  });
}

test("the contact page prints who a reader is writing to", () => {
  const found = /<main[^>]*>([\s\S]*?)<\/main>/.exec(readExport(contactFile()));
  if (!found) {
    throw new Error(`${contactPage.path} emits no main element.`);
  }
  const main = decodeEntities(found[1]);

  /* The legal identity a buyer checks against the register, and the city the
   * studio works from, which is not the registered address. */
  for (const fact of [
    company.legalName,
    company.registrationCode,
    company.vatNumber,
    company.registeredAddress,
    location.city,
  ]) {
    expect(main).toContain(fact);
  }
  expect(main).toContain(`mailto:${contactEmail}`);
});
