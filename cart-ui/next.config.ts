import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    API_HOST: process.env.API_HOST,
  },
  images: {
    remotePatterns: [
      {
        hostname: '**',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
