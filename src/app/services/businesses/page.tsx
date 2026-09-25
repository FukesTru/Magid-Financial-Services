import type { Metadata } from "next";
import { ServiceCategoryPage } from "@/components/site/ServiceCategoryPage";

export const metadata: Metadata = {
  title: "Payroll, Accounting & Business Tax Services",
  description:
    "Payroll processing, bookkeeping, business tax returns and new business setup for LLCs, S-corps and partnerships in PA and beyond.",
  alternates: { canonical: "/services/businesses" },
};

export default function Page() {
  return <ServiceCategoryPage categoryKey="businesses" />;
}
