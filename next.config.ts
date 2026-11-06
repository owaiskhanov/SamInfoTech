import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the sandbox preview host to talk to the dev server.
  allowedDevOrigins: ["*.e2b.app", "*.arena.ai", "localhost:3000"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      // Preserve the old WordPress URLs for anything that used to point here.
      { source: "/portfolio/hr-solution", destination: "/portfolio/hr-solutions", permanent: true },
      { source: "/hr-solution", destination: "/portfolio/hr-solutions", permanent: true },
    ];
  },
};

export default nextConfig;
