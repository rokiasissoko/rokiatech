'use client'

import { track } from '@vercel/analytics'

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string
  data?: Record<string, string>
}

// Outbound link that records a Vercel Analytics custom event on click.
export function TrackedLink({ event, data, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event, { href: props.href ?? '', ...data })
        onClick?.(e)
      }}
    />
  )
}
