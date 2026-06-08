'use client'

import React, { useEffect, useRef, useState } from 'react'

const SUGGESTIONS = [
  'What do you build?',
  'Tell me about Live Audience',
  "What's your research about?",
  'How can we collaborate?',
]

interface Msg {
  role: 'user' | 'assistant'
  content: string
}

interface Props {
  open: boolean
  onClose: () => void
}

export function MagChat({ open, onClose }: Props) {
  const [input, setInput] = useState('')
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [busy, setBusy] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [msgs, busy])

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus())
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  async function send(text?: string) {
    const q = (text ?? input).trim()
    if (!q || busy) return
    setInput('')
    const next: Msg[] = [...msgs, { role: 'user', content: q }]
    setMsgs(next)
    setBusy(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      setMsgs((m) => [
        ...m,
        { role: 'assistant', content: data.reply?.trim() || "Let me gather my thoughts — ask me again?" },
      ])
    } catch {
      setMsgs((m) => [
        ...m,
        { role: 'assistant', content: 'A small hiccup on the line — try once more in a moment.' },
      ])
    } finally {
      setBusy(false)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }

  if (!open) return null

  return (
    <div
      className="iv-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="iv-panel" role="dialog" aria-label="In conversation with Rokia">
        <button className="iv-close" onClick={onClose} aria-label="Close">
          CLOSE ✕
        </button>
        <header className="iv-head">
          <div className="iv-kicker">IN CONVERSATION</div>
          <h2 className="iv-title">
            Ask <em>Rokia</em>
          </h2>
          <p className="iv-dek">
            A live interview — she answers in her own words. Ask about the work, the research, or
            what she&apos;s building next.
          </p>
        </header>

        <div className="iv-scroll" ref={scrollRef}>
          {msgs.length === 0 && (
            <div className="iv-suggest">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="iv-sug" onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}
          {msgs.map((m, i) => (
            <div key={i} className={`iv-turn iv-${m.role}`}>
              <span className="iv-mark">{m.role === 'user' ? 'Q' : 'R'}</span>
              <p className="iv-text">{m.content}</p>
            </div>
          ))}
          {busy && (
            <div className="iv-turn iv-assistant">
              <span className="iv-mark">R</span>
              <p className="iv-text iv-typing">
                <span />
                <span />
                <span />
              </p>
            </div>
          )}
        </div>

        <form
          className="iv-bar"
          onSubmit={(e) => {
            e.preventDefault()
            send()
          }}
        >
          <input
            ref={inputRef}
            className="iv-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question…"
            aria-label="Your question"
          />
          <button className="iv-ask" type="submit" disabled={busy}>
            ASK →
          </button>
        </form>
      </div>
    </div>
  )
}
