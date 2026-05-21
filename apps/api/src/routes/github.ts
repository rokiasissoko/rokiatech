import { Router } from 'express'

const router = Router()

const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? 'rokiasissoko'

router.get('/activity', async (_req, res) => {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
    }
  )

  if (!response.ok) {
    return res.status(502).json({ success: false, error: 'GitHub API error' })
  }

  const events = await response.json()
  res.json({ success: true, data: events })
})

export { router as githubRouter }
