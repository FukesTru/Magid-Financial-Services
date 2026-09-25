import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { serviceCategories, servicesByCategory } from "@/lib/site";

/**
 * Contents of the desktop Services dropdown.
 *
 * Twelve links in a single column would be a wall, so they are grouped into
 * the three categories a visitor actually self-identifies with. Presentational
 * only — the header owns the open state and the positioning.
 */
export function ServicesPanel({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-3">
        {serviceCategories.map((category) => (
          <div key={category.key}>
            <h3 className="font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-accent uppercase">
              {category.label}
            </h3>
            <ul className="mt-5 space-y-1">
              {servicesByCategory(category.key).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    onClick={onNavigate}
                    className="group flex items-start gap-3 rounded-sm px-2 py-2 transition-colors duration-200 hover:bg-card-hover"
                  >
                    <ServiceIcon
                      name={service.icon}
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent/70 transition-colors duration-200 group-hover:text-accent-soft"
                    />
                    <span className="font-sans text-sm text-ink-200 transition-colors duration-200 group-hover:text-ink-50">
                      {service.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-line pt-6">
        <Link
          href="/services"
          onClick={onNavigate}
          className="group inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-wide text-accent transition-colors hover:text-accent-soft"
        >
          All services
          <ArrowIcon className="transition-transform duration-300 ease-brand group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
