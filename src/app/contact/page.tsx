import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/ComingSoon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Book a free consultation with Magid Financial Services. Call ${site.phone.display} or visit our office at ${site.address.street}, ${site.address.locality}, ${site.address.region}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <ComingSoon
      eyebrow="Get in touch"
      title="Book your free consultation"
      body="Tell us what you are dealing with — a return, a payroll schedule, a letter you would rather not open — and we will tell you exactly what comes next."
    />
  );
}
