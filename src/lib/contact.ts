import { isServiceSlug, site } from "./site";

/**
 * Enquiry delivery.
 *
 * ---------------------------------------------------------------------------
 * THE RULE THIS FILE EXISTS TO ENFORCE
 *
 * A contact form that accepts a message, says "thank you", and drops it is
 * worse than no form at all — the prospect believes they have made contact and
 * stops trying, and the firm never learns the enquiry existed. For a practice
 * whose whole offer is "a person will get back to you", that is the single
 * most damaging bug the site could have.
 *
 * So delivery is never assumed. `isDeliveryConfigured()` is checked before the
 * form is rendered, and the page switches to composing the message in the
 * visitor's own mail client when nothing is configured. If configuration is
 * present but delivery then fails, the error surfaces to the visitor with
 * their message intact — it is never swallowed.
 * ---------------------------------------------------------------------------
 *
 * To turn on server-side delivery, set both:
 *
 *   RESEND_API_KEY      an API key from https://resend.com
 *   CONTACT_FROM_EMAIL  a sender on a domain verified with that provider
 *
 * and optionally CONTACT_TO_EMAIL to route enquiries somewhere other than the
 * public address. Resend is called over plain HTTPS, so there is no SDK to
 * install; swapping in another provider means changing one fetch below.
 */

export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  /** A service slug, or "" for a general enquiry. */
  service: string;
  message: string;
};

export const emptyEnquiry: Enquiry = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

export class DeliveryNotConfiguredError extends Error {
  constructor() {
    super("No enquiry delivery is configured.");
    this.name = "DeliveryNotConfiguredError";
  }
}

/** Where enquiries are sent. Falls back to the address published on the site. */
export function enquiryRecipient(): string {
  return process.env.CONTACT_TO_EMAIL?.trim() || site.email;
}

/**
 * Whether the server can actually send an enquiry on the visitor's behalf.
 * Read this in a server component; the page renders differently either way.
 */
export function isDeliveryConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() && process.env.CONTACT_FROM_EMAIL?.trim(),
  );
}

/* -------------------------------------------------------------------------- */
/* Validation                                                                  */
/* -------------------------------------------------------------------------- */

export type FieldErrors = Partial<Record<keyof Enquiry, string>>;

/**
 * Deliberately forgiving. This is a form on a tax firm's website, not an
 * identity check — the cost of turning away a real enquiry over a formatting
 * opinion is far higher than the cost of accepting a slightly odd one. Email
 * is checked for the shape that makes it deliverable and nothing more.
 */
export function validateEnquiry(enquiry: Enquiry): FieldErrors {
  const errors: FieldErrors = {};

  if (enquiry.name.trim().length < 2) {
    errors.name = "Please tell us your name.";
  } else if (enquiry.name.length > 100) {
    errors.name = "That name is longer than we can store.";
  }

  const email = enquiry.email.trim();
  if (!email) {
    errors.email = "We need an email address to reply to.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    errors.email = "That does not look like an email address we could reply to.";
  }

  if (enquiry.phone.length > 40) {
    errors.phone = "That phone number is longer than we can store.";
  }

  // A service the site does not offer means a tampered or stale form, not a
  // typo — there is no free-text path to this field.
  if (enquiry.service && !isServiceSlug(enquiry.service)) {
    errors.service = "Please choose one of the listed services.";
  }

  const message = enquiry.message.trim();
  if (message.length < 10) {
    errors.message = "A sentence or two about your situation is enough.";
  } else if (message.length > 4000) {
    errors.message = "Please keep this under 4,000 characters — you can send documents later.";
  }

  return errors;
}

/**
 * What the form gets back from the server action.
 *
 * This lives here rather than beside the action itself because a `"use server"`
 * module may only export async functions — a plain constant exported from one
 * arrives on the client as `undefined`, which is a runtime crash rather than a
 * build error and only shows up on the branch that reads it.
 */
export type EnquiryState = {
  status: "idle" | "sent" | "invalid" | "undeliverable";
  errors: FieldErrors;
  /** Echoed back so a rejected submission never empties the form. */
  values: Enquiry;
};

export const initialEnquiryState: EnquiryState = {
  status: "idle",
  errors: {},
  values: emptyEnquiry,
};

/* -------------------------------------------------------------------------- */
/* Delivery                                                                    */
/* -------------------------------------------------------------------------- */

function plainTextBody(enquiry: Enquiry): string {
  return [
    `Name:    ${enquiry.name}`,
    `Email:   ${enquiry.email}`,
    `Phone:   ${enquiry.phone || "—"}`,
    `Service: ${enquiry.service || "General enquiry"}`,
    "",
    enquiry.message,
    "",
    `— Sent from the enquiry form at ${site.url}/contact`,
  ].join("\n");
}

/**
 * Send one enquiry. Throws rather than returning a status: a caller that
 * forgets to check a boolean would silently lose messages, and an exception
 * cannot be ignored by accident.
 */
export async function deliverEnquiry(enquiry: Enquiry): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !from) throw new DeliveryNotConfiguredError();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [enquiryRecipient()],
      // So a reply from the inbox goes to the person who wrote in, rather than
      // to the sending domain.
      reply_to: enquiry.email,
      subject: `Website enquiry — ${enquiry.name}`,
      text: plainTextBody(enquiry),
    }),
  });

  if (!response.ok) {
    // The provider's error body can quote the API key back; never propagate it.
    throw new Error(`Enquiry delivery failed with status ${response.status}.`);
  }
}

/**
 * The same enquiry as a `mailto:` URL.
 *
 * Used as the fallback whenever the server cannot send: the visitor's own mail
 * client opens with everything they typed already in it, so a failure costs
 * them a click rather than the message.
 */
export function enquiryMailto(enquiry: Enquiry): string {
  const subject = `Website enquiry — ${enquiry.name || "New enquiry"}`;
  const body = plainTextBody(enquiry);
  return `mailto:${enquiryRecipient()}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
