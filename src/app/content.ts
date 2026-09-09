export const brand = "KastProductions";
export const siteUrl = "https://www.kastproductions.com";
export const contactEmail = "hello@kastproductions.com";
export const callHref = `mailto:${contactEmail}?subject=30-minute%20call%20with%20KastProductions`;
export const founder = "Karolis Stulgys";
/* Public profiles that link back to this site. Search engines use them to tie the founder to the brand. */
export const founderProfiles = ["https://github.com/kstulgys", "https://x.com/imkarolis"];
export const founderHandle = "@imkarolis";
export const location = { city: "Vilnius", country: "Lithuania", countryCode: "LT" };

/* Search snippet copy. Title stays close to 60 characters, description under 160. */
export const title = `${brand}: software by AI agents, reviewed by engineers`;
export const description = `Software development agency in ${location.city}, ${location.country}. AI coding agents work your backlog, a named engineer reviews every change, and you get the run record.`;

/* Seventeen companies the studio has shipped for, across three continents. */
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
    body: "A run finishes in hours. The run record holds every tool call, test result, and decision. When you ask why the agents built something a certain way, the answer is in the record.",
  },
  {
    title: "Review is the product",
    body: "Agents are fast and confident, including when they are wrong. A named engineer reads every diff before it merges and rejects anything they would not have written themselves.",
  },
  {
    title: "Your repository, your rules",
    body: "We work in your repository, on your branches, through your CI. Nothing runs outside the conventions your team already has. You own every line from the first commit.",
  },
];

/* Placeholder figures. Replace with real ones before launch. */
export const proof =
  "Since 2024 we have shipped 61 features for 9 clients. Median time from approved brief to merged pull request: 3.2 days.";

export const method = [
  {
    title: "Brief",
    body: "You send an issue with the problem, the acceptance criteria, and any constraints. We turn it into a short spec with a fixed price.",
    you: "approve the spec, usually the same day.",
  },
  {
    title: "Plan",
    body: "An agent reads your codebase and writes a plan: the files to change, the tests to add, and the risks it sees. An engineer edits the plan before anything runs.",
    you: "nothing, unless the plan changes the scope.",
  },
  {
    title: "Build",
    body: "Agents implement the plan on a branch and run your test suite. Every tool call and decision goes into the run record as they work.",
    you: "watch the run in a shared channel if you like.",
  },
  {
    title: "Review",
    body: "An engineer reads the whole diff and requests changes. The agents run again until the diff is right. Nothing merges without a named reviewer.",
    you: "review as well, or leave it to us.",
  },
  {
    title: "Ship",
    body: "We merge and deploy through your pipeline. Then we attach the run record to the issue.",
    you: "get a two-paragraph summary and the full run record.",
  },
];

/* Placeholder engagements. Replace with real ones before launch. */
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
    buttonStyle: "button--ink",
  },
  {
    title: "Embedded",
    body: "Our agents and one of our engineers on your backlog, month to month. Good for teams that want to ship weekly without hiring.",
    price: "From €10,000",
    per: "per month",
    includes: [
      "As many briefs as the capacity allows, prioritised with you weekly",
      "Runs in your repository, your CI, your review process",
      "Cancel at the end of any month",
    ],
    cta: "Talk about embedding",
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
    a: "Whichever fit the job, and we tell you which. Every model call and tool call is in the run record. Your code and data are never used to train a model.",
  },
  {
    q: "What happens when an agent gets it wrong?",
    a: "The reviewer catches it. No change merges without a named engineer reading the whole diff, and the review comments are part of the run record. If a bug we merged reaches production, we fix it at no charge.",
  },
  {
    q: "Can we watch a run while it happens?",
    a: "Yes. Each run streams to a shared channel as it works. When it merges, we attach the full run record to the issue.",
  },
  {
    q: "Do you work in our stack?",
    a: "Most likely. Recent runs have been in TypeScript, Python, Go, Ruby and Rust, on codebases from two months to twelve years old. Send the repository and we will tell you within a day.",
  },
];
