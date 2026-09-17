import Script from "next/script";

const FORM_ID = "OXnUSFwSMjhL0bdkyCYR";
const FORM_NAME = "Website Form (Payroll and tax solution inc)";

/**
 * The LeadConnector (GoHighLevel) enquiry form, embedded as supplied.
 *
 * Two things about the vendor snippet need handling in a real page:
 *
 *  - It asks for `height: 100%`, which only resolves if an ancestor has a
 *    height. Their page-builder gives it one; a normal document does not, so
 *    the frame would collapse. The wrapper and the frame both carry a
 *    min-height matching the snippet's own `data-height`, which the embed
 *    script then overrides with the real measured height once it loads.
 *
 *  - The form is rendered by the vendor on their own origin, so this page
 *    cannot style it. The panel is white because a form built on their
 *    default light theme — or one with a transparent background — needs a
 *    light ground to stay readable. If the form is configured dark, change
 *    the panel colour here and nothing else.
 */
export function LeadForm() {
  return (
    <>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white p-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]">
        <iframe
          src={`https://api.leadconnectorhq.com/widget/form/${FORM_ID}`}
          id={`inline-${FORM_ID}`}
          title={FORM_NAME}
          className="block h-full min-h-[542px] w-full rounded-[10px] border-none"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name={FORM_NAME}
          data-height="542"
          data-layout-iframe-id={`inline-${FORM_ID}`}
          data-form-id={FORM_ID}
          data-cookie-consent="true"
          data-cookie-consent-provider="auto"
        />
      </div>

      {/* Resizes the frame to the form's real height and handles consent. */}
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}
