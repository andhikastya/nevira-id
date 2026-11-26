import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let phones/tablets on the local Wi-Fi load dev assets (JS, HMR) when testing via the LAN IP.
  // Without this, Next blocks /_next/* for non-localhost origins and the page never hydrates (no 3D).
  allowedDevOrigins: ["192.168.1.*"],
  cacheComponents: true,
  // Inline the (small, Tailwind + icon subset) CSS into <head> so it no longer blocks first paint.
  experimental: { inlineCss: true },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
