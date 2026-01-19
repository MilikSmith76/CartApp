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
  redirects: () => ([
    {
      destination: '/carts',
      permanent: true,
      source: '/',
    }
  ]),
};

export default nextConfig;
