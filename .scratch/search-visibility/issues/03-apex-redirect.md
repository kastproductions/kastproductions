# The apex redirect is permanent

Status: ready-for-human
Source: GitHub issue #10, opened on 2026-09-20.

## What to build

The apex domain answers 307 to the www host. A 307 is temporary: it asks a crawler to keep both spellings alive rather than fold the apex into the canonical host. The http variants already answer 308, so this is the one hop out of step.

The change is in the host's domain settings, not in the repository, so this one carries no agent label.

## Acceptance criteria

- [ ] A request to the apex domain over https answers 308 and points at the www host.
- [ ] A request over http still reaches https before the host redirect, in no more than two hops.
- [ ] The status codes are checked with a request that prints them, and the result is recorded on this issue.

## Blocked by

- None (can start immediately).
