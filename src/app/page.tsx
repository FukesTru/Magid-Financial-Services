import { FaqJsonLd } from "@/components/seo/JsonLd";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ClosingCta } from "@/components/site/ClosingCta";
import { FaqSection } from "@/components/home/FaqSection";
import { Hero } from "@/components/home/Hero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustBar } from "@/components/home/TrustBar";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

/*
 * Homepage — target keyword: "Tax & Payroll Services Huntingdon Valley PA".
 * Title, description, canonical and Open Graph tags are inherited from the
 * root layout, which carries the homepage values as its site-wide defaults.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <AboutPreview />
      <ServicesGrid />
      <WhyChooseUs />
      <Testimonials />
      <FaqSection />
      <ClosingCta />
      <FaqJsonLd />
    </>
  );
}
