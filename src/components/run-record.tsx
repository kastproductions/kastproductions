import type { CSSProperties, ReactNode } from "react";

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
        <span className="mono">+214 −38</span> across 4 files
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
    detail: <span className="mono">53 passed, 0 failed, 0 skipped</span>,
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
    <figure className="run" aria-labelledby="run-title">
      <figcaption className="run__head" style={head}>
        <span className="run__title" id="run-title">
          Run 4127
        </span>
        <span className="run__issue">ACME-212: Add CSV export to invoices</span>
        <span className="tag">Example</span>
        <span className="run__state">
          <span className="lamp" aria-hidden="true" />
          Merged
        </span>
      </figcaption>
      <ol>
        {STEPS.map((step, index) => (
          <li
            key={step.datetime}
            className="step"
            style={{ "--i": index + 1 } as CSSProperties}
          >
            <time dateTime={step.datetime}>{step.label}</time>
            <div>
              <b>{step.title}</b>
              {step.detail ? <small>{step.detail}</small> : null}
              {step.diff ? (
                <details className="diff">
                  <summary>Show six lines of the diff</summary>
                  <pre tabIndex={0} role="region" aria-label="Diff, scrolls sideways">
                    {step.diff.map((line) => (
                      <span key={line.text} className={line.kind}>
                        {line.text}
                      </span>
                    ))}
                  </pre>
                </details>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
