"use server";

/**
 * A `"use server"` module may only export async functions. Anything else —
 * a constant, an object, an initial state — is exported to the client as
 * `undefined` and fails at runtime rather than at build time. So the state
 * shape and its initial value live in `@/lib/contact`, and this file exports
 * exactly one thing.
 */

import {
  DeliveryNotConfiguredError,
  deliverEnquiry,
  emptyEnquiry,
  validateEnquiry,
  type Enquiry,
  type EnquiryState,
} from "@/lib/contact";

function readField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function submitEnquiry(
  _previous: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const values: Enquiry = {
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    phone: readField(formData, "phone"),
    service: readField(formData, "service"),
    message: readField(formData, "message"),
  };

  // Honeypot. A field hidden from people but visible to a form-filling bot;
  // anything in it means the submission is automated. Reported back as sent
  // rather than rejected, so the bot has nothing to learn and retry against.
  if (readField(formData, "company").trim() !== "") {
    return { status: "sent", errors: {}, values: emptyEnquiry };
  }

  const errors = validateEnquiry(values);
  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors, values };
  }

  try {
    await deliverEnquiry(values);
  } catch (error) {
    // Either nothing is configured, or the provider refused it. Both mean the
    // message did not arrive, and the visitor is told so with their text still
    // in the form — the page then offers to send it from their own mail client.
    // The underlying error can carry provider credentials, so it is logged
    // server-side and never returned to the browser.
    if (!(error instanceof DeliveryNotConfiguredError)) {
      console.error("Enquiry delivery failed:", error);
    }
    return { status: "undeliverable", errors: {}, values };
  }

  return { status: "sent", errors: {}, values: emptyEnquiry };
}
