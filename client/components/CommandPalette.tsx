'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { Search, X, ChevronRight } from 'lucide-react'

const commands = [
  { label: 'Go to Home',         section: 'home',         desc: 'Hero section'                  },
  { label: 'Go to About',        section: 'about',        desc: 'Who I am'                      },
  { label: 'Go to Experience',   section: 'experience',   desc: 'Work & security engagements'   },
  { label: 'Go to Skills',       section: 'skills',       desc: 'Security arsenal'              },
  { label: 'Go to Projects',     section: 'projects',     desc: 'Security projects'             },
  { label: 'Go to CTF',          section: 'ctf',          desc: 'Capture the flag writeups'     },
  { label: 'Go to Contact',      section: 'contact',      desc: 'Get in touch'                  },
  { label: 'Open GitHub',        href:    'https://github.com/HarshaBhat24', desc: 'github.com/HarshaBhat24' },
  { label: 'Open LinkedIn',      href:    'https://linkedin.com/in/s-harsha-bhat/', desc: 'LinkedIn profile' },
  { label: 'Send Email',         href:    'mailto:harshabhat666@gmail.com', desc: 'harshabhat666@gmail.com' },
  { label: 'View CTF Writeups',  href:    '/ctf',         desc: 'Browse all writeups'           },
]

export default function CommandPalette() {
  const [open,    setOpen]    = useState(false)
  const [query,   setQuery]   = useState('')
  const [focused, setFocused] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.desc.toLowerCase().includes(query.toLowerCase())
  )

  const execute = useCallback((cmd: typeof commands[number]) => {
    setOpen(false)
    setQuery('')
    if (cmd.section) {
      const el = document.getElementById(cmd.section)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else if (cmd.href) {
      if (cmd.href.startsWith('http') || cmd.href.startsWith('mailto')) {
        window.open(cmd.href, '_blank', 'noopener,noreferrer')
      } else {
        window.location.href = cmd.href
      }
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(o => !o)
        setQuery('')
        setFocused(0)
      }
      if (!open) return
      if (e.key === 'Escape') { setOpen(false); setQuery('') }
      if (e.key === 'ArrowDown') { e.preventDefault(); setFocused(f => Math.min(f + 1, filtered.length - 1)) }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setFocused(f => Math.max(f - 1, 0)) }
      if (e.key === 'Enter' && filtered[focused]) execute(filtered[focused])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, filtered, focused, execute])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  useEffect(() => { setFocused(0) }, [query])

  if (!open) return (
    <button
      onClick={() => setOpen(true)}
      id="command-palette-trigger"
      aria-label="Open command palette"
      className="fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-2 px-3 py-2 font-mono text-xs border border-terminal-border bg-terminal-surface/90 backdrop-blur-sm rounded-lg text-ink-400 hover:text-amber-400 hover:border-amber-400/30 transition-all duration-200 shadow-lg group"
    >
      <Search size={12} />
      <span>Search…</span>
      <kbd className="ml-1 px-1.5 py-0.5 rounded text-[9px] bg-terminal-elevated border border-terminal-border text-ink-500 group-hover:border-amber-400/20">
        Ctrl+K
      </kbd>
    </button>
  )

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      onClick={() => { setOpen(false); setQuery('') }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-lg mx-4"
        onClick={e => e.stopPropagation()}
        style={{
          background: 'rgba(10, 10, 18, 0.98)',
          border: '1px solid rgba(245,166,35,0.25)',
          borderRadius: '12px',
          boxShadow: '0 0 60px rgba(245,166,35,0.1), 0 25px 60px rgba(0,0,0,0.7)',
        }}
      >
        {/* Search bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-terminal-border">
          <Search size={15} className="text-amber-400/60 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent font-mono text-sm text-ink-100 outline-none placeholder:text-ink-500"
          />
          <button onClick={() => { setOpen(false); setQuery('') }} className="text-ink-500 hover:text-ink-200">
            <X size={14} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-72 overflow-y-auto py-2" role="listbox">
          {filtered.length === 0 ? (
            <p className="font-mono text-xs text-ink-500 px-4 py-6 text-center">No commands found</p>
          ) : (
            filtered.map((cmd, i) => (
              <button
                key={cmd.label}
                role="option"
                aria-selected={i === focused}
                onClick={() => execute(cmd)}
                onMouseEnter={() => setFocused(i)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100 ${
                  i === focused ? 'bg-amber-400/10' : 'hover:bg-terminal-elevated/60'
                }`}
              >
                <ChevronRight
                  size={12}
                  className={`flex-shrink-0 transition-colors ${i === focused ? 'text-amber-400' : 'text-ink-500'}`}
                />
                <div className="flex-1 min-w-0">
                  <p className={`font-mono text-sm ${i === focused ? 'text-amber-400' : 'text-ink-200'}`}>
                    {cmd.label}
                  </p>
                  <p className="font-mono text-xs text-ink-500 truncate">{cmd.desc}</p>
                </div>
                {i === focused && (
                  <kbd className="flex-shrink-0 px-1.5 py-0.5 rounded text-[9px] bg-terminal-elevated border border-amber-400/20 text-amber-400/70 font-mono">
                    ↵
                  </kbd>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-terminal-border">
          <p className="font-mono text-[10px] text-ink-500">↑↓ navigate · ↵ select · esc close</p>
          <p className="font-mono text-[10px] text-ink-500">{filtered.length} commands</p>
        </div>
      </div>
    </div>
  )
}
