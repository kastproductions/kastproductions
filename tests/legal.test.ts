/*
 * The three pages a buyer reads before a first call: what the site collects,
 * what a build buys, and who the company is.
 *
 * Three things have to hold that no page's source shows. Every page a reader
 * can land on has to offer the way to all three, because a reader looks for
 * them from wherever they arrived. The imprint has to print every register
 * fact the content module holds: a detail dropped in a refactor is a legal
 * defect rather than a copy change, and nothing else in the suite would
 * notice. And the privacy page has to give the mailbox, because a page that
 * says how to ask for deletion and gives no address answers nobody.
 *
 * Every assertion reads the emitted export. Nothing here pins page copy: the
 * facts come out of `content.ts`, so an edit there is checked as written.
 */
import { expect, test } from "bun:test";
import {
  company,
  contactEmail,
  imprintPage,
  legalPages,
  type PageRecord,
  privacyPage,
} from "../src/app/content";
import {
  decodeEntities,
  indexableRoutes,
  notFoundFiles,
  readExport,
  type Route,
} from "./export";

/*
 * A legal page as a route. A page a crawler is not asked to index has no
 * sitemap entry and nothing watching its canonical, so being absent from the
 * indexable list is the failure, never a reason to skip.
 */
function routeFor(page: PageRecord): Route {
  const found = indexableRoutes.find((route) => route.path === page.path);
  if (!found) {
    throw new Error(`${page.path} is published but is not an indexable route.`);
  }
  return found;
}

/*
 * The page's own copy, without the chrome. The footer gives the mailbox and
 * the legal links on every page, so a reader of the whole document cannot tell
 * whether the page itself answers.
 */
function mainOf(page: PageRecord): string {
  const found = /<main[^>]*>([\s\S]*?)<\/main>/.exec(readExport(routeFor(page).file));
  if (!found) {
    throw new Error(`${page.path} emits no main element.`);
  }
  return decodeEntities(found[1]);
}

/* Every page a reader can land on: the routes we ask to be indexed, and the
 * ones a wrong address lands on. */
const pages = [...indexableRoutes.map((route) => route.file), ...notFoundFiles];

for (const file of pages) {
  test(`${file} links every legal page from its footer`, () => {
    const found = /<footer[^>]*>([\s\S]*?)<\/footer>/.exec(readExport(file));
    if (!found) {
      throw new Error(`${file} emits no footer.`);
    }

    for (const page of legalPages) {
      /* Reached from anywhere, including the page a wrong address lands on. */
      expect(found[1]).toContain(`href="${page.path}"`);
    }
  });
}

test("the imprint prints every register fact the content module holds", () => {
  const imprint = mainOf(imprintPage);

  for (const [field, fact] of Object.entries(company)) {
    if (!imprint.includes(fact)) {
      throw new Error(`the imprint states no ${field}; the register holds "${fact}".`);
    }
  }

  /* The company is reachable, which is half of what an imprint is for. */
  expect(imprint).toContain(`mailto:${contactEmail}`);
});

test("the privacy page gives the mailbox as the way to ask", () => {
  /* A privacy page that states how to ask for deletion and then leaves the
   * reader no address to ask at is the one fault here that costs the company
   * something. The address comes from `content.ts`, so this tracks the
   * mailbox rather than the sentence around it. */
  expect(mainOf(privacyPage)).toContain(`mailto:${contactEmail}`);
});
