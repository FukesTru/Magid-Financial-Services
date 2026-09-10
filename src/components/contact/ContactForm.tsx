"use client";

import { useActionState, useId, useState } from "react";
import { submitEnquiry } from "@/app/contact/actions";
import {
  emptyEnquiry,
  enquiryMailto,
  initialEnquiryState,
  type Enquiry,
  type EnquiryState,
} from "@/lib/contact";
import { services } from "@/lib/site";

/**
 * The enquiry form.
 *
 * Two modes, decided on the server and passed in as `canDeliver`:
 *
 *  - Delivery configured — the form posts to a server action, which validates
 *    and sends. If sending then fails, the visitor is told and handed the
 *    mail-client fallback with their message intact.
 *  - Delivery not configured — the form does not pretend. It composes the same
 *    message in the visitor's own mail client instead, which needs no backend
 *    and cannot silently lose anything. See src/lib/contact.ts.
 */
export function ContactForm({ canDeliver }: { canDeliver: boolean }) {
  const [state, formAction, pending] = useActionState<EnquiryState, FormData>(
    submitEnquiry,
    initialEnquiryState,
  );

  if (state.status === "sent") {
    return <Sent />;
  }

  return canDeliver ? (
    <ServerForm state={state} formAction={formAction} pending={pending} />
  ) : (
    <MailtoForm />
  );
}

/* -------------------------------------------------------------------------- */

function Sent() {
  return (
    <div
      role="status"
      className="border border-gold-500/30 bg-gold-500/5 p-8 sm:p-10"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-9 w-9 text-gold-500"
      >
        <path
          d="M4 12.5 9.5 18 20 6.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h3 className="mt-6 font-display text-2xl text-ink-50">
        Thank you — that reached us.
      </h3>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-300">
        A person will read it and reply, usually within one business day. If it
        is urgent, calling is always faster than waiting for an email.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function ServerForm({
  state,
  formAction,
  pending,
}: {
  state: EnquiryState;
  formAction: (formData: FormData) => void;
  pending: boolean;
}) {
  return (
    <form action={formAction} noValidate className="space-y-6">
      {state.status === "undeliverable" && (
        <Undeliverable values={state.values} />
      )}

      <Fields errors={state.errors} defaults={state.values} />

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-gold-500 px-7 py-3.5 font-sans text-[0.9375rem] font-semibold tracking-wide text-navy-950 shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset] transition-[background-color,box-shadow,transform] duration-200 ease-brand hover:bg-gold-400 hover:shadow-[0_8px_24px_-8px_rgba(201,168,76,0.55)] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Send enquiry"}
      </button>

      <p className="text-xs leading-relaxed text-ink-400">
        We use what you send here only to reply to you. Please do not include
        Social Security numbers or account numbers in this form — once we are in
        touch we will give you a secure way to send documents.
      </p>
    </form>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * No delivery configured, so this composes the message in the visitor's own
 * mail client. It is a normal form until submit, at which point the fields
 * become a `mailto:` URL — nothing is posted anywhere and nothing can be lost.
 */
function MailtoForm() {
  const [values, setValues] = useState<Enquiry>(emptyEnquiry);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = enquiryMailto(values);
      }}
      className="space-y-6"
    >
      <Fields
        errors={{}}
        defaults={values}
        onChange={(field, value) =>
          setValues((v) => ({ ...v, [field]: value }))
        }
      />

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-gold-500 px-7 py-3.5 font-sans text-[0.9375rem] font-semibold tracking-wide text-navy-950 shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset] transition-[background-color,box-shadow,transform] duration-200 ease-brand hover:bg-gold-400 hover:shadow-[0_8px_24px_-8px_rgba(201,168,76,0.55)] active:translate-y-px sm:w-auto"
      >
        Open this in your email app
      </button>

      <p className="text-xs leading-relaxed text-ink-400">
        This opens your own email app with the message ready to send, so nothing
        depends on our website delivering it. Please do not include Social
        Security numbers or account numbers — once we are in touch we will give
        you a secure way to send documents.
      </p>
    </form>
  );
}

/* -------------------------------------------------------------------------- */

function Undeliverable({ values }: { values: Enquiry }) {
  return (
    <div
      role="alert"
      className="border border-gold-500/30 bg-gold-500/5 p-6"
    >
      <h3 className="font-display text-lg text-ink-50">
        We could not send that from the website.
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-300">
        Your message has not been lost — it is still in the form below. Use the
        button to send it from your own email app instead, or call us and we
        will take the details over the phone.
      </p>
      <a
        href={enquiryMailto(values)}
        className="mt-5 inline-flex items-center gap-2 rounded-sm border border-gold-500/40 px-5 py-2.5 font-sans text-sm font-semibold tracking-wide text-gold-300 transition-colors duration-200 hover:border-gold-500 hover:bg-gold-500/10 hover:text-gold-200"
      >
        Send it from your email app
      </a>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * The fields themselves, shared by both modes.
 *
 * Uncontrolled with `defaultValue` when the server action owns the state (so a
 * rejected submission comes back filled in), controlled via `onChange` when the
 * mailto mode needs to read the values in the browser.
 */
function Fields({
  errors,
  defaults,
  onChange,
}: {
  errors: EnquiryState["errors"];
  defaults: Enquiry;
  onChange?: (field: keyof Enquiry, value: string) => void;
}) {
  const id = useId();
  const controlled = Boolean(onChange);

  const bind = (field: keyof Enquiry) =>
    controlled
      ? {
          value: defaults[field],
          onChange: (
            e: React.ChangeEvent<
              HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >,
          ) => onChange?.(field, e.target.value),
        }
      : { defaultValue: defaults[field] };

  return (
    <>
      {/*
        Honeypot: off-screen rather than display:none, because some bots skip
        hidden inputs. aria-hidden and tabIndex keep it away from real users.
      */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-company`}>Company (leave blank)</label>
        <input
          id={`${id}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={`${id}-name`}
          name="name"
          label="Your name"
          required
          autoComplete="name"
          error={errors.name}
          {...bind("name")}
        />
        <Field
          id={`${id}-email`}
          name="email"
          type="email"
          label="Email"
          required
          autoComplete="email"
          error={errors.email}
          {...bind("email")}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={`${id}-phone`}
          name="phone"
          type="tel"
          label="Phone"
          hint="Optional"
          autoComplete="tel"
          error={errors.phone}
          {...bind("phone")}
        />

        <div>
          <label
            htmlFor={`${id}-service`}
            className="block font-sans text-sm font-medium text-ink-200"
          >
            What is this about?{" "}
            <span className="font-normal text-ink-400">Optional</span>
          </label>
          <select
            id={`${id}-service`}
            name="service"
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={errors.service ? `${id}-service-error` : undefined}
            className="mt-2 w-full rounded-sm border border-white/12 bg-navy-950 px-4 py-3 font-sans text-[0.9375rem] text-ink-100 transition-colors duration-200 hover:border-white/20 focus:border-gold-500/60 focus:outline-none"
            {...bind("service")}
          >
            <option value="">I am not sure yet</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
          </select>
          {errors.service && <FieldError id={`${id}-service-error`}>{errors.service}</FieldError>}
        </div>
      </div>

      <div>
        <label
          htmlFor={`${id}-message`}
          className="block font-sans text-sm font-medium text-ink-200"
        >
          What are you dealing with? <span className="text-gold-500">*</span>
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={6}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${id}-message-error` : undefined}
          placeholder="A return, a payroll schedule, a letter you would rather not open — a sentence or two is plenty."
          className="mt-2 w-full resize-y rounded-sm border border-white/12 bg-navy-950 px-4 py-3 font-sans text-[0.9375rem] leading-relaxed text-ink-100 transition-colors duration-200 placeholder:text-ink-400/60 hover:border-white/20 focus:border-gold-500/60 focus:outline-none"
          {...bind("message")}
        />
        {errors.message && <FieldError id={`${id}-message-error`}>{errors.message}</FieldError>}
      </div>
    </>
  );
}

function Field({
  id,
  name,
  label,
  hint,
  error,
  type = "text",
  required,
  autoComplete,
  ...rest
}: {
  id: string;
  name: string;
  label: string;
  hint?: string;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
} & (
  | { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }
  | { defaultValue: string }
)) {
  return (
    <div>
      <label htmlFor={id} className="block font-sans text-sm font-medium text-ink-200">
        {label}{" "}
        {required ? (
          <span className="text-gold-500">*</span>
        ) : hint ? (
          <span className="font-normal text-ink-400">{hint}</span>
        ) : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 w-full rounded-sm border border-white/12 bg-navy-950 px-4 py-3 font-sans text-[0.9375rem] text-ink-100 transition-colors duration-200 placeholder:text-ink-400/60 hover:border-white/20 focus:border-gold-500/60 focus:outline-none"
        {...rest}
      />
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 font-sans text-xs text-gold-300">
      {children}
    </p>
  );
}
