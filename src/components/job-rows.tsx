import Link from "next/link";
import { jobs } from "@/app/content";

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
    <ul className="rows">
      {jobs.map((job) => (
        <li key={job.title}>
          <div className="row">
            <span className="row__label">{job.title}</span>
            <p>{job.body}</p>
            <span className="row__note">{job.systems}</span>
            {job.page ? (
              <Link className="pull" href={job.page.path}>
                {job.page.more}
              </Link>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
