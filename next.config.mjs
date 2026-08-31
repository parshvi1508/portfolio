import createMDX from '@next/mdx'

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  async headers() {
    return [
      {
        source: '/resume.pdf',
        headers: [
          { key: 'Content-Disposition', value: 'inline; filename="Parshvi_Jain_Resume.pdf"' },
          { key: 'Content-Type', value: 'application/pdf' },
        ],
      },
    ]
  },
}

export default withMDX(nextConfig)
