import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["storage.googleapis.com"], // If hosting externally
  },
};

export default nextConfig;
