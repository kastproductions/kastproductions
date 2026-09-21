# Search Console and Bing know the site

Status: ready-for-human
Source: GitHub issue #9, opened on 2026-09-20.

## What to build

The site was re-cut on 13 and 20 September 2026. A search for the brand still returns the previous positioning, "AI-Native Product Studio", because no search engine has recrawled since. There is no property to ask for a recrawl through, no coverage report to read, and no field data on Core Web Vitals reaching anybody.

The apex domain holds a Zoho verification record and an SPF record, and nothing from Google or Bing. Verify both, submit the sitemap, and ask for a recrawl of the two live pages.

This one needs DNS access and a Google account, so it carries no agent label.

## Acceptance criteria

- [ ] A Google verification TXT record resolves on the apex domain, and the Search Console property covers the www host.
- [ ] Bing Webmaster Tools holds a verified property for the same host.
- [ ] The sitemap is submitted in both tools, and both report the two current URLs as discovered.
- [ ] Indexing is requested for the home page and the custom page, and the search result title matches the current copy afterwards.
- [ ] The verification method and who holds the account are written down where the next person will look.

## Blocked by

- None (can start immediately).
