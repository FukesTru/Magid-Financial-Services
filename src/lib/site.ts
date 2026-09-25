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
  /** Full legal name. Used in the page title, footer, and structured data. */
  name: "Magid Financial Services",
  /** Compact form for tight contexts. */
  shortName: "Magid Financial",
  /** Initials, used by the wordmark and favicon. */
  initials: "M",
  /** The firm's official tagline. Kept as a brand asset; the homepage h1
   *  is shorter (see components/home/Hero.tsx). */
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
} as const;

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

/** Groups the services for the nav menu and the services index. */
export type ServiceCategory = "individuals" | "businesses" | "resolution";

export type Service = {
  slug: string;
  name: string;
  /** One line, used on the homepage services grid. */
  summary: string;
  icon: IconName;
  category: ServiceCategory;
};

export const serviceCategories: {
  key: ServiceCategory;
  label: string;
  /** URL segment for the category's own landing page. */
  slug: string;
  blurb: string;
  /** Longer intro, used on the category page itself. */
  intro: string;
}[] = [
  {
    key: "individuals",
    label: "Individuals & Families",
    slug: "individuals",
    intro:
      "Most people meet a tax preparer once a year and hope it goes quickly. The work that makes it go quickly happens before you arrive: knowing which records matter, which credits apply to your situation, and which of last year's decisions are still costing you.",
    blurb:
      "Returns prepared and filed, and a plan for the year ahead rather than a scramble each April.",
  },
  {
    key: "businesses",
    label: "Businesses",
    slug: "businesses",
    intro:
      "Running a business means a calendar of filings nobody warned you about — payroll deposits, quarterly returns, year-end forms, the state and the municipality each wanting something different. Missing one is expensive, and the penalties arrive automatically.",
    blurb:
      "Payroll, books and filings handled on schedule, so the deadlines stop being your problem.",
  },
  {
    key: "resolution",
    label: "Problems & Relief",
    slug: "tax-problems",
    intro:
      "Unopened letters, unfiled years, a balance that grew while you were not looking. None of it gets cheaper with time, and almost none of it is as bad as the notices make it sound once someone has read the file properly.",
    blurb:
      "Notices, audits and debts worked through with someone who deals with the agencies for you.",
  },
];

export const services: Service[] = [
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
    category: "businesses",
  },
  {
    slug: "business-tax-services",
    name: "Business Tax Services",
    summary:
      "Filings for LLCs, S-corps, partnerships, and corporations, handled end to end.",
    icon: "building",
    category: "businesses",
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
    category: "businesses",
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
    category: "businesses",
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
];

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function servicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((s) => s.category === category);
}

/* ------------------------------------------------------------------------ */
/* Why choose us                                                             */
/* ------------------------------------------------------------------------ */

export const valueProps = [
  {
    title: `Established ${site.foundedYear}`,
    body: `Every major rewrite of the tax code since ${site.foundedYear} has crossed this desk. Mostly that is useful for knowing which problems are ordinary and which are genuinely worth worrying about.`,
  },
  {
    title: "No surprises on scope or cost",
    body: "You are told what we would handle and what it will cost before anything starts. Occasionally that conversation ends with us saying you do not need to hire anyone.",
  },
  {
    title: "Fifty states, one phone number",
    body: "Moved away, work remotely, or run a business across state lines? Multi-state filings are routine here, and the whole process works by phone and secure upload.",
  },
  {
    title: "We deal with the IRS, not you",
    body: "When a notice arrives, send it to us. We file the authorisation, handle the correspondence, and you stop being the one on the phone with the agency.",
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
    question: "What do your services cost?",
    answer:
      "It depends on what the work involves — a straightforward individual return and a multi-state business filing are not the same job. You are told the figure before anything starts, and no work begins until the scope and the cost are settled. The first conversation, where we work out which it is, costs nothing.",
  },
  {
    question: "Can you file a prior-year or amended return?",
    answer:
      "Yes to both. Unfiled years can be prepared and filed however far back they go, and that is usually the first step in resolving a balance with the IRS. An amended return corrects something on a filing already submitted — a missed form, a corrected 1099, a credit nobody claimed. Send us the original as filed and whatever changed.",
  },
  {
    question: "What if I owe more than I can pay?",
    answer:
      "Filing and paying are separate obligations, and the penalty for not filing is the larger of the two — so the return goes in either way. From there the options are an instalment agreement, a penalty abatement request where there are grounds for one, or in some circumstances an offer to settle for less. Which applies depends on the numbers, and the numbers usually need establishing first.",
  },
  {
    question: "Do you handle bookkeeping as well as tax returns?",
    answer:
      "We do. Books kept properly through the year make the return cheaper to prepare and far easier to defend; books left to drift cost money to reconstruct. We take on monthly bookkeeping and reconciliations, and we also clean up accounts that have fallen behind before a filing deadline forces the issue.",
  },
  {
    question: "Do you handle payroll for small businesses?",
    answer:
      "We do. We process payroll runs, manage tax deposits, and prepare the quarterly and year-end filings that go with them, including W-2s and 1099s. Most owners come to us after a missed deposit or a penalty notice; the point of the service is that those stop happening.",
  },
] as const;
