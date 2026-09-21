# Each page describes itself in the graph

Status: done
Source: GitHub issue #6, published and closed on 2026-09-13.

## Parent

`../spec.md`

## What to build

Every page serves the same site-wide graph, so no page describes itself beyond its URL, and the four real prices on the site carry no machine-readable offer. A crawler cannot tell the custom door from the home page, and an assistant asked what the company charges has only the marketing copy to read.

Each page starts contributing its own nodes. The structured data module gains builders for the per-page nodes, and each page renders its own graph fragment beside the site-wide one.

- The home page adds a WebPage node and nothing else.
- The custom door adds a WebPage node, a Service node carrying the two prices from the custom door's own price list, and a BreadcrumbList from the home page to the custom door.
- A product page adds the same three, built from the product record, so that opening the catalogue needs no further edit.

The catalogue is empty today, and opening it is out of scope. Prove the product page path by adding the product and its route file locally, running the build and the suite, then reverting both edits. Say in the pull request comment that you did this.

## Acceptance criteria

- [ ] Each indexable route emits structured data holding the nodes that route promises.
- [ ] The custom door emits a Service node whose offers carry the two prices printed on the page.
- [ ] The custom door emits a BreadcrumbList running from the home page to the custom door.
- [ ] The home page emits a WebPage node.
- [ ] A product page emits its WebPage, Service and BreadcrumbList nodes from the product record, with no edit beyond the two the README already promises for turning a product on.
- [ ] The suite gets its route list from the catalogue, so a product entering the catalogue is covered with no test edit.
- [ ] The suite asserts the above against the built export, and pins no page copy.

## Blocked by

- `01-built-export-suite.md`
- `04-organization-node.md`
