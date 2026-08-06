'use client'

import { motion } from 'framer-motion'
import { Flag, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const categories = [
  { href: '/ctf/web',      label: 'Web Exploitation', cmd: 'ls web/',      color: '#F5A623' },
  { href: '/ctf/crypto',   label: 'Cryptography',     cmd: 'ls crypto/',    color: '#FF2D78' },
  { href: '/ctf/binary',   label: 'Binary Exploit',   cmd: 'ls binary/',    color: '#00D4AA' },
  { href: '/ctf/forensics',label: 'Forensics',         cmd: 'ls forensics/', color: '#A8FF3E' },
  { href: '/ctf/osint',    label: 'OSINT',             cmd: 'ls osint/',     color: '#F5A623' },
  { href: '/ctf/general',  label: 'General Skills',   cmd: 'ls general/',   color: '#FF2D78' },
]

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 18 },
  whileInView:{ opacity: 1, y:  0 },
  transition: { duration: 0.55, delay },
  viewport:   { once: true },
})

const CTFWriteups = () => (
  <section id="ctf" className="py-28 relative overflow-hidden">
    {/* bg accent */}
    <div
      className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.04) 0%, transparent 70%)' }}
    />

    <div className="max-w-6xl mx-auto px-6 lg:px-8">

      {/* Header */}
      <motion.div {...fadeUp()} className="mb-16">
        <p className="section-label mb-3">
          <span className="text-amber-400">06</span>&nbsp;/&nbsp;ctf
        </p>
        <div className="flex items-end gap-4 flex-wrap">
          <h2 className="font-mono font-bold text-4xl md:text-5xl text-ink-100">
            CTF <span className="gradient-text">Writeups</span>
          </h2>
          <div className="h-px flex-1 min-w-16 bg-gradient-to-r from-amber-400/30 to-transparent mb-2.5" />
        </div>
        <p className="text-ink-300 text-sm mt-4 max-w-xl">
          Documented solutions and methodologies from Capture the Flag competitions - organised by category.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-8 items-start">

        {/* Left: description card */}
        <motion.div {...fadeUp(0.1)} className="lg:col-span-2">
          <div className="terminal-card p-6">
            {/* Terminal header */}
            <div className="flex items-center gap-1.5 mb-5 pb-4 border-b border-terminal-border">
              <span className="w-2.5 h-2.5 rounded-full bg-neon-pink/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-neon-teal/60" />
              <span className="ml-2 font-mono text-xs text-ink-400">ctf/hub</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded bg-amber-400/10 flex items-center justify-center text-amber-400">
                <Flag size={18} />
              </div>
              <h3 className="font-mono font-semibold text-ink-100">CTF Hub</h3>
            </div>

            <p className="text-ink-300 text-sm leading-6 mb-5">
              I&apos;ve recently started documenting my CTF experiences. Currently one writeup is published -
              more coming as I compete in upcoming events.
            </p>

            <Link
              href="/ctf"
              id="ctf-hub-link"
              className="btn-primary inline-flex text-xs"
            >
              Browse all writeups
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

        {/* Right: category grid */}
        <motion.div {...fadeUp(0.2)} className="lg:col-span-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categories.map((cat, i) => (
              <motion.div key={cat.href} {...fadeUp(0.1 + i * 0.06)}>
                <Link
                  href={cat.href}
                  id={`ctf-cat-${cat.label.toLowerCase().replace(/\s/g, '-')}`}
                  className="block terminal-card p-5 group hover:border-terminal-border-hi transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                >
                  {/* Mini terminal prompt */}
                  <p className="font-mono text-[11px] text-ink-400 mb-3">
                    <span style={{ color: cat.color }} className="mr-1">❯</span>
                    {cat.cmd}
                  </p>

                  <p
                    className="font-mono text-sm font-semibold transition-colors duration-200"
                    style={{ color: cat.color }}
                  >
                    {cat.label}
                  </p>

                  <div
                    className="mt-3 h-px w-full opacity-20 group-hover:opacity-50 transition-opacity"
                    style={{ background: cat.color }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Status line */}
          <motion.div {...fadeUp(0.5)} className="mt-4 flex items-center gap-3 px-1">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-teal animate-pulse" />
            <p className="font-mono text-xs text-ink-400">
              Actively competing - new writeups added post-competition
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
)

export default CTFWriteups