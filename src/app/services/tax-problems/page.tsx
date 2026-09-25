import type { Metadata } from "next";
import { ServiceCategoryPage } from "@/components/site/ServiceCategoryPage";

export const metadata: Metadata = {
  title: "Tax Problems, IRS Audits & Debt Relief",
  description:
    "Back taxes, unfiled returns, IRS audit representation, loan modification support and debt settlement, handled on your behalf.",
  alternates: { canonical: "/services/tax-problems" },
};

export default function Page() {
  return <ServiceCategoryPage categoryKey="resolution" />;
}
