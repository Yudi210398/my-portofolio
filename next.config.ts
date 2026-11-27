import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ["192.168.100.8", "192.168.18.7"],
};

export default nextConfig;
