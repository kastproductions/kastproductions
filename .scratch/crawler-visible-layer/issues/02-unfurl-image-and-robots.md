# Every route unfurls with an image, and the not-found route says noindex once

Status: done
Source: GitHub issue #3, published and closed on 2026-09-13.

## Parent

`../spec.md`

## What to build

Next.js merges metadata shallowly. A page that declares its own `openGraph` object replaces the whole inherited object, the image with it. The custom door declares one, so it ships with no `og:image` and no `twitter:image`. A person who shares it in Slack sees a bare link. The home page keeps its image only because the image file sits in the same route segment, so the next page repeats the fault.

The content module gains one exported fragment that holds the Open Graph image, and every page metadata object spreads it into its own `openGraph`. The product page component does the same inside its metadata factory. The home page spreads it too, though it works without it today, so the next page cannot regress by copying the home page.

The same file carries a second fault. The root layout declares the site-wide `index, follow` robots default, and the not-found route inherits it next to the `noindex` the framework emits. Behaviour is correct by accident, because a crawler takes the most restrictive of the two. Move the site-wide robots defaults off the not-found path, so that route emits `noindex` alone.

## Acceptance criteria

- [ ] Each indexable route emits an `og:image` and a `twitter:image`, and each resolves to a file in the export.
- [ ] The image comes from one shared fragment that each page spreads into its own `openGraph`, the home page included.
- [ ] The product page metadata factory spreads the same fragment.
- [ ] The not-found route emits `noindex`, and emits no `index, follow` beside it.
- [ ] Each indexable route still emits its own canonical URL, title and description.
- [ ] The suite asserts the above against the built export, in its own spec file.

## Blocked by

- `01-built-export-suite.md`
