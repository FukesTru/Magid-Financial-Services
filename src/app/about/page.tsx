import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/ComingSoon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Magid Financial Services has prepared taxes, run payroll, and kept books for individuals and businesses from Huntingdon Valley, PA since ${site.foundedYear}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <ComingSoon
      eyebrow="About the firm"
      title="About Magid Financial Services"
      body={`A Huntingdon Valley practice serving individuals and businesses in all 50 states since ${site.foundedYear}.`}
    />
  );
}
