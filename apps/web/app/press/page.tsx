import type { Metadata } from 'next'
import { campaignVideos, jpmcFeature, pressArticles, verizonAd } from '@/lib/press'

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
  return (
    <div className="py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Rokia Sissoko in the Press</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Rokia Sissoko (Rokiatou Sissoko) was one of six students at the Bronx Academy of Promise
          who built QuestMath, a Greek mythology&ndash;themed game they designed to solve their own
          struggles with math. It helps students in grades 4 through 8 practice addition,
          subtraction, multiplication and division across progressive levels named after Greek gods
          like Zeus, Aphrodite and Poseidon. The problems get harder as players climb, and a tutor
          steps in after three wrong answers in a row.
        </p>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          The team designed and programmed QuestMath in MIT App Inventor as sixth graders, and it
          won the 2013 Verizon Innovative App Challenge, named best in New York State and one of
          the top entries in the nation out of more than 350 teams. Two years later the students
          became the faces of Verizon&apos;s 2015 Black History Month campaign, &ldquo;The
          Potential of Us&rdquo;, with the &ldquo;Create History&rdquo; spots below.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight">JPMorganChase: Immersive Tech Products</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Rokia&apos;s team, Immersive Tech Products, featured in JPMorganChase&apos;s video on the
          technologists shaping AI and virtual reality. Posted {formatDate(jpmcFeature.date)}.{' '}
          <a
            href={jpmcFeature.url}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-shimmer"
          >
            See the post on LinkedIn
          </a>
        </p>
        <figure className="mt-6 max-w-md">
          <div className="overflow-hidden rounded-lg border bg-muted">
            <iframe
              src={jpmcFeature.embedUrl}
              title={jpmcFeature.title}
              loading="lazy"
              allow="fullscreen"
              className="h-[540px] w-full"
            />
          </div>
        </figure>
      </section>

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
          {pressArticles.map(({ date, outlet, headline, url }) => (
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
