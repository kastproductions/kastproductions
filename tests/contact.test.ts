/*
 * How a reader reaches us, read off the export.
 *
 * Three things have to hold that no page's source shows. Every booking link
 * on the site points where the content module points, so setting the booking
 * URL there turns all of them at once and a page cannot keep a mailto of its
 * own. Every page a reader can land on leads to the contact page, because a
 * page nothing links to is one a crawler finds last and a reader never. And
 * the contact page prints who the reader is writing to: a buyer checks the
 * company before sending money, and a fact dropped in a refactor is a defect
 * nothing else in the suite would notice.
 *
 * Nothing here pins page copy. A booking link is known by where it goes and
 * not by its words, and the href and the facts come out of `content.ts`, so
 * an edit there is checked as written.
 */
import { expect, test } from "bun:test";
import {
  callHref,
  callSubject,
  company,
  contactEmail,
  contactPage,
  location,
  mailtoFor,
} from "../src/app/content";
import { decodeEntities, everyPage, fileFor, mainOf, readExport } from "./export";

for (const file of everyPage) {
  test(`${file} keeps no booking link of its own`, () => {
    const hrefs = [...readExport(file).matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)].map(([, href]) =>
      decodeEntities(href),
    );
    /* A booking link is one that goes where `callHref` goes, or to the mailto
     * `callHref` stands in for while no booking URL is set. Once the URL is
     * set, an anchor still carrying that mailto is a page that kept a booking
     * link of its own, which is the one fault this test exists to catch. How
     * many booking links a page prints is its own business. */
    const booking = hrefs.filter((href) => href === callHref || href === mailtoFor(callSubject));
    expect(booking.filter((href) => href !== callHref)).toEqual([]);
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
  const main = decodeEntities(mainOf(fileFor(contactPage.path)));

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
