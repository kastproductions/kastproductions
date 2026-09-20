# Site-wide structured data states only what the company can support

Status: done
Source: GitHub issue #5, published and closed on 2026-09-13.

## Parent

`../spec.md`

## What to build

The structured data graph states things a search engine discards. The Organization logo points at an SVG, which Google does not accept for structured data images, and the file is 32 by 32, below the 112 pixel minimum. The graph also declares `ProfessionalService`, a LocalBusiness subtype, while the company has no walk-in premises, no street address and no telephone, so it invites validation it fails.

A new structured data module takes ownership of the graph. It exports the nodes that are true everywhere, meaning Organization, the founder as a Person, and WebSite, and the root layout renders those. Keeping the graph in one module is what lets a page add its own nodes in the next ticket.

The Organization node then states only what the company can support. `ProfessionalService` and `priceRange` go. The city and country address stay, and so does `areaServed`. A `contactPoint` carries the contact email with a `contactType` of sales, which is the address people already write to. A `sameAs` list carries the company's own public profiles, starting with the GitHub organisation that hosts this repository, so a crawler can corroborate that the entity exists outside its own website. The founder's personal profiles stay on the Person node, where they already are.

The logo becomes a raster asset: a PNG of at least 512 by 512, drawn from the existing icon, served from a stable path, and referenced from Organization as an ImageObject with its width and height. The existing SVG icon stays as the favicon, where SVG is correct.

## Acceptance criteria

- [ ] Each indexable route emits structured data that parses as JSON.
- [ ] Organization claims no LocalBusiness subtype and declares no price range.
- [ ] The logo URL ends in a raster extension, resolves to a file in the export, and the file is at least 512 by 512.
- [ ] The logo is declared as an ImageObject carrying its own width and height.
- [ ] Organization carries a contact point with the contact email and a sales contact type.
- [ ] Organization carries `sameAs` naming the company's GitHub organisation.
- [ ] The founder's personal profiles appear on the Person node and nowhere else.
- [ ] The SVG icon still serves as the favicon.
- [ ] The root layout renders only the nodes that are true on every route.
- [ ] The suite asserts the above against the built export, in its own spec file, and counts no nodes for the sake of counting.

## Blocked by

- `01-built-export-suite.md`
