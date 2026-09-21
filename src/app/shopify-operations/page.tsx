import { JobPage } from "@/components/job-page";
import { shopifyOperations } from "../content";
import { pageMetadata } from "../head-directives";

export const metadata = pageMetadata(shopifyOperations);

export default function Page() {
  return <JobPage page={shopifyOperations} />;
}
