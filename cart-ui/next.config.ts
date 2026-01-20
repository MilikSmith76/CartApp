import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    API_HOST: process.env.API_HOST,
  },
  headers: async () => ([
    {
      headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type',
          },
        ],
      source: '/api/:resources*',
    },
  ]),
  images: {
    remotePatterns: [
      {
        hostname: '**',
        protocol: 'https',
      },
    ],
  },
  output: process.env.NODE_ENV == 'production' ? 'standalone' : undefined,
  redirects: async () => ([
    {
      destination: '/carts',
      permanent: true,
      source: '/',
    }
  ])
};

export default nextConfig;
