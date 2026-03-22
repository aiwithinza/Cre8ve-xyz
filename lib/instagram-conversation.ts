type State = 'name' | 'email' | 'requirement' | 'projectType' | 'budget' | 'timeline' | 'done'

interface Session {
  state: State
  name?: string
  email?: string
  requirement?: string
  projectType?: string
  budget?: string
  timeline?: string
}

// In-memory store keyed by Instagram sender ID
const sessions = new Map<string, Session>()

const GREETING_RE = /^(hi|hello|hey|sup|yo|hiya|howdy|what'?s up|good\s+(morning|afternoon|evening))[!?.,]?\s*$/i

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function handleMessage(senderId: string, text: string): Promise<string> {
  const msg = text.trim()

  // Start or restart on greeting / no session
  if (!sessions.has(senderId) || GREETING_RE.test(msg)) {
    sessions.set(senderId, { state: 'name' })
    return "Hey! 👋 I'm PIA, Cre8ve's AI assistant. What's your name?"
  }

  const session = sessions.get(senderId)!

  switch (session.state) {
    case 'name': {
      session.name = msg
      session.state = 'email'
      return `Nice to meet you, ${msg}! What's your email address?`
    }

    case 'email': {
      if (!isValidEmail(msg)) {
        return "Hmm, that doesn't look like a valid email. Can you double-check it?"
      }
      session.email = msg
      session.state = 'requirement'
      return "Got it. What are you looking to build? Tell me about your project."
    }

    case 'requirement': {
      if (msg.length < 10) {
        return "Can you tell me a bit more about what you're looking to build?"
      }
      session.requirement = msg
      session.state = 'projectType'
      return "What type of project is it? Reply:\nAI App / Branding / Automation / Website / Other"
    }

    case 'projectType': {
      session.projectType = msg
      session.state = 'budget'
      return "What's your budget range? Reply:\n<$5K / $5K–$15K / $15K–$50K / $50K+ / Not Sure"
    }

    case 'budget': {
      session.budget = msg
      session.state = 'timeline'
      return "And your timeline? Reply:\nASAP / 1–2 months / 3–6 months / Flexible"
    }

    case 'timeline': {
      session.timeline = msg
      session.state = 'done'

      const calendlyLink = process.env.CALENDLY_LINK || 'https://calendly.com/hello-cre8ve/30min'
      submitLead(session).catch(console.error)

      return `Thanks ${session.name}! Check your email — I've sent your project summary there.\n\nBook your discovery call: ${calendlyLink} 🚀`
    }

    case 'done': {
      // Restart the flow for follow-up messages
      sessions.set(senderId, { state: 'name' })
      return "Hey again! 👋 What's your name?"
    }
  }
}

async function submitLead(session: Session): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cre8ve.xyz'
  await fetch(`${baseUrl}/api/lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: session.name,
      email: session.email,
      requirement: session.requirement,
      projectType: session.projectType,
      budget: session.budget,
      timeline: session.timeline,
      source: 'Instagram DM',
    }),
  })
}
