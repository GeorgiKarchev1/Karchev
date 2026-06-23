'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, User, RotateCcw } from 'lucide-react'

const AVATAR = '/img/georgi-avatar.webp'

type Message = { role: 'user' | 'assistant'; content: string }
type Status = 'idle' | 'thinking' | 'streaming'

const GREETING =
  'Здрасти! 👋 Аз съм Карчи — AI асистентът на KARCHX. Не е страшно, обещавам. Просто ми пиши на български, както би писал на приятел. Какво те интересува?'

const SUGGESTIONS = [
  'Как да започна с AI?',
  'Опасно ли е?',
  'С какво ще ми помогне?',
  'Полезно ли е за бизнес?',
]

export default function AiDemoChat() {
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: GREETING }])
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const busy = status !== 'idle'
  const showSuggestions = messages.length === 1 && status === 'idle'

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, status])

  function reset() {
    setMessages([{ role: 'assistant', content: GREETING }])
    setInput('')
    setError(null)
    setStatus('idle')
    inputRef.current?.focus()
  }

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || busy) return

    setError(null)
    const next: Message[] = [...messages, { role: 'user', content: trimmed }]
    setMessages(next)
    setInput('')
    setStatus('thinking')

    try {
      const res = await fetch('/api/ai-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(1) }), // drop the seeded greeting
      })

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Нещо се обърка. Опитай пак.')
        setStatus('idle')
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ''
      let first = true

      // Stream the reply token-by-token for a live, "real AI" feel.
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        if (first) {
          first = false
          setStatus('streaming')
          setMessages((prev) => [...prev, { role: 'assistant', content: acc }])
        } else {
          setMessages((prev) => {
            const copy = [...prev]
            copy[copy.length - 1] = { role: 'assistant', content: acc }
            return copy
          })
        }
      }

      if (!acc.trim()) {
        setMessages((prev) =>
          first ? [...prev, { role: 'assistant', content: 'Извинявай, нещо се обърка 🙂 Опитай пак.' }] : prev
        )
      }
    } catch {
      setError('Няма връзка. Провери интернета и опитай пак.')
    } finally {
      setStatus('idle')
    }
  }

  return (
    <div className="mx-auto w-full max-w-[640px] overflow-hidden rounded-[28px] border border-[#2d232e]/12 bg-white/85 shadow-[0_40px_100px_-45px_rgba(45,35,46,0.55)] backdrop-blur-xl">
      {/* Header */}
      <div className="relative flex items-center gap-3 bg-gradient-to-r from-[#2d232e] via-[#3a2f3b] to-[#534b52] px-5 py-4 text-[#f1f0ea]">
        <span className="relative h-10 w-10 shrink-0">
          <img
            src={AVATAR}
            alt="Карчи"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-[#f1f0ea]/20"
          />
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#2d232e] bg-green-400">
            <span className="absolute inset-0 animate-ping rounded-full bg-green-400/70" />
          </span>
        </span>
        <div className="leading-tight">
          <p className="text-sm font-black tracking-tight">Карчи · AI асистент</p>
          <p className="text-[11px] text-[#f1f0ea]/55">демо на живо · отговаря на български</p>
        </div>
        <button
          onClick={reset}
          aria-label="Нов разговор"
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-[#f1f0ea]/55 transition-colors hover:bg-[#f1f0ea]/10 hover:text-[#f1f0ea]"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="h-[360px] space-y-4 overflow-y-auto bg-gradient-to-b from-[#f6f3ed] to-[#f1f0ea] px-4 py-5 md:px-5"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) => {
            const isLast = i === messages.length - 1
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className={`flex gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {m.role === 'user' ? (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#534b52] text-[#f1f0ea]">
                    <User className="h-4 w-4" />
                  </span>
                ) : (
                  <img src={AVATAR} alt="Карчи" className="h-8 w-8 shrink-0 rounded-full object-cover" />
                )}
                <div
                  className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'rounded-tr-sm bg-[#2d232e] text-[#f1f0ea]'
                      : 'rounded-tl-sm border border-[#2d232e]/8 bg-white text-[#2d232e]'
                  }`}
                >
                  {m.content}
                  {m.role === 'assistant' && isLast && status === 'streaming' && (
                    <span className="ml-0.5 inline-block h-4 w-[2px] -mb-0.5 animate-pulse bg-[#534b52] align-middle" />
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {status === 'thinking' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2.5"
          >
            <img src={AVATAR} alt="Карчи" className="h-8 w-8 shrink-0 rounded-full object-cover" />
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-[#2d232e]/8 bg-white px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#534b52] [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#534b52] [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#534b52]" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Suggestions */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2 px-4 pb-3 md:px-5"
          >
            {SUGGESTIONS.map((s, idx) => (
              <motion.button
                key={s}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.06 }}
                onClick={() => send(s)}
                disabled={busy}
                className="rounded-full border border-[#2d232e]/15 bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#2d232e]/80 transition-all hover:border-[#534b52]/40 hover:bg-white hover:shadow-sm disabled:opacity-50"
              >
                {s}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="px-4 pb-2 text-xs font-medium text-red-700/80 md:px-5">{error}</p>}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
        className="flex items-center gap-2 border-t border-[#2d232e]/10 bg-white/70 px-3 py-3 md:px-4"
      >
        <div className="relative flex-1">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={600}
            placeholder="Напиши съобщение на български…"
            className="w-full rounded-full border border-[#2d232e]/12 bg-[#f1f0ea] px-4 py-2.5 pr-12 text-sm text-[#2d232e] outline-none transition-colors placeholder:text-[#2d232e]/40 focus:border-[#534b52]"
          />
          {input.length > 480 && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-[#2d232e]/35">
              {input.length}/600
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={busy || !input.trim()}
          aria-label="Изпрати"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2d232e] text-[#f1f0ea] transition-all hover:bg-[#534b52] active:scale-95 disabled:opacity-40 disabled:active:scale-100"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}
