import type { Metadata } from 'next'
import { campaignVideos, pressArticles, verizonAd } from '@/lib/press'

export const metadata: Metadata = {
  title: 'Press',
  description:
    "Press coverage of Rokia Sissoko, from the Verizon Innovative App Challenge to Verizon's 2015 Create History campaign.",
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function PressPage() {
  const articles = [...pressArticles].reverse()

  return (
    <div className="py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Rokia Sissoko in the Press</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Rokia Sissoko (Rokiatou Sissoko) was one of six students at the Bronx Academy of Promise
          who won the Verizon Innovative App Challenge with a game that teaches math. The team went
          on to star in Verizon&apos;s 2015 Black History Month &ldquo;Create History&rdquo;
          campaign.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight">
          Verizon &ldquo;Create History&rdquo;
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Released {formatDate(verizonAd.date)}.{' '}
          <a
            href={verizonAd.url}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-shimmer"
          >
            See the TV spot on iSpot
          </a>
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {campaignVideos.map(({ id, title }) => (
            <figure key={id}>
              <div className="aspect-video overflow-hidden rounded-lg border bg-muted">
                <iframe
                  src={`https://player.vimeo.com/video/${id}?dnt=1`}
                  title={title}
                  loading="lazy"
                  allow="fullscreen; picture-in-picture"
                  className="h-full w-full"
                />
              </div>
              <figcaption className="mt-2 text-sm">{title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Articles</h2>
        <ol className="mt-6 divide-y border-y">
          {articles.map(({ date, outlet, headline, url }) => (
            <li key={url} className="py-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{outlet}</span>
                {' · '}
                <time dateTime={date}>{formatDate(date)}</time>
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block underline-offset-4 hover:underline"
              >
                {headline}
              </a>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
