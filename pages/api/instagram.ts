import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import { handleMessage } from '@/lib/instagram-conversation'
import { sendMessage } from '@/lib/instagram-api'

// Disable built-in body parser so we can read the raw body for HMAC verification
export const config = { api: { bodyParser: false } }

function getRawBody(req: NextApiRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => { data += chunk })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

function verifySignature(rawBody: string, signature: string): boolean {
  const appSecret = process.env.INSTAGRAM_APP_SECRET
  if (!appSecret) return true // Skip verification if secret not configured yet
  const expected = 'sha256=' + crypto.createHmac('sha256', appSecret).update(rawBody).digest('hex')
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
  } catch {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET: Meta webhook verification challenge
  if (req.method === 'GET') {
    const mode = req.query['hub.mode']
    const token = req.query['hub.verify_token']
    const challenge = req.query['hub.challenge']

    if (mode === 'subscribe' && token === process.env.INSTAGRAM_VERIFY_TOKEN) {
      return res.status(200).send(challenge)
    }
    return res.status(403).json({ error: 'Forbidden' })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // POST: incoming message events
  const rawBody = await getRawBody(req)
  const signature = req.headers['x-hub-signature-256'] as string

  if (signature && !verifySignature(rawBody, signature)) {
    return res.status(401).json({ error: 'Invalid signature' })
  }

  let body: { entry?: Array<{ messaging?: Array<{ sender?: { id: string }; message?: { text: string } }> }> }
  try {
    body = JSON.parse(rawBody)
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' })
  }

  // Respond 200 immediately — Meta requires < 200ms acknowledgement
  res.status(200).json({ status: 'ok' })

  // Process messages asynchronously after responding
  const entries = body?.entry ?? []
  for (const entry of entries) {
    const messaging = entry?.messaging ?? []
    for (const event of messaging) {
      const senderId = event?.sender?.id
      const text = event?.message?.text
      if (senderId && text) {
        try {
          const reply = await handleMessage(senderId, text)
          await sendMessage(senderId, reply)
        } catch (err) {
          console.error('[instagram webhook] DM error:', err)
        }
      }
    }
  }
}
