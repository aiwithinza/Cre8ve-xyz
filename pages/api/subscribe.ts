import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    const audienceId = process.env.RESEND_AUDIENCE_ID

    if (audienceId) {
      await resend.contacts.create({
        email,
        audienceId,
      })
    } else {
      // Fallback: send a notification email
      await resend.emails.send({
        from: 'Cre8ve <noreply@cre8ve.xyz>',
        to: 'hello@cre8ve.xyz',
        subject: 'New subscriber',
        text: `New email subscriber: ${email}`,
      })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    return res.status(500).json({ error: 'Failed to subscribe' })
  }
}
