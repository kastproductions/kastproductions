import { JobPage } from "@/components/job-page";
import { supportTicketTriage } from "../content";
import { pageMetadata } from "../head-directives";

export const metadata = pageMetadata(supportTicketTriage);

export default function Page() {
  return <JobPage page={supportTicketTriage} />;
}
