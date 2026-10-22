import type { Metadata } from 'next'
import { ContactForm } from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Rokia Sissoko about research collaborations, engineering roles, and speaking or press requests.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <div className="py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Open to research collaborations, engineering roles, and interesting conversations.
        </p>
      </div>

      <ContactForm />
    </div>
  )
}
