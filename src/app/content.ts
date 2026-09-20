export const brand = "KastProductions";
export const siteUrl = "https://www.kastproductions.com";
/* A page's absolute URL. The home page is the bare site URL with no trailing
 * slash, and every other path maps straight across. The canonical tag, the
 * sitemap and the structured data graph all state a page's URL, and a crawler
 * reads two spellings of one page as two pages, so all three follow this one
 * rule rather than each writing it out. */
export function pageUrl(path: string): string {
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}
export const contactEmail = "hello@kastproductions.com";
/* Every call to action is a mailto, because the site is a static export with no
 * runtime. The subject says which door the reader came through, which is both
 * our only analytics on this page and a machine-readable first line for @brief. */
export const mailtoFor = (subject: string) =>
  `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`;
export const briefHref = mailtoFor("New brief");
/* Put a booking URL here and "Book a call" points at it instead of the mailbox.
 * Empty until one exists, because a dead link costs more than a mailto. */
export const bookingUrl = "";
export const callHref = bookingUrl || mailtoFor("First call");
export const founder = "Karolis Stulgys";
/* Public profiles that link back to this site. Search engines use them to tie the founder to the brand. */
export const founderProfiles = ["https://github.com/kstulgys", "https://x.com/imkarolis"];
/* The company's own public profiles, as opposed to the founder's. A crawler
 * reads them to corroborate that the company exists outside this website. */
export const companyProfiles = ["https://github.com/kastproductions"];
export const founderHandle = "@imkarolis";
export const location = { city: "Vilnius", country: "Lithuania", countryCode: "LT" };

/* Search snippet copy. Title stays close to 60 characters, description under 160. */
export const title = `${brand}: software factory on demand`;
export const description = `Software factory on demand in ${location.city}, ${location.country}. We build agents that work the way your company works, deploy them into your own accounts and keep them right.`;

/* What a crawler and a social scraper are told about a page lives in
 * `src/app/head-directives.ts`. Those are instructions to a machine, not words
 * a reader sees, and this module is the copy. */

/* The working days from a signed order to the agent answering in your own
 * channel. Printed next to every ready-made price. */
export const leadTime = "five working days";

/* Seventeen companies the studio has shipped for, across four continents. */
export const clients = [
  { name: "Trustpilot", url: "https://www.trustpilot.com/" },
  { name: "Volkswagen Financial Services", url: "https://www.vwfs.com/" },
  { name: "An Post", url: "https://www.anpost.com/" },
  { name: "Irish Life", url: "https://www.irishlife.ie/" },
  { name: "Rocket Software", url: "https://www.rocketsoftware.com/" },
  { name: "Toptal", url: "https://www.toptal.com/" },
  { name: "Zipmex", url: "https://zipmex.com/" },
  { name: "Bidfood", url: "https://www.bidfood.nl/" },
  { name: "Macaw", url: "https://www.macaw.net/" },
  { name: "RNHB", url: "https://www.rnhb.nl/" },
  { name: "Bound Interactive", url: "https://boundinteractive.com/" },
  { name: "Central Innovation", url: "https://centralinnovation.com/" },
  { name: "All Human", url: "https://allhuman.com/" },
  { name: "Netfront", url: "https://netfront.com.au/" },
  { name: "PEXX", url: "https://pexx.com/" },
  { name: "Apart Tech", url: "https://www.apart.tech/" },
  { name: "visionI", url: "https://www.visioni.com.au/" },
];

/* References about the founder, quoted as written. Do not edit the quotes. */
export const references = [
  {
    name: "Cathal McAliskey",
    position: "Lead IT Consultant, GemPool",
    portrait: "/reviewers/cathal-mcaliskey.jpeg",
    quote:
      "Karolis is the consummate professional. Highly personable, excellent communication skills, dedicated and technically astute. Along with all that he is a nice guy.",
  },
  {
    name: "Kristian Tasevski",
    position: "Head of Mobile, Bound",
    portrait: "/reviewers/kristian-tasevski.jpeg",
    quote:
      "Karolis is one of those rare developers who has an exceptional eye for detail, everything that he works on has a certain visual aesthetic to it. I was directly managing Karolis on a number of different projects at UserCentric for high profile enterprise clients of ours and all of the front-end work that Karolis did on those projects just looked great. He also has a strong self driven motivation to continue to learn and to stay up to date with whatever is topical in the dev community, and contributed a lot to our Engineering culture at UserCentric by always sharing with us what was the latest and greatest in the scene.",
  },
  {
    name: "Orla Lewis",
    position: "Product Design Manager, Irish Life",
    portrait: "/reviewers/orla-lewis.jpeg",
    quote:
      "Karolis worked as a react developer with my UX team. He was instrumental in building and developing our design system, a first for the company. I found him to be highly skilled and knowledgeable and an expert in his field. He is a strong communicator and diligent in his work. I highly recommend Karolis and hope to work with him again in the future.",
  },
  {
    name: "Greg Stephenson",
    position: "Founder, Netfront",
    portrait: "/reviewers/greg-stephenson.jpeg",
    quote:
      "I have had the pleasure of working with Karolis across a few projects. Karolis has a very keen eye for detail and a great analytical approach to programming. I was impressed with the polished UI and UX considerations Karolis made while working with him. In addition to his solid programming skills, Karolis is a great communicator and easy to work with. I would recommend Karolis to anyone who is looking for a good react developer, he would be a true asset to your team.",
  },
  {
    name: "Nando Mogollon",
    position: "Founder and Director, BuilDigital",
    portrait: "/reviewers/nando-mogollon.jpeg",
    quote:
      "I had the opportunity to work with Karolis from 2016 to 2019 while he was in Australia. I can attest he is a highly motivated, committed and responsible individual. Working with him gives you the confidence that work is going to be done and to the best standard. He would be a tremendous asset for you to hire or to get his services as a highly qualified professional.",
  },
  {
    name: "Povilas Nanevičius",
    position: "Mainframe Engineer, Rocket Software",
    portrait: "/reviewers/povilas-nanevicius.jpeg",
    quote:
      "I know Karolis was in his element in Reactjs: researching, delivering latest and greatest Reactjs UI in his work, spending free time rewriting Three.js games with React components, building web apps. Full of energy, efficient, right on the point. Looking forward to working (and having lunch time IT discussions) with you again!",
  },
];

/* ---------------------------------------------------------------------------
 * The offer
 *
 * One promise, two doors. Fit leads, convenience follows, and correctness sits
 * under both as the mechanism. That order is deliberate: a generic agent has
 * never been told what this company's correct is, so fit is the reason to buy
 * and the mechanism is the evidence. The vocabulary is fixed in CONTEXT.md,
 * and what may be stated as fact is in the Claims section of README.md.
 * ------------------------------------------------------------------------- */

/* A price as a reader sees it, and the only place the number lives.
 * `custom.prices` and the `prices` field on a product both hold these, and
 * `src/app/structured-data.ts` reads the number and the currency back out of
 * the string so the page and the graph cannot drift apart. */
export type Price = { amount: string; per: string };

export const hero = {
  heading: "An agent that works the way your company works.",
  lede: "A generic agent knows your tools. It has never been told how your company works, so nobody can hold it to your definition of right. We build one standing agent for one company, deploy it into that company's own accounts, and keep it right after it is live.",
};

/* `catalogue: true` marks anything that only becomes true once a ready-made
 * product runs. While `products` is empty, the page leaves it out. */
export const doors = [
  {
    name: "Ready-made",
    href: "/issue-to-pull-request",
    promise: "An agent we have already built.",
    body: `We adapt it to your workflow, connect it to your systems and deploy it into your accounts. Live in ${leadTime}.`,
    more: "What it does",
    catalogue: true,
  },
  {
    name: "Custom agent",
    href: "/custom",
    promise: "An agent shaped around your workflow.",
    body: "You describe the work. We write the spec, name a fixed price, and build the agent around how your company already runs.",
    more: "What a custom agent looks like",
    catalogue: false,
  },
];

/* The hero console: one standing agent, answering in a channel and stopping at
 * its gate. The three nameplate readings are the vocabulary the rest of the
 * page uses, so a reader meets `channel`, `authority` and the deployment in
 * the first object they see.
 *
 * Labelled as an example until @brief is live in our own Slack. Then this
 * becomes a screenshot of a real exchange and the label comes off. */
export const mention = {
  label: "Example",
  channel: "#payments",
  handle: "@atlas",
  readings: [
    { label: "Channel", value: "#payments", mono: true, note: "where the finance team already works" },
    { label: "Authority", value: "Acts behind an approval gate" },
    { label: "Runs in", value: "Your own Cloudflare account" },
  ],
  asker: "Nadia",
  ask: "summarise last night's failed payments and draft the follow-up to each customer",
  reply: "Nine payments failed after 21:00, four of them over €500. Nine drafts are ready in your outbox.",
  state: "Waiting on a named person",
  gate: "Sending reaches your customers, so it needs a name on it.",
  approve: "Approve and send",
};

export const fitIntro = {
  heading: "What we shape your agent around",
  lede: "We take each of the five points below from your company. We write them down before we build, and your agent follows what we wrote.",
};

export const fitDimensions = [
  {
    title: "Who asks",
    body: "Which people can start your agent, from which channel, and what they may ask it for.",
  },
  {
    title: "Who approves",
    body: "Which actions stop and wait, and whose name goes on the approval when they do.",
  },
  {
    title: "The systems it touches",
    body: "The tools your team already runs. Your agent uses the permissions of the person who asked. There is no shared key.",
  },
  {
    title: "Your words",
    body: "The names your company uses for things. We take them from your issues, your docs and your tickets. The answers then read like your team wrote them.",
  },
  {
    title: "What finished means",
    body: "Your definition of a finished piece of work. We write it down, so you can hold your agent to it.",
  },
];

export const mechanismIntro = {
  heading: "How we keep it right",
  lede: "Fit is the promise. These five are how we prove it, every month, for as long as we operate your agent.",
};

export const mechanism = [
  {
    title: "The eval suite",
    body: "The written definition of correct for your agent. It runs on every change we make, and a failing suite stops the change. When we cannot describe correct for a task, we say so before we build it.",
  },
  {
    title: "Approval gates",
    body: "We approve changes inside your agent's own repository and deployment. Every outward action waits for a named person at your company. That means anything reaching a customer, an inbox, a published page or a payment.",
  },
  {
    title: "A named engineer",
    body: "One of our engineers owns your agent and answers inside business hours. Your agent runs in your own cloud account, so its uptime is your platform's. We do not promise uptime for software we do not run.",
  },
  {
    title: "The spend cap",
    body: "Every session has a spend cap that we agree with you. A session that reaches the cap and has someone to ask stops and asks. A session running unattended stops and reports.",
  },
  {
    title: "The monthly report",
    body: "What your agent did, what it cost, what we changed, and what we would do next. Cancel at the end of any month. Our work stops and your agent keeps running.",
  },
];

/* The stack, and the line between what Flue does and what we write. Named
 * because a reader cannot check "we keep your agent current" against a
 * framework we refuse to name. */
export const stack = {
  heading: "What your agent is built on",
  body: "We build on Flue, the open agent harness the Astro organisation publishes. Your agent deploys into your own Cloudflare account, or onto Node.js where your platform needs it there instead. We resell nothing: the account, the keys and the code are yours.",
  oursHeading: "What Flue leaves to us",
  ours: [
    "Approval gates. Slack delivers a button press. The policy that holds an action back until a named person signs it is ours.",
    "Spend caps. Flue reports what each model call cost. Stopping a session at the ceiling you agreed is ours.",
    "Opening the pull request. That is our own tool against the GitHub API, so the agent cannot choose the repository or the credential.",
    "Deciding what starts a run. GitHub sends every event it has. Which label, on which repository, from which person, is ours.",
  ],
  links: [{ label: "Flue", url: "https://flueframework.com/" }],
};

export const channels = {
  heading: "Where your agent lives",
  lede: "A person addresses your agent by name in a chat channel. A system wakes it with an event. Both lists are what Flue verifies, so you can check them.",
  reachable: [
    "Slack",
    "Microsoft Teams",
    "Discord",
    "Telegram",
    "WhatsApp",
    "Google Chat",
    "SMS through Twilio",
  ],
  events: [
    "GitHub",
    "Linear",
    "Notion",
    "Stripe",
    "Shopify",
    "Zendesk",
    "Intercom",
    "Resend",
    "Salesforce Marketing Cloud",
  ],
  teamsNote:
    "Teams needs one step that Slack does not: an Azure Bot registration and an app password stored in your project. We do that work and quote it as its own line.",
};

/* ---------------------------------------------------------------------------
 * The catalogue
 *
 * `products` holds only a product that runs today: the rule is in CONTEXT.md
 * under Catalogue. `issueToPullRequest` is written and waiting. Putting it in
 * the array turns on the ready-made door, its page, its prices, its sitemap
 * entry and the example run table, all at once.
 * ------------------------------------------------------------------------- */

export type Product = {
  slug: string;
  name: string;
  promise: string;
  lede: string;
  authority: string;
  boundary: string;
  stationsIntro: string;
  stations: { title: string; body: string }[];
  record: string;
  prerequisites: { item: string; who: "You" | "We" }[];
  prices: Price[];
  subject: string;
  /* The day this product's page copy last changed, written YYYY-MM-DD. The
   * sitemap states it, so editing the copy above means editing this date. */
  date: string;
};

export const issueToPullRequest: Product = {
  slug: "issue-to-pull-request",
  name: "Issue to pull request",
  promise: "Takes an issue off your tracker and opens a draft pull request.",
  lede: "Your team labels an issue, or delegates it in Linear. The agent works it through four stations and opens a draft pull request on your repository, with the run record attached. A named person signs the merge.",
  authority: "It acts behind an approval gate.",
  boundary: "It never merges. Every branch it pushes waits for a signature.",
  stationsIntro:
    "A station is one step of a run, worked by a subagent that does that step and nothing else.",
  stations: [
    {
      title: "Triage",
      body: "Reads the issue and decides whether it is actionable at all. When it is not, the agent asks the person who filed it instead of building the wrong thing.",
    },
    {
      title: "Plan",
      body: "Turns the issue into acceptance criteria against a live checkout of your repository. The plan names the files, the tests and the risks.",
    },
    {
      title: "Implement",
      body: "Works in a sandbox, runs your repository's own checks, and pushes a branch when they pass.",
    },
    {
      title: "Review",
      body: "Judges the whole diff against the acceptance criteria and reports evidence for each verdict. It never signs the merge.",
    },
  ],
  record:
    "Every run attaches its run record to the draft pull request: each tool call, each test result, each verdict and what the run cost. When you ask why it chose an approach, the answer is in the pull request.",
  prerequisites: [
    { item: "A GitHub organisation and the repository the agent works on", who: "You" },
    { item: "A tracker: GitHub Issues, or Linear with agent sessions enabled", who: "You" },
    { item: "A Slack or Teams workspace, if your team wants to reach it in chat", who: "You" },
    { item: "An account with a sandbox provider: E2B, Daytona, Modal or Vercel Sandbox", who: "You" },
    { item: "A model provider key, on an account that never trains on your code", who: "You" },
    { item: "A Cloudflare account for the deployment", who: "You" },
    { item: "The GitHub app installed, the webhooks subscribed and the events filtered", who: "We" },
    { item: "The approval gates, the spend cap and the eval suite", who: "We" },
  ],
  prices: [
    { amount: "From €7,500", per: "to build" },
    { amount: "From €1,500", per: "a month to operate" },
  ],
  subject: "Issue to pull request",
  date: "2026-09-13",
};

export const products: Product[] = [];

/* Placeholder runs on the product page. Labelled as an example wherever a
 * visitor could read them as fact: see the Claims section of README.md. */
export const work = [
  {
    client: "Series A logistics platform",
    brief: "Rebuild dispatch scheduling around driver availability",
    days: 11,
    result: "Manual reassignments down 70% in the first month",
  },
  {
    client: "B2B invoicing product",
    brief: "CSV and PDF export with saved filters and account timezones",
    days: 3,
    result: "Shipped to every customer with no regressions reported",
  },
  {
    client: "Healthcare scheduling startup",
    brief: "Move 140 endpoints from Express to Fastify with typed schemas",
    days: 9,
    result: "p95 latency down 38%; 212 new contract tests",
  },
  {
    client: "Open-source CLI maintainers",
    brief: "Triage 212 stale issues and fix the confirmed bugs",
    days: 6,
    result: "31 bugs fixed, 181 issues closed with a reason",
  },
];

export const jobsIntro = {
  heading: "Work we take off your team",
  lede: "Five jobs, with the systems each one touches. None is a product on a shelf: we build the agent for the company that asks. Your work does not have to be on this list.",
};

/* The five jobs. The home page indexes them by title and systems; the custom
 * door describes each one. None of them is in the catalogue: each is work we
 * shape an agent around once we have read the client's workflow. */
export type Job = { title: string; systems: string; body: string };

export const jobs: Job[] = [
  {
    title: "Brief to published post",
    systems: "Notion, your CMS",
    body: "A brief goes in, a drafted and edited page comes back, and publishing waits for a name.",
  },
  {
    title: "Draft and schedule",
    systems: "Slack, Typefully",
    body: "Your team asks in a channel. The agent drafts, queues and reports what the last batch did.",
  },
  {
    title: "Support triage",
    systems: "Zendesk or Intercom, GitHub",
    body: "Every new ticket gets read, grouped and answered where the answer is known, and filed as an issue where it is a bug.",
  },
  {
    title: "Failed-payment follow-up",
    systems: "Stripe, your outbox",
    body: "Overnight failures come back as a summary and a drafted message per customer. Sending needs a signature.",
  },
  {
    title: "Store operations",
    systems: "Shopify",
    body: "Stock, pricing and order exceptions watched on a schedule, with the ones that need a decision brought to a person.",
  },
];

/* ---------------------------------------------------------------------------
 * The custom door
 * ------------------------------------------------------------------------- */

export const custom = {
  heading: "An agent shaped around how you already work",
  lede: "No two companies work the same way, and the work you want taken over probably matches nothing on a shelf. Describe it. You get a short spec and a fixed price within one working day.",
  jobsHeading: "Work we take",
  jobsLede:
    "Five jobs we take, to measure your own against. Each one names the systems it touches. None of them is a product you can buy today, and none carries a price until we have read your workflow.",
  prices: [
    { amount: "From €10,000", per: "to build" },
    { amount: "From €1,500", per: "a month to operate" },
  ],
  subject: "Custom agent",
};

/* ---------------------------------------------------------------------------
 * Ways to buy
 *
 * Prices are real evidence and must not be invented: see the Claims section of
 * README.md. A build price is a floor, because the work follows the number of
 * systems the agent touches. A monthly price buys the work in `mechanism`.
 * ------------------------------------------------------------------------- */

export const pricingIntro = {
  heading: "How to work with us",
  lede: "A build price is a floor, because the work follows the number of systems your agent touches. Every monthly price buys the evals, the changes and the report.",
};

export const prices = [
  {
    title: "Self-run",
    body: "We build your agent, deploy it into your own accounts and hand over the keys. Your team runs it and your engineers sign the merges.",
    price: "From €7,500",
    per: "to build, then from €1,500 a month",
    includes: [
      `Live in your own channel in ${leadTime}`,
      "Your accounts, your keys, your code from the first commit",
      "The eval suite, the approval policy and the spend cap, written for you",
    ],
    cta: "Ask about a build",
    subject: "Self-run build",
    buttonStyle: "button--outline",
    catalogue: true,
  },
  {
    title: "Managed",
    body: "We build it and we run it. Our coding agents take the runs, our reviewer reads every diff, and the agent still lives in your accounts.",
    price: "From €7,500",
    per: "to build, then from €4,000 a month",
    includes: [
      "As many briefs as the capacity allows, prioritised with you weekly",
      "A named engineer signs every merge",
      "Cancel at the end of any month, and your agent keeps running",
    ],
    cta: "Ask about Managed",
    subject: "Managed build",
    buttonStyle: "button--outline",
    catalogue: true,
  },
  {
    title: "Custom agent",
    body: "For work that matches nothing we have built. You describe it, we write the spec and name the price, and the agent is shaped around your workflow.",
    price: "From €10,000",
    per: "to build, then from €1,500 a month",
    includes: [
      "A spec and a fixed price within one working day",
      "The same terms: your accounts, your keys, your code",
      "The same mechanism: evals, approval gates, a named engineer",
    ],
    cta: "Describe the work",
    subject: "Custom agent",
    buttonStyle: "button--outline",
    catalogue: false,
  },
  {
    title: "Sprint",
    body: "One brief, two weeks, one fixed price. Our own agents work it on your repository, and our reviewer signs the merge. Nothing is deployed and nothing is connected, so this buys one piece of finished work rather than an agent.",
    price: "From €4,000",
    per: "per brief",
    includes: [
      "A fixed price before the two weeks start",
      "Plan, build, review and ship, with the run recorded",
      "30-day fix window on anything we merged",
    ],
    cta: "Start with a brief",
    subject: "Sprint: one brief",
    buttonStyle: "button--ink",
    catalogue: false,
  },
];

export const questions = [
  {
    q: "Who owns the agent and the code?",
    a: "You do. It lives in your repository and deploys into your own accounts, with your keys. Stop paying us and your agent keeps running. What stops is our work on it.",
  },
  {
    q: "What do we need to have already?",
    a: "Every product prints its prerequisites next to its price, and each line says whether you already own it or we set it up. Nothing is hidden until the third day of a build.",
  },
  {
    q: "What stops it spending our money overnight?",
    a: "Every session has a spend cap that we agree with you. A session that reaches the cap stops and asks you. A session running unattended stops and reports. The cap is our code, because the framework reports what a call cost and enforces nothing.",
  },
  {
    q: "Who approves what the agent does?",
    a: "A named person at your company approves every outward action. That covers anything reaching a customer, an inbox, a published page or a payment. Our name never goes on something your customers see.",
  },
  {
    q: "What is it built on?",
    a: "Flue, the open agent harness the Astro organisation publishes, deployed into your own Cloudflare account, or onto Node.js where your platform needs it. Four pieces are ours rather than the framework's: the approval gates, the spend cap, the tool that opens a pull request, and the filter that decides what starts a run.",
  },
  {
    q: "Do you promise uptime?",
    a: "No, and nobody honestly can for software running in your own cloud account. We promise four things. A named engineer. An answer inside business hours. A green eval suite on every change we make. A monthly report of what your agent did.",
  },
  {
    q: "How do we know it is working?",
    a: "We write an eval suite for every agent: the written definition of correct, run on every change we make. You can read it. Sometimes we cannot write down what correct means for something you want, and we tell you that before we build it.",
  },
  {
    q: "Can one agent answer to several names?",
    a: "No. One agent is one deployment with one name. A second name is a second agent, a second build and a second monthly line. One agent can still run several subagents behind its single name.",
  },
  {
    q: "Can it live in Microsoft Teams?",
    a: "Yes. Teams needs one step that Slack does not: an Azure Bot registration and an app password stored in your project. We do that work and quote it as its own line.",
  },
  {
    q: "Why not build it ourselves?",
    a: "You can, and the framework is open source. The framework is the easy part. The work is shaping the agent to your workflow, setting the approval policy, writing the eval suite, and holding all three steady while the framework moves under it.",
  },
];

/* ---------------------------------------------------------------------------
 * The written pages
 *
 * The pages we write by hand, as against the product pages the catalogue
 * makes. This is the one list of them: `src/app/sitemap.ts` walks it, and so
 * does the test suite. A page added here is therefore listed for a crawler and
 * guarded by the suite in one edit. A written page that is not here has no
 * sitemap entry, and nothing watching its canonical, its title, its
 * description or its unfurl image.
 *
 * A date is the day that page's copy last changed, written YYYY-MM-DD. It
 * comes from the page file's history, `git log -1 --date=short -- <file>`, so
 * editing the words on a page means editing its date in the same commit.
 * Nothing else sets it: a date stamped at build time tells a crawler that
 * every page changed on every deploy, and a crawler that learns our dates are
 * worthless stops reading them.
 *
 * A product page is not here. Its path and its date ride on its own record,
 * above, so a product entering the catalogue brings both with it.
 * ------------------------------------------------------------------------- */
export type WrittenPage = { path: string; date: string };

export const writtenPages: WrittenPage[] = [
  { path: "/", date: "2026-09-18" },
  { path: "/custom", date: "2026-09-18" },
];
