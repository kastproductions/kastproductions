# A Slack page answers the channel question

Status: done
Source: GitHub issue #23, opened on 2026-09-20.

## What to build

A buyer searching for this work as often names the channel as the job: an agent in Slack. The channels section lists seven places an agent is reachable and none of them has a page. Start with the one most people ask for.

## Acceptance criteria

- [x] A page for Slack answers 200, stating how a person addresses an agent there, what the approval gate looks like in a channel, and what the client provides.
- [x] It says plainly what Microsoft Teams needs that Slack does not, and links onward rather than duplicating the custom door.
- [x] It claims nothing beyond what the harness verifies.
- [x] Its title and description target the channel phrase, and it is linked from the channels section.
- [x] It is in the sitemap with its copy date, and carries its canonical URL, unfurl image and graph nodes.

## Blocked by

- `14-first-job-page.md`

## Comments

The page is `/slack`, and the phrase it targets is **AI agent for Slack**. "For" is what a buyer
types, even though the site's own voice says an agent is addressed *in* a channel, so the title
and the description carry the buyer's preposition and the heading carries ours. It competes with
none of the phrases taken so far: "AI agent development" (home), "custom AI agent development"
(the custom door), "failed payment recovery agent" (ticket 14), the four job phrases of ticket
15, "issue to pull request" (ticket 09) or the founder's name (ticket 11).

Decided, and the reasons:

- **A channel page is its own record and its own route file, not the job-page shape reused.** A
  `JobPage` carries an authority, steps, systems, a mail subject and the words two lists link it
  with, and `job-page.tsx` prints `custom.prices` for it. A channel page has none of that: no
  steps, no systems, no price, and one link from one section. Reusing the shape would have meant
  empty fields or a second component switching on kind, for one page. So `slackPage` is a
  `PageRecord` at the foot of `content.ts`, in `writtenPages`, and the prose is in the route file
  the way the legal pages write theirs. No abstraction: a second channel page is a second record
  and route, and the day there are three is the day to share markup.
- **The page prints no price and states no offer.** An agent in Slack is custom work, so a number
  here would be one the door already states; the price band says which door prices it and links
  it. The page is therefore in `statesNoOffer` in `tests/page-graph.test.ts`, beside the legal
  pages, and the offers test holds it to carrying no service node.
- **The link lives in `channels-section.tsx`, under the reachable list**, so it appears on every
  page that prints that section (home, the custom door, every job page) with one edit. The link
  words are `channels.slackMore` in `content.ts`, beside the copy they belong to. The Slack page
  itself does not print the channels section, because a section linking to the page it is on is
  a loop.
- **`tests/links.test.ts` holds the page to being reachable** from every page that prints the
  channels section, and to leading on to the custom door. A plausible bug fails it: drop the
  link from the section and the page is an orphan nothing else reports.
- **Mail subject: "Agent in Slack"**, so the analytics event names this door.

What Flue's documentation states, and where each sentence on the page comes from. Slack:
<https://flueframework.com/docs/ecosystem/channels/slack/>. Teams:
<https://flueframework.com/docs/ecosystem/channels/teams/>. Both are linked from the page.

- *Mention it by name*, *the thread is the session*, *a second mention continues the same
  session*: "verified app mentions reach a thread-scoped agent instance and replies return to
  the same thread"; the instance id is built from `teamId`, `channelId` and
  `event.thread_ts ?? event.ts`, so a later mention in the thread dispatches to the same
  instance.
- *A slash command, where you prefer one*: "Interactivity and slash-command callbacks are
  optional secondary additions"; the Slash commands surface at `/channels/slack/commands`.
- *A message with a button; Slack delivers the press*: the Interactions surface handles
  `block_actions`; "Interaction payloads preserve Slack's snake_case wire fields" (the `user` is
  in Slack's payload). The site already states "Slack delivers a button press" in `stack.ours`.
- *The policy is ours*: `stack.ours` on the home page, "The policy that holds an action back
  until a named person signs it is ours." The framework's documentation states no approval
  policy, and the page says so.
- *The agent cannot choose where it posts*: "Bind the destination in trusted code ... The model
  selects message text. It does not select arbitrary workspaces, channels, credentials, or Web
  API methods."
- *Two values, signing secret and bot token; Slack signs every request and the agent checks it
  first*: the Configure table, `SLACK_SIGNING_SECRET` "Required, verifies inbound request bytes"
  and `SLACK_BOT_TOKEN` "Required, authenticates outbound Slack Web API calls"; "Slack URL
  verification is answered internally after signature verification."
- *Runs in your own Cloudflare account or on Node.js*: "runs in Node and in Cloudflare Workers
  with Flue's required `nodejs_compat` setting"; matches `stack.body`.
- *Teams holds three values and one registration*: the Teams Configure table, `TEAMS_APP_ID`,
  `TEAMS_TENANT_ID` and `TEAMS_APP_PASSWORD`, all "Required"; "Set the Azure Bot messaging
  endpoint to: `https://example.com/channels/teams/activities`." The existing `teamsNote`
  ("an Azure Bot registration and an app password stored in your project") is consistent with
  this and the page prints it as written.
- *A person mentions it in a channel and it answers in that conversation*: "Teams bots receive
  channel messages when mentioned by default"; "the bound tool can post a reply to the same
  Connector service URL and thread."

One sentence I did not write: that the agent is added to some channels "and no others". Flue's
documentation does not state which channels deliver a mention, so the prerequisite says only
that the client names the channels the agent is to answer in.

Verified against `out/`: `/slack` is built, `sitemap.xml` lists it with `2026-09-21`, `llms.txt`
lists it with its description, the head carries the canonical, `og:url`, `og:image` and
`index, follow`, and the graph carries a WebPage with `dateModified` and a BreadcrumbList. The
built home, custom and failed-payment pages each link `/slack` from the channels section, and
`/slack` links `/custom`. Looked at with `agent-browser` at 390 px and 1440 px; the first draft's
price band was two buttons that stretched to the grid row height at desktop, replaced by the
note-and-pull-link pattern the job page uses. `bun run test`: 168 pass. `bun run lint`: clean.
