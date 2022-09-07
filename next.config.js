/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["images.pexels.com", "via.placeholder.com"],
  },
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  }
};

module.exports = nextConfig;
