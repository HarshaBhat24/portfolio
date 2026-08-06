'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Github, Linkedin, Mail, ArrowDownRight } from 'lucide-react'

const roles = [
  'Security Researcher',
  'CTF Player & Competitor',
  'Penetration Tester',
  'VAPT Specialist',
]

const Hero = () => {
  const [roleIndex,     setRoleIndex]     = useState(0)
  const [displayed,     setDisplayed]     = useState('')
  const [isDeleting,    setIsDeleting]    = useState(false)

  /* ── Typewriter ──────────────────────────── */
  useEffect(() => {
    const current = roles[roleIndex]
    let t: ReturnType<typeof setTimeout>

    if (!isDeleting) {
      if (displayed.length < current.length) {
        t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75)
      } else {
        t = setTimeout(() => setIsDeleting(true), 2200)
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38)
      } else {
        setIsDeleting(false)
        setRoleIndex(p => (p + 1) % roles.length)
      }
    }
    return () => clearTimeout(t)
  }, [displayed, isDeleting, roleIndex])

  /* ── Stats ───────────────────────────────── */
  const stats = [
    { label: 'CTFs played',   value: '150+' },
    { label: 'Projects built',value: '10+' },
    { label: 'Languages',     value: '8+'  },
  ]

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-16"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,45,120,0.04) 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Content ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="section-label mb-5">
              <span className="text-amber-400">◆</span>&nbsp;&nbsp;Offensive &amp; Defensive Security
            </p>

            <h1 className="font-mono font-bold leading-tight mb-5">
              <span className="block text-5xl md:text-6xl text-ink-100">S Harsha</span>
              <span className="block text-5xl md:text-6xl gradient-text">Bhat</span>
            </h1>

            {/* Typewriter row */}
            <div className="flex items-center gap-2 mb-6 h-9">
              <span className="font-mono text-amber-400/50 text-sm select-none">$&gt;</span>
              <span className="font-mono text-lg text-ink-200 tracking-tight">{displayed}</span>
              <span className="w-[3px] h-6 bg-amber-400 rounded-sm animate-cursor-blink flex-shrink-0" />
            </div>

            <p className="text-ink-300 text-base leading-7 max-w-md mb-8">
              Passionate about offensive and defensive security - breaking systems
              to understand how to protect them. CTF competitor, VAPT practitioner, and
              security researcher driven by curiosity.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 mb-10">
              <a id="hero-view-projects" href="#projects" className="btn-primary">
                View Projects
              </a>
              <a id="hero-ctf-link" href="/ctf" className="btn-ghost">
                CTF Writeups
              </a>
              <a id="hero-contact-link" href="#contact" className="btn-ghost">
                Get in Touch
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-ink-400">find me on</span>
              <div className="flex gap-3">
                {[
                  { href: 'https://github.com/HarshaBhat24', icon: <Github size={17} />, id: 'hero-github' },
                  { href: 'https://linkedin.com/in/s-harsha-bhat/', icon: <Linkedin size={17} />, id: 'hero-linkedin' },
                  { href: 'mailto:harshabhat666@gmail.com', icon: <Mail size={17} />, id: 'hero-mail' },
                ].map(s => (
                  <a
                    key={s.id}
                    id={s.id}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-md border border-terminal-border text-ink-400 hover:text-amber-400 hover:border-amber-400/40 transition-all duration-200 hover:shadow-[0_0_12px_rgba(245,166,35,0.2)]"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Terminal card ──────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="hidden lg:block"
          >
            {/* Terminal window */}
            <div className="terminal-card animate-float">
              {/* Title bar */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-terminal-border">
                <span className="w-3 h-3 rounded-full bg-neon-pink/70" />
                <span className="w-3 h-3 rounded-full bg-amber-400/70" />
                <span className="w-3 h-3 rounded-full bg-neon-teal/70" />
                <span className="ml-3 font-mono text-xs text-ink-400">~/harsha/whoami.sh</span>
              </div>

              {/* Body */}
              <div className="p-6 font-mono text-sm space-y-3">
                {[
                  { cmd: 'cat profile.txt', out: 'S Harsha Bhat - Security Researcher', outColor: 'text-amber-300' },
                  { cmd: 'cat status.txt',  out: 'Open to opportunities & collaborations', outColor: 'text-neon-teal' },
                  { cmd: 'ls skills/',      out: 'pentest  vapt  ctf  forensics  linux', outColor: 'text-ink-200' },
                  { cmd: 'cat tools.txt',   out: 'Burp Suite · Metasploit · Wireshark · Kali', outColor: 'text-ink-200' },
                ].map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.3 }}
                    className="space-y-0.5"
                  >
                    <p className="text-amber-400/60">
                      <span className="text-amber-400">❯</span> {line.cmd}
                    </p>
                    <p className={`pl-3 ${line.outColor}`}>{line.out}</p>
                  </motion.div>
                ))}

                {/* Live prompt */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  className="flex items-center gap-1 pt-1"
                >
                  <span className="text-amber-400">❯</span>
                  <span className="w-2.5 h-5 bg-amber-400/80 animate-cursor-blink" />
                </motion.div>
              </div>
            </div>

            {/* Stats row below card */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {stats.map(s => (
                <div key={s.label} className="terminal-card p-4 text-center">
                  <p className="font-mono text-2xl font-bold text-amber-400">{s.value}</p>
                  <p className="font-mono text-xs text-ink-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Scroll cue ─────────────────────────── */}
        <motion.a
          href="#about"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-ink-400 hover:text-amber-400 transition-colors group"
        >
          <span className="font-mono text-xs">scroll</span>
          <ArrowDownRight size={16} className="group-hover:translate-y-1 transition-transform" />
        </motion.a>
      </div>
    </section>
  )
}

export default Hero
