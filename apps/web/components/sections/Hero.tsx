'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="flex min-h-[90vh] flex-col items-start justify-center gap-6 py-24">
      <motion.p
        className="text-sm font-medium uppercase tracking-widest text-muted-foreground"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Software Engineer & Graduate Researcher
      </motion.p>

      <motion.h1
        className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-7xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Building thoughtful software and research at the intersection of technology and people.
      </motion.h1>

      <motion.p
        className="max-w-xl text-lg text-muted-foreground"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        I design and build AI-powered platforms, immersive experiences, and research tools that
        center the humans who use them.
      </motion.p>

      <motion.div
        className="flex gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Button asChild>
          <Link href="/work">View my work</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/contact">Get in touch</Link>
        </Button>
      </motion.div>
    </section>
  )
}
