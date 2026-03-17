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

  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    await resend.emails.send({
      from: 'Cre8ve Contact <noreply@cre8ve.xyz>',
      to: 'hello@cre8ve.xyz',
      subject: `New inquiry from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return res.status(500).json({ error: 'Failed to send message' })
  }
}
