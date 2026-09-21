# Portraits name the person

Status: done
Source: GitHub issue #13, opened on 2026-09-20.

## What to build

The six reference portraits carry empty alternative text, so a reader who cannot see them, and a crawler reading the reference block, get the quote and the name but nothing tying the face to either. The files are also 176 pixels square and are displayed at 176 CSS pixels, which is soft on every 2x screen.

## Acceptance criteria

- [x] Each portrait states the person's name and position as its alternative text.
- [ ] Each portrait file is 352 pixels square and stays under 12 KB. (Under 12 KB already
      holds: the six files are 3,739 to 5,264 bytes. Only 352 pixels square is open.)
- [x] The reference block is unchanged in layout at 176 CSS pixels and is sharp on a 2x
      screen. (Measured at 42.5 CSS pixels, not 176; see the comment below. Layout
      unchanged and sharp at 2x both hold.)
- [x] The quotes and positions are untouched: they are other people's words.

## Blocked by

- None (can start immediately).

## Comments

### 2026-09-20, implementer, worked from `6ea1e26`

The alternative text shipped. The file sizes did not, and the measurement below says
they should not: the premise the second criterion rests on does not match the
stylesheet. One question is left for the owner at the end.

**Each portrait now names the person.** The `img` in the reference block reads its
alternative text out of the `references` record in `src/app/content.ts`, so the name and
the position are written once and an edit to either reaches the alternative text with no
second edit. The change is one line of `src/app/page.tsx`:

```
-                        alt=""
+                        alt={`${reference.name}, ${reference.position}`}
```

All six reach the built export, and Chromium reports the same six as the accessible name
of each image:

```
image "Cathal McAliskey, Lead IT Consultant, GemPool"
image "Kristian Tasevski, Head of Mobile, Bound"
image "Orla Lewis, Product Design Manager, Irish Life"
image "Greg Stephenson, Founder, Netfront"
image "Nando Mogollon, Founder and Director, BuilDigital"
image "Povilas Nanevičius, Mainframe Engineer, Rocket Software"
```

The figure caption prints the name and the position beside the portrait, so a screen
reader now says both twice. That is the cost of the criterion as written, and it is worth
paying: the alternative text is the only thing tying the face to the name for a crawler,
for image search, and anywhere the caption is separated from the image.

**The quotes and the positions are byte-identical to `6ea1e26`.** `src/app/content.ts`,
which holds every quote and every position, is untouched:

```
$ git diff 6ea1e26 -- src/app/content.ts
$
```

The built export says the same. Extracting the six `<blockquote>` bodies and the six
`refs__who` blocks from a build of `6ea1e26` and from a build of this commit gives
identical lists, quotes SHA-256 `95c2e6ae...` on both sides. The rendered home page
differs in exactly six places, all of them the `alt` attribute.

**The portraits are displayed at 42.5 CSS pixels, not 176, and are already sharp on a 2x
screen.** The 176 in this ticket is the `width={176}` attribute in `src/app/page.tsx`,
which sets the intrinsic aspect ratio and nothing else. The stylesheet sizes them:
`.refs img { width: 2.5rem; height: 2.5rem }` against `html { font-size: 106.25% }`, so
2.5rem is 42.5 pixels. Measured in Chromium against the built export at a 1440x900
viewport with a device pixel ratio of 2:

```
devicePixelRatio 2   root font-size 17px
.refs img         42.5 x 42.5 CSS px   ->  85 device px at 2x
file              176 x 176            ->  2.07x the resolution needed
```

A 352 pixel file would be 4.1x what a 2x screen can show and roughly four times the bytes
for no visible gain. Four of the six could only reach 352 by upscaling, which invents
detail.

**No higher-resolution source exists in this repository.** Every blob under
`public/reviewers/` and `frontend/public/reviewers/` in the whole history was checked. The
named 176 pixel files were added in `192cf06`, cut from the LinkedIn downloads that
entered the history in `2306c51` and `5600208` and sit together under `public/reviewers/`
at `492ca8d`. Those downloads are the largest originals there are:

| Person | Largest source in history | Reaches 352 |
| --- | --- | --- |
| Cathal McAliskey | 200 x 200 | no |
| Kristian Tasevski | 400 x 399 | yes |
| Orla Lewis | 200 x 200 | no |
| Greg Stephenson | 318 x 318 | no |
| Nando Mogollon | 200 x 200 | no |
| Povilas Nanevičius | 400 x 400 | yes |

QUESTION for the owner, which is why this file reads `needs-triage` rather than `done`. The
second criterion is open and only one option needs a person:

- **A. Ship no new files and close the criterion.** The end it was written for, a sharp
  reference block on a 2x screen, is already met with 2.07x to spare. Recommended.
- **B. Re-encode the six down to about 96 pixels.** Saves roughly 20 KB in total across
  six images that are lazy-loaded below the fold. Real, and small.
- **C. Ship 352 for the two people whose source allows it.** A mixed set, no visible gain.
- **D. Ask the six people for higher-resolution portraits.** Needs a person: these are
  other people's photographs. Worth doing only if a later ticket shows a portrait large.
  `11-about-page.md` puts the references on an about page, so that is the ticket to decide
  it against.

Verified with `bun run test`: 34 pass, 0 fail.

### Owner's answer, 21 September 2026

Option A. Ship no new files and close the second criterion: the end it was written for, a
sharp reference block on a 2x screen, already holds at 2.07x the device pixels a 2x screen
asks for. The 352 in the criterion followed the `width={176}` attribute, which sets the
intrinsic aspect ratio and not the drawn size.

Revisit this against `11-about-page.md` only if that page draws a portrait large. A
portrait above about 88 CSS pixels needs sources four of the six people have never given
us, so the decision there is D, not a re-encode.
