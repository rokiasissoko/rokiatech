const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'rokiasissoko'
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

export interface GitHubEvent {
  id: string
  type: string
  repo: { name: string; url: string }
  created_at: string
  payload: Record<string, unknown>
}

export async function getRecentActivity(): Promise<GitHubEvent[]> {
  try {
    const res = await fetch(`${API_BASE}/github/activity`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const json = await res.json()
    return json.data ?? []
  } catch {
    return []
  }
}

export function getGitHubUrl() {
  return `https://github.com/${GITHUB_USERNAME}`
}
