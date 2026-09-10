/**
 * Magid Financial Services — site-wide constants.
 *
 * Every page pulls business facts (NAP, services, nav) from here so that
 * contact details and the services list can never drift between pages.
 */

const DEFAULT_SITE_URL = "https://i-mfs.com";

/**
 * Resolve the canonical origin from NEXT_PUBLIC_SITE_URL.
 *
 * The variable is optional, but a host that defines it as an *empty* or
 * malformed value must not be able to take the build down. `metadataBase`
 * runs `new URL()` on this during module evaluation, and `new URL("")`
 * throws — which fails the whole build, not just one page. So anything
 * blank or unparseable is treated as "not set" and falls back.
 *
 * A bare domain ("i-mfs.com") is accepted and assumed to be https. The
 * result is normalised to an origin, so it never carries a trailing slash
 * for the `${site.url}/path` templates elsewhere to double up on.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;

  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(candidate).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const site = {
  name: "Magid Financial Services",
  shortName: "Magid Financial",
  tagline:
    "Expert Solutions for Your Payroll and Tax Needs—Maximizing Your Success, Minimizing Your Stress",
  foundedYear: 1989,
  /**
   * Canonical origin, with no trailing slash. Override per-environment with
   * NEXT_PUBLIC_SITE_URL if the client moves to a new domain before launch.
   */
  url: resolveSiteUrl(),
  phone: {
    display: "(215) 676-7999",
    /** E.164, for tel: links and schema.org. */
    href: "tel:+12156767999",
    e164: "+1-215-676-7999",
  },
  email: "Info@i-mfs.com",
  address: {
    street: "2528 Huntingdon Pike",
    locality: "Huntingdon Valley",
    region: "PA",
    postalCode: "19006",
    country: "US",
  },
  /**
   * Social profiles — none supplied by the client yet. Add URLs here and they
   * render automatically in the footer; leave empty and the block is omitted.
   */
  socials: [] as { label: string; href: string }[],
  /**
   * Office hours — not supplied by the client, and deliberately not guessed.
   * A tax practice keeps different hours in February than in July, and
   * publishing the wrong ones sends someone to a locked door. While this is
   * null the contact page says to call for current hours; fill it in and the
   * page renders the table instead.
   */
  hours: null as readonly { days: string; hours: string }[] | null,
} as const;

export const yearsInBusiness = new Date().getFullYear() - site.foundedYear;

/* ------------------------------------------------------------------------ */
/* Navigation                                                                */
/* ------------------------------------------------------------------------ */

export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
] as const;

/* ------------------------------------------------------------------------ */
/* Services                                                                  */
/* ------------------------------------------------------------------------ */

/**
 * Services are grouped three ways on the services index and in the navbar
 * dropdown. Twelve flat items is a list; three groups of four is a menu
 * someone can actually scan.
 */
export const serviceCategories = [
  {
    id: "individuals",
    label: "Individuals & Families",
    blurb: "Returns, filings and year-round planning for you and your household.",
  },
  {
    id: "business",
    label: "Businesses",
    blurb: "Books, payroll and filings for owners who would rather run the business.",
  },
  {
    id: "resolution",
    label: "Tax Relief & Resolution",
    blurb: "When something has already gone wrong — notices, audits, arrears.",
  },
] as const;

export type ServiceCategory = (typeof serviceCategories)[number]["id"];

export type IconName =
  | "document"
  | "ledger"
  | "building"
  | "receipt"
  | "payroll"
  | "chart"
  | "lifebuoy"
  | "shield"
  | "seedling"
  | "pin"
  | "house"
  | "scales";

export type Service = {
  slug: string;
  name: string;
  /** One line, used on the homepage services grid. */
  summary: string;
  icon: IconName;
  category: ServiceCategory;
};

/**
 * `as const satisfies` rather than a plain annotation: it keeps the slugs as
 * literal types, which is what lets `ServiceSlug` below be a real union. That
 * union is then the key of the page-content record in `service-content.ts`, so
 * adding a service here without writing its page content is a compile error
 * rather than a blank page discovered in production.
 */
export const services = [
  {
    slug: "tax-preparation",
    name: "Tax Preparation",
    summary:
      "Accurate individual and family returns prepared, reviewed, and filed by a professional.",
    icon: "document",
    category: "individuals",
  },
  {
    slug: "accounting-services",
    name: "Accounting Services",
    summary:
      "Bookkeeping, reconciliations, and financial statements that keep your records audit-ready.",
    icon: "ledger",
    category: "business",
  },
  {
    slug: "business-tax-services",
    name: "Business Tax Services",
    summary:
      "Filings for LLCs, S-corps, partnerships, and corporations, handled end to end.",
    icon: "building",
    category: "business",
  },
  {
    slug: "income-tax-return-filing",
    name: "Income Tax Return Filing",
    summary:
      "Electronic federal and state filing with confirmation and refund tracking.",
    icon: "receipt",
    category: "individuals",
  },
  {
    slug: "payroll-support",
    name: "Payroll Support",
    summary:
      "Payroll runs, deposits, and quarterly filings managed on schedule, every cycle.",
    icon: "payroll",
    category: "business",
  },
  {
    slug: "tax-planning",
    name: "Tax Planning",
    summary:
      "Year-round strategy that positions you for a lower bill before the deadline arrives.",
    icon: "chart",
    category: "individuals",
  },
  {
    slug: "tax-problem-consulting",
    name: "Tax Problem Consulting",
    summary:
      "Back taxes, notices, liens, and penalties reviewed and worked toward a resolution.",
    icon: "lifebuoy",
    category: "resolution",
  },
  {
    slug: "irs-audit-representation",
    name: "IRS Audit Representation",
    summary:
      "We correspond with the IRS on your behalf and stand with you through the audit.",
    icon: "shield",
    category: "resolution",
  },
  {
    slug: "new-business-tax-consulting",
    name: "New Business Tax Consulting",
    summary:
      "Entity selection, registrations, and a tax setup your new venture can grow into.",
    icon: "seedling",
    category: "business",
  },
  {
    slug: "local-tax-return-preparation",
    name: "Local Tax Return Preparation",
    summary:
      "Pennsylvania municipal and school district returns prepared alongside your federal filing.",
    icon: "pin",
    category: "individuals",
  },
  {
    slug: "loan-modifications",
    name: "Loan Modifications",
    summary:
      "Documentation and financial packages assembled to support a modification request.",
    icon: "house",
    category: "resolution",
  },
  {
    slug: "debt-settlement",
    name: "Debt Settlement",
    summary:
      "A clear-eyed look at what you owe and a negotiated path toward settling it.",
    icon: "scales",
    category: "resolution",
  },
] as const satisfies readonly Service[];

/**
 * One entry of the `services` array, with its slug still a literal type.
 *
 * Accessors below return this rather than the wider `Service`, so a slug taken
 * from the list can index `serviceContent` directly. `Service` remains the
 * shape to annotate against; this is the shape you actually get back.
 */
export type ServiceEntry = (typeof services)[number];

export type ServiceSlug = ServiceEntry["slug"];

export const serviceSlugs = services.map((s) => s.slug);

/**
 * Narrow an arbitrary string — a route param, a form field — to a known slug.
 * `serviceSlugs.includes()` cannot do this job: the array's element type is
 * the literal union, so it refuses a plain `string` argument outright.
 */
export function isServiceSlug(value: string): value is ServiceSlug {
  return (serviceSlugs as readonly string[]).includes(value);
}

export function getService(slug: string): ServiceEntry | undefined {
  return services.find((s) => s.slug === slug);
}

/** The services in one category, in the order they are declared above. */
export function servicesInCategory(category: ServiceCategory): ServiceEntry[] {
  return services.filter((s) => s.category === category);
}

/* ------------------------------------------------------------------------ */
/* Why choose us                                                             */
/* ------------------------------------------------------------------------ */

export const valueProps = [
  {
    title: `Established ${site.foundedYear}`,
    body: `More than three decades of filings behind us. We have worked through every major tax law change since ${site.foundedYear}, and we bring that pattern recognition to your return.`,
  },
  {
    title: "One preparer, start to finish",
    body: "You are not routed through a call center. The person who prepares your return is the person who answers when you call back in August with a question.",
  },
  {
    title: "Licensed across all 50 states",
    body: "Moved, work remotely, or run a business across state lines? We handle multi-state filings and serve clients nationwide by phone, email, and secure upload.",
  },
  {
    title: "We represent you before the IRS",
    body: "If a notice arrives or an audit opens, we correspond with the IRS directly on your behalf, so you are never facing the agency alone.",
  },
] as const;

/* ------------------------------------------------------------------------ */
/* FAQs                                                                      */
/* ------------------------------------------------------------------------ */

export const faqs = [
  {
    question: "What documents do I need to have ready for my tax return?",
    answer:
      "Start with photo ID and Social Security numbers for everyone on the return, then gather your income records — W-2s, 1099s, K-1s, and records of self-employment or rental income. Add anything that supports a deduction or credit: mortgage interest, property and local taxes, tuition, childcare, charitable giving, and medical costs. Last year's return is helpful too. If you are unsure whether something matters, bring it; sorting it out is our job, not yours.",
  },
  {
    question: "How do I get started as a new client?",
    answer:
      "Call (215) 676-7999 or email Info@i-mfs.com and we will set up a consultation at no cost. We will talk through your situation, tell you plainly what we would handle and what it will cost, and send you a short checklist of what to send over. You can meet us at our Huntingdon Valley office or work with us entirely by phone and secure upload.",
  },
  {
    question: "How is my financial information kept private?",
    answer:
      "Your information is used only to prepare and file your returns and to carry out the work you have engaged us for. We do not sell client data. Documents are exchanged through secure channels rather than plain email whenever sensitive figures are involved, physical files are kept locked at our office, and access is limited to the staff working on your account. As a paid preparer we are bound by IRS Circular 230 and the federal confidentiality rules that govern tax practitioners.",
  },
  {
    question: "Can you work with me if I don't live in Pennsylvania?",
    answer:
      "Yes. We serve clients in all 50 states. Documents come to us by secure upload, we review everything with you by phone or video, and returns are filed electronically. Clients who have moved out of the area often stay with us for exactly this reason — nothing about the process requires you to be in the room.",
  },
  {
    question: "What should I do if I receive a letter from the IRS?",
    answer:
      "Do not ignore it, and do not respond before someone has read it. Send us a copy and we will tell you what the notice actually says, what the deadline is, and whether it needs a reply at all — many notices are routine adjustments rather than audits. If it does escalate, we can represent you before the IRS and handle the correspondence ourselves.",
  },
  {
    question: "Do you handle payroll for small businesses?",
    answer:
      "We do. We process payroll runs, manage tax deposits, and prepare the quarterly and year-end filings that go with them, including W-2s and 1099s. Most owners come to us after a missed deposit or a penalty notice; the point of the service is that those stop happening.",
  },
] as const;
