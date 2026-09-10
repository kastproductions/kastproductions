export const brand = "KastProductions";
export const siteUrl = "https://www.kastproductions.com";
export const contactEmail = "hello@kastproductions.com";
/* Every call to action is a mailto, because the site is a static export with no
 * runtime. The subject says which door the reader came through, which is both
 * our only analytics on this page and a machine-readable first line for @brief. */
export const mailtoFor = (subject: string) =>
  `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`;
export const callHref = mailtoFor("First call");
export const briefHref = mailtoFor("New brief");
export const founder = "Karolis Stulgys";
/* Public profiles that link back to this site. Search engines use them to tie the founder to the brand. */
export const founderProfiles = ["https://github.com/kstulgys", "https://x.com/imkarolis"];
export const founderHandle = "@imkarolis";
export const location = { city: "Vilnius", country: "Lithuania", countryCode: "LT" };

/* Search snippet copy. Title stays close to 60 characters, description under 160. */
export const title = `${brand}: software factory on demand`;
export const description = `Software factory on demand in ${location.city}, ${location.country}. Coding agents work your backlog. We build one standing agent for your team. A named engineer signs every merge.`;

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

export const reasons = [
  {
    title: "Speed you can audit",
    body: "A run finishes in hours. The run record holds every tool call, test result and decision. When you ask why the coding agents chose an approach, the run record has the answer.",
  },
  {
    title: "A named engineer reads every diff",
    body: "Coding agents are fast and confident, including when they are wrong. A named engineer reads every diff before it merges. That engineer rejects anything they would not have written.",
  },
  {
    title: "Your repository, your rules",
    body: "We work in your repository, on your branches, through your CI. Nothing runs outside the conventions your team already has. You own every line from the first commit.",
  },
];

export const method = [
  {
    title: "Brief",
    body: "You send an issue with the problem, the acceptance criteria, and any constraints. We turn it into a short spec with a fixed price.",
    you: "approve the spec, usually the same day.",
  },
  {
    title: "Plan",
    body: "A coding agent reads your codebase and writes a plan. The plan lists the files to change, the tests to add and the risks. A named engineer edits the plan before anything runs.",
    you: "nothing, unless the plan changes the scope.",
  },
  {
    title: "Build",
    body: "Coding agents implement the plan on a branch and run your test suite. Every tool call and decision goes into the run record as they work.",
    you: "watch the run stream live if you like.",
  },
  {
    title: "Review",
    body: "A named engineer reads the whole diff and requests changes. The coding agents run again until the diff is right. Nothing merges without that signature.",
    you: "review as well, or leave it to us.",
  },
  {
    title: "Ship",
    body: "We merge and deploy through your pipeline. Then we attach the run record to the issue.",
    you: "get a two-paragraph summary and the full run record.",
  },
];

/* Placeholder runs. Replace with real ones before launch. */
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

export const plans = [
  {
    title: "Sprint",
    body: "One brief, two weeks, one fixed price. Good for a feature you have been putting off or a migration nobody wants to start.",
    price: "From €6,000",
    per: "per sprint",
    includes: [
      "Spec and fixed price within one working day",
      "Plan, build, review and ship, with every run recorded",
      "30-day fix window on anything we merged",
    ],
    cta: "Start with a brief",
    subject: "Backlog runs: Sprint",
    buttonStyle: "button--ink",
  },
  {
    title: "Embedded",
    body: "Our coding agents and one of our engineers on your backlog, month to month. Good for teams that want to ship weekly without hiring.",
    price: "From €10,000",
    per: "per month",
    includes: [
      "As many briefs as the capacity allows, prioritised with you weekly",
      "Runs in your repository, your CI, your review process",
      "Cancel at the end of any month",
    ],
    cta: "Ask about Embedded",
    subject: "Backlog runs: Embedded",
    buttonStyle: "button--outline",
  },
];

export const questions = [
  {
    q: "Who owns the code?",
    a: "You do. We write everything in your repository, under your licence, from the first commit. We keep nothing except the run records, and you get those too.",
  },
  {
    q: "Which models and tools do you use?",
    a: "Whichever fit the job, and we tell you which. Every model call and tool call is in the run record. We choose providers that never train on your code or data.",
  },
  {
    q: "What happens when a coding agent gets it wrong?",
    a: "The reviewer catches it. No change merges without a named engineer reading the whole diff. The review comments are part of the run record. If a bug we merged reaches production, we fix it at no charge.",
  },
  {
    q: "Can we watch a run while it happens?",
    a: "Yes. Each run streams live while it works. When it merges, we attach the full run record to the issue.",
  },
  {
    q: "Do you work in our stack?",
    a: "Most likely. We work in TypeScript, Python, Go, Ruby and Rust, on codebases of any age. Send the repository and we answer within one working day.",
  },
];

/* ---------------------------------------------------------------------------
 * Standing agents
 *
 * The second service line: we build one agent for one company, deploy it into
 * that company's own accounts, and operate it month to month. The vocabulary is
 * fixed in CONTEXT.md, the claim order in docs/adr/0003, the scope rule in
 * docs/adr/0002, and what may be stated as fact in the Claims section of
 * README.md.
 * ------------------------------------------------------------------------- */

export const standingIntro = {
  heading: "What fits everything fits nothing",
  lede: "A generic agent knows your tools. It does not know how your company works. We build one standing agent for one company, on the workflow that company already has. We keep it right after it goes live. What you choose is how much authority it gets.",
};

/* Labelled as an example until @brief is live in our own Slack. Then this
 * becomes a screenshot of a real exchange and the label comes off. */
export const mention = {
  label: "Example",
  channel: "#payments",
  handle: "@atlas",
  ask: "summarise last night's failed payments and draft the follow-up to each customer",
  reply: "Nine payments failed after 21:00, four of them over EUR 500. Nine drafts are ready in your outbox.",
  gate: "Sending reaches your customers, so it needs a name on it.",
  approve: "Approve and send",
};

export const channels = {
  primary: ["Slack", "Microsoft Teams"],
  others: [
    "Discord",
    "Telegram",
    "SMS",
    "iMessage",
    "GitHub",
    "Linear",
    "your own web app",
  ],
  teamsNote:
    "Teams needs one step that Slack does not: an Azure Bot registration and an app password stored in your project. We do that work and quote it as its own line.",
};

/* The idiom heads the standing agents section on the home page. The deep page
 * already carries the fit claim in its headline, so its own fit section is
 * named after what the five dimensions are. */
export const fitIntro = {
  heading: "What we shape your standing agent to",
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
    body: "One of our engineers owns your agent and answers inside business hours. Your agent runs in your cloud account, so its uptime is your platform's. We do not promise uptime for software we do not run.",
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

export const ladder = {
  heading: "The four tiers",
  lede: "The tier is the authority you hand over. The price follows that authority. It also follows the number of subagents behind the one name, and the number of systems your agent touches.",
  /* The one price the home page quotes for this line. It is the Reporter row
   * below, written as a sentence, and it moves when that row moves. */
  entry: "The smallest tier starts at €6,000, then €900 a month.",
  kitNote:
    "A starting kit is where a build starts. You buy the finished standing agent. Adapting a kit takes four jobs. We rewrite its instructions around your workflow. We connect it to your systems and set the approval policy. Then we write the eval suite that says what correct means for you.",
};

/* Prices are real evidence and must not be invented: see the Claims section of
 * README.md. The build price is a floor, because the work follows the number of
 * systems the agent touches. The monthly price buys the work in `mechanism`:
 * the evals, the changes and the report. */
export const tiers = [
  {
    name: "Reporter",
    promise: "Reads your systems and tells you what happened.",
    boundary: "A Reporter never acts on your systems.",
    prices: [
      { amount: "From €6,000", per: "to build" },
      { amount: "From €900", per: "a month to operate" },
    ],
    includes: [
      "One agent, one channel, no subagents",
      "Read-only access to the systems you name",
      "Summaries on a schedule, or answers on demand",
      "A spend cap for every session, agreed with you",
    ],
    kits: [
      {
        name: "eve-sre-agent-template",
        url: "https://github.com/vercel-labs/eve-sre-agent-template",
        note: "Vercel's incident-response template. Slack-native, no subagents, read-only by default.",
      },
    ],
    buttonStyle: "button--outline",
  },
  {
    name: "Operator",
    promise: "Does the tasks your team hands it, and stops before anything reaches a customer.",
    boundary:
      "An Operator never takes an outward action without a named person approving it.",
    prices: [
      { amount: "From €14,000", per: "to build" },
      { amount: "From €1,800", per: "a month to operate" },
    ],
    includes: [
      "One agent with a small number of subagents",
      "Write access to the systems you name, behind approval gates",
      "Its own skills, written from your workflow",
      "An eval suite covering the tasks it owns",
    ],
    kits: [
      {
        name: "eve-content-agent-template",
        url: "https://github.com/vercel-labs/eve-content-agent-template",
        note: "Vercel's content template. Two subagents, drafts into Notion, deterministic style checks.",
      },
    ],
    buttonStyle: "button--ink",
  },
  {
    name: "Department",
    promise: "Runs one whole function of your company, with subagents behind one name.",
    boundary:
      "A Department owns a function and still stops at the same gate. Nothing reaches a customer without a named approval.",
    prices: [
      { amount: "From €30,000", per: "to build" },
      { amount: "From €3,500", per: "a month to operate" },
    ],
    includes: [
      "A lead agent and its subagents, each with its own tools and sandbox",
      "Several connected systems, each with its own permissions",
      "Unattended work on a schedule, with the failure path written down",
      "An eval suite per subagent, run on every change we make",
    ],
    kits: [
      {
        name: "eve-software-factory-template",
        url: "https://github.com/vercel-labs/eve-software-factory-template",
        note: "Vercel's issue-to-pull-request template. Five subagents take an issue to a reviewed draft.",
      },
      {
        name: "marketing-team-eve-template",
        url: "https://github.com/vercel-labs/marketing-team-eve-template",
        note: "Vercel's marketing template. A lead routes work to five subagents and hands back the result.",
      },
    ],
    buttonStyle: "button--outline",
  },
  {
    name: "Bespoke",
    promise:
      "Describe the work. You get a short spec and a fixed price within one working day.",
    boundary: "For work that fits none of the three tiers above.",
    prices: [{ amount: "From €40,000", per: "to build" }],
    includes: [
      "A spec and a fixed price within one working day",
      "The same terms: your accounts, your keys, your code from the first commit",
      "The same mechanism: evals, approval gates, a named engineer",
    ],
    kits: [],
    buttonStyle: "button--outline",
  },
];

export const stack = {
  heading: "What we build your standing agent on",
  body: "We build on eve, the open-source agent framework Vercel develops. We deploy your agent as an ordinary project in your own Vercel account. If you do not run on Vercel, we build on the AI SDK and deploy where you already are. We resell nothing: the account, the keys and the code are yours.",
  links: [
    { label: "eve", url: "https://eve.dev" },
    {
      label: "the AI SDK path",
      url: "https://github.com/vercel-labs/open-agents",
    },
  ],
};

export const standingQuestions = [
  {
    q: "Who owns the standing agent?",
    a: "You do. It lives in your repository and deploys into your own accounts, with your model keys. Stop paying us and your agent keeps running. What stops is our work on it.",
  },
  {
    q: "What stops it spending our money overnight?",
    a: "Every session has a spend cap that we agree with you. A session that reaches the cap stops and asks you. A session running unattended stops and reports.",
  },
  {
    q: "Who approves what the agent does?",
    a: "We approve changes inside your agent's own repository and deployment. A named person at your company approves every outward action. That covers anything reaching a customer, an inbox, a published page or a payment. Our name never goes on something your customers see.",
  },
  {
    q: "Do you promise uptime?",
    a: "No, and nobody honestly can for software running in your own cloud account. We promise four things. A named engineer. An answer inside business hours. A green eval suite on every change we make. A monthly report of what your agent did.",
  },
  {
    q: "Can it live in Microsoft Teams?",
    a: "Yes. Teams needs one step that Slack does not: an Azure Bot registration and an app password stored in your project. We do that work and quote it as its own line.",
  },
  {
    q: "Can one standing agent answer to several names?",
    a: "No. One agent is one deployment with one name. A second name is a second agent, a second build and a second monthly line. One agent can still run several subagents behind its single name.",
  },
  {
    q: "How do we know it is working?",
    a: "We write an eval suite for every agent: the written definition of correct, run on every change we make. You can read it. Sometimes we cannot write down what correct means for something you want. We tell you that before we build it.",
  },
  {
    q: "Why not clone a public template ourselves?",
    a: "You can, and we link the starting kits we begin from. The kit is the easy part. The work is shaping it to your workflow, setting the approval policy and writing the eval suite. Then keeping your agent current as eve moves under it.",
  },
];
