/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/company/blogs',
        destination: '/company/blogs/index.html',
      },
    ]
  },
}

export default nextConfig
