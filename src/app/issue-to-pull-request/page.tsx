import { ProductPage } from "@/components/product-page";
import { issueToPullRequest, productPage } from "../content";
import { pageMetadata } from "../head-directives";

export const metadata = pageMetadata(productPage(issueToPullRequest));

export default function Page() {
  return <ProductPage product={issueToPullRequest} />;
}
