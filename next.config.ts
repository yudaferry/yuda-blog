import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['sort.my.id', '*.sort.my.id', '192.168.1.99'],
};

export default nextConfig;
