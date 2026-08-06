'use client'

import { motion } from 'framer-motion'
import { Crosshair, ShieldAlert, Network, Terminal, Bug, Search } from 'lucide-react'

const categories = [
  {
    icon: <Crosshair size={18} />,
    label: 'Offensive Security',
    accent: '#F5A623',
    skills: [
      'Penetration Testing', 'VAPT',
      'Web App Hacking', 'Privilege Escalation',
      'Burp Suite', 'Metasploit', 'SQLMap',
    ],
  },
  {
    icon: <ShieldAlert size={18} />,
    label: 'Vulnerability Research',
    accent: '#FF2D78',
    skills: [
      'CVE Analysis', 'Security Auditing',
      'RLS Policy Audits', 'Threat Modelling',
      'Static Analysis', 'OWASP Top 10',
    ],
  },
  {
    icon: <Bug size={18} />,
    label: 'CTF & Challenges',
    accent: '#00D4AA',
    skills: [
      'Web Exploitation', 'Cryptography',
      'Binary Exploitation', 'Forensics',
      'OSINT', 'Reverse Engineering',
    ],
  },
  {
    icon: <Network size={18} />,
    label: 'Network Security',
    accent: '#A8FF3E',
    skills: [
      'Wireshark', 'Nmap', 'Packet Analysis',
      'Network Scanning', 'Firewall Rules',
      'VPN / Tunnelling',
    ],
  },
  {
    icon: <Search size={18} />,
    label: 'Digital Forensics',
    accent: '#F5A623',
    skills: [
      'Log Analysis', 'Incident Response',
      'Memory Forensics', 'SIEM basics',
      'Disk Imaging', 'Malware Triage',
    ],
  },
  {
    icon: <Terminal size={18} />,
    label: 'Tools & OS',
    accent: '#FF2D78',
    skills: [
      'Kali Linux', 'Parrot OS', 'Bash scripting',
      'Python (security)', 'Docker', 'Git',
    ],
  },
]

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 18 },
  whileInView:{ opacity: 1, y:  0 },
  transition: { duration: 0.55, delay },
  viewport:   { once: true },
})

const Skills = () => (
  <section id="skills" className="py-28 relative">
    <div
      className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(255,45,120,0.03) 0%, transparent 70%)' }}
    />

    <div className="max-w-6xl mx-auto px-6 lg:px-8">

      {/* Header */}
      <motion.div {...fadeUp()} className="mb-16">
        <p className="section-label mb-3">
          <span className="text-amber-400">04</span>&nbsp;/&nbsp;skills
        </p>
        <div className="flex items-end gap-4 flex-wrap">
          <h2 className="font-mono font-bold text-4xl md:text-5xl text-ink-100">
            Security <span className="gradient-text">Arsenal</span>
          </h2>
          <div className="h-px flex-1 min-w-16 bg-gradient-to-r from-amber-400/30 to-transparent mb-2.5" />
        </div>
        <p className="text-ink-300 text-sm mt-4 max-w-lg">
          Techniques, tools, and domains spanning offensive operations, vulnerability research, and digital forensics.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            {...fadeUp(0.05 + i * 0.08)}
            className="terminal-card p-6 group hover:border-terminal-border-hi transition-colors duration-300"
          >
            {/* Category header */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                style={{ background: `${cat.accent}18`, color: cat.accent }}
              >
                {cat.icon}
              </div>
              <h3 className="font-mono text-sm font-semibold text-ink-100">{cat.label}</h3>
              <div
                className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: cat.accent, boxShadow: `0 0 8px ${cat.accent}` }}
              />
            </div>

            {/* Skill pills */}
            <div className="flex flex-wrap gap-2">
              {cat.skills.map(skill => (
                <span
                  key={skill}
                  className="inline-flex items-center font-mono text-xs px-2.5 py-1 rounded border transition-all duration-200 cursor-default"
                  style={{
                    borderColor: `${cat.accent}22`,
                    background:  `${cat.accent}08`,
                    color: cat.accent === '#F5A623' ? '#FFD84D'
                         : cat.accent === '#FF2D78' ? '#FF7BAC'
                         : cat.accent === '#00D4AA' ? '#00D4AA'
                         : '#B8FF6E',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.borderColor = `${cat.accent}55`
                    el.style.background  = `${cat.accent}14`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.borderColor = `${cat.accent}22`
                    el.style.background  = `${cat.accent}08`
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default Skills
