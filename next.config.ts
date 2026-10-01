import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/process", destination: "/practice#process", permanent: true },
      { source: "/team", destination: "/studio#team", permanent: true },
      { source: "/values", destination: "/studio#values", permanent: true },
    ];
  },
};

export default nextConfig;
