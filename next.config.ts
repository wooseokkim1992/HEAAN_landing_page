import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['localhost', '172.16.0.31'],
  reactStrictMode: true,
  output: 'standalone',
  compiler: {
    //removeConsole: process.env.NODE_ENV === 'development' ? {} : { exclude: ['error'] },
  },
  async rewrites() {
    return [
      {
        source: '/api/callback',
        destination: `/api/v2/users/oidc/callback`,
      },
      // {
      //   source: '/auth/:path*',
      //   destination: `${process.env.NEXT_PUBLIC_NGINX_URL}/interaction/:path*`,
      // },
    ];
  },
  // experimental: {
  //   serverActions: {
  //     allowedOrigins: ['wooseok.iheaan.io'],
  //   },
  // },
};

export default nextConfig;
