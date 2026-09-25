import type { Metadata } from "next";
import { ServiceCategoryPage } from "@/components/site/ServiceCategoryPage";

export const metadata: Metadata = {
  title: "Tax Services for Individuals & Families",
  description:
    "Individual and family tax preparation, filing, local Pennsylvania returns and year-round planning, from Huntingdon Valley PA.",
  alternates: { canonical: "/services/individuals" },
};

export default function Page() {
  return <ServiceCategoryPage categoryKey="individuals" />;
}
