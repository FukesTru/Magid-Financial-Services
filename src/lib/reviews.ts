/**
 * Client reviews, taken verbatim from the firm's Google Business Profile.
 *
 * Rules for this file, so the section stays trustworthy:
 *
 *  - Quotes are copied exactly, including the reviewer's own grammar. Tidying
 *    someone's words turns their review into our copy.
 *  - Where a review is shortened, it is a contiguous run of the original with
 *    `excerpt: true` set, never a stitched-together sentence. Nothing is
 *    added, reordered, or paraphrased.
 *  - Only reviews describing actual completed work appear here. One five-star
 *    review on the profile reads "Going there today see how it works out. My
 *    first time" — a good wish, not a testimonial, so it is left out.
 *  - Reviews are public on Google under these display names; the link below
 *    lets anyone read the full, unfiltered set.
 */

export type Review = {
  quote: string;
  name: string;
  /** True when the quote is a shortened run of a longer review. */
  excerpt?: boolean;
};

/** The firm's Google Business Profile, for "read them all" links. */
export const googleReviewsUrl =
  "https://www.google.com/maps/search/?api=1&query=Magid%20Financial%20Services&query_place_id=ChIJdes7oEuyxokRZdMuvozqMNU";

export const reviews: Review[] = [
  {
    quote:
      "They took the time to explain everything clearly, answered all my questions with patience, and made what usually feels like a complicated process completely smooth and stress-free. Their attention to detail and commitment to accuracy really stood out.",
    name: "D.EXPRESSLOCK",
    excerpt: true,
  },
  {
    quote:
      "I never been disappointed - have been with them for many years.",
    name: "Katya Fish",
  },
  {
    quote:
      "Tetiana Radko helped me with filing personal and business taxes. She answered all my questions. Professional and fast. Very nice team. I highly recommend them. A pleasant experience.",
    name: "Oleksandr Khimich",
  },
  {
    quote:
      "All reports and documents are prepared accurately and on time, making the process smooth and stress-free. The staff is always ready to provide clear explanations and helpful recommendations.",
    name: "Maryna Makarchyk",
    excerpt: true,
  },
  {
    quote:
      "Yulia she did a great job. I am extremely grateful. She is a real professional",
    name: "Daniiar Sagynaliev",
  },
  {
    quote: "Great professional service and excellent customer service",
    name: "Anna Hiten",
  },
];
