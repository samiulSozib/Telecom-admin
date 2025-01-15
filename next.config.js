/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
    i18n: {
        locales: ['de','en' , 'es' , 'fr' , 'ja' , 'zh' , 'tr' , 'fa' , 'pa'],
        defaultLocale: 'en', // Set the default locale
        localeDetection: true,
    },
    reactStrictMode: false,
    localePath: path.resolve('./public/locales'),
    experimental: {
        metadataBase: 'http://localhost:3000', // Replace with your actual domain
    },
}

module.exports = nextConfig
