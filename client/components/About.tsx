'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ShieldCheck, GraduationCap, Target, Zap } from 'lucide-react'
import { useRef } from 'react'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition:  { duration: 0.6, delay },
  viewport:    { once: true },
})

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [30, -30])

  const cards = [
    {
      icon:  <ShieldCheck size={20} />,
      title: 'Who I Am',
      color: '#F5A623',
      body:  "I'm S Harsha Bhat - a cybersecurity professional with a focused interest in offensive security. I approach every system with an attacker's mindset, identifying vulnerabilities before adversaries can exploit them.",
    },
    {
      icon:  <GraduationCap size={20} />,
      title: 'Education & Learning',
      color: '#00D4AA',
      body:  'Pursuing B.E. in Computer Science. Continuously deepening skills through CTF competitions, VAPT engagements, industry certifications, and hands-on security labs.',
    },
    {
      icon:  <Target size={20} />,
      title: 'Mission',
      color: '#FF2D78',
      body:  "To become a leading offensive security professional - thinking like an adversary to help organisations understand and fix their real-world attack surface before it's too late.",
    },
  ]

  const quickFacts = [
    { label: 'Based in',   value: 'Bangalore, India',    icon: '📍' },
    { label: 'Focus',      value: 'Offensive Security',  icon: '🎯' },
    { label: 'Competing',  value: 'CTF Internationally', icon: '🚩' },
    { label: 'Available',  value: 'For Opportunities',   icon: '✅' },
  ]

  return (
    <section id="about" ref={ref} className="py-28 relative overflow-hidden">
      {/* Parallax background accent */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute top-0 left-0 w-64 h-64 pointer-events-none"
      >
        <div style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.05) 0%, transparent 70%)', width: '100%', height: '100%' }} />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div {...fadeUp()} className="mb-16">
          <p className="section-label mb-3">
            <span className="text-amber-400">01</span>&nbsp;/&nbsp;about
          </p>
          <div className="flex items-end gap-4 flex-wrap">
            <h2 className="font-mono font-bold text-4xl md:text-5xl text-ink-100">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="h-px flex-1 min-w-16 bg-gradient-to-r from-amber-400/30 to-transparent mb-2.5" />
          </div>
        </motion.div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-5 gap-10">

          {/* Left */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-2 flex flex-col justify-center">
            <div className="relative mb-8">
              <p className="text-3xl md:text-4xl font-bold font-mono leading-snug text-ink-100">
                Attack to<br />
                <span className="text-amber-400 glow-text">understand.</span><br />
                Defend to<br />
                <span className="text-amber-400 glow-text">protect.</span>
              </p>
              {/* Decorative quote mark */}
              <span
                className="absolute -top-4 -left-2 font-mono text-7xl text-amber-400/05 select-none pointer-events-none leading-none"
              >
                &quot;
              </span>
            </div>


            <p className="text-ink-300 text-base leading-7 mb-8">
              I started by learning how systems were built, then pivoted entirely to studying
              how they break. That shift - from understanding structure to finding its limits -
              defines everything I do in cybersecurity.
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-2 mb-8">
              {quickFacts.map(f => (
                <motion.div
                  key={f.label}
                  {...fadeUp(0.2)}
                  className="rounded-lg p-3"
                  style={{
                    background: 'rgba(10,10,18,0.6)',
                    border: '1px solid rgba(245,166,35,0.1)',
                  }}
                >
                  <span className="text-sm">{f.icon}</span>
                  <p className="font-mono text-[10px] text-ink-500 mt-1 uppercase tracking-widest">{f.label}</p>
                  <p className="font-mono text-xs text-ink-200 mt-0.5">{f.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {['Burp Suite', 'Kali Linux', 'Metasploit', 'Wireshark', 'Nmap', 'SQLMap', 'Python'].map(t => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* Right: Cards */}
          <div className="lg:col-span-3 grid gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                {...fadeUp(0.15 + i * 0.1)}
                className="group rounded-xl p-6 hover:border-opacity-30 transition-all duration-300"
                style={{
                  background: 'rgba(10,10,18,0.85)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderLeft: `3px solid ${card.color}50`,
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderLeftColor = card.color
                  el.style.boxShadow = `0 0 30px ${card.color}08, 4px 0 20px ${card.color}06`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderLeftColor = `${card.color}50`
                  el.style.boxShadow = 'none'
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-8 h-8 flex items-center justify-center rounded transition-colors"
                    style={{
                      background: `${card.color}12`,
                      color:       card.color,
                    }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="font-mono font-semibold text-ink-100">{card.title}</h3>
                  <Zap size={12} className="ml-auto text-ink-600 group-hover:text-amber-400/40 transition-colors" />
                </div>
                <p className="text-ink-300 text-sm leading-6">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
