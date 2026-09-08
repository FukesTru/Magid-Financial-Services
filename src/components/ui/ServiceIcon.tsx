import type { IconName } from "@/lib/site";

/**
 * Hand-drawn stroke icon set — one glyph per service.
 *
 * Kept in-repo rather than pulled from an icon library so every glyph shares
 * the same 24px grid, 1.5 stroke weight, and rounded terminals. Add new
 * services by adding a path here and a matching `IconName` in lib/site.ts.
 */
const paths: Record<IconName, React.ReactNode> = {
  document: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h4" />
    </>
  ),
  ledger: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M8 3v18" />
      <path d="M11.5 8h5M11.5 12h5M11.5 16h3" />
    </>
  ),
  building: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V6.5A1.5 1.5 0 0 1 6.5 5h5A1.5 1.5 0 0 1 13 6.5V21" />
      <path d="M13 11h4.5A1.5 1.5 0 0 1 19 12.5V21" />
      <path d="M8 9h2M8 13h2M8 17h2M15.5 15h1M15.5 18h1" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v18l-3-2-3 2-3-2-3 2z" />
      <path d="M9 7h6M9 11h6M9 15h3" />
    </>
  ),
  payroll: (
    <>
      <circle cx="9.5" cy="8" r="3.25" />
      <path d="M3.5 20a6 6 0 0 1 12 0" />
      <path d="M16.5 5.6a3.25 3.25 0 0 1 0 6.3" />
      <path d="M18 14.4a6 6 0 0 1 3 5.6" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="M7.5 15.5 11 11.5l3 2.5 4.5-6" />
      <path d="M18.5 8h-3M18.5 8v3" />
    </>
  ),
  lifebuoy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="m5.6 5.6 3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9" />
    </>
  ),
  shield: (
    <>
      <path d="m12 2.5 7.5 3v6c0 4.6-3.1 8.6-7.5 10-4.4-1.4-7.5-5.4-7.5-10v-6z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  seedling: (
    <>
      <path d="M12 21v-8" />
      <path d="M12 13c0-3.3-2.5-6-6-6 0 3.3 2.5 6 6 6z" />
      <path d="M12 13c0-3.9 3-7 7-7 0 3.9-3.1 7-7 7z" />
      <path d="M6.5 21h11" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.75" />
    </>
  ),
  house: (
    <>
      <path d="M3.5 10.5 12 4l8.5 6.5" />
      <path d="M5.5 9.6V19a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.6" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  scales: (
    <>
      <path d="M12 5.5v15" />
      <path d="M8 20.5h8" />
      <path d="M5 8h14" />
      <circle cx="12" cy="4" r="1.25" />
      <path d="M5 8 2 14.5a3.2 3.2 0 0 0 6 0z" />
      <path d="M19 8l-3 6.5a3.2 3.2 0 0 0 6 0z" />
    </>
  ),
};

export function ServiceIcon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
