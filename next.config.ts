import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
    // lucide-react / recharts are optimized by default; add CoreUI barrel packages
    optimizePackageImports: ["@coreui/icons", "@coreui/icons-react"],
  },
};

export default nextConfig;
