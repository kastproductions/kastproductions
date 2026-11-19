# Rewrite the site's copy and structure, and move it to the Neo Mirai design

Status: ready-for-agent
Source: `/grill-to-tickets` session on 2026-11-19. The gate was approved that day.

Tickets: `issues/01-neo-mirai-foundation.md` to `issues/09-final-design-pass.md`

## Problem Statement

The owner reads the site and finds it confusing, and a buyer will find it confusing too. Three things cause this.

First, the home page sells two different businesses as if they were one. One business is an agent we build and deploy into the client's own accounts: the ready-made door (issue to pull request) and the custom door. The other is work our own coding agents do on the client's repository: Managed and Sprint. The price list puts all four plans next to each other. It highlights Sprint, and Sprint's own text says it delivers no agent.

Second, the page talks in our internal vocabulary. "Door", "standing agent", "station", "authority" and "spend cap" are useful words in `CONTEXT.md`, but on the page a buyer has to learn them before the argument makes sense.

Third, the home page has ten sections. The five points "what we shape your agent around" and the five points "how we keep it right" are two lists of five with overlapping content, and the jobs, the channels and the doors each sit in a different part of the page.

The visual design is also changing. The owner chose Impeccable's Neo Mirai world as the new look.

## Solution

The home page and the pricing sell one thing: an agent we build for your company, which runs in your accounts and which we keep correct after it is live. A buyer can take one we have already built (issue to pull request) or have one built for their own work. Managed and Sprint move to their own page about our coding agents on your backlog, and the home pricing section links it once.

All copy is rewritten with the `copywriting` skill in plain buyer language. The page says "agent", and the internal terms stay in `CONTEXT.md`. The home page tells one story in a fixed order. Every other page keeps its URL, and its sections and copy are rewritten in the same voice.

The whole site moves to the Neo Mirai visual world as ADR-0006 sets out. It uses the reference's palette, fonts, paper grain and grid, stamp seal, sun and eclipse disc, vertical rail, numbered sections with mono labels, and about five generated golden-hour illustrations of a future Vilnius and teams at work. It has a light theme only and no Japanese text.

## User Stories

1. As a buyer landing on the home page, I want the first screen to say what I get, in words I already use, so that I know within seconds whether this company can help me.
2. As a buyer, I want one main call to action in the hero, so that I do not have to choose between two buttons before I understand the offer.
3. As a buyer, I want to see the companies the founder has shipped for directly under the hero, so that I trust the claim before I read further.
4. As a buyer, I want one list of the work an agent can take off my team, with the ready-made product and the five jobs together, so that I can find my own work in one place.
5. As a buyer, I want each item in that list to name the systems it touches, so that I can see at once whether it fits my stack.
6. As a buyer whose work is not on the list, I want a clear way to describe my own work, so that I do not leave thinking the list is everything.
7. As a buyer, I want to see how a build goes from brief to live agent in a few numbered steps, so that I know what happens after I write to you.
8. As a buyer, I want to know that the spec and the fixed price come back within one working day, so that I know the cost of asking is low.
9. As a buyer, I want to know what the monthly upkeep buys after the agent is live, so that I understand why there is a monthly price.
10. As a buyer worried about risk, I want one short section on why the agent is safe (a named person approves outward actions, a spend cap per session, a written definition of correct that runs on every change, and my own accounts and keys), so that my main objections are answered in one place.
11. As a buyer, I want to see where the agent lives (the chat tools my team uses and the systems that can wake it), so that I can picture it in my own workplace.
12. As a buyer, I want the pricing to show only the ways to buy an agent, with a build price and a monthly price for each, so that I can compare like with like.
13. As a buyer, I want the prerequisites and the lead time next to a ready-made price, so that the price does not hide work I must do.
14. As a buyer who wants work done on my repository without owning an agent, I want one clear link from pricing to a page about your coding agents on my backlog, so that I can still find Managed and Sprint.
15. As a buyer on the backlog page, I want Managed and Sprint explained with their prices, what they include and how a run ends in a pull request a named person signs, so that I can buy either one.
16. As a buyer, I want to know who stands behind the work, with the founder's name, one quote and a link to the references, so that I know a real person signs the merges.
17. As a buyer, I want a short FAQ of about six questions, so that I find the answer to my real question without reading ten.
18. As a buyer at the end of the page, I want one closing call to action that says what comes back and when, so that I know what writing to you starts.
19. As a buyer reading a job page, I want the page to say what the agent does, where it stops for a person, and which systems it touches, in the same voice as the home page, so that the site reads as one argument.
20. As a buyer reading the issue to pull request page, I want the four steps of a run, the prerequisites with who owns each one, and the price, so that I can decide to buy it.
21. As a buyer reading the custom page, I want to know how you take my workflow and shape an agent around it, and what it costs, so that I can send a brief with confidence.
22. As a buyer reading the Slack page, I want to know how my team talks to the agent in Slack and where it stops for approval, so that I can picture daily use.
23. As a buyer reading the eval suite page, I want a plain explanation of how you define and check correct, so that I can trust an agent that runs without supervision.
24. As a buyer reading the about page, I want the founder's story, the client list and the six references quoted as written, so that I can check the person behind the company.
25. As a buyer on the contact page, I want the two ways to reach you and what follows a message, so that I know what to expect.
26. As a reader of the legal pages, I want the same facts as before in the new design, so that nothing I check against the register changes.
27. As a buyer on a phone, I want every page to read well at phone width with no sideways scroll, so that I can judge the company on the device I use.
28. As a buyer, I want the illustrations to show a warm future Vilnius and people at work, so that the design feels human and placed, not generic.
29. As a buyer, I want examples marked as examples, so that I never take a synthetic run for a real case study.
30. As a person who shares a page in Slack or on LinkedIn, I want the unfurl image to match the new design, so that the link looks like the site it opens.
31. As a search engine, I want every existing URL to keep working with the same canonical, so that the site keeps its ranking.
32. As a search engine, I want the new backlog page in the sitemap, in `llms.txt` and in the structured data graph, with its offers, so that it is found and understood.
33. As a search engine, I want the home page's structured data to state only the prices and questions the page prints, so that the graph and the page do not disagree.
34. As a visitor who follows an old link to `/work`, I want to land on the section about work an agent can take, so that the redirect still makes sense after the section changes.
35. As a keyboard or screen reader user, I want visible focus, a skip link, correct heading order and alt text on every illustration, so that the new design is as usable as the old one.
36. As a visitor on a slow connection, I want the illustrations compressed and lazy-loaded below the fold, and the fonts self-hosted, so that the first screen paints fast.
37. As a visitor whose system asks for dark mode, I want a page that is fully legible, so that the light-only design does not break for me.
38. As the owner, I want `PRODUCT.md` and `DESIGN.md` in the repo, so that the next design change starts from a written brief and a written system.
39. As the owner, I want the built-export suite green after every ticket, so that the redesign cannot silently break what a crawler reads.
40. As the owner, I want the image prompts kept in the repo next to the images, so that I can generate a matching scene later.

## Implementation Decisions

### The offer and the page set

- The home page and its pricing sell the agent only. The ready-made price shows the build and monthly price of the one product. The custom price shows the build and monthly floor. These are the ways to buy that stay on the home page: Self-run for the ready-made product, and Custom.
- Managed and Sprint move to a new written page at `/backlog`, titled for search as "AI coding agents for your backlog". It is a written page with its own page record, added to the written pages list, so the sitemap, `llms.txt`, the canonical and the graph follow from the record (ADR-0004 and the "Adding a page" section of the README). Its prose lives in its route file, as ADR-0004 asks of a page of which there is one.
- The backlog page states an offer, so its graph carries the Managed and Sprint offers. The home graph carries only the plans the home page prints. The split of the price list follows the existing filter on the plans, which gains a field that says which page prints a plan.
- Managed keeps its glossary meaning: we run the issue to pull request agent on the client's backlog, our coding agents take the runs, and our reviewer signs every merge. Embedded is not printed anywhere, and it stays out.
- Every existing URL stays. The `/work` redirect moves to the new anchor of the home section about work an agent can take.

### The home page order

1. Hero: what you get, in buyer words, one main call to action, a quiet second action, and a generated hero scene.
2. Client strip.
3. Work an agent can take off your team: one list with the ready-made product first, then the five jobs, each with the systems it touches and a link to its page, and a link to the custom page for work not on the list.
4. How a build goes: numbered steps from brief, to spec and fixed price in one working day, to live in your own channel and accounts, to monthly upkeep.
5. Why it is safe: four points (a named person approves outward actions, a spend cap per session, the eval suite runs on every change, your accounts and keys). This replaces both lists of five.
6. Where it lives: the chat channels and the systems that can wake an agent, with the link to the Slack page.
7. Pricing: Self-run (ready-made) and Custom, and one line that links the backlog page.
8. Who stands behind it: the founder, one quote, and the link to the about page.
9. FAQ: about six questions, chosen from the current ten by how often a buyer asks them. The structured data marks up the same list.
10. Closing call to action.

### Copy

- All copy is rewritten with the `copywriting` skill, then edited against the user's humanizer checklist before it lands. Shipped copy stays British English.
- The page says "agent". "Door", "standing agent", "station" and "authority" do not appear in headings or calls to action. Where a concept needs a term, the page explains it in buyer words. `CONTEXT.md` does not change: it stays the internal vocabulary, and the content module comments keep using it.
- The claims rules in the README do not change. The 17 clients, the 6 references and the prices are the only facts stated as fact. The synthetic console, the run record and the work table keep their "Example" label. No case study or figure is invented.
- The references are quoted as written. The legal pages keep their facts word for word, and only their design changes.
- The content module stays the single source of every fact and every word that more than one page prints (ADR-0004). Records whose words change get a new copy date in the same commit, as the README requires.

### Design

- ADR-0006 sets the world: the Neo Mirai palette as tokens, Chakra Petch for display, Zen Old Mincho for body text, Azeret Mono for labels, the paper grain and the 112px grid on the body, a stamp seal with a KP monogram, the sun and eclipse disc, a vertical rail, and numbered sections with mono labels.
- Tailwind and shadcn/ui stay (ADR-0005). The theme variables change to the new palette, and the shadcn components (button, card, badge, accordion, sheet, table) are rethemed through tokens, not forked.
- The three families load through the framework's self-hosted Google font loader, as the current two do, so no request goes to Google at runtime. Zen Old Mincho may not carry Latin Extended glyphs (for example the č in a reference's name). The body font stack names a serif fallback that carries them, and the implementer checks the rendered names.
- Light theme only. The dark class, its variables and its custom variant go. Night-teal bands give contrast where a section needs it.
- The motifs take neutral forms only (a sun disc, an eclipse, horizon lines, a seal). No ray patterns, as the impeccable skill asks.
- `PRODUCT.md` and `DESIGN.md` are written through the impeccable init and document steps in the first ticket. Later tickets read them.

### Illustrations

- About five scenes are generated with GPT Image through HeyGen, using the `media-use` skill and the `HEYGEN_API_KEY` in the Agents vault: a hero scene of a golden-hour future Vilnius skyline with old-town spires, a red sun disc and small figures, plus three or four section scenes of teams at work with an agent (a support desk, a finance desk at night, an engineer reviewing a pull request, a shop floor). All scenes share one style prompt that matches the reference: amber and gold palette, ink line, paper texture, small human figures.
- The images ship as compressed webp at the sizes they render at, with width and height set. The hero image loads eagerly, and the rest load lazily. Every image has alt text written in the content module.
- The style prompt and each scene prompt are kept in a text file next to the images.
- SVG ornaments (sun disc, eclipse, horizon lines, seal) are drawn by hand and used on every page, with or without a scene.

### Machine-readable layer

- The Open Graph image is redrawn in the new palette and fonts. Its build-time font fetch changes from Archivo to the new display family, and the version query on its URL goes up in the same commit, as the README requires.
- Titles and descriptions change only where the page's subject changes. The home title keeps leading with "AI agent development company". The backlog page gets its own title and description within the lengths that the head suite measures.

## Testing Decisions

- One seam: the built export, as ADR-0001 sets out. `bun run test` builds and every test reads `out/`. No new seam is added, and no test imports a page component.
- A good test asserts what a crawler, a scraper or a reader gets from the emitted files (a canonical, a sitemap entry, an offer in the graph, a link that resolves, alt text on an image), never how a component is written.
- The existing tests follow `indexablePages`, so the backlog page is covered by the head, sitemap, `llms.txt`, Open Graph and link tests with no new route list. The structured data and page graph tests gain assertions that the home graph holds only the agent plans and the backlog graph holds Managed and Sprint. Prior art: `tests/page-graph.test.ts` and `tests/structured-data.test.ts`.
- The links test proves that every internal link and the `/work` redirect target resolve in the export.
- An image test asserts that every `img` in the export has non-empty alt text, a width and a height, and a `src` that resolves to a file in the export. Prior art: `tests/about.test.ts` for the portraits.
- Visual checks are not tests. After each ticket the implementer looks at each changed page with agent-browser at 390px and 1440px wide, and fixes what one look shows before the next look.

## Out of Scope

- New products in the catalogue, new job pages, or new prices. The prices and the client list stay exactly as they are.
- Changes to `CONTEXT.md` terms.
- A dark theme.
- Japanese text or Japanese scenery.
- A booking tool. `bookingUrl` stays empty, and calls to action stay mailto links.
- Changes to analytics, redirects other than `/work`, or the deployment.
- Translations.

## Further Notes

- The build needs network access for the Open Graph font fetch and for generating images. HeyGen use costs credits. The `media-use` skill sets how to plan and cap them.
- Post-gate decisions taken in this spec: the backlog page path and title; Managed keeps its glossary meaning on that page; the scene list; the body font fallback for Latin Extended glyphs; the `/work` redirect target; ADR-0006.
