type State = 'follow' | 'engage' | 'waiting'

interface Session {
  state: State
}

// In-memory store keyed by Instagram sender ID
const sessions = new Map<string, Session>()

export async function handleMessage(senderId: string, text: string): Promise<string> {
  const msg = text.trim().toLowerCase()

  // First message or no session — welcome + ask to follow
  if (!sessions.has(senderId)) {
    sessions.set(senderId, { state: 'follow' })
    return `Hey! 👋 Thanks for reaching out to Cre8ve.\n\nWe build AI systems, websites, automations & brands for businesses that want to move fast.\n\nBefore we chat — make sure you're following @cre8ve.xyz so we can stay connected! 🔔\n\nOnce you've hit follow, drop a "done" and I'll show you what's next.`
  }

  const session = sessions.get(senderId)!

  switch (session.state) {
    case 'follow': {
      // They replied — assume they followed (or will)
      session.state = 'engage'
      return `Awesome, appreciate you! 🙌\n\nHere's how you can get started with us:\n\n1️⃣ Visit cre8ve.xyz and tap "Start a Project" — it takes 2 mins to fill out your brief\n\n2️⃣ Or just drop your idea right here — what are you looking to build? Our team will get back to you.\n\nWhat works best for you?`
    }

    case 'engage': {
      // Check if they want to leave a message here
      const wantsWebsite = /website|site|visit|link|1|start a project/i.test(msg)

      if (wantsWebsite) {
        session.state = 'waiting'
        return `Here you go 👇\n\nhttps://cre8ve.xyz\n\nTap "Start a Project" at the top — PIA (our AI assistant) will walk you through your brief in under 2 mins.\n\nOr if you'd rather chat here, just send me your idea and we'll take it from there! 🚀`
      }

      // They're dropping their idea/message
      session.state = 'waiting'
      return `Got it! 🔥 Our team will review your message and get back to you shortly.\n\nIn the meantime, check out what we've built at cre8ve.xyz\n\nTalk soon! 💬`
    }

    case 'waiting': {
      // Any follow-up messages after the flow
      return `Hey! 👋 Our team has your message and will get back to you.\n\nNeed faster help? Head to cre8ve.xyz and tap "Start a Project" — PIA will get your brief sorted in 2 mins. 🚀`
    }
  }
}
