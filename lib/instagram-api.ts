export async function sendMessage(recipientId: string, text: string): Promise<void> {
  const token = process.env.INSTAGRAM_PAGE_ACCESS_TOKEN
  if (!token) throw new Error('INSTAGRAM_PAGE_ACCESS_TOKEN not set')

  const res = await fetch('https://graph.instagram.com/v21.0/me/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text },
      access_token: token,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Instagram send failed (${res.status}): ${err}`)
  }
}
