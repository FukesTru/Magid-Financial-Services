import Script from "next/script";

/**
 * GA4 tag.
 *
 * Set NEXT_PUBLIC_GA_MEASUREMENT_ID (format: G-XXXXXXXXXX) in the deployment
 * environment to switch it on. Until the client supplies a measurement ID
 * nothing is loaded, so no requests go out and no cookies are set.
 */
export function Analytics() {
  // Trimmed so a blank or whitespace-only value counts as "not configured"
  // rather than injecting a script tag with a broken measurement ID.
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
