/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    return config;
  },
  images: {
    domains: [], // Add the image domains you want to use, if any
  },
};

module.exports = nextConfig;
