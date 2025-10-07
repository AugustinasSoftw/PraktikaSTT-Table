import type { NextConfig } from "next";

const nextConfig: NextConfig = {
     output: "standalone",
  eslint: { ignoreDuringBuilds: true },     // don't block next build on lint
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
