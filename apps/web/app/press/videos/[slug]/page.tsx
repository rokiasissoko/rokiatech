import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPressVideo, pressVideos, videoJsonLd, videoWatchPath } from '@/lib/press'

const SITE_URL = 'https://rokiatech.co'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return pressVideos.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const video = getPressVideo(slug)
  if (!video) return {}
  const path = videoWatchPath(slug)
  return {
    title: video.title,
    description: video.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'video.other',
      url: path,
      title: video.title,
      description: video.description,
      images: [video.thumbnailUrl],
    },
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function VideoWatchPage({ params }: Props) {
  const { slug } = await params
  const video = getPressVideo(slug)
  if (!video) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    ...videoJsonLd(video, `${SITE_URL}${videoWatchPath(slug)}`),
  }

  return (
    <div className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Link href="/press" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
        &larr; Press
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{video.title}</h1>

      <div
        className={
          video.frame === 'feed'
            ? 'mt-8 max-w-md overflow-hidden rounded-lg border bg-muted'
            : 'mt-8 aspect-video overflow-hidden rounded-lg border bg-muted'
        }
      >
        <iframe
          src={video.embedUrl}
          title={video.title}
          allow="fullscreen; picture-in-picture"
          className={video.frame === 'feed' ? 'h-[540px] w-full' : 'h-full w-full'}
        />
      </div>

      <p className="mt-6 max-w-2xl text-muted-foreground">{video.description}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        {video.publisher} · {formatDate(video.uploadDate)} ·{' '}
        <a href={video.url} target="_blank" rel="noopener noreferrer" className="gold-shimmer">
          Watch on {video.url.includes('vimeo.com') ? 'Vimeo' : 'LinkedIn'}
        </a>
      </p>
    </div>
  )
}
