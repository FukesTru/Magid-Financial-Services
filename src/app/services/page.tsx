import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/ComingSoon";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Tax preparation, payroll support, accounting, IRS audit representation and more — for individuals and businesses in all 50 states.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <ComingSoon
      eyebrow="What we do"
      title="Tax, payroll and accounting services"
      body="Twelve service areas covering individual returns, business filings, payroll, planning, and resolution work with the IRS."
    />
  );
}
