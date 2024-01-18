/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    // images: {
    //   domains: ['lh3.googleusercontent.com'],
    // }, 过期
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*.googleusercontent.com',
            port: '',
            pathname: '**',
          },
        ],
      },
    
    //此处是webpack的配置项
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
  }
  
  module.exports = nextConfig