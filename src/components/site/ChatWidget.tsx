import Script from "next/script";

/**
 * LeadConnector chat widget, loaded site-wide from the root layout.
 *
 * Loaded after hydration so it never competes with the page's own content for
 * the main thread. The widget injects its own launcher, which sits bottom
 * right — the floating "Call Now" button is pinned bottom left to keep clear
 * of it.
 */
export function ChatWidget() {
  return (
    <Script
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="6aabda311bf37a2e8f2cb745"
      strategy="afterInteractive"
    />
  );
}
