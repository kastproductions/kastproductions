import type { CSSProperties, ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

type DiffLine = { kind: "add" | "del"; text: string };

type Step = {
  datetime: string;
  label: string;
  title: ReactNode;
  detail?: ReactNode;
  diff?: DiffLine[];
};

/* One run, start to merge. Each step settles in at its --i on page load. */
const STEPS: Step[] = [
  {
    datetime: "PT0S",
    label: "00:00",
    title: "Read the issue and its acceptance criteria",
    detail: "3 criteria, 1 constraint: exports must use the account timezone",
  },
  {
    datetime: "PT41S",
    label: "00:41",
    title: "Wrote a plan; Priya approved it with one edit",
    detail: "4 files, 1 new module, 6 tests. Edit: stream rows instead of buffering",
  },
  {
    datetime: "PT6M12S",
    label: "06:12",
    title: (
      <>
        Implemented <code>invoices/export.py</code> and the route
      </>
    ),
    detail: (
      <>
        <span className="font-mono text-[0.92em]">+214 −38</span> across 4 files
      </>
    ),
    diff: [
      { kind: "del", text: "-    rows = list(query.all())" },
      { kind: "del", text: "-    return render_csv(rows)" },
      { kind: "add", text: "+    def rows():" },
      { kind: "add", text: "+        for invoice in query.yield_per(500):" },
      { kind: "add", text: "+            yield to_row(invoice, tz=account.timezone)" },
      {
        kind: "add",
        text: '+    return stream_csv(rows(), filename=f"invoices-{today}.csv")',
      },
    ],
  },
  {
    datetime: "PT7M3S",
    label: "07:03",
    title: "Ran the test suite",
    detail: <span className="font-mono text-[0.92em]">53 passed, 0 failed, 0 skipped</span>,
  },
  {
    datetime: "PT7M20S",
    label: "07:20",
    title: "Opened PR #88 and assigned Priya for review",
  },
  {
    datetime: "PT31M5S",
    label: "31:05",
    title: "Review: one change requested, fixed, tests re-run",
    detail: "Timezone was missing from the column header",
  },
  {
    datetime: "PT42M18S",
    label: "42:18",
    title: "Merged by Priya",
    detail: "Full record attached to ACME-212",
  },
];

const head = { "--i": 0 } as CSSProperties;

export function RunRecord() {
  return (
    <figure
      aria-labelledby="run-title"
      className="overflow-hidden rounded-xl border bg-card text-[0.88rem] shadow-plate"
    >
      <figcaption
        className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b bg-secondary px-5 py-3.5"
        style={head}
      >
        <span className="font-heading text-[0.88rem] font-bold" id="run-title">
          Run 4127
        </span>
        <span className="font-mono text-[0.78rem] text-faint">
          ACME-212: Add CSV export to invoices
        </span>
        <Badge variant="signal">Example</Badge>
        <span className="ml-auto inline-flex items-center gap-1.5 font-heading text-[0.78rem] font-bold text-pass">
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-pass shadow-[0_0_0_3px_var(--pass-tint)]"
          />
          Merged
        </span>
      </figcaption>
      <ol className="divide-y divide-hairline">
        {STEPS.map((step, index) => (
          <li
            className="grid grid-cols-[3.2rem_minmax(0,1fr)] gap-3 px-5 py-3 [--rise-delay:calc(var(--i,0)*120ms_+_100ms)] [--rise-duration:0.6s] motion-safe:animate-rise"
            key={step.datetime}
            style={{ "--i": index + 1 } as CSSProperties}
          >
            <time className="pt-0.5 font-mono text-[0.78rem] text-faint" dateTime={step.datetime}>
              {step.label}
            </time>
            <div>
              <b className="block font-semibold">{step.title}</b>
              {step.detail ? (
                <small className="mt-0.5 block text-[0.8rem] text-muted-foreground">
                  {step.detail}
                </small>
              ) : null}
              {step.diff ? (
                <Collapsible className="mt-1.5">
                  <CollapsibleTrigger className="font-heading text-[0.8rem] font-semibold text-signal-foreground">
                    Show six lines of the diff
                  </CollapsibleTrigger>
                  <CollapsibleContent hiddenUntilFound>
                    <pre
                      aria-label="Diff, scrolls sideways"
                      className="mt-2 overflow-x-auto rounded-lg border border-hairline bg-background px-3.5 py-2.5 font-mono text-[0.78rem] leading-[1.55]"
                      role="region"
                      tabIndex={0}
                    >
                      {step.diff.map((line) => (
                        <span
                          className={cn(
                            "-mx-1.5 block px-1.5",
                            line.kind === "add"
                              ? "bg-pass-tint text-pass"
                              : "bg-halt-tint text-destructive",
                          )}
                          key={line.text}
                        >
                          {line.text}
                        </span>
                      ))}
                    </pre>
                  </CollapsibleContent>
                </Collapsible>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
