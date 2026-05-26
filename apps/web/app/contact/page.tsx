'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import type { ContactFormPayload } from '@rokiatech/types'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: ContactFormPayload) {
    setStatus('sending')
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('sent')
        reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Open to research collaborations, engineering roles, and interesting conversations.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-6">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            {...register('name')}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
            Subject
          </label>
          <input
            id="subject"
            {...register('subject')}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
            placeholder="What's this about?"
          />
          {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={6}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring resize-none"
            placeholder="Tell me more..."
          />
          {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
        </div>

        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </Button>

        {status === 'sent' && (
          <p className="text-sm text-green-600">Message sent! I&apos;ll get back to you soon.</p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-500">Something went wrong. Try emailing me directly.</p>
        )}
      </form>
    </div>
  )
}
