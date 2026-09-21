/*
 * Whether a reader can get to a page, and back out of it.
 *
 * A job page exists to be found: a buyer searches the job, lands on it, and
 * the page hands them on to the door where the work is priced. A page the two
 * job lists stop linking to is an orphan a crawler discovers last and a reader
 * never at all, and nothing in the export says so out loud, which is why this
 * reads the emitted HTML rather than the lists.
 */
import { expect, test } from "bun:test";
import { customPage, jobPages, products } from "../src/app/content";
import { decodeEntities, indexableRoutes, readExport } from "./export";

/*
 * Every path the page body links to, in document order. The header and the
 * footer link the door from every route already, so a link that counts as one
 * page leading to another is one the page itself writes.
 */
function bodyPaths(file: string): string[] {
  const document = readExport(file);
  const body = /<main\b[^>]*>([\s\S]*?)<\/main>/.exec(document);
  if (!body) {
    throw new Error(`${file} carries no main element, so it has no page body to read.`);
  }
  return [...body[1].matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)].map(([, href]) =>
    decodeEntities(href),
  );
}

/* Where the export put a page the content module holds a record for. */
function fileFor(path: string): string {
  const route = indexableRoutes.find((candidate) => candidate.path === path);
  if (!route) {
    throw new Error(`${path} is not a route this site asks anyone to index.`);
  }
  return route.file;
}

for (const job of jobPages) {
  test(`${job.path} is linked from both lists that print the job`, () => {
    /* The home page indexes the jobs and the custom door describes them, so
     * both rows lead here. */
    for (const path of ["/", customPage.path]) {
      expect(bodyPaths(fileFor(path))).toContain(job.path);
    }
  });

  test(`${job.path} leads on to the custom door`, () => {
    /* The job is not in the catalogue, so the page a reader lands on has to
     * hand them to the door that sells the work. */
    expect(bodyPaths(fileFor(job.path))).toContain(customPage.path);
  });
}

for (const product of products) {
  test(`/${product.slug} is linked from the ready-made door`, () => {
    /* The door on the home page is the one body link to a product page, and
     * it is written by hand while the route follows the slug, so a renamed
     * slug would leave the door pointing at a page the build no longer emits. */
    expect(bodyPaths(fileFor("/"))).toContain(`/${product.slug}`);
  });
}
