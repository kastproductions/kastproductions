# The site says who we are

Status: done
Source: GitHub issue #18, opened on 2026-09-20.

## What to build

There is no about page. The old one redirects to an anchor on the home page, the founder node in the graph points at the home page for want of anywhere better, and a buyer weighing a ten thousand euro build finds no page that says who is behind the work.

Everything the page needs is already approved as fact: the founder, the seventeen client companies and the six references with their portraits.

## Acceptance criteria

- [x] An about page answers 200 and carries the founder, the client companies and the references.
- [x] The founder node in the graph points at that page instead of the home page.
- [x] The redirect from the retired about URL is removed, and the page is linked from the site chrome.
- [x] The page is in the sitemap with its copy date, and carries its canonical URL, unfurl image and graph nodes.
- [x] No case study, metric, press mention or client engagement is invented.

## Blocked by

- `01-page-records.md`
- `10-graph-dates-questions-offers.md`

## Comments

**Phrase the page targets:** "Karolis Stulgys", the founder's name. A buyer checking who is behind a build types the name, and no other page targets it (the imprint prints it as the director, under the title "Imprint").

**Where the page's facts come from.** Every sentence that states a fact, and its source:

- "Karolis Stulgys owns the agents and signs the merges." (h1) and "He founded KastProductions in Vilnius, Lithuania. He owns the agents we build and signs the merges we make on a client's repository." (lede): `founder`, `brand` and `location` in `src/app/content.ts`; the words are the home page's own reviewer paragraph (`src/app/page.tsx`, section `#reviewer`).
- "One engineer answers for every agent we build.": the same paragraph, and the **Reviewer** entry in `CONTEXT.md` ("Managed, that is our engineer").
- "Works from: Vilnius, Lithuania": `location`; the footer prints the same.
- "In the register: Director of Kast productions, MB", linking the imprint: `company.legalName` and `company.director` (which is `founder`), read from the register entry the `company` comment cites.
- "Profiles: His own, as against the company's. Both link back here." with `github.com/kstulgys` and `x.com/imkarolis`: `founderProfiles` and its comment ("Public profiles that link back to this site"); the `companyProfiles` comment draws the line between his and the company's.
- "Before KastProductions, Karolis Stulgys shipped for these companies, across four continents" and the seventeen names with their links: `clients` and its comment ("Seventeen companies ... across four continents"); the attribution to the founder's earlier work is the finding recorded in `plans/README.md` ("The clients strip credits the company with the founder's earlier work") and restated in this ticket's brief. "seventeen" in the description is the length of `clients`.
- "Six references, quoted as written" and "People who worked with Karolis Stulgys before KastProductions wrote these about that work. Nothing in them is edited.": `references` and its comment ("quoted as written. Do not edit the quotes."); that they are about the earlier work is the `plans/README.md` finding on the six references. The six quotes, names and positions are rendered from `references` with the same markup the home page used, so they are byte-identical to what it printed; `tests/about.test.ts` reads each quote back out of the export.
- Description: "Karolis Stulgys founded KastProductions in Vilnius and signs every merge. The seventeen companies he has shipped for, and six references quoted as written.": the sources above.

**Portraits:** unchanged files (176 px), drawn at the existing `.refs img` size of 2.5 rem (40 CSS px, 80 device px at 2x), which the files support. Not upscaled.

**The references moved off the home page.** The home page's `#reviewer` section keeps its heading and founder paragraph and now ends in one pull link to `/about`; the six quotes and portraits print on the about page and nowhere else. Reasons: the audit recorded them as the longest block on the site under a heading about who signs a merge, with selection and disclosure as the only lever; printing them twice would make the same block the longest on two pages and give a crawler two copies of one text; and the about page is where the disclosure (earlier work, quoted as written) is written, so the quotes sit next to it. The clients strip stays on the home page as well as here: it is short proof, and the about page adds the attribution.

**Decided:**
- The about link is in the header nav, after Questions, on every route. It is not a legal page and stays out of the footer's legal list.
- A page that prints no price is appended to the `statesNoOffer` array in `tests/page-graph.test.ts` (`[...legalPages, aboutPage]`), additively, as agreed with tickets 12 and 18 on `hub`.
- The founder node's `url` is `pageUrl(aboutPage.path)`; its `@id` stays keyed off the home page, because the identifier is site-wide.
- `/about` is removed from `vercel.json`; the README's list of retired URLs no longer names it.
- Off-site profile links print the host and path in mono, as machine-written strings, and carry `rel="me"`.
