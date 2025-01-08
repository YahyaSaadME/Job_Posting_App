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
    unoptimized: true,
  },
};

export default nextConfig;
