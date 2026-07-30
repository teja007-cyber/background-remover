import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    ".space-z.ai",
  ],
  // Optimize bundle by deep-importing only used icons
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@radix-ui/react-dialog", "@radix-ui/react-tabs"],
  },
  // Enable SWC minification and other optimizations
  swcMinify: true,
  // Compress responses
  compress: true,
  // Disable powered-by header
  poweredByHeader: false,
};

export default nextConfig;
