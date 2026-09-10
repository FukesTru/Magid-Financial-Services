import type { ServiceSlug } from "./site";

/**
 * Long-form copy for the twelve service pages.
 *
 * Kept out of `site.ts` because that file is the business's facts — contact
 * details, the canonical service list — and this is page copy. The two stay in
 * step by type rather than by discipline: the record below is keyed by
 * `ServiceSlug`, so adding a service to `site.ts` without writing its page
 * content fails the build instead of shipping an empty page.
 *
 * ---------------------------------------------------------------------------
 * A NOTE ON WHAT THIS COPY DOES NOT SAY
 *
 * Nothing here claims a professional credential, a price, a turnaround time,
 * or an outcome. Those are facts about the firm and its engagements that only
 * the client can supply, and a tax practice is exactly the wrong place to
 * guess: an implied guarantee about an IRS settlement or a loan modification
 * is a regulatory problem, not a copy problem. Where an outcome depends on a
 * third party — the IRS, a lender, a creditor — the copy says so plainly.
 *
 * If the client supplies credentials (CPA, EA, CAF registration) or wants to
 * quote fees, add them here and to `src/lib/site.ts`; do not infer them.
 * ---------------------------------------------------------------------------
 */
export type ServiceContent = {
  /** One sentence under the H1. Plain statement of what this is. */
  lead: string;
  /** Body prose. Two or three paragraphs. */
  body: string[];
  /** What the engagement actually covers. */
  includes: string[];
  /** Who tends to come to us for this. */
  goodFor: string[];
};

export const serviceContent: Record<ServiceSlug, ServiceContent> = {
  "tax-preparation": {
    lead: "Your return, prepared and reviewed by a person who reads the whole file before touching a number.",
    body: [
      "Most returns are not complicated so much as cluttered. A W-2, a couple of 1099s, a brokerage summary, a stack of receipts you were not sure counted, and a nagging sense that something has been missed. The work is going through all of it properly, once, and knowing which of it actually changes the outcome.",
      "We prepare individual and family returns from start to finish: federal, state, and the local filings Pennsylvania adds on top. Everything is reviewed before it is filed, and we walk you through what changed from last year and why — not just the refund figure at the bottom.",
      "If something in your year was unusual — a house sold, a job changed, a business started, a family member added — tell us early. Those are the situations where the difference between a competent return and a careless one is measured in real money.",
    ],
    includes: [
      "Federal, state and local returns prepared together",
      "A full review of last year's return for anything missed",
      "Deductions and credits identified from your records, not a checklist",
      "Electronic filing with confirmation and refund tracking",
      "A plain explanation of what changed since last year",
      "Your questions answered in August, not just in April",
    ],
    goodFor: [
      "Households with W-2 income and the usual mix of interest, dividends and deductions",
      "Anyone whose year included a move, a sale, a new job or a new dependent",
      "People who have been filing their own returns and want a second set of eyes",
    ],
  },

  "accounting-services": {
    lead: "Books that are current, reconciled, and ready when someone asks to see them.",
    body: [
      "Bookkeeping goes wrong quietly. Nothing breaks in March; it breaks the following February, when the year has to be reconstructed from bank statements and memory, and every hour of that reconstruction costs more than keeping it current would have.",
      "We keep the books, reconcile the accounts, and produce financial statements you can hand to a lender, a partner, or your own decision-making. The point is not the paperwork — it is that at any given moment you can answer what came in, what went out, and what you owe.",
      "This work sits naturally alongside payroll and business tax filings, and when we handle all three the numbers only get entered once. If you already have a bookkeeper, we are happy to work with what they produce.",
    ],
    includes: [
      "Monthly or quarterly bookkeeping, kept current",
      "Bank, credit card and loan account reconciliations",
      "Profit and loss, balance sheet and cash flow statements",
      "Chart of accounts set up or cleaned up",
      "Year-end books closed and handed straight to your tax filing",
      "Records organised to stand up to an audit or a lender's review",
    ],
    goodFor: [
      "Owner-operated businesses without an in-house finance person",
      "Anyone who has fallen behind and needs a year brought back into order",
      "Businesses preparing for a loan application, a sale, or a new partner",
    ],
  },

  "business-tax-services": {
    lead: "Filings for LLCs, S-corps, partnerships and corporations, handled end to end.",
    body: [
      "Business filings have more moving parts than a personal return and less margin for improvisation. Entity type drives the form, the form drives the deadlines, and the deadlines are not the ones on the personal calendar — a partnership or S-corp return is due well before April.",
      "We prepare and file the return your entity actually requires, along with the K-1s your owners need in order to file their own. Where the business and the owners are both our clients, the two sides are reconciled against each other before anything is transmitted.",
      "We also look at the structure itself. An entity chosen five years ago for reasons that made sense then may be costing money now, and that is worth knowing before another year is filed under it.",
    ],
    includes: [
      "Federal and state returns for LLCs, S-corps, partnerships and C-corps",
      "Schedule K-1s prepared and issued to owners",
      "Owner returns reconciled against the business return",
      "Depreciation schedules maintained year to year",
      "State registrations and multi-state filings where you operate",
      "A review of whether your current entity type still fits",
    ],
    goodFor: [
      "Businesses filing their first return under a new entity",
      "Owners who want the business and personal returns handled by the same preparer",
      "Companies operating or selling across state lines",
    ],
  },

  "income-tax-return-filing": {
    lead: "Electronic filing with confirmation, so you know it landed rather than hoping it did.",
    body: [
      "Filing is the part people assume is automatic. It mostly is — until a return rejects for a mismatched Social Security number, a duplicate dependent claim, or an identity-protection PIN nobody knew was required, and it sits unfiled while the deadline passes.",
      "We transmit federal and state returns electronically, watch for the acknowledgement, and deal with any rejection ourselves. You get confirmation that the return was accepted, and a way to track the refund once it is on its way.",
      "Where a return has to go on paper — some amended and prior-year filings still do — we prepare it properly, tell you exactly where it goes, and tell you what the realistic timeline looks like.",
    ],
    includes: [
      "Federal and state returns transmitted electronically",
      "Acknowledgement tracked and confirmed back to you",
      "Rejections diagnosed and re-filed at no extra drama",
      "Refund status tracking and direct-deposit setup",
      "Prior-year and amended returns prepared and filed",
      "Copies retained so next year starts from a complete file",
    ],
    goodFor: [
      "Anyone who wants filing confirmed rather than assumed",
      "People catching up on a year they never filed",
      "Filers who need an amended return after a corrected 1099 or W-2",
    ],
  },

  "payroll-support": {
    lead: "Payroll runs, tax deposits and quarterly filings, on schedule, every cycle.",
    body: [
      "Most owners come to payroll help after a penalty notice. The run itself was fine; it was the deposit that was late, or the quarterly form that nobody filed, and the penalty arrived months later with interest attached.",
      "We process the payroll, make the deposits when they are due, and file the quarterly and year-end returns that go with them — including the W-2s and 1099s your people need in January. The service exists so those notices stop arriving.",
      "Payroll also has to agree with the books and the business return at year end. When we handle all three, that reconciliation is simply part of the work rather than a discovery made in March.",
    ],
    includes: [
      "Payroll processed on your schedule, weekly through monthly",
      "Federal, state and local tax deposits made on time",
      "Quarterly returns prepared and filed",
      "Year-end W-2s and 1099s issued to workers and agencies",
      "New hire reporting and worker classification reviewed",
      "Payroll reconciled to the books and the business return",
    ],
    goodFor: [
      "Small employers running payroll themselves and losing time to it",
      "Businesses that have received a deposit or filing penalty",
      "Owners hiring their first employee or first contractor",
    ],
  },

  "tax-planning": {
    lead: "Decisions made in the year they can still change something, rather than reported on afterwards.",
    body: [
      "By the time a return is being prepared, most of the year is already fixed. Planning is the work that happens while the outcome is still open — before the retirement contribution deadline, before the asset is sold, before the entity election has to be made.",
      "We look at where your income is coming from, what is likely to change, and which decisions in front of you have a tax consequence worth weighing. Sometimes that is a contribution or a timing change; sometimes it is simply telling you that the obvious move is not worth what it costs.",
      "This is a conversation that works best more than once a year, and it is why we would rather hear from you in September than only in March.",
    ],
    includes: [
      "A projection of where the year is heading before it closes",
      "Timing reviewed on income, deductions and asset sales",
      "Retirement contribution strategy across available accounts",
      "Withholding and estimated payments adjusted to avoid surprises",
      "Entity and compensation structure reviewed for owners",
      "Multi-year view where this year and next interact",
    ],
    goodFor: [
      "People whose income varies year to year or arrives outside a W-2",
      "Owners deciding on salary, distributions or a major purchase",
      "Anyone facing a one-off event — a sale, an inheritance, a windfall",
    ],
  },

  "tax-problem-consulting": {
    lead: "Back taxes, notices, liens and penalties looked at honestly, then worked toward a resolution.",
    body: [
      "Unopened envelopes are the most expensive thing in tax work. Interest compounds, collection options narrow, and a problem that had several solutions in year one has fewer in year three. Almost nothing here gets better by waiting.",
      "We start by establishing what is actually owed and for which years, which is often not what the notices appear to say. From there we set out the routes genuinely available to you — an instalment agreement, penalty abatement, filing the returns that were never filed — and what each realistically involves.",
      "We will tell you plainly where you stand, including when the answer is that the balance is owed and the work is arranging a way to pay it. Any outcome involving the IRS or a state agency is theirs to grant, and we do not promise one on their behalf.",
    ],
    includes: [
      "Your account transcripts obtained and read properly",
      "Unfiled returns prepared and brought current",
      "Notices interpreted and answered within their deadlines",
      "Instalment agreements prepared and submitted",
      "Penalty abatement pursued where grounds genuinely exist",
      "A clear account of the options and what each one requires",
    ],
    goodFor: [
      "Anyone with unfiled returns or a balance that has been growing",
      "People who have received a notice they do not understand",
      "Taxpayers facing a lien, a levy, or wage garnishment",
    ],
  },

  "irs-audit-representation": {
    lead: "We correspond with the IRS on your behalf and stand with you through the audit.",
    body: [
      "An audit is a documentation exercise more than an accusation. The examiner has questions about specific items, and the outcome usually turns on whether those items can be substantiated in the form the agency expects — not on how the conversation feels.",
      "We handle the correspondence, assemble what is being asked for, and keep the examination to the items actually in question rather than letting it widen. Where an adjustment is proposed, we review whether it is correct before anything is agreed.",
      "Most examinations are conducted entirely by mail and never require you in a room with anyone. Where representation before the agency is appropriate, we act for you under the authorisation you sign.",
    ],
    includes: [
      "The notice read and its actual scope established",
      "Correspondence handled on your behalf",
      "Records assembled and presented in the form requested",
      "The examination kept to the items genuinely in question",
      "Proposed adjustments reviewed before anything is agreed",
      "Appeal options explained where the finding is wrong",
    ],
    goodFor: [
      "Anyone who has received an examination or correspondence audit notice",
      "Taxpayers facing questions on a return prepared elsewhere",
      "People who would simply rather not deal with the agency directly",
    ],
  },

  "new-business-tax-consulting": {
    lead: "Entity selection, registrations and a tax setup your new venture can actually grow into.",
    body: [
      "The decisions made in a business's first month are the ones hardest to unwind later. Entity type, how owners are paid, which registrations were filed and which were missed — all of it becomes background you inherit rather than choose.",
      "We work through the choices with you before they are locked in: which entity fits what you are actually building, what it means for self-employment tax, what has to be registered federally and in Pennsylvania, and what your filing calendar will look like once you are running.",
      "The aim is that year one is dull. No surprise deadline, no registration discovered eighteen months late, no scramble to reconstruct records nobody was keeping.",
    ],
    includes: [
      "Entity selection worked through against your actual plans",
      "EIN and federal registrations obtained",
      "Pennsylvania and local registrations identified and filed",
      "Owner compensation structured from the start",
      "Bookkeeping and record-keeping set up before it matters",
      "A filing calendar so nothing arrives unannounced",
    ],
    goodFor: [
      "Anyone forming a business in the next few months",
      "Side businesses that have grown past what a Schedule C comfortably holds",
      "Partners setting terms and wanting the tax consequences understood first",
    ],
  },

  "local-tax-return-preparation": {
    lead: "Pennsylvania municipal and school district returns, prepared alongside your federal filing.",
    body: [
      "Pennsylvania asks for more than most states. Alongside the federal and state returns there is local earned income tax, collected by municipality and school district, and often a local services tax on top. These are the filings people most commonly do not know exist.",
      "We prepare them as part of your return rather than as an afterthought, using the same figures, so the local filing agrees with what was reported federally. If a previous year was missed, we can bring it current.",
      "Local rates and collectors vary between townships, and the boundaries do not always follow the mailing address. Establishing which jurisdiction you actually owe is part of the work.",
    ],
    includes: [
      "Local earned income tax returns prepared and filed",
      "The correct municipality and school district established",
      "Local services tax handled where it applies",
      "Local figures reconciled to the federal and state returns",
      "Missed prior-year local filings brought current",
      "Multi-municipality situations sorted out for people who moved",
    ],
    goodFor: [
      "Anyone living or working in Pennsylvania with earned income",
      "People who have moved between townships mid-year",
      "Filers who have received a notice from a local tax collector",
    ],
  },

  "loan-modifications": {
    lead: "The financial documentation a modification request depends on, assembled properly.",
    body: [
      "A modification application is a document exercise. The lender is asking you to demonstrate your financial position in a specific form, and applications fail far more often on incomplete or inconsistent paperwork than on the underlying circumstances.",
      "We assemble that package: income documentation, a hardship position set out clearly, and financial statements that agree with your returns. Where figures across your tax filings and bank records tell different stories, we resolve the difference before a reviewer finds it.",
      "The decision belongs entirely to the lender. What we can do is make sure the request they consider is complete, consistent and accurate — not promise how they will answer it.",
    ],
    includes: [
      "Income and financial documentation assembled",
      "Financial statements reconciled to your filed returns",
      "Hardship documentation organised and set out clearly",
      "Lender's package requirements worked through in full",
      "Inconsistencies resolved before submission",
      "Requests for further information handled as they arrive",
    ],
    goodFor: [
      "Homeowners preparing a modification request",
      "Self-employed borrowers whose income needs proper documentation",
      "Anyone whose earlier application was returned as incomplete",
    ],
  },

  "debt-settlement": {
    lead: "A clear-eyed account of what you owe, and a negotiated path toward settling it.",
    body: [
      "The first useful step is almost always an accurate total. People arrive knowing the situation is bad without knowing the number, and the number is frequently different from the one the letters imply — some balances are inflated by fees, some are past the point of enforceability, some are not actually yours.",
      "From there we look at what is realistically available: what can be paid, over what period, and which creditors have shown themselves willing to negotiate. Where a settlement is worth pursuing, we help assemble and put the case.",
      "Two things we will always say plainly. Settlement is a negotiation, and no one can promise you what a creditor will accept. And forgiven debt can itself be taxable — which is a consequence worth understanding in advance rather than discovering on next year's return.",
    ],
    includes: [
      "A complete, verified picture of what is actually owed",
      "Balances reviewed for fees, errors and misapplied payments",
      "What you can realistically sustain, worked out honestly",
      "Settlement or payment terms negotiated with creditors",
      "The tax consequences of forgiven debt explained in advance",
      "Any resulting 1099-C handled correctly on your return",
    ],
    goodFor: [
      "Anyone carrying balances they cannot see a way through",
      "People who have had a settlement offered and want it reviewed",
      "Taxpayers who received a 1099-C after a debt was written off",
    ],
  },
};
