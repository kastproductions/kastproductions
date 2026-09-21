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
 * runtime. The subject says which door the reader came through, so it is both
 * the door a click on the link is counted under and a machine-readable first
 * line for @brief. */
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

/* The company as the Lithuanian register of legal entities holds it. The
 * imprint prints these six lines, and `contactEmail` under them so a reader
 * who has checked us can write; nothing else goes on that page. The privacy
 * page names the same company as the one a visitor's data reaches. Read from
 * the register entry at https://rekvizitai.vz.lt/en/company/kast_productions/,
 * and edited only when the register changes.
 *
 * The registered address is not `location`. `location` is Vilnius, where the
 * studio works and where the copy says we are; the register holds the address
 * below. An imprint states the registered address, because that is the one a
 * reader is checking against the register. */
export const company = {
  legalName: "Kast productions, MB",
  /* What the two letters after the name mean, for a reader outside Lithuania. */
  legalForm: "mažoji bendrija, a Lithuanian small partnership",
  registrationCode: "305830693",
  vatNumber: "LT100020218411",
  registeredAddress: "Mokyklos g. 13, Verstaminų k., Lazdijų r., Lithuania",
  /* The one person the register names, who is also the founder above. */
  director: founder,
};

/* The search snippet copy of every page lives on that page's record, at the
 * foot of this file. The home page's title and description are the site's as
 * well, so the manifest, the unfurl image and the company's own nodes in the
 * graph read them from `homePage` rather than holding a second copy.
 *
 * What a crawler and a social scraper are told about a page lives in
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

/* A price as a reader sees it, and the only place the number lives. The ways to
 * buy in `prices`, `custom.prices` and the `prices` field on a product all hold
 * these, and `src/app/structured-data.ts` reads the number and the currency
 * back out of the string so the page and the graph cannot drift apart. */
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

/* `more` is the words the section links the eval suite explainer with, as a
 * door's `more` links its page. The path is on `evalSuitePage`, below. */
export const mechanismIntro = {
  heading: "How we keep it right",
  lede: "Fit is the promise. These five are how we prove it, every month, for as long as we operate your agent.",
  more: "What an eval suite is",
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
 * under Catalogue. A product in the array has its page, its nav entry, its
 * sitemap entry and its example run table, and it holds the ready-made door
 * and the two ready-made plans on the home page open. The route file a product
 * page needs is the one edit the array cannot make: see the Catalogue section
 * of README.md.
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

export const products: Product[] = [issueToPullRequest];

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
export type Job = {
  title: string;
  systems: string;
  body: string;
  /* The page that expands this job, where it has one. A job with no page is a
   * row on the two lists and nothing more; a job with one is linked from both
   * of them, and the link follows the record rather than being written out. */
  page?: JobPage;
};

/* One job on its own page: the page's record and the words that page prints
 * about the job. The record fields are the ones `PageRecord` names, so a job
 * page needs no second record written for it, and the canonical URL, the
 * sitemap entry with its date, the line in `llms.txt` and the page's graph
 * nodes all follow from this object the way they follow from a written page's
 * record. A job page is therefore one of these and one route file, which the
 * A job page section of README.md sets out. The prose every job page shares,
 * the section headings among it, is in `src/components/job-page.tsx`, which
 * draws them all.
 *
 * The heading and the record's title are two different sentences on purpose:
 * a title is written for a search result, and a heading is written for the
 * reader who clicked it. */
export type JobPage = PageRecord & {
  /* The h1, in the site's own voice. */
  heading: string;
  lede: string;
  /* What the agent may do on its own. One of the three authorities in
   * CONTEXT.md, and never a fourth. */
  authority: string;
  /* Where the agent stops and waits for a named person. */
  gate: string;
  /* What the agent does, in the order it does it. */
  steps: { title: string; body: string }[];
  /* The systems the job names, and what the agent does in each. */
  systems: { name: string; role: string }[];
  /* The mail subject every call to action on the page carries, which is how
   * the analytics event names the door a reader came through. */
  subject: string;
  /* The words the two job lists link to this page with. Its own, so a reader
   * meeting five of these rows hears five different links. */
  more: string;
};

export const contentPublishing: JobPage = {
  path: "/content-publishing",
  title: "Content publishing agent",
  description:
    "Content publishing, run by a standing agent: a brief in Notion comes back as a drafted and edited page in your CMS, and publishing waits for a name.",
  date: "2026-09-21",
  heading: "An agent that turns a brief into a page ready to publish.",
  lede: "A brief in Notion comes back as a drafted and edited page, waiting unpublished in your CMS. Nothing goes live until a named person publishes it.",
  authority:
    "It acts behind an approval gate. Reading the brief, drafting the page and editing the draft against the brief needs nobody, and the finished draft then stops.",
  gate: "The gate sits before a page is published. A published page reaches everyone outside your company, so a named person reads it and publishes it.",
  steps: [
    {
      title: "Reads the brief",
      body: "A new brief in Notion wakes the agent. It reads what the page is for, who it is for and what it must say, in the words the brief uses.",
    },
    {
      title: "Drafts the page",
      body: "The draft goes into your CMS as an unpublished page, laid out the way your team already lays out a page there. Nothing is live yet.",
    },
    {
      title: "Edits the draft against the brief",
      body: "A second pass reads the whole draft as a reader would, checks it against every line of the brief, and edits it. The edited draft waits where the first one did.",
    },
    {
      title: "Reports the page as ready",
      body: "One message in the channel your team already works in: which brief, where the draft waits, and what the edit pass changed. Publishing waits for a name.",
    },
  ],
  systems: [
    {
      name: "Notion",
      role: "Where the brief lives, and what wakes the agent: a new brief starts it, and the brief is what the draft is checked against.",
    },
    {
      name: "Your CMS",
      role: "Where the draft waits, unpublished, in the place your team already writes. The agent writes the draft and stops there.",
    },
  ],
  subject: "Content publishing",
  more: "How a brief becomes a page",
};

export const socialScheduling: JobPage = {
  path: "/social-scheduling",
  title: "Social scheduling agent",
  description:
    "Social scheduling, run by a standing agent: your team asks in Slack, the agent drafts in Typefully, and a post joins the queue once a named person approves it.",
  date: "2026-09-21",
  heading: "An agent that drafts and schedules your posts from a channel.",
  lede: "Your team asks for a post in the channel they already work in. The agent drafts it in Typefully, and it joins the queue once a named person approves it. Every batch comes back as one summary of what went out.",
  authority:
    "It acts behind an approval gate. Reading the ask, drafting the post and reporting the batch needs nobody, and every draft then stops.",
  gate: "The gate sits before a post joins the queue. A queued post goes out under your name at its time, so a named person reads the draft and approves it.",
  steps: [
    {
      title: "Takes the ask in the channel",
      body: "A person addresses the agent by name in Slack and says what the post is about and for which account. Anything the ask leaves out, the agent asks back in the same channel.",
    },
    {
      title: "Drafts in Typefully",
      body: "The draft goes into Typefully as a draft, in the length and shape that account posts in. Nothing is scheduled yet.",
    },
    {
      title: "Queues once a name approves",
      body: "The draft comes back to the channel for a name. Approved, the agent puts it in the Typefully queue; sent back with changes, it drafts again.",
    },
    {
      title: "Reports the batch",
      body: "When a batch has gone out, one message in the channel says which posts went out and when, and what is still waiting for a name.",
    },
  ],
  systems: [
    {
      name: "Slack",
      role: "Where your team asks, and where every draft comes back for a name. Slack delivers the button press that moves a draft into the queue.",
    },
    {
      name: "Typefully",
      role: "Where the draft is written and, once approved, queued. The agent writes into the drafts and the queue, and nothing else there.",
    },
  ],
  subject: "Social scheduling",
  more: "How a post gets drafted and queued",
};

export const supportTicketTriage: JobPage = {
  path: "/support-ticket-triage",
  title: "Support ticket triage agent",
  description:
    "Support ticket triage, run by a standing agent: every new ticket read and grouped, a reply drafted where the answer is known, a GitHub issue where it is a bug.",
  date: "2026-09-21",
  heading: "An agent that reads every support ticket before your team does.",
  lede: "Every new ticket in Zendesk or Intercom is read and grouped as it arrives. Where the answer is already written down, the reply is drafted in the ticket and waits for a name. Where the ticket is a bug, it is filed as a GitHub issue.",
  authority:
    "It acts behind an approval gate. Reading the ticket, grouping it, drafting the reply and filing the issue needs nobody, and every reply then stops.",
  gate: "The gate sits before a reply reaches your customer. A drafted reply waits in the ticket, and a named person on your support team reads it and sends it. An issue in your own repository crosses no gate.",
  steps: [
    {
      title: "Reads the ticket as it arrives",
      body: "The new ticket wakes the agent. It reads what the customer wrote and what your team has already told that customer.",
    },
    {
      title: "Groups it with the tickets like it",
      body: "A question your help centre answers, a bug three people have hit this morning and a request nobody has seen before are three different queues. The agent puts the ticket in the one it belongs to.",
    },
    {
      title: "Drafts the reply where the answer is known",
      body: "Where the answer is already written down, in your help centre or in a reply your team sent before, the agent writes it into the ticket as a draft, in your team's own wording. The draft waits for a name.",
    },
    {
      title: "Files the bug",
      body: "Where the ticket is a bug, the agent opens an issue in your GitHub repository: what the customer did, what happened, and which tickets report it. A bug three people report is one issue with three tickets on it.",
    },
  ],
  systems: [
    {
      name: "Zendesk or Intercom",
      role: "The new ticket wakes the agent, and this is where it reads, groups and drafts. Every draft waits here, unsent, for a named person.",
    },
    {
      name: "GitHub",
      role: "Where a bug becomes an issue in your own repository, linked back to every ticket that reports it. Your engineers read it where they already work.",
    },
  ],
  subject: "Support ticket triage",
  more: "How the triage works",
};

export const failedPaymentRecovery: JobPage = {
  path: "/failed-payment-recovery",
  title: "Failed payment recovery agent",
  /* The description leads with the phrase a buyer types, because a result is
   * read left to right. The title carries the same words. */
  description:
    "Failed payment recovery, run by a standing agent: every charge Stripe failed comes back as a drafted message that waits for your approval.",
  date: "2026-09-21",
  heading: "An agent that works last night's failed payments.",
  lede: "Every charge Stripe failed overnight comes back as one summary, with a drafted message per customer waiting in your outbox. Nothing reaches a customer until a named person approves it.",
  authority:
    "It acts behind an approval gate. Reading Stripe, sorting the failures and writing the drafts needs nobody, and every draft then stops.",
  gate: "The gate sits before a message leaves your company. A follow-up reaches your customer, so a named person reads it and sends it.",
  steps: [
    {
      title: "Reads the night's failures",
      body: "The failed charge itself wakes the agent. It reads the amount, the reason the card gave, the invoice behind it and how long that customer has been paying you.",
    },
    {
      title: "Sorts them by what went wrong",
      body: "An expired card, a bank that declined once and a subscription on its fourth retry are three different messages. The agent groups the night before it writes anything.",
    },
    {
      title: "Drafts one message per customer",
      body: "Each draft names the invoice, the amount and the next retry, in the wording your team already uses. They wait in your outbox, unsent.",
    },
    {
      title: "Reports the night in one place",
      body: "One summary in the channel your finance team already works in: how many charges failed, how much is waiting, and which drafts need a name.",
    },
  ],
  systems: [
    {
      name: "Stripe",
      role: "The event that wakes the agent, and where it reads the failed charge, the decline reason, the invoice and the retry schedule.",
    },
    {
      name: "Your outbox",
      role: "Where every draft waits, under the address your customers already hear from. The agent writes the draft and stops there.",
    },
  ],
  subject: "Failed payment recovery",
  more: "How the follow-up works",
};

export const shopifyOperations: JobPage = {
  path: "/shopify-operations",
  title: "Shopify operations agent",
  description:
    "Shopify operations, run by a standing agent: stock, pricing and order exceptions watched on a schedule, and the ones that need a decision brought to a person.",
  date: "2026-09-21",
  heading: "An agent that watches your store, so a person sees only the exceptions.",
  lede: "On the schedule you set, the agent reads your Shopify store for what is out of line: stock running low, a price outside the range you set, an order that stalled. It reports what it found in one place and brings the ones that need a decision to a named person.",
  authority:
    "It reads and reports. Nothing in your store changes because the agent looked: it reads Shopify, sorts what it found and writes one summary. Every change is a person's to make.",
  gate: "The gate sits in front of every change to the store, and this agent stops there every time. An exception that needs a decision comes to a named person with the product, the order or the price it concerns and the choices open, and that person makes the change in Shopify.",
  steps: [
    {
      title: "Reads the store on a schedule",
      body: "At the times you set, the agent reads Shopify: inventory levels, product prices and the orders that changed since it last looked.",
    },
    {
      title: "Sorts what is out of line",
      body: "Stock below the level you set, a price outside the range you set, an order that has not moved in the time you set. What counts as an exception is written in the spec with you, and the agent applies that and nothing else.",
    },
    {
      title: "Reports what it found in one place",
      body: "One message in the channel your operations team already works in: what it read, what it found out of line, and which of those need a decision.",
    },
    {
      title: "Brings a decision to a person",
      body: "An exception that needs a decision comes to a named person with everything the decision needs: the product, the order or the price, and what the choices are. The change is that person's to make, in Shopify.",
    },
  ],
  systems: [
    {
      name: "Shopify",
      role: "The store it reads: inventory, products and their prices, and orders. The agent reads, and writes nothing back.",
    },
  ],
  subject: "Shopify operations",
  more: "How the store is watched",
};

export const jobs: Job[] = [
  {
    title: "Brief to published post",
    systems: "Notion, your CMS",
    body: "A brief goes in, a drafted and edited page comes back, and publishing waits for a name.",
    page: contentPublishing,
  },
  {
    title: "Draft and schedule",
    systems: "Slack, Typefully",
    body: "Your team asks in a channel. The agent drafts, queues and reports what the last batch did.",
    page: socialScheduling,
  },
  {
    title: "Support triage",
    systems: "Zendesk or Intercom, GitHub",
    body: "Every new ticket gets read, grouped and answered where the answer is known, and filed as an issue where it is a bug.",
    page: supportTicketTriage,
  },
  {
    title: "Failed-payment follow-up",
    systems: "Stripe, your outbox",
    body: "Overnight failures come back as a summary and a drafted message per customer. Sending needs a signature.",
    page: failedPaymentRecovery,
  },
  {
    title: "Store operations",
    systems: "Shopify",
    body: "Stock, pricing and order exceptions watched on a schedule, with the ones that need a decision brought to a person.",
    page: shopifyOperations,
  },
];

/* The jobs that have a page, in the order the lists print them. A crawler
 * reads these the way it reads a page we write by hand: `indexablePages`
 * carries them, so a job page added above is in the sitemap, in `llms.txt`
 * and under the test suite in that one edit. */
export const jobPages: JobPage[] = jobs.flatMap((job) => job.page ?? []);

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
  heading: "What AI agent development costs",
  lede: "A build price is a floor, because the work follows the number of systems your agent touches. Every monthly price buys the evals, the changes and the report.",
};

export const prices = [
  {
    title: "Self-run",
    body: "We build your agent, deploy it into your own accounts and hand over the keys. Your team runs it and your engineers sign the merges.",
    amount: "From €7,500",
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
    amount: "From €7,500",
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
    amount: "From €10,000",
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
    amount: "From €4,000",
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

/* The ways to buy the site prints today. A plan that prices a ready-made
 * product waits until the catalogue holds one: see the Catalogue entry in
 * CONTEXT.md. The home page prints this list and its graph offers it, and the
 * terms state what it buys, so none of the three can state a plan the others
 * do not. */
export const openPrices = prices.filter((plan) => !plan.catalogue || products.length > 0);

/* One question the home page answers, in the words it prints. The page renders
 * this list and the graph marks the same list up as questions and answers, so
 * neither can state a question the other leaves out. */
export type Question = { q: string; a: string };

export const questions: Question[] = [
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
 * The page records
 *
 * One record per page, and the one place that page's path, title, description
 * and copy date are written. Everything a machine reads about the page is
 * derived from the record: `src/app/head-directives.ts` builds the page's
 * metadata from it, `src/app/structured-data.ts` builds the nodes the page
 * adds to the graph, and `src/app/sitemap.ts` builds its sitemap entry. The
 * test suite walks the same list. Adding a page is therefore one record here
 * and one route file, which the Adding a page section of README.md sets out.
 *
 * A title is the page's own, and `pageMetadata` puts the brand after it, the
 * way a search result reads. A result prints about 60 characters of the title
 * and about 160 of the description, and cuts the rest, so both stay under
 * those counts and `tests/head.test.ts` measures what the export emits. A
 * title also leads with the words a buyer types, because a result is read
 * left to right and the brand is the part nobody searches for.
 *
 * A date is the day that page's copy last changed, written YYYY-MM-DD. It
 * comes from the page file's history, `git log -1 --date=short -- <file>`, so
 * editing the words on a page means editing its date in the same commit.
 * Nothing else sets it: a date stamped at build time tells a crawler that
 * every page changed on every deploy, and a crawler that learns our dates are
 * worthless stops reading them.
 * ------------------------------------------------------------------------- */
export type PageRecord = {
  /* The path a crawler asks for, as the canonical URL states it. */
  path: string;
  /* The page's own title, which is also the name its node carries in the
   * graph and the crumb a reader follows back. */
  title: string;
  /* The sentence under the title in a search result, and in an unfurl. */
  description: string;
  /* The day the copy on this page last changed. */
  date: string;
};

/* The home page. Its title is stated whole, brand and all, because it is the
 * site's title as well: the manifest, the unfurl image and the not-found page
 * all take it, and `pageMetadata` adds no brand to it a second time. It
 * therefore spells out the separator the other pages get from `pageMetadata`,
 * and it reaches further than a search result: the manifest name, the unfurl
 * title and the unfurl image's alt text all read this one string.
 *
 * The title leads with "AI agent development company", which is what a buyer
 * types and what every competing page in this category is titled. The brand
 * follows it: two other companies crowd the name in search, so leading with
 * it wins a reader we already have. "Software factory on demand" is still the
 * promise, and `CONTEXT.md` still fixes it, but no page states it in words
 * now: the unfurl image draws it, and that is the only place it is written. */
export const homePage: PageRecord = {
  path: "/",
  title: `AI agent development company | ${brand}`,
  description: `An AI agent development company in ${location.city}, ${location.country}. We build one standing agent for one company, deploy it into your own accounts and keep it right.`,
  date: "2026-09-21",
};

/* The custom door. Its description is its own sentence rather than the lede
 * the page prints: one string cannot both open a page and fit a search
 * result, and the lede is 181 characters long. */
export const customPage: PageRecord = {
  path: "/custom",
  title: "Custom AI agent development",
  description:
    "Custom AI agent development for work that matches nothing on a shelf. Describe it and get a short spec and a fixed price within one working day.",
  date: "2026-09-21",
};

/* The pages a buyer reads before a first call. They state no offer, they
 * carry no promotional copy, and they stay out of the header, which carries
 * the doors a reader walks through. The footer links the list from every
 * page, which is where a reader looks for them, and the suite walks the same
 * list, so a fourth one of these is a record here and a route file. */
export const privacyPage: PageRecord = {
  path: "/privacy",
  title: "Privacy",
  description:
    "What this site collects, who processes it, how long it is kept, and how to ask us to delete it.",
  date: "2026-09-21",
};

export const termsPage: PageRecord = {
  path: "/terms",
  title: "Terms of service",
  description:
    "What a build buys, what the monthly work covers, and the terms both sides work to.",
  date: "2026-09-21",
};

export const imprintPage: PageRecord = {
  path: "/imprint",
  title: "Imprint",
  description:
    "The company behind this site: legal name, registration code, VAT number, registered address and director.",
  date: "2026-09-21",
};

/* The contact page: the two ways to reach us, what follows a message, and who
 * the reader is writing to. It prints no price, so it states no offer. The
 * footer links it from every page, next to the mailbox, because that is where
 * a reader looks for a way in. Its own mailto carries `contactSubject`, so a
 * click on it is counted under this door. */
export const contactPage: PageRecord = {
  path: "/contact",
  title: "Contact",
  description:
    "Book a call or write to KastProductions. What you get within one working day of writing, and the registered company you are writing to.",
  date: "2026-09-21",
};
export const contactSubject = "Contact page";

export const legalPages: PageRecord[] = [privacyPage, termsPage, imprintPage];

/* The explainers: one page each on one part of the mechanism, written for the
 * reader who searches the part rather than the company. An explainer sells
 * nothing and prints no price, so the graph suite's list of pages that state
 * no offer reads this list beside `legalPages`. It stays out of the header
 * and the footer: the home page hands a reader on to it from the section it
 * explains. A second explainer is a record here and a route file.
 *
 * The eval suite page targets "AI agent eval suite". A buyer who has been
 * offered an autonomous agent and asks how anyone knows it is right types
 * the word the field uses for that, and no competing page in this category
 * answers it. The title leads with the phrase; the heading on the page reads
 * in the site's voice, the way `mechanismIntro.heading` does. */
export const evalSuitePage: PageRecord = {
  path: "/eval-suite",
  title: "AI agent eval suite: what correct means",
  description:
    "What an AI agent eval suite is: the written definition of correct for one agent, run on every change, and what we do when correct cannot be written down.",
  date: "2026-09-21",
};

export const explainerPages: PageRecord[] = [evalSuitePage];

/* The page that says who is behind the work: the founder, the companies he
 * has shipped for and the six references, which live on this page and not on
 * the home page. Its title leads with his name, which is what a buyer
 * checking who signs the merge types into a search engine, and the founder
 * node in the graph points here. It states no offer. */
export const aboutPage: PageRecord = {
  path: "/about",
  title: `${founder}, founder`,
  description: `${founder} founded ${brand} in ${location.city} and signs the merges we make. Seventeen companies he has shipped for, and six references quoted as written.`,
  date: "2026-09-21",
};

/* The pages we write by hand, as against the product pages the catalogue
 * makes. */
export const writtenPages: PageRecord[] = [
  homePage,
  customPage,
  ...legalPages,
  ...explainerPages,
  aboutPage,
  contactPage,
];

/* The record of a product's page. A product already states its slug, its
 * name, its promise and the day its copy changed, so its page record is read
 * off the catalogue rather than written a second time. */
export function productPage(product: Product): PageRecord {
  return {
    path: `/${product.slug}`,
    title: product.name,
    description: product.promise,
    date: product.date,
  };
}

/* Every page a crawler should index: the pages we write by hand, then the
 * jobs that have a page of their own, then one page per product in the
 * catalogue. The sitemap walks this list and so does the suite, so a page
 * added above is listed for a crawler and guarded by the suite in that one
 * edit. A page that is not here has no sitemap entry, and nothing watching
 * its canonical, its title, its description or its unfurl image. */
export const indexablePages: PageRecord[] = [
  ...writtenPages,
  ...jobPages,
  ...products.map(productPage),
];
