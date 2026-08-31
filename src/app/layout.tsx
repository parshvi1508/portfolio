import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Caveat } from 'next/font/google'
import dynamic from 'next/dynamic'
import './globals.css'
import { META } from '@/lib/data'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
  weight: ['400', '600'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
})

const GlowCursor = dynamic(
  () => import('@/components/cursor/GlowCursor').then((m) => m.GlowCursor),
  { ssr: false }
)

const AgentMascot = dynamic(
  () => import('@/components/agent/AgentMascot').then((m) => m.AgentMascot),
  { ssr: false }
)

export const metadata: Metadata = {
  metadataBase: new URL(META.url),
  title: {
    default: META.title,
    template: `%s | Parshvi Jain`,
  },
  description: META.description,
  authors: [{ name: META.name }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: META.url,
    siteName: META.name,
    title: META.title,
    description: META.description,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: META.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: META.title,
    description: META.description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${caveat.variable}`}>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}})();`,
          }}
        />
        {children}
        <GlowCursor />
        <AgentMascot />
      </body>
    </html>
  )
}
