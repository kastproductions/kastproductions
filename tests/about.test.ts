/*
 * The page that says who is behind the work.
 *
 * Three things have to hold that no source file shows. The founder node the
 * layout states on every route has to point at this page, because a crawler
 * that follows the node lands where the founder is described and nowhere
 * else. The page has to print the founder, every client and every reference
 * as the content module holds them: the quotes are the one block of copy on
 * the site the owner may not edit, and a word lost in a refactor would be an
 * edit nobody made on purpose. And every page a reader can land on has to
 * lead here, because the buyer who wants to know who signs the merge is on
 * whichever page brought them in.
 *
 * Every assertion reads the emitted export. The facts come out of
 * `content.ts`, so an edit there is checked as written.
 */
import { expect, test } from "bun:test";
import { aboutPage, clients, founder, pageUrl, references } from "../src/app/content";
import {
  decodeEntities,
  graphNodes,
  indexableRoutes,
  notFoundFiles,
  readExport,
  siteUrl,
} from "./export";

const founderId = `${siteUrl}/#founder`;

/* Where the export put the about page. Being absent from the indexable list
 * is the failure, never a reason to skip. */
function aboutFile(): string {
  const found = indexableRoutes.find((route) => route.path === aboutPage.path);
  if (!found) {
    throw new Error(`${aboutPage.path} is published but is not an indexable route.`);
  }
  return found.file;
}

/* The page's own copy, without the chrome. */
function aboutMain(): string {
  const found = /<main[^>]*>([\s\S]*?)<\/main>/.exec(readExport(aboutFile()));
  if (!found) {
    throw new Error(`${aboutPage.path} emits no main element.`);
  }
  return decodeEntities(found[1]);
}

/* Every page a reader can land on: the routes we ask to be indexed, and the
 * ones a wrong address lands on. */
const pages = [...indexableRoutes.map((route) => route.file), ...notFoundFiles];

for (const file of pages) {
  test(`${file} links the about page from its header`, () => {
    const found = /<header[^>]*>([\s\S]*?)<\/header>/.exec(readExport(file));
    if (!found) {
      throw new Error(`${file} emits no header.`);
    }
    expect(found[1]).toContain(`href="${aboutPage.path}"`);
  });
}

test("the founder node points at the about page", () => {
  /* The layout states the node on every route, so one route answers for all;
   * the home page is the one this suite reads site-wide nodes from. */
  const person = graphNodes(readExport("index.html")).find((node) => node["@id"] === founderId);
  if (!person) {
    throw new Error(`the home page declares no ${founderId} node.`);
  }
  expect(person.url).toBe(pageUrl(aboutPage.path));
});

test("the about page prints the founder, every client and every reference as written", () => {
  const main = aboutMain();
  expect(main).toContain(founder);

  for (const client of clients) {
    expect(main).toContain(`href="${client.url}"`);
    expect(main).toContain(client.name);
  }

  for (const reference of references) {
    /* Quoted as written: the whole quote, and the name and position under it. */
    expect(main).toContain(reference.quote);
    expect(main).toContain(reference.name);
    expect(main).toContain(reference.position);
    expect(main).toContain(`src="${reference.portrait}"`);
  }
});
