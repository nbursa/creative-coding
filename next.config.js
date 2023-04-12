/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // fs: false,
    // webpack: (config, {isServer}) => {
    //     // Only include fs module on the server side
    //     if (!isServer) {
    //         config.node = {
    //             fs: 'empty',
    //         }
    //     }
    //     return config
    // },
}

module.exports = nextConfig
