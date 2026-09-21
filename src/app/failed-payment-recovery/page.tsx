import { JobPage } from "@/components/job-page";
import { failedPaymentRecovery } from "../content";
import { pageMetadata } from "../head-directives";

export const metadata = pageMetadata(failedPaymentRecovery);

export default function Page() {
  return <JobPage page={failedPaymentRecovery} />;
}
