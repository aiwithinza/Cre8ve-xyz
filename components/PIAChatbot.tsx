import { useState, useRef, useEffect, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, ArrowRight } from 'lucide-react'
import { usePIA } from './PIAContext'

type Step = 'intro' | 'name' | 'email' | 'requirement' | 'summary' | 'projectType' | 'budget' | 'timeline' | 'done'

interface Message {
  from: 'pia' | 'user'
  text: string
}

interface LeadData {
  name: string
  email: string
  requirement: string
  projectType: string
  budget: string
  timeline: string
}

const REQUIREMENT_HINTS = ['AI-powered chatbot', 'Mobile app', 'Marketing automation', 'Website or landing page', 'Branding & design']
const PROJECT_TYPES = ['AI App', 'Branding', 'Automation', 'Custom Solution', 'Other']
const BUDGETS = ['< $5K', '$5K–$15K', '$15K–$50K', '$50K+', 'Not Sure']
const TIMELINES = ['ASAP', '1–2 months', '3–6 months', 'Flexible']

export default function PIAChatbot() {
  const { isOpen, open, close } = usePIA()
  const [step, setStep] = useState<Step>('intro')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [data, setData] = useState<LeadData>({
    name: '',
    email: '',
    requirement: '',
    projectType: '',
    budget: '',
    timeline: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hasInitialized = useRef(false)
  const requirementNudged = useRef(false)

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when step changes
  useEffect(() => {
    if (isOpen && step !== 'projectType' && step !== 'budget' && step !== 'timeline' && step !== 'done') {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [step, isOpen])

  // Initialize conversation when opened
  useEffect(() => {
    if (isOpen && !hasInitialized.current) {
      hasInitialized.current = true
      setMessages([
        { from: 'pia', text: "Hey, I'm PIA. I'll help you get started. This takes less than a minute." },
        { from: 'pia', text: "What's your name?" },
      ])
      setStep('name')
    }
  }, [isOpen])

  function addMessage(from: 'pia' | 'user', text: string) {
    setMessages(prev => [...prev, { from, text }])
  }

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function handleSubmitInput(e: FormEvent) {
    e.preventDefault()
    if (!input.trim()) return

    const value = input.trim()
    setInput('')

    switch (step) {
      case 'name': {
        addMessage('user', value)
        const greetings = /^(hi|hey|hello|hola|sup|yo|hii+|heyy+|what'?s?\s*up|howdy|greetings|good\s*(morning|afternoon|evening))[\s!.,]*$/i
        if (greetings.test(value)) {
          setTimeout(() => {
            addMessage('pia', `Hey there! 👋 What's your name?`)
          }, 500)
          return
        }
        setData(prev => ({ ...prev, name: value }))
        setTimeout(() => {
          addMessage('pia', `Nice to meet you, ${value}! What's your email so we can reach you?`)
          setStep('email')
        }, 500)
        break
      }

      case 'email':
        if (!validateEmail(value)) {
          addMessage('user', value)
          setTimeout(() => {
            addMessage('pia', "That doesn't look like a valid email. Could you try again?")
          }, 400)
          return
        }
        addMessage('user', value)
        setData(prev => ({ ...prev, email: value }))
        setTimeout(() => {
          addMessage('pia', "What are you looking to build? Tell me about your project.")
          setStep('requirement')
        }, 500)
        break

      case 'requirement':
        addMessage('user', value)
        if (value.length < 10 && !requirementNudged.current) {
          requirementNudged.current = true
          setTimeout(() => {
            addMessage('pia', "Could you tell me a bit more? For example:")
            setShowHints(true)
          }, 400)
          return
        }
        setShowHints(false)
        setData(prev => ({ ...prev, requirement: value }))
        setTimeout(() => {
          addMessage('pia', `Got it! Here's what I have so far:\n\n"${value}"\n\nNow a few quick optional questions to help us prepare better.`)
          setTimeout(() => {
            addMessage('pia', "What type of project is this?")
            setStep('projectType')
          }, 600)
        }, 500)
        break

      default:
        break
    }
  }

  function handleHintSelect(hint: string) {
    addMessage('user', hint)
    setShowHints(false)
    setData(prev => ({ ...prev, requirement: hint }))
    setTimeout(() => {
      addMessage('pia', `Got it! Here's what I have so far:\n\n"${hint}"\n\nNow a few quick optional questions to help us prepare better.`)
      setTimeout(() => {
        addMessage('pia', "What type of project is this?")
        setStep('projectType')
      }, 600)
    }, 500)
  }

  function handleChipSelect(type: 'projectType' | 'budget' | 'timeline', value: string) {
    addMessage('user', value)
    setData(prev => ({ ...prev, [type]: value }))

    if (type === 'projectType') {
      setTimeout(() => {
        addMessage('pia', "What's your budget range?")
        setStep('budget')
      }, 500)
    } else if (type === 'budget') {
      setTimeout(() => {
        addMessage('pia', "And your ideal timeline?")
        setStep('timeline')
      }, 500)
    } else if (type === 'timeline') {
      submitLead({ ...data, [type]: value })
    }
  }

  function handleSkip() {
    if (step === 'projectType') {
      addMessage('user', 'Skip')
      setTimeout(() => {
        addMessage('pia', "What's your budget range?")
        setStep('budget')
      }, 400)
    } else if (step === 'budget') {
      addMessage('user', 'Skip')
      setTimeout(() => {
        addMessage('pia', "And your ideal timeline?")
        setStep('timeline')
      }, 400)
    } else if (step === 'timeline') {
      addMessage('user', 'Skip')
      submitLead(data)
    }
  }

  async function submitLead(finalData: LeadData) {
    setSubmitting(true)
    setStep('done')

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      })
    } catch {
      // Silently fail — we still show confirmation
    }

    setSubmitting(false)
    setTimeout(() => {
      addMessage('pia', `Thanks ${finalData.name}! We've got everything we need. Our team will review your project and get back to you within 24 hours.`)
    }, 600)
  }

  function handleClose() {
    close()
    // Reset state after animation completes
    setTimeout(() => {
      setStep('intro')
      setMessages([])
      setInput('')
      setData({ name: '', email: '', requirement: '', projectType: '', budget: '', timeline: '' })
      setShowHints(false)
      hasInitialized.current = false
      requirementNudged.current = false
    }, 300)
  }

  const showInput = ['name', 'email', 'requirement'].includes(step)
  const showChips = step === 'projectType' || step === 'budget' || step === 'timeline'
  const currentChips = step === 'projectType' ? PROJECT_TYPES : step === 'budget' ? BUDGETS : TIMELINES

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={open}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-brand flex items-center justify-center shadow-[0_0_30px_rgba(255,122,26,0.3)] hover-pulse"
            aria-label="Open PIA assistant"
          >
            <MessageSquare className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] h-[550px] max-h-[calc(100vh-6rem)] flex flex-col rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/50"
            style={{ background: 'rgba(6, 6, 6, 0.95)', backdropFilter: 'blur(20px)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">PIA</p>
                  <p className="text-white/30 text-[10px] font-mono tracking-wider">PROJECT INTAKE ASSISTANT</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 text-white/30 hover:text-white/60 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.from === 'user'
                        ? 'bg-brand/20 text-white/90 rounded-br-md'
                        : 'bg-white/[0.04] text-white/70 rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {submitting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/[0.04] px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chip Selection */}
            <AnimatePresence>
              {showChips && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="px-5 pb-2"
                >
                  <div className="flex flex-wrap gap-2">
                    {currentChips.map((chip) => (
                      <button
                        key={chip}
                        onClick={() =>
                          handleChipSelect(
                            step as 'projectType' | 'budget' | 'timeline',
                            chip
                          )
                        }
                        className="px-3.5 py-2 text-xs font-mono tracking-wide rounded-full border border-white/[0.1] text-white/60 hover:text-white hover:border-brand/40 hover:bg-brand/10 transition-all duration-200"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleSkip}
                    className="mt-2 text-[11px] font-mono text-white/20 hover:text-white/40 transition-colors flex items-center gap-1"
                  >
                    Skip <ArrowRight className="w-3 h-3" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Requirement Hint Chips */}
            <AnimatePresence>
              {showHints && step === 'requirement' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="px-5 pb-2"
                >
                  <div className="flex flex-wrap gap-2">
                    {REQUIREMENT_HINTS.map((hint) => (
                      <button
                        key={hint}
                        onClick={() => handleHintSelect(hint)}
                        className="px-3.5 py-2 text-xs font-mono tracking-wide rounded-full border border-white/[0.1] text-white/60 hover:text-white hover:border-brand/40 hover:bg-brand/10 transition-all duration-200"
                      >
                        {hint}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Text Input */}
            {showInput && (
              <form onSubmit={handleSubmitInput} className="px-4 pb-4 pt-2">
                <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3">
                  <input
                    ref={inputRef}
                    type={step === 'email' ? 'email' : 'text'}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      step === 'name' ? 'Type your name...'
                        : step === 'email' ? 'your@email.com'
                        : 'Describe your project...'
                    }
                    className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/20 outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="p-1.5 text-brand/60 hover:text-brand transition-colors disabled:opacity-30"
                    aria-label="Send"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Done state — no input */}
            {step === 'done' && !submitting && messages.length > 0 && (
              <div className="px-5 pb-4 pt-2">
                <button
                  onClick={handleClose}
                  className="w-full py-3 text-xs font-mono tracking-wider text-white/40 hover:text-white/60 border border-white/[0.06] rounded-xl transition-colors"
                >
                  CLOSE
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
