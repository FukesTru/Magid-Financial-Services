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
  },
};

export default nextConfig;
