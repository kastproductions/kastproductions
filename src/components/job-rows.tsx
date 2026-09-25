import { jobs } from "@/app/content";
import { PullLink, Row, RowLabel, RowNote, RowText, Rows } from "@/components/section";

/*
 * The jobs we take, as rows: the job, what an agent does with it, and the
 * systems it touches. The home page indexes them under the work we take and
 * the custom door prints the same list to measure a reader's own job against,
 * so the rows live here rather than in two page files.
 *
 * A job with a page of its own is linked from the row that names it, in the
 * page's own words. A job without one is a row and nothing more: see `jobs` in
 * `content.ts`.
 */
export function JobRows() {
  return (
    <Rows>
      {jobs.map((job) => (
        <li key={job.title}>
          <Row>
            <RowLabel>{job.title}</RowLabel>
            <RowText>{job.body}</RowText>
            <RowNote>{job.systems}</RowNote>
            {job.page ? (
              <PullLink className="mt-0.5" href={job.page.path}>
                {job.page.more}
              </PullLink>
            ) : null}
          </Row>
        </li>
      ))}
    </Rows>
  );
}
