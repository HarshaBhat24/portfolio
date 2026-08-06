'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, GraduationCap, Target } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  whileInView:{ opacity: 1, y:  0 },
  transition: { duration: 0.6, delay },
  viewport:   { once: true },
})

const About = () => {
  const cards = [
    {
      icon: <ShieldCheck size={20} />,
      title: 'Who I Am',
      body: "I'm S Harsha Bhat - a cybersecurity professional with a focused interest in offensive security. I approach every system with an attacker's mindset, identifying vulnerabilities before adversaries can exploit them.",
    },
    {
      icon: <GraduationCap size={20} />,
      title: 'Education & Learning',
      body: 'Pursuing B.E. in Computer Science. Continuously deepening skills through CTF competitions, VAPT engagements, industry certifications, and hands-on security labs.',
    },
    {
      icon: <Target size={20} />,
      title: 'Mission',
      body: "To become a leading offensive security professional - thinking like an adversary to help organisations understand and fix their real-world attack surface before it's too late.",
    },
  ]

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-64 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.04) 0%, transparent 70%)' }}
      />

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

          {/* Left: Statement */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-2 flex flex-col justify-center">
            <p className="text-3xl md:text-4xl font-bold font-mono leading-snug text-ink-100 mb-6">
              Attack to<br />
              <span className="text-amber-400">understand.</span><br />
              Defend to<br />
              <span className="text-amber-400">protect.</span>
            </p>
            <p className="text-ink-300 text-base leading-7 mb-8">
              I started by learning how systems were built, then pivoted entirely to studying
              how they break. That shift - from understanding structure to finding its limits -
              defines everything I do in cybersecurity.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Burp Suite', 'Kali Linux', 'Metasploit', 'Wireshark', 'Nmap', 'SQLMap', 'Python'].map(t => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* Right: Cards */}
          <div className="lg:col-span-3 grid gap-5">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                {...fadeUp(0.15 + i * 0.1)}
                className="amber-left-card p-6 group hover:border-amber-400/30 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded bg-amber-400/10 text-amber-400 group-hover:bg-amber-400/20 transition-colors">
                    {card.icon}
                  </div>
                  <h3 className="font-mono font-semibold text-ink-100">{card.title}</h3>
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

export default About
