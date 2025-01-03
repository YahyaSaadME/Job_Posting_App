import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: require.resolve('path-browserify'),
    };
    return config;
  },
  images: {
    domains: ["storage.googleapis.com"], // If hosting externally
  },
};

export default nextConfig;
