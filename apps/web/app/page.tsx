import type { Metadata } from 'next'
import { MagCover } from '@/components/sections/MagCover'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return <MagCover />
}
