import { Suspense } from "react";
import { InvoiceHelperForm } from "./_containers/invoice-helper-form";

export default function HomePage() {
  return (
    <Suspense>
      <InvoiceHelperForm />
    </Suspense>
  );
}
