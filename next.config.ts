import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // lucide-react / recharts are optimized by default; add CoreUI barrel packages
    // (bundle-barrel-imports)
    optimizePackageImports: ["@coreui/icons", "@coreui/icons-react"],
  },
};

export default nextConfig;
