# Triage labels

The skills speak in terms of five canonical triage roles. This file maps those roles to
the strings used in this repo's issue tracker. Issues here are markdown files, so a label
is the value of the `Status:` line near the top of the file.

| Label in mattpocock/skills | Label in our tracker | Meaning                                  |
| -------------------------- | -------------------- | ---------------------------------------- |
| `needs-triage`             | `needs-triage`       | Maintainer needs to evaluate this issue  |
| `needs-info`               | `needs-info`         | Waiting on reporter for more information |
| `ready-for-agent`          | `ready-for-agent`    | Fully specified, ready for an AFK agent  |
| `ready-for-human`          | `ready-for-human`    | Requires human implementation            |
| `wontfix`                  | `wontfix`            | Will not be actioned                     |

When a skill mentions a role, for example "apply the AFK-ready triage label", write the
corresponding string from this table to the issue file's `Status:` line.

Edit the right-hand column to match whatever vocabulary you actually use.
