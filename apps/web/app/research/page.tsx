import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { getResearch } from '@/lib/notion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Research',
  description: 'Graduate research in XR, social skills development, and culturally responsive learning.',
}

export const revalidate = 3600

export default async function ResearchPage() {
  const items = await getResearch()

  return (
    <div className="py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Research</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Graduate research at the intersection of extended reality, social skills development, and
          culturally responsive pedagogy.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-muted-foreground">Research items coming soon.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <Badge
                    variant={item.status === 'published' ? 'default' : 'secondary'}
                    className="shrink-0 capitalize"
                  >
                    {item.status.replace('-', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              {item.links?.paper && (
                <CardFooter>
                  <Link
                    href={item.links.paper}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink size={14} />
                    Read paper
                  </Link>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
