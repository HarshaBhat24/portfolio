'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { Github, Linkedin, Mail, ArrowDownRight, Terminal, Shield } from 'lucide-react'

const roles = [
  'Security Researcher',
  'CTF Player & Competitor',
  'Penetration Tester',
  'VAPT Specialist',
  'Bug Bounty Hunter',
  'Security Engineer',
]

// Boot sequence lines
const bootLines = [
  { text: 'Initializing secure shell...', delay: 0,    color: '#A89880' },
  { text: '[OK] Network interface: wlan0 up', delay: 300, color: '#00D4AA' },
  { text: '[OK] Firewall rules loaded (iptables)', delay: 550, color: '#00D4AA' },
  { text: 'Loading security modules...', delay: 800,  color: '#A89880' },
  { text: '[SCAN] Checking attack surface...', delay: 1050, color: '#F5A623' },
  { text: 'Mounting /home/harsha/portfolio...', delay: 1300, color: '#A89880' },
  { text: '[READY] Portfolio system online.', delay: 1600, color: '#A8FF3E' },
]

const stats = [
  { label: 'CTFs played',   value: 200, suffix: '+', color: '#F5A623' },
  { label: 'Projects built', value: 10,  suffix: '+', color: '#00D4AA' },
  { label: 'Languages',     value: 8,   suffix: '+', color: '#FF2D78' },
]

function CountUp({ end, suffix, color, duration = 1500 }: { end: number; suffix: string; color: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(animate)
      else setCount(end)
    }
    requestAnimationFrame(animate)
  }, [started, end, duration])

  return (
    <span ref={ref} style={{ color }} className="font-mono font-bold text-2xl tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function Hero() {
  const [bootDone,   setBootDone]   = useState(false)
  const [bootLines_, setBootLines_] = useState<string[]>([])
  const [roleIndex,  setRoleIndex]  = useState(0)
  const [displayed,  setDisplayed]  = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showHero,   setShowHero]   = useState(false)

  // Boot sequence
  useEffect(() => {
    // Check sessionStorage so boot only plays once per session
    const booted = sessionStorage.getItem('portfolio-booted')
    if (booted) {
      setBootDone(true)
      setShowHero(true)
      return
    }

    bootLines.forEach(({ text, delay }) => {
      setTimeout(() => {
        setBootLines_(prev => [...prev, text])
      }, delay)
    })

    setTimeout(() => {
      setBootDone(true)
      setTimeout(() => {
        setShowHero(true)
        sessionStorage.setItem('portfolio-booted', '1')
      }, 400)
    }, 2200)
  }, [])

  // Typewriter
  useEffect(() => {
    if (!showHero) return
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
  }, [displayed, isDeleting, roleIndex, showHero])

  const socials = [
    { href: 'https://github.com/HarshaBhat24',       icon: <Github size={16} />,   id: 'hero-github',   rel: 'me noopener noreferrer' },
    { href: 'https://linkedin.com/in/s-harsha-bhat/', icon: <Linkedin size={16} />, id: 'hero-linkedin', rel: 'me noopener noreferrer' },
    { href: 'mailto:harshabhat666@gmail.com',         icon: <Mail size={16} />,     id: 'hero-mail',     rel: 'noopener noreferrer'    },
  ]

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-16">

      {/* ── Boot Screen ─────────────────────────── */}
      <AnimatePresence>
        {!bootDone && (
          <motion.div
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-terminal-bg"
          >
            <div className="w-full max-w-lg px-6">
              {/* Scanline effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)',
                }}
              />

              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-4">
                <Shield size={16} className="text-amber-400" />
                <span className="font-mono text-xs text-amber-400">harsha@kali:~$ ./portfolio.sh</span>
              </div>

              <div className="space-y-1.5 min-h-[160px]">
                {bootLines_.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="font-mono text-xs" style={{
                      color: bootLines[i]?.color || '#A89880',
                    }}>
                      {line}
                    </span>
                  </motion.div>
                ))}

                {/* Blinking prompt at end */}
                {bootLines_.length > 0 && (
                  <div className="flex items-center gap-1 pt-1">
                    <span className="font-mono text-xs text-amber-400">❯</span>
                    <span className="w-2 h-4 bg-amber-400/80 animate-cursor-blink" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Ambient Glows ───────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.05) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,45,120,0.03) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
      </div>

      {/* ── Main Content ─────────────────────────── */}
      <AnimatePresence>
        {showHero && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10 w-full py-20"
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* ── LEFT ─────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, x: -32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              >
                {/* Label */}
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="section-label mb-5 flex items-center gap-2"
                >
                  <span className="text-amber-400">◆</span>
                  Offensive &amp; Defensive Security
                </motion.p>

                {/* Name */}
                <h1 className="font-mono font-bold leading-tight mb-5">
                  <motion.span
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="block text-5xl md:text-6xl text-ink-100"
                  >
                    S Harsha
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="block text-5xl md:text-6xl gradient-text"
                  >
                    Bhat
                  </motion.span>
                </h1>

                {/* Typewriter */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-2 mb-6 h-9"
                >
                  <span className="font-mono text-amber-400/50 text-sm select-none">$&gt;</span>
                  <span className="font-mono text-lg text-ink-200 tracking-tight">{displayed}</span>
                  <span className="w-[3px] h-6 bg-amber-400 rounded-sm animate-cursor-blink flex-shrink-0" />
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="text-ink-300 text-base leading-7 max-w-md mb-8"
                >
                  Passionate about offensive and defensive security - breaking systems
                  to understand how to protect them. CTF competitor, VAPT practitioner, and
                  security researcher driven by curiosity.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                  className="flex flex-wrap gap-3 mb-10"
                >
                  <a id="hero-view-projects" href="#projects" className="btn-primary">
                    View Projects
                  </a>
                  <a id="hero-ctf-link" href="/ctf" className="btn-ghost">
                    CTF Writeups
                  </a>
                  <a id="hero-contact-link" href="#contact" className="btn-ghost">
                    Get in Touch
                  </a>
                </motion.div>

                {/* Mobile: status */}
                <div className="flex items-center gap-2.5 mb-5 lg:hidden">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-teal opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-teal" />
                  </span>
                  <span className="font-mono text-xs text-neon-teal">
                    Open to opportunities &amp; collaborations
                  </span>
                </div>

                {/* Socials */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.75 }}
                  className="flex items-center gap-4"
                >
                  <span className="font-mono text-xs text-ink-400">find me on</span>
                  <div className="flex gap-3">
                    {socials.map(s => (
                      <a
                        key={s.id}
                        id={s.id}
                        href={s.href}
                        target={s.href.startsWith('http') ? '_blank' : undefined}
                        rel={s.rel}
                        className="w-9 h-9 flex items-center justify-center rounded-md border border-terminal-border text-ink-400 hover:text-amber-400 hover:border-amber-400/40 transition-all duration-200 hover:shadow-[0_0_12px_rgba(245,166,35,0.2)] hover:scale-110"
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* ── RIGHT ─────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                className="hidden lg:block"
              >
                {/* Terminal window with glassy look */}
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: 'rgba(10,10,18,0.85)',
                    border: '1px solid rgba(245,166,35,0.15)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 0 60px rgba(245,166,35,0.06), 0 25px 50px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Titlebar */}
                  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-terminal-border">
                    <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
                    <span className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
                    <span className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
                    <span className="ml-3 font-mono text-xs text-ink-400">~/harsha/whoami.sh</span>
                    <Terminal size={11} className="ml-auto text-ink-500" />
                  </div>

                  {/* Body */}
                  <div className="p-6 font-mono text-sm space-y-3">
                    {[
                      { cmd: 'cat profile.txt',  out: 'S Harsha Bhat - Security Researcher', outColor: 'text-amber-300' },
                      { cmd: 'cat status.txt',   out: 'Open to opportunities & collaborations', outColor: 'text-neon-teal' },
                      { cmd: 'ls skills/',       out: 'pentest  vapt  ctf  forensics  linux', outColor: 'text-ink-200'  },
                      { cmd: 'cat tools.txt',    out: 'Burp · Metasploit · Wireshark · Kali', outColor: 'text-ink-200'  },
                      { cmd: 'cat ctf-stats.txt',out: '200+ challenges ·  competitions worldwide', outColor: 'text-neon-lime' },
                    ].map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.25 }}
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
                      transition={{ delay: 2.0 }}
                      className="flex items-center gap-1 pt-1"
                    >
                      <span className="text-amber-400">❯</span>
                      <span className="w-2.5 h-5 bg-amber-400/80 animate-cursor-blink" />
                    </motion.div>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {stats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="terminal-card p-4 text-center group hover:border-terminal-border-hi transition-all duration-300 hover:scale-105"
                      style={{ cursor: 'default' }}
                    >
                      <CountUp end={s.value} suffix={s.suffix} color={s.color} />
                      <p className="font-mono text-xs text-ink-400 mt-1">{s.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Status badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-3 flex items-center justify-center gap-2.5 py-2.5 rounded-lg font-mono text-xs"
                  style={{
                    background: 'rgba(0,212,170,0.06)',
                    border: '1px solid rgba(0,212,170,0.15)',
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-teal opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-teal" />
                  </span>
                  <span className="text-neon-teal">Open to opportunities &amp; collaborations</span>
                </motion.div>
              </motion.div>
            </div>

            {/* ── Scroll cue ─────────────────────── */}
            <motion.a
              href="#about"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-ink-400 hover:text-amber-400 transition-colors group"
            >
              <span className="font-mono text-xs">scroll</span>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDownRight size={16} />
              </motion.div>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
