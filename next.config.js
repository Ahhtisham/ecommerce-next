/** @type {import('next').NextConfig} */

module.exports = {
    images: {
        // add unoptimized for prevent from: image
        // server respond with a status 404
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.dummyjson.com',
            }
        ]
    },
}