/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // ensure App Router enabled
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;