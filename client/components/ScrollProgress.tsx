'use client'

import { useEffect, useState } from 'react'

const sections = [
  { id: 'home',         label: 'Home' },
  { id: 'about',        label: 'About' },
  { id: 'experience',   label: 'XP' },
  { id: 'skills',       label: 'Skills' },
  { id: 'projects',     label: 'Projects' },
  { id: 'ctf',          label: 'CTF' },
  { id: 'contact',      label: 'Contact' },
]

export default function ScrollProgress() {
  const [progress, setProgress]       = useState(0)
  const [active, setActive]           = useState('home')
  const [visible, setVisible]         = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop  = window.scrollY
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight
      const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(pct)
      setVisible(scrollTop > 80)

      // Active section detection
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= 160) {
          setActive(s.id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-terminal-border/40">
        <div
          className="h-full transition-all duration-100"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #F5A623, #00D4AA, #FF2D78)',
            boxShadow: '0 0 8px rgba(245,166,35,0.6)',
          }}
        />
      </div>

      {/* Right-side section dots */}
      <div
        className={`fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 transition-all duration-500 ${
          visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}
        aria-hidden="true"
      >
        {sections.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            title={s.label}
            className="group flex items-center gap-2 justify-end"
          >
            <span
              className={`font-mono text-[9px] transition-all duration-200 ${
                active === s.id ? 'opacity-100 text-amber-400' : 'opacity-0 text-ink-500 group-hover:opacity-80'
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                active === s.id
                  ? 'w-2 h-2 bg-amber-400 shadow-[0_0_8px_rgba(245,166,35,0.8)]'
                  : 'w-1.5 h-1.5 bg-ink-500 group-hover:bg-amber-400/50'
              }`}
            />
          </a>
        ))}
      </div>
    </>
  )
}
