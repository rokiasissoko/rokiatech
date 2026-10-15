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

// press coverage about Rokia, as opposed to her own profiles in sameAs
const PRESS = [
  [
    '2012-11-29',
    'New York Daily News',
    'Once-failing Bronx charter school rings in this school year with smartphones and higher scores',
    'https://www.nydailynews.com/2012/11/29/once-failing-bronx-charter-school-rings-in-this-school-year-with-smartphones-and-higher-scores/',
  ],
  [
    '2013-03-20',
    'New York Daily News',
    'Mott Haven 6th graders take top honors in national app design contest; students use game to teach math',
    'https://www.nydailynews.com/2013/03/20/mott-haven-6th-graders-take-top-honors-in-national-app-design-contest-students-use-game-to-teach-math/',
  ],
  [
    '2015-02-01',
    'NBC News',
    "These Kids From The Bronx Inspired Verizon's Black History Ad",
    'https://www.nbcnews.com/news/nbcblk/these-kids-bronx-inspired-verizons-black-history-ad-n297806',
  ],
  [
    '2015-02-02',
    'Welcome2TheBronx',
    'Bronx Kids Who Beat 350 Teams In Country To Create Math App Will Be Featured in Black History Month Verizon Ad',
    'https://www.welcome2thebronx.com/2015/02/bronx-kids-who-beat-350-teams-in-country-to-create-math-app-will-be-featured-in-black-history-month-verizon-ad/',
  ],
  [
    '2015-02-03',
    'The Evangelical Covenant Church',
    'Bronx Kids Featured in Verizon Black History Month Commercial',
    'https://covchurch.org/2015/02/02/bronx-kids-featured-in-verizon-black-history-month-commercial/',
  ],
  [
    '2015-02-04',
    'The Root',
    "We Can't Sit Back and Watch History, We've Got to Create It",
    'https://www.theroot.com/we-cant-sit-back-and-watch-history-weve-got-to-create-it',
  ],
  [
    '2015-02-04',
    'DNAinfo New York',
    'South Bronx Students Starring in National Verizon Wireless Ad Campaign',
    'https://www.dnainfo.com/new-york/20150204/high-bridge/south-bronx-students-starring-national-verizon-wireless-ad-campaign',
  ],
  [
    '2015-02-06',
    'MyPraise 102.5 Atlanta',
    'Beautiful News: 6 8th Graders Of Color From The Bronx To Star In Two Inspiring Verizon Commercials',
    'https://mypraiseatl.com/1556880/beautiful-news-6-8th-graders-of-color-from-the-bronx-to-star-in-two-inspiring-verizon-commercials-video/',
  ],
  [
    '2015-02-06',
    'Hello Beautiful',
    'Beautiful News: Six 8th Graders Of Color From The Bronx To Star In Two Inspiring Verizon Commercials',
    'https://hellobeautiful.com/2768368/kids-from-the-bronx-star-in-verizon-black-history-month-commercials/',
  ],
  [
    '2015-02-06',
    'Bronx Times (print edition)',
    'Bronx students are face of Verizon app',
    'https://www.bxtimes.com/wp-content/uploads/assets/pdf/2015_06bxt.pdf',
  ],
  [
    '2015-02-07',
    'Bronx Times',
    'Bronx students are face of Verizon campaign',
    'https://www.bxtimes.com/bronx-students-are-face-of-verizon-campaign/',
  ],
  [
    '2015-02-17',
    'UrbanGeekz',
    'Bronx kids design Math App to become faces of major ads campaign',
    'https://urbangeekz.com/2015/02/bronx-kids-design-award-winning-math-app-become-faces-major-ads-campaign/',
  ],
].map(([datePublished, publisher, headline, url]) => ({
  '@type': 'NewsArticle',
  headline,
  url,
  datePublished,
  publisher: { '@type': 'Organization', name: publisher },
}))

// the Verizon "Create History" TV spot the press above covers
const VERIZON_AD = {
  '@type': 'CreativeWork',
  name: "Verizon TV Spot, 'Create History: Assembly'",
  url: 'https://www.ispot.tv/ad/7xoi/verizon-create-history-assembly',
  description:
    'Verizon Black History Month commercial featuring the six Bronx Academy of Promise students who won the Verizon Innovative App Challenge.',
  sponsor: { '@type': 'Organization', name: 'Verizon' },
}

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
        'https://www.researchgate.net/profile/Rokia-Sissoko',
        'https://x.com/rokiatech',
        'https://www.instagram.com/rokiatech/',
        'https://www.tiktok.com/@rokiatech',
        'https://www.youtube.com/@rokiatech',
        'https://linktr.ee/rokiatech',
      ],
      subjectOf: [...PRESS, VERIZON_AD],
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
