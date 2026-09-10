import { faqs, services, site, type ServiceEntry } from "@/lib/site";
import { usStates } from "@/lib/us-states";

/** Stable @id so other schema blocks can reference the same organization. */
const orgId = `${site.url}/#organization`;

const professionalService = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": orgId,
  name: site.name,
  url: `${site.url}/`,
  description:
    "Payroll, tax preparation, and accounting services for individuals and businesses, based in Huntingdon Valley, Pennsylvania and serving clients in all 50 states.",
  telephone: site.phone.e164,
  email: site.email,
  foundingDate: String(site.foundedYear),
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: usStates.map((name) => ({
    "@type": "State",
    name,
  })),
  knowsAbout: services.map((s) => s.name),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tax, Payroll & Accounting Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.summary,
        url: `${site.url}/services/${s.slug}`,
      },
    })),
  },
  ...(site.socials.length > 0 ? { sameAs: site.socials.map((s) => s.href) } : {}),
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: `${site.url}/`,
  name: site.name,
  publisher: { "@id": orgId },
};

const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

function Block({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is authored in this repo, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organization + website schema. Rendered site-wide from the root layout. */
export function OrganizationJsonLd() {
  return (
    <>
      <Block data={professionalService} />
      <Block data={website} />
    </>
  );
}

/** FAQ schema. Render only on pages that actually display these questions. */
export function FaqJsonLd() {
  return <Block data={faqPage} />;
}

/**
 * Per-service schema, plus the breadcrumb trail the page displays.
 *
 * The service is tied back to the organization by `@id` rather than repeating
 * the business details, so there is one organization in the graph however many
 * service pages a crawler visits.
 */
export function ServiceJsonLd({
  service,
  description,
}: {
  service: ServiceEntry;
  description: string;
}) {
  const url = `${site.url}/services/${service.slug}`;

  return (
    <>
      <Block
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${url}#service`,
          name: service.name,
          description,
          url,
          serviceType: service.name,
          provider: { "@id": orgId },
          areaServed: { "@type": "Country", name: "United States" },
        }}
      />
      <Block
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
            {
              "@type": "ListItem",
              position: 2,
              name: "Services",
              item: `${site.url}/services`,
            },
            { "@type": "ListItem", position: 3, name: service.name, item: url },
          ],
        }}
      />
    </>
  );
}

/**
 * Contact page schema. Kept separate from the organization block so the
 * business details are still stated once, by reference.
 */
export function ContactJsonLd() {
  return (
    <Block
      data={{
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": `${site.url}/contact#page`,
        url: `${site.url}/contact`,
        name: `Contact ${site.name}`,
        mainEntity: { "@id": orgId },
      }}
    />
  );
}
