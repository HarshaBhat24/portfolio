'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

/* ── Glitch characters ──────────────────────────────── */
const GLITCH_CHARS = '!@#$%^&*<>?/|\\~`ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function useGlitchText(target: string, active: boolean) {
  const [display, setDisplay] = useState(target)

  useEffect(() => {
    if (!active) { setDisplay(target); return }
    let frame = 0
    const totalFrames = 18
    const interval = setInterval(() => {
      if (frame >= totalFrames) { setDisplay(target); clearInterval(interval); return }
      setDisplay(
        target
          .split('')
          .map((char, i) =>
            char === ' '
              ? ' '
              : i < (frame / totalFrames) * target.length
              ? char
              : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)],
          )
          .join(''),
      )
      frame++
    }, 45)
    return () => clearInterval(interval)
  }, [target, active])

  return display
}

/* ── Pre-classified scan lines ──────────────────────── */
type LineKind = 'info' | 'error' | 'trace'

interface ScanLine {
  text: string
  kind: LineKind
}

const SCAN_LINES: ScanLine[] = [
  { text: '> INITIATING ROUTE RESOLUTION...', kind: 'info'  },
  { text: '> QUERYING PATH INDEX...',          kind: 'info'  },
  { text: '> TRAVERSING NODE MAP...',          kind: 'info'  },
  { text: '> ERROR: SEGMENT NOT FOUND',        kind: 'error' },
  { text: '> EXCEPTION: 0x404 NULL_ROUTE',     kind: 'error' },
  { text: '> DUMPING STACK TRACE...',          kind: 'info'  },
  { text: '> [0x000] main -> router -> resolve()', kind: 'trace' },
  { text: '> [0x001] resolve() -> lookup(path)',   kind: 'trace' },
  { text: '> [0x002] lookup() returned NULL',      kind: 'trace' },
  { text: '> RECOVERY FAILED. HALTING.',       kind: 'error' },
]

const kindClass: Record<LineKind, string> = {
  error: 'text-red-400',
  trace: 'text-gray-500',
  info:  'text-green-400/80',
}

/* ── Component ──────────────────────────────────────── */
export default function NotFound() {
  const [mounted,      setMounted]      = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const [visibleLines, setVisibleLines] = useState<ScanLine[]>([])
  const [cursorOn,     setCursorOn]     = useState(true)

  const headline = useGlitchText('404', glitchActive)

  // Hydration gate
  useEffect(() => { setMounted(true) }, [])

  // Typewriter: reveal one pre-classified line at a time
  useEffect(() => {
    if (!mounted) return
    let idx = 0
    const tick = () => {
      if (idx >= SCAN_LINES.length) return
      const entry = SCAN_LINES[idx]
      setVisibleLines(prev => [...prev, entry])
      idx++
      setTimeout(tick, idx < 4 ? 280 : idx < 6 ? 160 : 110)
    }
    const t = setTimeout(tick, 400)
    return () => clearTimeout(t)
  }, [mounted])

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorOn(v => !v), 530)
    return () => clearInterval(id)
  }, [])

  // Periodic glitch
  useEffect(() => {
    const fire = () => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 900)
    }
    fire()
    const id = setInterval(fire, 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20">

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(245,166,35,0.06) 0%, transparent 70%),' +
            'radial-gradient(ellipse 40% 30% at 30% 70%, rgba(0,212,170,0.04) 0%, transparent 60%)',
        }}
      />

      {/* CRT scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(245,166,35,0.6) 2px,rgba(245,166,35,0.6) 3px)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* ── 404 headline ── */}
      <div className="relative select-none mb-2">
        {/* Red ghost layer */}
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center font-mono font-bold pointer-events-none"
          style={{
            fontSize: 'clamp(7rem,20vw,14rem)',
            lineHeight: 1,
            color: 'rgba(255,45,120,0.35)',
            transform: glitchActive ? 'translate(-4px,2px)' : 'none',
            transition: 'transform 0.05s',
            filter: 'blur(1px)',
          }}
        >
          {headline}
        </span>
        {/* Teal ghost layer */}
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center font-mono font-bold pointer-events-none"
          style={{
            fontSize: 'clamp(7rem,20vw,14rem)',
            lineHeight: 1,
            color: 'rgba(0,212,170,0.3)',
            transform: glitchActive ? 'translate(4px,-2px)' : 'none',
            transition: 'transform 0.05s',
            filter: 'blur(1px)',
          }}
        >
          {headline}
        </span>
        {/* Primary */}
        <span
          className="relative font-mono font-bold gradient-text"
          style={{ fontSize: 'clamp(7rem,20vw,14rem)', lineHeight: 1 }}
        >
          {headline}
        </span>
      </div>

      {/* Status label */}
      <div className="section-label mb-6">
        <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        NULL_ROUTE_EXCEPTION &nbsp;·&nbsp; PAGE NOT FOUND
      </div>

      {/* ── Terminal card ── */}
      <div className="terminal-card w-full max-w-xl mb-10">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <span className="ml-3 font-mono text-xs text-gray-500">route-resolver — bash</span>
        </div>

        {/* Terminal output — client-only to avoid hydration mismatch */}
        <div className="p-5 font-mono text-xs leading-relaxed space-y-1 min-h-[200px]">
          {mounted && visibleLines.map((entry, i) => (
            <div key={i} className={kindClass[entry.kind]}>
              {entry.text}
            </div>
          ))}
          {mounted && (
            <div className="text-amber-400">
              &gt;{' '}
              <span
                className="inline-block w-2 h-3.5 bg-amber-400 align-middle"
                style={{ opacity: cursorOn ? 1 : 0, transition: 'opacity 0.1s' }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Message */}
      <p className="text-gray-400 text-sm text-center max-w-sm mb-10 leading-relaxed">
        The route you requested does not exist in this system.
        It may have been moved, deleted, or you may have followed a broken link.
      </p>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="btn-primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Return Home
        </Link>
        <Link href="/ctf" className="btn-ghost">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          CTF Writeups
        </Link>
      </div>

      {/* Status bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 px-6 py-2 flex items-center justify-between font-mono text-[10px] text-gray-600">
        <span>SYS: PORTFOLIO_OS v2.0</span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          STATUS: 404
        </span>
        <span>KERNEL: NEXT.JS</span>
      </div>
    </div>
  )
}
