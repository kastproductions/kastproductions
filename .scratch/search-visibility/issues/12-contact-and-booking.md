# A visitor can book without writing an email

Status: ready-for-agent
Source: GitHub issue #19, opened on 2026-09-20.

## What to build

Every call to action on the site opens a mail client. The booking URL is deliberately empty, because a dead link costs more than a mailto, and the contact URL redirects to an anchor. A visitor who wants a call has to compose an email, and nobody can tell how many decide not to.

Give them a page with a real booking link on it, and the company details a buyer checks before sending money.

## Acceptance criteria

- [ ] A contact page answers 200 with a working booking link, the mailbox, and the company's legal identity and location.
- [ ] The booking URL is configured in one place, and every "Book a call" uses it. The mailto stays only as the fallback when no URL is set.
- [ ] The redirect from the retired contact URL is removed.
- [ ] The page is in the sitemap with its copy date, and carries its canonical URL, unfurl image and graph nodes.

## Blocked by

- `01-page-records.md`
