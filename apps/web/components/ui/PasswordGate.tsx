'use client'

import { useState, useEffect, useRef } from 'react'

const SESSION_KEY = 'rokiatech_unlocked'

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false)
  const [ready, setReady] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUnlocked(true)
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready && !unlocked) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [ready, unlocked])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()

      if (data.ok) {
        sessionStorage.setItem(SESSION_KEY, 'true')
        setUnlocked(true)
      } else {
        setError('Wrong password — try again.')
        setPassword('')
        inputRef.current?.focus()
      }
    } catch {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  if (!ready) return null
  if (unlocked) return <>{children}</>

  return (
    <>
      {/* page content blurred behind the overlay */}
      <div style={{ filter: 'blur(6px)', pointerEvents: 'none', userSelect: 'none' }}>
        {children}
      </div>

      {/* magazine-style overlay */}
      <div className="iv-overlay" style={{ zIndex: 200 }}>
        <div className="iv-panel" style={{ maxWidth: 480 }}>
          <h2 className="iv-title" style={{ fontSize: 'clamp(28px,4vw,42px)', marginTop: 0 }}>
            Enter the <em>password</em>
          </h2>

          <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
            <div className="iv-bar" style={{ marginTop: 0 }}>
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Access code…"
                required
                className="iv-input"
                autoComplete="current-password"
              />
              <button type="submit" className="iv-ask" disabled={loading || !password}>
                {loading ? '···' : 'UNLOCK'}
              </button>
            </div>

            {error && (
              <p
                style={{
                  fontFamily: 'var(--mag-sans)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: '#9E2B2B',
                  marginTop: 10,
                }}
              >
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  )
}
