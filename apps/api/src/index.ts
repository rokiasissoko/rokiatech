import cors from 'cors'
import express from 'express'
import { contactRouter } from './routes/contact.js'
import { githubRouter } from './routes/github.js'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN ?? 'http://localhost:3000',
    methods: ['GET', 'POST'],
  })
)
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/contact', contactRouter)
app.use('/github', githubRouter)

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
