import { Router } from 'express'
import { Resend } from 'resend'
import { z } from 'zod'
import type { ApiResponse } from '@rokiatech/types'

const router = Router()

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  subject: z.string().min(1).max(200),
  message: z.string().min(10).max(5000),
})

router.post('/', async (req, res) => {
  const parsed = contactSchema.safeParse(req.body)

  if (!parsed.success) {
    const response: ApiResponse = {
      success: false,
      error: 'Invalid request body',
    }
    return res.status(400).json(response)
  }

  const { name, email, subject, message } = parsed.data

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
    console.error('Missing RESEND_API_KEY or CONTACT_EMAIL env vars')
    const response: ApiResponse = { success: false, error: 'Server misconfiguration' }
    return res.status(500).json(response)
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  })

  const response: ApiResponse = { success: true }
  res.json(response)
})

export { router as contactRouter }
