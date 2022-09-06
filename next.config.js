/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["images.pexels.com", "via.placeholder.com"],
  },
};

module.exports = nextConfig;
