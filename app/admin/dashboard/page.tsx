'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus, Trash2, Eye, EyeOff, LogOut, Sparkles, X, Check, Loader2, PenLine, Globe, BarChart3
} from 'lucide-react'
import AdminStats from '@/components/admin/AdminStats'

interface Post {
  id: string
  slug: string
  titleBG: string
  excerptBG: string
  tags: string[]
  date: string
  readTime: string
  image: string
  published: boolean
  createdAt: string
  content?: string
}

interface GeneratedPost {
  title: string
  excerpt: string
  content: string
  tags: string[]
  readTime: string
  slug: string
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-а-яё]/gi, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('bg-BG', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<'stats' | 'blog'>('stats')
  const [posts, setPosts] = useState<Post[]>([])
  const [storageMode, setStorageMode] = useState<'local' | 'blob'>('local')
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [topic, setTopic] = useState('')
  const [lang, setLang] = useState<'BG' | 'EN'>('BG')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState<GeneratedPost | null>(null)
  const [saving, setSaving] = useState(false)
  const [genError, setGenError] = useState('')

  const fetchPosts = useCallback(async () => {
    const res = await fetch('/api/admin/posts', { cache: 'no-store' })
    if (res.status === 401) { router.push('/admin'); return }
    const data = await res.json() as { posts: Post[]; storage: 'local' | 'blob' }
    setPosts(data.posts)
    setStorageMode(data.storage)
    setLoading(false)
  }, [router])

  useEffect(() => { fetchPosts() }, [fetchPosts])

  async function logout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin')
  }

  async function generate() {
    if (!topic.trim()) return
    setGenerating(true)
    setGenError('')
    setGenerated(null)
    try {
      const res = await fetch('/api/admin/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, language: lang }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Грешка при генериране')
      setGenerated(data)
    } catch (e: unknown) {
      setGenError(e instanceof Error ? e.message : 'Неизвестна грешка')
    }
    setGenerating(false)
  }

  async function publishPost() {
    if (!generated) return
    setSaving(true)
    const id = slugify(generated.slug || generated.title)
    const now = new Date().toISOString()
    const post: Post = {
      id,
      slug: id,
      titleBG: generated.title,
      excerptBG: generated.excerpt,
      tags: generated.tags,
      date: formatDate(now),
      readTime: generated.readTime,
      image: '/blogimg.png',
      published: true,
      createdAt: now,
      content: generated.content,
    }
    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    })
    if (res.ok) {
      await fetchPosts()
      setShowCreate(false)
      setGenerated(null)
      setTopic('')
    }
    setSaving(false)
  }

  async function togglePublish(post: Post) {
    await fetch('/api/admin/posts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: post.id, published: !post.published }),
    })
    await fetchPosts()
  }

  async function deletePost(id: string) {
    if (!confirm('Изтрий тази статия?')) return
    await fetch('/api/admin/posts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    await fetchPosts()
  }

  return (
    <main className="min-h-screen bg-[#f1f0ea] text-[#2d232e]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b-2 border-[#2d232e]/10 bg-[#f1f0ea]/95 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PenLine className="w-5 h-5 text-[#534b52]" />
            <span className="font-black text-lg">Admin Blog</span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#2d232e]/30 ml-2">Panel</span>
            <span className="hidden sm:inline-flex rounded-full border border-[#534b52]/20 bg-white/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#534b52]">
              {storageMode === 'blob' ? 'Vercel Blob' : 'Local JSON'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {tab === 'blog' && (
              <button
                onClick={() => setShowCreate(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2d232e] text-[#f1f0ea] font-bold text-sm hover:bg-[#534b52] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Нова статия
              </button>
            )}
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-[#2d232e]/15 text-sm font-medium hover:border-[#2d232e]/40 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Изход
            </button>
          </div>
        </div>
      </header>

      {/* Tab bar */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <div className="inline-flex rounded-xl border-2 border-[#2d232e]/10 bg-white/60 p-1">
          {([
            { id: 'stats', label: 'Analytics & SEO', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'blog', label: 'Блог', icon: <PenLine className="w-4 h-4" /> },
          ] as const).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                tab === t.id ? 'bg-[#2d232e] text-[#f1f0ea]' : 'text-[#2d232e]/50 hover:text-[#2d232e]'
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'stats' && (
        <div className="max-w-5xl mx-auto px-6 py-10">
          <AdminStats />
        </div>
      )}

      {/* Post list */}
      {tab === 'blog' && (
      <div className="max-w-5xl mx-auto px-6 py-10">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-[#534b52]" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-[#2d232e]/40">
            <PenLine className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Няма статии. Създай първата!</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[#2d232e]/40 mb-5">
              {posts.length} статии
            </p>
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-4 p-4 rounded-2xl border-2 border-[#2d232e]/10 bg-white/60 hover:border-[#2d232e]/20 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${post.published ? 'bg-green-500' : 'bg-[#2d232e]/20'}`} />
                    <h3 className="font-bold text-sm truncate">{post.titleBG}</h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#2d232e]/40">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime} четене</span>
                    {post.tags.slice(0, 2).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full border border-[#534b52]/20 text-[#534b52]">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="p-2 rounded-lg text-[#2d232e]/30 hover:text-[#2d232e] hover:bg-[#2d232e]/5 transition-colors"
                    title="Преглед"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => togglePublish(post)}
                    className="p-2 rounded-lg text-[#2d232e]/30 hover:text-[#2d232e] hover:bg-[#2d232e]/5 transition-colors"
                    title={post.published ? 'Скрий' : 'Публикувай'}
                  >
                    {post.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="p-2 rounded-lg text-red-400/60 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Изтрий"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      )}

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-16 px-4 pb-8 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#f1f0ea] rounded-3xl border-2 border-[#2d232e]/15 shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b-2 border-[#2d232e]/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#534b52]" />
                <span className="font-black">AI Генератор на статии</span>
              </div>
              <button
                onClick={() => { setShowCreate(false); setGenerated(null); setTopic('') }}
                className="p-2 rounded-xl hover:bg-[#2d232e]/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Topic input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#2d232e]/50 mb-2">Тема / Topic</label>
                <textarea
                  rows={2}
                  placeholder="напр. Защо бавният сайт те струва клиенти..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#2d232e]/15 bg-white focus:outline-none focus:border-[#2d232e] text-[#2d232e] placeholder:text-[#2d232e]/30 font-medium resize-none transition-colors"
                />
              </div>

              {/* Language toggle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#2d232e]/50 mb-2">Език</label>
                <div className="flex gap-2">
                  {(['BG', 'EN'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-colors ${
                        lang === l
                          ? 'bg-[#2d232e] text-[#f1f0ea] border-[#2d232e]'
                          : 'border-[#2d232e]/15 text-[#2d232e]/60 hover:border-[#2d232e]/40'
                      }`}
                    >
                      {l === 'BG' ? '🇧🇬 Български' : '🇬🇧 English'}
                    </button>
                  ))}
                </div>
              </div>

              {genError && (
                <p className="text-red-500 text-sm font-medium bg-red-50 px-4 py-3 rounded-xl">{genError}</p>
              )}

              <button
                onClick={generate}
                disabled={generating || !topic.trim()}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#534b52] text-[#f1f0ea] font-bold text-sm hover:bg-[#2d232e] disabled:opacity-50 transition-colors"
              >
                {generating ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Генерира се...</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Генерирай статия</>
                )}
              </button>

              {/* Preview */}
              {generated && (
                <div className="rounded-2xl border-2 border-[#2d232e]/10 bg-white/60 overflow-hidden">
                  <div className="p-5 border-b border-[#2d232e]/10">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {generated.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-[#534b52] border border-[#534b52]/30 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="font-black text-lg text-[#2d232e] mb-2">{generated.title}</h2>
                    <p className="text-sm text-[#2d232e]/60 leading-relaxed">{generated.excerpt}</p>
                    <p className="text-xs text-[#2d232e]/40 mt-3">{generated.readTime} четене · /blog/{generated.slug}</p>
                  </div>
                  <div className="p-5 max-h-64 overflow-y-auto">
                    <div
                      className="prose prose-sm max-w-none text-[#2d232e]/70 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: generated.content.substring(0, 800) + (generated.content.length > 800 ? '...' : '') }}
                    />
                  </div>
                  <div className="p-5 border-t border-[#2d232e]/10 flex gap-3">
                    <button
                      onClick={publishPost}
                      disabled={saving}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#2d232e] text-[#f1f0ea] font-bold text-sm hover:bg-[#534b52] disabled:opacity-50 transition-colors"
                    >
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                      {saving ? 'Запазване...' : 'Публикувай'}
                    </button>
                    <button
                      onClick={() => setGenerated(null)}
                      className="px-4 py-2.5 rounded-xl border-2 border-[#2d232e]/15 text-sm font-medium hover:border-[#2d232e]/40 transition-colors"
                    >
                      Регенерирай
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
