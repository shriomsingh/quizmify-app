/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
              pathname: '/*',
            },
          ],
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreBuildErrors: true,
    }
}

module.exports = nextConfig
