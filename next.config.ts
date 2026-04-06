import type { NextConfig } from "next";

function getBasePath() {
  const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim();

  if (configuredBasePath) {
    return configuredBasePath === "/"
      ? ""
      : configuredBasePath.replace(/\/+$/, "");
  }

  const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];

  if (process.env.GITHUB_ACTIONS === "true" && repositoryName) {
    return `/${repositoryName}`;
  }

  return "";
}

const basePath = getBasePath();

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.trycloudflare.com"],
  assetPrefix: basePath || undefined,
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
