# A written page is one record

Status: done
Source: GitHub issue #8, opened on 2026-09-20.

## What to build

Adding a page to this site currently means writing the same block three times: the metadata with its canonical URL, robots directive and unfurl image; the entry that puts the page in the sitemap with the day its copy last changed; and the call that gives the page its own node in the graph. Five new pages are queued behind this ticket, so the repetition is about to be paid five times over.

Make a written page one record. The record states the path, the title, the description and the copy date. Everything a machine reads about that page is derived from it. A reader and a crawler see no change today; the next five pages each cost one record and one route file.

## Acceptance criteria

- [x] A written page states its path, title, description and copy date in one place, and nothing else restates any of them.
- [x] Canonical URL, indexing directive, unfurl image, Open Graph fields and Twitter fields are derived from that record for every written page.
- [x] The sitemap entry and the page's own graph nodes read the same record.
- [x] The home page and the custom page produce the same crawler-visible output as before the change, and the suite passes.
- [x] Adding a page takes one record and one route file, and the README says so.

## Blocked by

- None (can start immediately).

## Comments

### What is in place

`PageRecord` in `src/app/content.ts` holds a page's path, title, description and copy date, and
it is the only place any of the four is written. `homePage` and `customPage` are the two
records, `writtenPages` lists them, `productPage(product)` reads a record off a product in the
catalogue, and `indexablePages` is the two together. Three derivations read a record and
nothing else: `pageMetadata(page)` in `src/app/head-directives.ts` for the title, description,
canonical URL, indexing directive and every Open Graph field, `pageNodes(page, prices?)` in
`src/app/structured-data.ts` for the page, service and breadcrumb nodes, and `sitemap.ts` for
the entry and its date. The Twitter fields are the framework's, derived from the Open Graph
object it now builds from the record.

The title on a record is the page's own, and `pageMetadata` puts the brand after it. The home
page states its title whole, because that title is the site's as well: the manifest, the unfurl
image and the layout's default all take it from `homePage`.

### Proof that no crawler-visible output moved

Built the export at the base commit `6ea1e26` into `/tmp/out-base`, built again with the
change, and compared the two trees:

```bash
git stash -u && rm -rf out .next && bun run build && rm -rf /tmp/out-base && cp -r out /tmp/out-base
git stash pop && rm -rf out .next && bun run build
diff -r -q -x _next /tmp/out-base out
```

A raw `diff` reports 16 files, because the framework stamps a fresh build id into every page on
every build. Normalising that one string, and nothing else, leaves five files: the 404 page and
its four payload files. They differ in one attribute, the cache-busting query the framework
appends to the Open Graph image URL it writes for itself:

```
- <meta property="og:image" content="https://www.kastproductions.com/opengraph-image?fda07ebb1b697de1"/>
+ <meta property="og:image" content="https://www.kastproductions.com/opengraph-image?8d644287b1a9a1e4"/>
```

That query is a hash of the image route's module, and `src/app/opengraph-image.tsx` changed two
lines: the import, and `alt`, which now reads `homePage.title` where `title` no longer exists.
The image itself is byte-identical (62,341 bytes, `cmp` clean), and the 404 page is the only
page that uses that URL: every indexed page states our own `/opengraph-image?v=2`, which is
unchanged.

`/` and `/custom`, `sitemap.xml`, `robots.txt`, `manifest.webmanifest` and `opengraph-image` are
byte-identical once the build id is normalised. Nothing a crawler reads moved.

`bun run test`: 36 pass, 0 fail. `bun run lint` over `src` and `tests`: clean.

### Decided

- A page's title on the record is the page's own, and the brand is appended by `pageMetadata`,
  except on the home page, whose title is the site's and is stated whole. The layout keeps its
  `%s | KastProductions` template for the one route with no record, the framework's not-found
  route, which sets a bare title and inherited the brand from that template before this change.
- The home page's title and description are the site's. `title` and `description` are no longer
  exported from the content module; the manifest, the unfurl image, the layout default and the
  Organization and WebSite nodes read `homePage.title` and `homePage.description`.
- A product page keeps no record of its own. `productPage(product)` derives one, so the
  catalogue stays the single source for a product's path, name, promise and date.
- `productMetadata` is gone from `src/components/product-page.tsx`. A product route builds its
  metadata the way a written page does, `pageMetadata(productPage(product))`, so there is one
  way to build a page's metadata. The Catalogue section of README.md shows it.

### Review

Reviewed on two axes against the base commit. Both reports are in the run record; what they
changed here:

- The page records header said to keep a description under 160 characters while the record
  below it held one of 181, the lede the custom door prints. The header now states the rule and
  says where the site misses it, and the record says the same. The copy itself is ticket 08's.
- `openGraphImage` and `indexedRobots` are no longer exported: `pageMetadata` is their only
  caller.
- `headTitle` asked `page.path === "/"` where `pageNodes` asked `page.path === homePage.path`.
  Both ask it the one way now.
- The chrome spelled `/` and `/custom` by hand in four places, which the page record states. It
  reads `homePage.path` and `customPage.path` instead. The nav label stays the chrome's own
  word, because a page title is written for a search result and is longer.
- The Project Structure block claimed the records covered every indexed page. They cover the
  pages we write by hand; a product page's record is derived by `productPage`.

Left as they are, with reasons:

- `doors` in the content module states `href: "/custom"` and `href: "/issue-to-pull-request"`.
  Binding those to the records would need the records defined above the door copy, and the
  custom record reads `custom.lede`, which is that copy. The door links are reader-facing
  navigation, and the machine-read facts all come off the record.
- The product link in the chrome still spells `/${product.slug}`. That is the catalogue's
  ground, and ticket 09 opens it.
- No `CONTEXT.md` entry for "page record". Every term there is one a reader of the site meets;
  this one is a build-time shape, and the README documents it.
