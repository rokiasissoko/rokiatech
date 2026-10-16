/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from '@notionhq/client'
import type { Project, ResearchItem } from '@rokiatech/types'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

const PROJECTS_DATABASE_ID = process.env.NOTION_PROJECTS_DB_ID ?? ''
const RESEARCH_DATABASE_ID = process.env.NOTION_RESEARCH_DB_ID ?? ''

// Notion API v5 queries data sources, not databases. Resolve each database's
// first data source once, so the env vars can keep holding database IDs.
const dataSourceIds = new Map<string, Promise<string>>()

function getDataSourceId(databaseId: string): Promise<string> {
  let id = dataSourceIds.get(databaseId)
  if (!id) {
    id = notion.databases.retrieve({ database_id: databaseId }).then((db: any) => {
      const sourceId = db.data_sources?.[0]?.id
      if (!sourceId) throw new Error(`Database ${databaseId} has no data sources`)
      return sourceId
    })
    // Don't cache a failure; retry on the next request.
    id.catch(() => dataSourceIds.delete(databaseId))
    dataSourceIds.set(databaseId, id)
  }
  return id
}

export async function getProjects(): Promise<Project[]> {
  if (!PROJECTS_DATABASE_ID || !process.env.NOTION_API_KEY) return []

  try {
    const response = await notion.dataSources.query({
      data_source_id: await getDataSourceId(PROJECTS_DATABASE_ID),
      filter: { property: 'Published', checkbox: { equals: true } },
      sorts: [{ property: 'Year', direction: 'descending' }],
    })

    return response.results.map((page: any) => ({
      id: page.id,
      title: page.properties?.Title?.title?.[0]?.plain_text ?? '',
      slug: page.properties?.Slug?.rich_text?.[0]?.plain_text ?? page.id,
      summary: page.properties?.Summary?.rich_text?.[0]?.plain_text ?? '',
      description: '',
      tags: page.properties?.Tags?.multi_select?.map((t: any) => t.name) ?? [],
      year: page.properties?.Year?.number ?? new Date().getFullYear(),
      featured: page.properties?.Featured?.checkbox ?? false,
      links: {
        github: page.properties?.GitHub?.url ?? undefined,
        demo: page.properties?.Demo?.url ?? undefined,
        slides: page.properties?.Slides?.url ?? undefined,
      },
    }))
  } catch (err) {
    console.warn('[Notion] getProjects failed:', err)
    return []
  }
}

export async function getResearch(): Promise<ResearchItem[]> {
  if (!RESEARCH_DATABASE_ID || !process.env.NOTION_API_KEY) return []

  try {
    const response = await notion.dataSources.query({
      data_source_id: await getDataSourceId(RESEARCH_DATABASE_ID),
      filter: { property: 'Published', checkbox: { equals: true } },
      sorts: [{ property: 'Year', direction: 'descending' }],
    })

    return response.results.map((page: any) => ({
      id: page.id,
      title: page.properties?.Name?.title?.[0]?.plain_text ?? '',
      slug: page.properties?.Slug?.rich_text?.[0]?.plain_text ?? page.id,
      summary: page.properties?.Summary?.rich_text?.[0]?.plain_text ?? '',
      description: '',
      tags: page.properties?.Tags?.multi_select?.map((t: any) => t.name) ?? [],
      year: page.properties?.Year?.number ?? new Date().getFullYear(),
      status: page.properties?.Status?.select?.name ?? 'in-progress',
      links: {
        paper: page.properties?.Paper?.url ?? undefined,
        slides: page.properties?.Slides?.url ?? undefined,
        lessonPlan: page.properties?.['Lesson Plan']?.url ?? undefined,
        supplementary: page.properties?.Supplementary?.url ?? undefined,
      },
    }))
  } catch (err) {
    console.warn('[Notion] getResearch failed:', err)
    return []
  }
}
