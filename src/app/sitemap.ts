import type { MetadataRoute } from "next";
import { serviceCategories, services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/faq`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.7 },
    ...serviceCategories.map((c) => ({
      url: `${site.url}/services/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...services.map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
