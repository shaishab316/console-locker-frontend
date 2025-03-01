import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["192.168.10.132"],
  },
  
};

export default nextConfig
