import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const basePath = isGitHubPages ? "/tatiana-babanova-portfolio" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
