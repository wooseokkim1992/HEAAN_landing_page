import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['localhost', '172.16.0.31'],
  reactStrictMode: true,
  output: 'standalone',
  webpack: (config, {}) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 960, 1200, 1920],
    imageSizes: [16, 56, 96, 128],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
