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
import { decodeEntities, everyPage, fileFor, graphNodes, mainOf, readExport, siteUrl } from "./export";

const founderId = `${siteUrl}/#founder`;

for (const file of everyPage) {
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
  const main = decodeEntities(mainOf(fileFor(aboutPage.path)));
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

test("every reference portrait keeps its alt text and its size", () => {
  /* A portrait with no size moves the quote under it when it loads, and one
   * with no alt text leaves a screen reader to read out a file name. The alt
   * text names the person and the position the content module holds, so a
   * reader who cannot see the face still knows whose words they are. */
  const main = decodeEntities(mainOf(fileFor(aboutPage.path)));
  const images = [...main.matchAll(/<img\b[^>]*>/g)].map(([tag]) => tag);

  for (const reference of references) {
    const portrait = images.find((tag) => tag.includes(`src="${reference.portrait}"`));
    if (!portrait) {
      throw new Error(`the about page prints no portrait of ${reference.name}.`);
    }
    expect(portrait).toContain(`alt="${reference.name}, ${reference.position}"`);
    expect(portrait).toMatch(/\swidth="\d+"/);
    expect(portrait).toMatch(/\sheight="\d+"/);
  }
});
