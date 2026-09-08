import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/site/ComingSoon";
import { getService, services } from "@/lib/site";

/** Prerender one route per service in lib/site.ts. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return {};

  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  return (
    <ComingSoon
      eyebrow="Service"
      title={service.name}
      body={service.summary}
    />
  );
}
