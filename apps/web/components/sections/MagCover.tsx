'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MagChat } from './MagChat'

const COVERLINES = [
  {
    pos: 'tr',
    kicker: 'THE PORTFOLIO',
    title: ["Selected ", "Work", " '24–'26"],
    href: '/work',
  },
  {
    pos: 'mr',
    kicker: 'ON RESEARCH',
    title: ['Tech & People, ', 'Interwoven'],
    href: '/research',
  },
]

function Barcode() {
  return (
    <span className="barcode" aria-hidden="true">
      {Array.from({ length: 34 }).map((_, i) => (
        <i key={i} style={{ width: (i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1) + 'px' }} />
      ))}
    </span>
  )
}

export function MagCover() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="mag mo grain">
      <div className="cover">
        {/* studio backdrop */}
        <div className="cover-photo">
          <span className="studio-shadow" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/rokia-cutout.png"
            alt="Rokia Sissoko"
            className="cover-cutout"
          />
        </div>

        {/* masthead */}
        <header className="masthead reveal">
          <h1 className="mh-word">
            <span>R</span>
            <span className="mh-o">
              O<span className="mh-tech">TECH</span>
            </span>
            <span>KIA</span>
          </h1>
          <div className="mh-strap">
            <span className="rule" />
            <span className="mh-issue">SOFTWARE ENGINEER · EDTECH RESEARCH</span>
            <span className="rule" />
          </div>
        </header>

        {/* coverlines */}
        {COVERLINES.map((cl) => (
          <Link key={cl.pos} className={`cl cl-${cl.pos}`} href={cl.href}>
            <span className="cl-kicker">{cl.kicker}</span>
            <span className="cl-title">
              {cl.title.map((t, i) =>
                i % 2 === 1 ? <em key={i}>{t}</em> : <span key={i}>{t}</span>
              )}
            </span>
          </Link>
        ))}

        {/* special splash */}
        <button className="splash reveal" onClick={() => setChatOpen(true)}>
          <span className="splash-sm">SPECIAL</span>
          <span className="splash-lg">
            PRÊT-À-
            <br />
            CODER
          </span>
        </button>

        {/* in-conversation CTA */}
        <button className="cl cl-cta reveal" onClick={() => setChatOpen(true)}>
          <span className="cl-kicker">IN CONVERSATION · LIVE</span>
          <span className="cl-title">
            <span>Ask Me </span>
            <em>Anything</em>
            <span className="cta-arrow"> →</span>
          </span>
        </button>

        {/* bottom bar */}
        <div className="cover-bottom">
          <span className="cb-l">
            <Barcode /> rokiatech.co
          </span>
          <nav className="cb-nav">
            <Link href="/work">WORK</Link>
            <span className="cb-dot" />
            <Link href="/research">RESEARCH</Link>
            <span className="cb-dot" />
            <Link href="/contact">CONTACT</Link>
          </nav>
        </div>
      </div>

      <MagChat open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}
