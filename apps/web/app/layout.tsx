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

export const metadata: Metadata = {
  title: {
    default: 'Rokia Sissoko — Software Engineer & Researcher',
    template: '%s | Rokia Sissoko',
  },
  description:
    'Software engineer and graduate researcher building AI-powered platforms, immersive experiences, and research tools.',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rokiatech.co',
    siteName: 'Rokia Sissoko',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${bodoniModa.variable} ${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Nav />
        <main className="mx-auto w-full max-w-5xl flex-1 px-6">{children}</main>
        <footer className="mx-auto w-full max-w-5xl border-t px-6 py-8 mt-24">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rokia Sissoko. Built with Next.js & Tailwind.
          </p>
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
