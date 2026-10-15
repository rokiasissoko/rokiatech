import type { Metadata } from 'next'
import { Geist, Geist_Mono, Bodoni_Moda, Archivo } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/sections/Nav'
import { Analytics } from '@vercel/analytics/next'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const bodoniModa = Bodoni_Moda({
  variable: '--font-bodoni',
  subsets: ['latin'],
  axes: ['opsz'],
  style: ['normal', 'italic'],
  weight: 'variable',
})

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const SITE_URL = 'https://rokiatech.co'
const DESCRIPTION =
  'Software engineer and graduate researcher building AI-powered platforms, immersive experiences, and research tools.'

// schema.org graph so search engines tie the name "Rokia Sissoko" and the "rokiatech" brand to this site
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Rokia Sissoko',
      url: SITE_URL,
      image: `${SITE_URL}/rokia-cover.jpg`,
      jobTitle: 'Software Engineer',
      description: DESCRIPTION,
      sameAs: [
        'https://www.linkedin.com/in/rokiasissoko/',
        'https://github.com/rokiasissoko',
        'https://x.com/rokiatech',
        'https://www.instagram.com/rokiatech/',
        'https://www.tiktok.com/@rokiatech',
        'https://www.youtube.com/@rokiatech',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'rokiatech',
      alternateName: ['Rokia Sissoko', 'rokiatech.co'],
      url: SITE_URL,
      publisher: { '@id': `${SITE_URL}/#person` },
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Rokia Sissoko · rokiatech',
    template: '%s | Rokia Sissoko',
  },
  description: DESCRIPTION,
  icons: {
    icon: [
      { url: '/favicon.png?v=3', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png?v=3', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: '/favicon.png?v=3',
    apple: '/apple-touch-icon.png?v=3',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Rokia Sissoko · rokiatech',
  },
  twitter: { card: 'summary_large_image', site: '@rokiatech', creator: '@rokiatech' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${bodoniModa.variable} ${archivo.variable} h-full antialiased`}>
      {/* browser extensions (Grammarly, ColorZilla, …) inject attributes on <body> before hydration */}
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <Nav />
        <main className="mx-auto w-full max-w-5xl flex-1 px-6">{children}</main>
        <footer className="mx-auto w-full max-w-5xl border-t px-6 py-8 mt-24">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rokia Sissoko · rokiatech.co
          </p>
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
