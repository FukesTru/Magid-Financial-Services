import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Hosts next/image is allowed to optimise from. Unsplash serves every
     * photo off images.unsplash.com; self-hosted files under public/ do not
     * need an entry here.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],

    /**
     * Quality levels the optimiser will serve. Next 16 requires this to be an
     * allow-list — an unlisted value is rounded to the nearest listed one and
     * warned about in development, rather than honoured — so both values the
     * site actually asks for have to appear here: 75 for photography that
     * sits behind text, 80 for the About portrait, which is meant to be looked
     * at. Keep the list short; every entry is another variant to cache.
     */
    qualities: [75, 80],
  },
};

export default nextConfig;
