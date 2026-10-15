'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/research', label: 'Research' },
  { href: '/press', label: 'Press' },
  { href: '/contact', label: 'Contact' },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      {/* links drop below the name on phones so five items fit without sideways scroll */}
      <nav className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="whitespace-nowrap font-semibold tracking-tight">
          rokia sissoko
        </Link>
        <ul className="flex items-center gap-4 sm:gap-6">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'text-sm transition-colors hover:text-foreground',
                  pathname === href ? 'text-foreground font-medium' : 'text-muted-foreground'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
