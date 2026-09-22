/**
 * Long-form content for each individual service page.
 *
 * Written to describe the work honestly and specifically. Deliberately absent:
 * prices, turnaround promises, outcome guarantees, and any professional
 * credential the firm has not confirmed. Where a service touches a regulated
 * area, the copy describes the work performed rather than a result promised.
 */

export type ServiceDetail = {
  /**
   * Purpose-written meta description, 140-160 characters.
   *
   * Written rather than derived: slicing the intro to a character count cut
   * every one of these mid-word, which is what a search result then shows.
   */
  metaDescription: string;
  /** Two or three sentences below the H1. */
  intro: string;
  /** Concrete scope. What is actually done. */
  covers: string[];
  /** Who should be reading this page. */
  who: string;
  /** What the client needs to bring or send to get started. */
  needs: string[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "tax-preparation": {
    metaDescription:
      "Individual and family tax return preparation in Huntingdon Valley, PA. Federal, state and multi-state returns prepared, reviewed and filed by a professional.",
    intro:
      "Individual and family returns, prepared and reviewed by a person rather than a wizard. We work through what you send, ask about the things people routinely forget, and file when the return is right rather than when it is fast.",
    covers: [
      "Federal Form 1040 and the supporting schedules your year requires",
      "State returns, including filings in more than one state",
      "Itemised deductions compared against the standard deduction",
      "Credits you qualify for — child, education, dependent care, energy",
      "Income from W-2s, 1099s, K-1s, self-employment and rental property",
      "Electronic filing, with confirmation and refund tracking",
    ],
    who: "Individuals and families — particularly anyone whose year got complicated by a move, a new job, a first rental, an inheritance or a side business.",
    needs: [
      "Photo ID and Social Security numbers for everyone on the return",
      "All income records: W-2s, 1099s, K-1s, self-employment and rental income",
      "Anything supporting a deduction or credit — mortgage interest, property and local taxes, tuition, childcare, charitable giving, medical costs",
      "Last year's return, if you have it",
    ],
  },

  "income-tax-return-filing": {
    metaDescription:
      "Electronic federal and state income tax return filing, with confirmation of acceptance and refund tracking. Prior-year and amended returns filed too.",
    intro:
      "Preparing a return and filing it are two different steps. Once you have reviewed and approved the return, we file it electronically, confirm it was accepted rather than merely submitted, and keep the record.",
    covers: [
      "Electronic filing of federal and state returns",
      "Confirmation that each return was accepted by the agency",
      "Refund status tracking",
      "Direct deposit setup and payment scheduling for balances due",
      "Paper filing where a return cannot be filed electronically",
      "A complete copy of everything filed, for your records",
    ],
    who: "Clients whose returns we prepare, and anyone who needs a prior-year or amended return filed correctly.",
    needs: [
      "The prepared return, reviewed and signed off by you",
      "Bank details if you want a refund deposited or a payment drawn",
      "For an amended return, a copy of the original as filed",
    ],
  },

  "local-tax-return-preparation": {
    metaDescription:
      "Pennsylvania local earned income tax, school district and Philadelphia wage tax returns, prepared in Huntingdon Valley alongside your federal filing.",
    intro:
      "Pennsylvania is unusual. Most residents owe a local earned income tax on top of state and federal, Philadelphia adds a city wage tax, and school districts can levy their own. These are the returns that get missed, and the notices arrive a year later.",
    covers: [
      "Local earned income tax (EIT) returns for Pennsylvania municipalities",
      "School district returns where one is required",
      "Philadelphia wage tax, and BIRT where a business is involved",
      "Reconciliation against what your employer actually withheld",
      "Prior-year local returns that were never filed",
      "Coordination with your federal and state filings so the figures agree",
    ],
    who: "Anyone living or working in Pennsylvania — especially people who moved between municipalities mid-year, or who live in one jurisdiction and work in another.",
    needs: [
      "W-2s showing local tax withheld, including the locality codes",
      "Your address history for the year, with dates if you moved",
      "Any local tax notices you have received",
    ],
  },

  "tax-planning": {
    metaDescription:
      "Year-round tax planning for owners, contractors and investors. Project the bill before the year closes, then adjust withholding, timing and contributions.",
    intro:
      "By the time a return is being prepared, the year's decisions have already been made. Planning is the work that happens before that, so filing season confirms a position rather than revealing one.",
    covers: [
      "Projecting the year's liability before the year closes",
      "Adjusting withholding and estimated payments to match reality",
      "Timing of income, deductions and capital gains",
      "Retirement contribution strategy",
      "Owner compensation and distribution decisions",
      "Planning around a sale, a move, or a change in circumstances",
    ],
    who: "People whose income is not one steady paycheck — owners, contractors, investors — and anyone whose last bill came as a surprise.",
    needs: [
      "Last year's return as a starting point",
      "Year-to-date income figures and any estimated payments made",
      "Anything you know is coming: a sale, a bonus, a move, a new venture",
    ],
  },

  "business-tax-services": {
    metaDescription:
      "Business tax returns for LLCs, partnerships, S-corps and corporations. Federal, state and local filings prepared end to end in Huntingdon Valley, PA.",
    intro:
      "Business returns carry more moving parts than personal ones, and the entity you chose years ago still determines most of them. We prepare the filings and explain what they mean for what you actually take home.",
    covers: [
      "Partnership returns (Form 1065) and partner K-1s",
      "S-corporation returns (Form 1120-S)",
      "Corporate returns (Form 1120)",
      "Single-member LLC and Schedule C filings",
      "State and local business filings",
      "Estimated tax calculations and deposit schedules",
    ],
    who: "LLCs, partnerships, S-corporations and corporations — from a first year of trading to an established book of business.",
    needs: [
      "Year-end books, or the records to build them from",
      "Prior-year business return and the entity's formation documents",
      "Payroll reports and any 1099s issued",
      "A list of owners and their ownership percentages",
    ],
  },

  "payroll-support": {
    metaDescription:
      "Payroll runs, tax deposits and quarterly filings handled on schedule. Form 941, state unemployment, local returns, W-2s and 1099s, across multiple states.",
    intro:
      "Payroll is unforgiving. The deadlines are fixed, the penalties are automatic, and nobody thinks about it until something has been missed. Most owners arrive here after a penalty notice, and the point of the service is that those stop.",
    covers: [
      "Payroll runs on your schedule, weekly through monthly",
      "Federal, state and local withholding calculated correctly",
      "Tax deposits made on time, every cycle",
      "Quarterly returns — Form 941, state unemployment, local filings",
      "Year-end W-2s and 1099s",
      "New hire reporting, and worker classification questions before they become problems",
    ],
    who: "Small and mid-sized employers, including businesses running payroll across more than one state.",
    needs: [
      "Employer identification numbers, federal and state",
      "Employee details, pay rates and withholding elections",
      "Your current pay schedule and any existing payroll reports",
      "Copies of recent quarterly filings, if there are any",
    ],
  },

  "accounting-services": {
    metaDescription:
      "Bookkeeping, reconciliations and financial statements that keep your records audit-ready, including cleanup of books that have fallen behind.",
    intro:
      "Books kept properly make every other piece of work cheaper — the return, the loan application, the examination you hope never comes. Books left to drift cost real money to reconstruct.",
    covers: [
      "Bookkeeping and monthly reconciliations",
      "Profit and loss statements and balance sheets",
      "Accounts payable and receivable tracking",
      "Cleanup of books that have fallen behind",
      "Sales tax filings where they apply",
      "Financial statements prepared for lenders",
    ],
    who: "Businesses without a bookkeeper in-house, and any owner whose accounts have drifted far enough that year-end has become something to dread.",
    needs: [
      "Bank and credit card statements for the period",
      "Access to your existing bookkeeping file, if there is one",
      "Invoices issued and bills received",
      "Payroll records for the same period",
    ],
  },

  "new-business-tax-consulting": {
    metaDescription:
      "Entity selection, EIN and state registrations, owner compensation and first-year estimated taxes. Set a new business up correctly before it costs you.",
    intro:
      "The decisions made in a business's first weeks — the entity, the registrations, how the owner gets paid — set its tax position for years. They are cheap to get right at the start and expensive to unwind later.",
    covers: [
      "Entity selection: LLC, S-corporation, partnership or corporation",
      "Federal EIN and state tax registrations",
      "Owner compensation and distribution structure",
      "Setting up a bookkeeping system you will actually keep up with",
      "An estimated tax schedule for the first year",
      "What records to keep, and for how long",
    ],
    who: "Anyone about to start trading, or recently started and not yet confident the setup is right.",
    needs: [
      "What the business will do, and where it will operate",
      "Who the owners are and how they intend to split it",
      "Whether there will be employees, and roughly when",
      "Any registrations or filings already made",
    ],
  },

  "tax-problem-consulting": {
    metaDescription:
      "Back taxes, unfiled returns, penalties and liens. We establish what is actually owed, file the missing years and work toward a payment arrangement.",
    intro:
      "Back taxes, unfiled years, penalties and liens do not resolve themselves, and they get more expensive with time. The first step is establishing what is actually owed — which is frequently less than the notices suggest.",
    covers: [
      "Reading a notice and telling you what it actually says",
      "Prior-year returns that were never filed, prepared and filed",
      "Penalty abatement requests where there are grounds",
      "Instalment agreements and payment plans",
      "Liens and levies: what triggered them, and what releases them",
      "Account transcript review to establish the real balance",
    ],
    who: "Anyone with unopened letters, unfiled years, or a balance they cannot clear in one payment.",
    needs: [
      "Every notice you have received, even the ones you did not open",
      "Whatever records exist for the unfiled years",
      "The last return you did file",
    ],
  },

  "irs-audit-representation": {
    metaDescription:
      "IRS audit representation. We file a power of attorney, handle the correspondence and attend the examination in your place, for federal and state audits.",
    intro:
      "You do not have to deal with the IRS yourself. As a paid preparer we can be authorised to correspond with them on your behalf, which means the letters and the phone calls come to us instead of you.",
    covers: [
      "Power of attorney filed so we can act for you",
      "Responding to correspondence and examination notices",
      "Assembling and presenting the documentation requested",
      "Attending the examination in your place",
      "Appeals, where an outcome is wrong",
      "State examinations as well as federal",
    ],
    who: "Anyone who has received an examination notice — whether or not we prepared the return in question.",
    needs: [
      "The examination notice and every letter that came with it",
      "The return under examination, as filed",
      "Records supporting the items the agency has questioned",
    ],
  },

  "loan-modifications": {
    metaDescription:
      "Loan modification support: assembling the income, expense and hardship documentation your lender requires, in the form they will actually accept.",
    intro:
      "A modification request stands or falls on the financial package behind it. Lenders ask for documentation most people do not have assembled, in a form they will accept. That assembly is the work.",
    covers: [
      "Assembling income and expense documentation",
      "Profit and loss statements for self-employed applicants",
      "Hardship documentation",
      "Reviewing the lender's stated requirements before anything is submitted",
      "Preparing the financial package to their specification",
      "Follow-up documentation as the request progresses",
    ],
    who: "Homeowners and business owners preparing a modification request with their lender.",
    needs: [
      "The lender's document checklist, if they have issued one",
      "Recent income records and bank statements",
      "Your current loan statements and any correspondence with the lender",
    ],
  },

  "debt-settlement": {
    metaDescription:
      "Debt settlement support. A clear picture of what you owe, negotiation with creditors, and the tax consequences of forgiven debt that most people miss.",
    intro:
      "Settling debt starts with an honest picture: what you owe, to whom, and what is genuinely collectible. Not every balance should be settled, and a forgiven balance can create a tax bill of its own — which is the part people find out about afterwards.",
    covers: [
      "A full picture of balances, creditors and account status",
      "Identifying what is disputed, duplicated or time-barred",
      "Negotiating with creditors toward a settlement",
      "Documenting any agreement that is reached",
      "The tax consequences of forgiven debt, which are frequently overlooked",
      "Budget work so a settlement actually holds",
    ],
    who: "Individuals and businesses carrying balances they cannot clear on the current terms.",
    needs: [
      "Statements for each account in question",
      "Any collection letters or judgements received",
      "A realistic picture of monthly income and outgoings",
    ],
  },
};
