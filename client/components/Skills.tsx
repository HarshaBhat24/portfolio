'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Crosshair, ShieldAlert, Network, Terminal, Bug, Search } from 'lucide-react'

const categories = [
  {
    icon: <Crosshair size={18} />,
    label: 'Offensive Security',
    accent: '#F5A623',
    level: 90,
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
    level: 82,
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
    level: 88,
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
    level: 75,
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
    level: 70,
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
    level: 85,
    skills: [
      'Kali Linux', 'Parrot OS', 'Bash scripting',
      'Python (security)', 'Docker', 'Git',
    ],
  },
]

// Radar chart component
function RadarChart({ categories: cats, activeIdx, onHover }: {
  categories: typeof categories
  activeIdx: number | null
  onHover: (i: number | null) => void
}) {
  const N = cats.length
  // Larger viewBox so labels have room on all sides
  const cx = 200, cy = 200, r = 100
  const LABEL_R = 155   // distance from centre to label midpoint
  const svgRef = useRef<SVGSVGElement>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.3 }
    )
    if (svgRef.current) obs.observe(svgRef.current)
    return () => obs.disconnect()
  }, [])

  const angle = (i: number) => (Math.PI * 2 * i) / N - Math.PI / 2

  // Chart data point at a given proficiency level
  const getPoint = (i: number, level: number) => {
    const a = angle(i)
    const dist = (level / 100) * r
    return { x: cx + Math.cos(a) * dist, y: cy + Math.sin(a) * dist }
  }

  // Spoke tip (100% edge)
  const getTip = (i: number) => {
    const a = angle(i)
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }
  }

  // Label anchor position
  const getLabelPos = (i: number) => {
    const a = angle(i)
    return { x: cx + Math.cos(a) * LABEL_R, y: cy + Math.sin(a) * LABEL_R }
  }

  // Split a label into at most two lines (~12 chars each)
  const splitLabel = (label: string): [string, string | null] => {
    if (label.length <= 13) return [label, null]
    const mid = label.lastIndexOf(' ', Math.ceil(label.length / 2))
    if (mid === -1) return [label, null]
    return [label.slice(0, mid), label.slice(mid + 1)]
  }

  const gridLevels = [25, 50, 75, 100]

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 400"
      className="w-full max-w-[360px] mx-auto"
      aria-label="Skills radar chart"
    >
      {/* Grid rings */}
      {gridLevels.map(level => {
        const points = cats.map((_, i) => getPoint(i, level))
        const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z'
        return (
          <path
            key={level}
            d={d}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={1}
          />
        )
      })}

      {/* Spokes */}
      {cats.map((_, i) => {
        const end = getTip(i)
        return (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={end.x} y2={end.y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={1}
          />
        )
      })}

      {/* Filled polygon */}
      {animated && (
        <motion.path
          d={
            cats.map((c, i) => {
              const pt = getPoint(i, c.level)
              return `${i === 0 ? 'M' : 'L'}${pt.x},${pt.y}`
            }).join(' ') + ' Z'
          }
          fill="rgba(245,166,35,0.08)"
          stroke="rgba(245,166,35,0.5)"
          strokeWidth={1.5}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      )}

      {/* Active highlight polygon */}
      {animated && activeIdx !== null && (
        <motion.path
          key={activeIdx}
          d={
            cats.map((c, i) => {
              const level = i === activeIdx ? c.level : 0
              const pt = getPoint(i, level)
              return `${i === 0 ? 'M' : 'L'}${pt.x},${pt.y}`
            }).join(' ') + ' Z'
          }
          fill={`${cats[activeIdx].accent}28`}
          stroke={cats[activeIdx].accent}
          strokeWidth={2}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Data points + labels */}
      {cats.map((c, i) => {
        const pt      = getPoint(i, c.level)
        const labelPt = getLabelPos(i)
        const isActive = activeIdx === i
        const [line1, line2] = splitLabel(c.label)
        return (
          <g
            key={c.label}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
            style={{ cursor: 'pointer' }}
          >
            {animated && (
              <motion.circle
                cx={pt.x} cy={pt.y} r={isActive ? 6 : 4}
                fill={isActive ? c.accent : '#F5A623'}
                stroke={isActive ? c.accent : 'rgba(245,166,35,0.4)'}
                strokeWidth={2}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                style={{ filter: isActive ? `drop-shadow(0 0 6px ${c.accent})` : undefined }}
              />
            )}

            {/* Invisible hit-area centred on the label */}
            <circle cx={labelPt.x} cy={labelPt.y} r={32} fill="transparent" />

            {/* Label — two tspan lines for long names */}
            <text
              textAnchor="middle"
              className="select-none"
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 9,
                fill: isActive ? c.accent : 'rgba(168,152,128,0.9)',
                fontWeight: isActive ? 700 : 400,
                transition: 'fill 0.2s',
              }}
            >
              <tspan x={labelPt.x} dy="0" dominantBaseline="middle"
                y={line2 ? labelPt.y - 6 : labelPt.y}>
                {line1}
              </tspan>
              {line2 && (
                <tspan x={labelPt.x} dy="13" dominantBaseline="middle">
                  {line2}
                </tspan>
              )}
            </text>
          </g>
        )
      })}

      {/* Center dot */}
      <circle cx={cx} cy={cy} r={3} fill="rgba(245,166,35,0.4)" />
    </svg>
  )
}

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition:  { duration: 0.55, delay },
  viewport:    { once: true },
})

export default function Skills() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const active = activeIdx !== null ? categories[activeIdx] : null

  return (
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
            Hover over the radar chart or skill cards to explore each domain.
            Techniques, tools, and domains spanning offensive operations, vulnerability research, and digital forensics.
          </p>
        </motion.div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Left: Radar Chart */}
          <motion.div {...fadeUp(0.1)} className="sticky top-24">
            <div
              className="rounded-xl p-6"
              style={{
                background: 'rgba(10,10,18,0.8)',
                border: '1px solid rgba(245,166,35,0.1)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs text-ink-400 uppercase tracking-widest">Skill Radar</span>
                <div className="h-px flex-1 bg-terminal-border" />
                {active && (
                  <motion.span
                    key={active.label}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-mono text-xs"
                    style={{ color: active.accent }}
                  >
                    {active.label}
                  </motion.span>
                )}
              </div>

              <RadarChart
                categories={categories}
                activeIdx={activeIdx}
                onHover={setActiveIdx}
              />

              {/* Active skill detail */}
              <div className="mt-4 min-h-[80px]">
                {active ? (
                  <motion.div
                    key={active.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-7 h-7 rounded flex items-center justify-center"
                        style={{ background: `${active.accent}18`, color: active.accent }}
                      >
                        {active.icon}
                      </div>
                      <p className="font-mono text-sm font-semibold" style={{ color: active.accent }}>
                        {active.label}
                      </p>
                      <span className="ml-auto font-mono text-xs text-ink-400">{active.level}%</span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-1 bg-terminal-border rounded-full overflow-hidden mb-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${active.level}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${active.accent}80, ${active.accent})` }}
                      />
                    </div>
                  </motion.div>
                ) : (
                  <p className="font-mono text-xs text-ink-500 text-center pt-4">
                    Hover a domain to explore skills
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: Skill cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                {...fadeUp(0.05 + i * 0.08)}
                className="terminal-card p-5 group cursor-default transition-all duration-300"
                style={{
                  borderColor: activeIdx === i ? `${cat.accent}30` : undefined,
                  boxShadow: activeIdx === i ? `0 0 20px ${cat.accent}12` : undefined,
                }}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
              >
                {/* Category header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <div
                    className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: `${cat.accent}18`, color: cat.accent }}
                  >
                    {cat.icon}
                  </div>
                  <h3 className="font-mono text-xs font-semibold text-ink-100">{cat.label}</h3>
                  <div
                    className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                    style={{
                      background: activeIdx === i ? cat.accent : `${cat.accent}60`,
                      boxShadow: activeIdx === i ? `0 0 8px ${cat.accent}` : 'none',
                    }}
                  />
                </div>

                {/* Level bar */}
                <div className="h-0.5 bg-terminal-border rounded-full overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${cat.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${cat.accent}50, ${cat.accent})` }}
                  />
                </div>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map(skill => (
                    <span
                      key={skill}
                      className="inline-flex items-center font-mono text-[10px] px-2 py-0.5 rounded border transition-all duration-200"
                      style={{
                        borderColor: `${cat.accent}22`,
                        background:  `${cat.accent}08`,
                        color: cat.accent === '#F5A623' ? '#FFD84D'
                             : cat.accent === '#FF2D78' ? '#FF7BAC'
                             : cat.accent === '#00D4AA' ? '#00D4AA'
                             : '#B8FF6E',
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
      </div>
    </section>
  )
}
