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

  const { name, email, requirement, projectType, budget, timeline } = req.body

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' })
  }

  const payload = {
    name,
    email,
    requirement,
    projectType,
    budget,
    timeline,
    source: 'PIA Chatbot',
    timestamp: new Date().toISOString(),
  }

  // 1. Forward to Google Apps Script (saves to Google Sheet)
  const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch {
      // Non-fatal — sheet write failed but we still send the email
    }
  }

  // 2. Send automated email to the lead
  const calendlyLink = process.env.CALENDLY_LINK || 'https://calendly.com/cre8ve'

  const projectSummaryRows = [
    requirement && `<tr><td style="padding:6px 0;color:#888;font-size:13px;vertical-align:top;white-space:nowrap;padding-right:16px;">Project</td><td style="padding:6px 0;color:#e8e8e8;font-size:13px;">${requirement}</td></tr>`,
    projectType && `<tr><td style="padding:6px 0;color:#888;font-size:13px;vertical-align:top;white-space:nowrap;padding-right:16px;">Type</td><td style="padding:6px 0;color:#e8e8e8;font-size:13px;">${projectType}</td></tr>`,
    budget && `<tr><td style="padding:6px 0;color:#888;font-size:13px;vertical-align:top;white-space:nowrap;padding-right:16px;">Budget</td><td style="padding:6px 0;color:#e8e8e8;font-size:13px;">${budget}</td></tr>`,
    timeline && `<tr><td style="padding:6px 0;color:#888;font-size:13px;vertical-align:top;white-space:nowrap;padding-right:16px;">Timeline</td><td style="padding:6px 0;color:#e8e8e8;font-size:13px;">${timeline}</td></tr>`,
  ].filter(Boolean).join('')

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We've received your project brief</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:32px;">
              <span style="font-size:22px;font-weight:700;letter-spacing:-0.5px;color:#ffffff;">Cre8ve</span>
              <span style="font-size:22px;font-weight:700;color:#6ee7b7;">.</span>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding-bottom:24px;">
              <h1 style="margin:0 0 12px;font-size:28px;font-weight:700;color:#ffffff;line-height:1.2;">Hey ${name},</h1>
              <p style="margin:0;font-size:16px;color:#a0a0a0;line-height:1.6;">Thanks for reaching out. We've received your project brief and our team is already looking it over.</p>
            </td>
          </tr>

          ${projectSummaryRows ? `
          <!-- Project Summary -->
          <tr>
            <td style="padding-bottom:32px;">
              <div style="background:#141414;border:1px solid #222;border-radius:12px;padding:20px 24px;">
                <p style="margin:0 0 14px;font-size:11px;font-weight:600;letter-spacing:1.5px;color:#555;text-transform:uppercase;">Your Brief</p>
                <table cellpadding="0" cellspacing="0" width="100%">
                  ${projectSummaryRows}
                </table>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- CTA -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0 0 20px;font-size:15px;color:#a0a0a0;line-height:1.6;">The fastest way to move forward is a quick discovery call. Pick a time that works for you:</p>
              <a href="${calendlyLink}" style="display:inline-block;background:#ffffff;color:#0a0a0a;font-size:15px;font-weight:600;text-decoration:none;padding:14px 28px;border-radius:8px;letter-spacing:-0.2px;">Book a Discovery Call →</a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="border-top:1px solid #1a1a1a;padding-top:28px;padding-bottom:8px;">
              <p style="margin:0;font-size:13px;color:#555;line-height:1.6;">Questions? Just reply to this email — you'll reach us directly.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:20px;">
              <p style="margin:0;font-size:12px;color:#444;">Cre8ve AI Solutions · <a href="https://cre8ve.xyz" style="color:#444;text-decoration:none;">cre8ve.xyz</a></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  try {
    await resend.emails.send({
      from: 'Cre8ve <hello@cre8ve.xyz>',
      to: email,
      replyTo: 'hello@cre8ve.xyz',
      subject: `We've got your brief, ${name}`,
      html,
    })

    // Also notify the team
    await resend.emails.send({
      from: 'PIA <hello@cre8ve.xyz>',
      to: 'hello@cre8ve.xyz',
      subject: `New lead: ${name} — ${projectType || 'No type'}`,
      text: `Name: ${name}\nEmail: ${email}\nProject: ${requirement || '—'}\nType: ${projectType || '—'}\nBudget: ${budget || '—'}\nTimeline: ${timeline || '—'}\nSubmitted: ${payload.timestamp}`,
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Lead email error:', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
