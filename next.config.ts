import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

// Wrap with bundle analyzer — only active when ANALYZE=true.
// Run: ANALYZE=true pnpm build
const bundleAnalyzer = withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

export default bundleAnalyzer(nextConfig);
