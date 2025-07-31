import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
<<<<<<< Updated upstream
    /* config options here */
=======
  /* config options here */
  reactStrictMode: true,
  output: 'standalone',
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
>>>>>>> Stashed changes
};

export default nextConfig;
