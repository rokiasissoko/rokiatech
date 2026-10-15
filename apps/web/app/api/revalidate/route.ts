import { createHmac, timingSafeEqual } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

// Refreshes /work and /research when Notion content changes.
// Accepts either a Notion integration webhook (signed with X-Notion-Signature)
// or a manual / Notion-automation call carrying REVALIDATE_SECRET.

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  return ab.length === bb.length && timingSafeEqual(ab, bb)
}

function hasValidSecret(req: Request) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) return false
  const header =
    req.headers.get('x-revalidate-secret') ??
    req.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ??
    ''
  return safeEqual(header, secret)
}

function hasValidNotionSignature(req: Request, rawBody: string) {
  const token = process.env.NOTION_WEBHOOK_VERIFICATION_TOKEN
  const signature = req.headers.get('x-notion-signature')
  if (!token || !signature) return false
  const expected = `sha256=${createHmac('sha256', token).update(rawBody).digest('hex')}`
  return safeEqual(signature, expected)
}

export async function POST(req: Request) {
  const rawBody = await req.text()

  // One-time Notion subscription handshake: Notion posts a verification_token
  // that must be pasted back into the integration's Webhooks tab.
  if (!process.env.NOTION_WEBHOOK_VERIFICATION_TOKEN) {
    try {
      const body = JSON.parse(rawBody)
      if (typeof body?.verification_token === 'string') {
        console.log('[revalidate] Notion verification_token:', body.verification_token)
        return NextResponse.json({ ok: true })
      }
    } catch {
      // not JSON — fall through to auth check
    }
  }

  if (!hasValidSecret(req) && !hasValidNotionSignature(req, rawBody)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  revalidatePath('/work')
  revalidatePath('/research')

  return NextResponse.json({ ok: true, revalidated: ['/work', '/research'] })
}
