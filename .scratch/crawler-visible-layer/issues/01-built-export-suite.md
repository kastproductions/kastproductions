# Read the built export in a test suite

Status: done
Source: GitHub issue #2, published and closed on 2026-09-13.

## Parent

`../spec.md`

## What to build

The repository holds no test, so nothing warns anybody when the crawler-visible layer of the static export drifts. This ticket lays the one seam the whole spec is tested through: a suite that reads the built export and asserts what a crawler sees.

The suite runs on `bun test`, which ships with the runtime the project already pins, so the repository gains no dependency. A script runs the build and then the suite, so the suite always reads fresh output.

The suite gets its route list from the same catalogue the sitemap gets its entries from. A product that enters the catalogue is then covered with no test edit. A route the suite cannot find in the export is a failure and never a skip.

The contracts this ticket defends are the ones that already hold today, so the suite goes green on the current build. Later tickets add their own contracts beside these.

Put the file reading and head parsing in one shared helper module and keep the assertions in separate spec files, one file per contract area. Sibling tickets then add a spec file each instead of editing a file somebody else is holding.

The audit proved the parsing is cheap. Read the file from the export, find the tag, assert it. No HTML library. A JSON parse of the structured data block is the one exception.

## Acceptance criteria

- [ ] `bun test` runs the suite, and a package script builds the export and then runs it.
- [ ] Every assertion reads an emitted file. The suite imports no page component, no metadata object and no route handler.
- [ ] The route list comes from the same catalogue the sitemap uses, and a route missing from the export fails the suite.
- [ ] Each indexable route emits exactly one `h1`.
- [ ] Each indexable route emits a canonical URL that matches its own path.
- [ ] Each indexable route emits a title and a description.
- [ ] The sitemap lists exactly the indexable routes, and each entry resolves to an emitted page.
- [ ] The robots file allows crawling and names the sitemap.
- [ ] No assertion reads a source file, the shape of a metadata object, or a snapshot of a whole page.
- [ ] `bun test` passes on the current build.

## Blocked by

None (can start immediately).
