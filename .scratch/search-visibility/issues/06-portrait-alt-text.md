# Portraits name the person

Status: ready-for-agent
Source: GitHub issue #13, opened on 2026-09-20.

## What to build

The six reference portraits carry empty alternative text, so a reader who cannot see them, and a crawler reading the reference block, get the quote and the name but nothing tying the face to either. The files are also 176 pixels square and are displayed at 176 CSS pixels, which is soft on every 2x screen.

## Acceptance criteria

- [ ] Each portrait states the person's name and position as its alternative text.
- [ ] Each portrait file is 352 pixels square and stays under 12 KB.
- [ ] The reference block is unchanged in layout at 176 CSS pixels and is sharp on a 2x screen.
- [ ] The quotes and positions are untouched: they are other people's words.

## Blocked by

- None (can start immediately).
