import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // Configure images (optional)
  images: {
    domains: ["example.com"], // Add domains for remote images if needed
  },

  // Output configuration (optional)
  output: "standalone", // Use "standalone" for optimized production builds

  // Webpack configuration (optional)
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": require("path").resolve(__dirname, "src"), // Ensure alias works with Webpack
    };
    return config;
  },
};

export default nextConfig;
