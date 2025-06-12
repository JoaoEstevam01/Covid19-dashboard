/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Covid19-dashboard',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: 'canvas' }]
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    }
    return config
  }
}

module.exports = nextConfig 