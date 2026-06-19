import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (multiple lockfiles exist on this machine).
  turbopack: { root: process.cwd() },
  images: {
    // Next 16 requires explicit allowed qualities. We optimise local photos only.
    qualities: [70, 80, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
