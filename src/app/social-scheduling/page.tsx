import { JobPage } from "@/components/job-page";
import { socialScheduling } from "../content";
import { pageMetadata } from "../head-directives";

export const metadata = pageMetadata(socialScheduling);

export default function Page() {
  return <JobPage page={socialScheduling} />;
}
