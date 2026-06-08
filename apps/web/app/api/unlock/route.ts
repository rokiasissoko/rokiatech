import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { password } = await req.json()
  const correct = process.env.PREVIEW_PASSWORD

  if (!correct) {
    return NextResponse.json({ ok: false, error: 'Not configured' }, { status: 500 })
  }

  if (password === correct) {
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ ok: false, error: 'Incorrect password' }, { status: 401 })
}
