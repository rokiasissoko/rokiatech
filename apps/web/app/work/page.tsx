import type { Metadata } from 'next'
import { getProjects } from '@/lib/notion'
import { ProjectCard } from '@/components/sections/ProjectCard'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected projects and case studies.',
}

export const revalidate = 3600

export default async function WorkPage() {
  const projects = await getProjects()

  return (
    <div className="py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Work</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Selected projects from corporate engineering, research, and independent work.
        </p>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground">Projects coming soon.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
