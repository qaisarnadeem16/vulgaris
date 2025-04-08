import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'fr', 'pt', 'es', 'ar', 'zh', 'th', 'nl', 'de', 'ja'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  // Other config options here
};

export default nextConfig;
