/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const nextConfig = {
    reactStrictMode: true,
}

module.exports = withPlugins([
    withImages,
], {
    ...nextConfig,
    webpack(config) {
        return config
    },
    postcssLoaderOptions: {
        postcssOptions: {
            plugins: [
                'postcss-import',
                'tailwindcss',
                'autoprefixer',
            ],
        },
    },
})
