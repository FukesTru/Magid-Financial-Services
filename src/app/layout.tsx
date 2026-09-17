import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@/components/seo/Analytics";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ChatWidget } from "@/components/site/ChatWidget";
import { FloatingCallButton } from "@/components/site/FloatingCallButton";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { site } from "@/lib/site";
import "./globals.css";

/* Headline face — Playfair Display (serif). */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

/* Body face — Inter (sans-serif). */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Payroll, tax preparation and accounting in Huntingdon Valley, PA. Payroll and Tax Solution Inc serves individuals and businesses in all 50 states since 1989.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Tax & Payroll Services in Huntingdon Valley, PA",
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  keywords: [
    "tax and payroll services Huntingdon Valley PA",
    "tax preparation Huntingdon Valley",
    "payroll services Pennsylvania",
    "accounting services Huntingdon Valley PA",
    "IRS audit representation",
    "business tax services PA",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
    title: "Tax & Payroll Services in Huntingdon Valley, PA",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Tax & Payroll Services in Huntingdon Valley, PA",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "finance",
};

export const viewport: Viewport = {
  themeColor: "#0a0f1a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Without JS the scroll reveals never run, so unpin their opacity. */}
        <noscript>
          <style>{`
            [data-reveal]{opacity:1!important;transform:none!important}
            [data-site-header]{background-color:#060a12!important;border-bottom-color:rgba(246,248,251,.08)!important}
          `}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-navy-900">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-gold-500 focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:font-semibold focus:text-navy-950"
        >
          Skip to content
        </a>

        <SiteHeader />
        <main id="main" className="grow">
          {children}
        </main>
        <SiteFooter />
        <FloatingCallButton />

        <OrganizationJsonLd />
        <Analytics />
        <ChatWidget />
      </body>
    </html>
  );
}
