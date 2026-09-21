import { JobPage } from "@/components/job-page";
import { contentPublishing } from "../content";
import { pageMetadata } from "../head-directives";

export const metadata = pageMetadata(contentPublishing);

export default function Page() {
  return <JobPage page={contentPublishing} />;
}
