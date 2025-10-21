import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
