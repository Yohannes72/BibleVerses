/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ["mongoose"], // External packages for server-side use
    images: {
        domains: ['lh3.googleusercontent.com'], // Allowed image domains
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true, // Enable top-level await in Webpack
        };
        return config;
    },
};

module.exports = nextConfig;
