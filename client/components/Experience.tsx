'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Briefcase, Shield, Search, Calendar, ChevronRight, TrendingUp } from 'lucide-react'

const epicorExperience = {
  company: 'Epicor Software',
  location: 'Bengaluru, India',
  totalDuration: 'Oct 2025 – Present',
  roles: [
    {
      role:     'Product Developer, Assoc',
      type:     'Full-Time',
      duration: 'Sep 2026 – Present',
      color:    '#F5A623',
      summary:  'Full-time Associate Product Developer at Epicor Software within the enterprise software product development team.',
      bullets:  [],
      tags:     ['Enterprise Software', 'Azure DevOps', 'CI/CD', 'PowerShell', 'DevSecOps'],
    },
    {
      role:     'Product Development Intern',
      type:     'Full-time Internship',
      duration: 'Oct 2025 – Sep 2026',
      color:    '#00D4AA',
      summary:  'Worked within an enterprise software product development organisation, authoring and maintaining CI/CD pipeline-as-code definitions and automating build and test environment provisioning.',
      bullets: [
        'Authored Jenkins (Jenkinsfile) and Azure Pipelines (YAML) CI/CD definitions; led migration from Jenkins to Azure DevOps, mapping build stages, triggers, and parameters across toolchains.',
        'Developed PowerShell and Batch scripts to fully automate build and test environment provisioning - compiler setup, dependency installation, and tool configuration - eliminating manual misconfiguration risk.',
        'Performed log-based root cause analysis of pipeline and script execution failures across Windows environments, applying systematic execution tracing transferable to incident investigation workflows.',
      ],
      tags: ['Jenkins', 'Azure Pipelines', 'PowerShell', 'Bash', 'CI/CD', 'DevSecOps'],
    },
  ],
}

const securityEngagements = [
  {
    id:       'vapt-saas',
    title:    'Freelance VAPT Engagement',
    subtitle: 'Enterprise SaaS Platform - Multi-tenant',
    duration: 'Jul 2026 – Aug 2026',
    icon:     <Shield size={18} />,
    color:    '#F5A623',
    severity: { critical: 9, high: 15, medium: 12 },
    summary:
      'End-to-end VAPT across 7 domains of a multi-tenant enterprise SaaS application - API security, LLM/AI endpoints, authentication flows, PostgreSQL RLS policies, audit logging, HTTP headers, and rate limiting.',
    highlights: [
      '9 Critical, 15 High, 12 Medium findings - including SSRF (OOB-confirmed via interactsh), mass-deletion via SQL wildcard injection, prompt injection on open LLM endpoints, and unauthenticated RLS access to security-critical tables.',
      'Audited 47 PostgreSQL RLS migration files; discovered misconfigurations granting anonymous write access to MFA settings, webhook URLs, and partner financial data.',
      'Delivered 7-domain audit reports with CVSS-scored findings and code-level remediations in TypeScript, Python, and SQL; produced a prioritised P0-to-backlog remediation roadmap.',
    ],
    tools: ['Burp Suite', 'Nmap', 'ffuf', 'interactsh', 'sqlmap', 'nikto', 'curl'],
  },
  {
    id:       'bb-assessment',
    title:    'Black-Box Security Assessment',
    subtitle: 'Authorized Web Application Assessment',
    duration: 'Individual Assessment',
    icon:     <Search size={18} />,
    color:    '#00D4AA',
    severity: null,
    summary:
      'Full lifecycle black-box security assessment of a modern SaaS web application - covering reconnaissance, enumeration, manual exploitation, CVSS scoring, and professional report delivery.',
    highlights: [
      'Identified OAuth client secret exposure within publicly accessible client-side resources; confirmed BOLA via manual authorization testing; discovered CORS misconfiguration and WebSocket authentication weakness.',
      'Performed JavaScript analysis, API mapping via ffuf/Gobuster, JWT analysis, and parameter manipulation; validated all findings through manual exploitation before CVSS scoring.',
      'Independently produced a full professional penetration testing report: executive summary, attack chains, technical findings, proof of concept, and secure architecture recommendations.',
    ],
    tools: ['Burp Suite', 'ffuf', 'Gobuster', 'curl', 'wscat', 'Browser DevTools'],
  },
]

function SeverityBadges({ severity }: { severity: { critical: number; high: number; medium: number } }) {
  return (
    <div className="flex gap-2 flex-wrap mt-3">
      {[
        { label: 'Critical', count: severity.critical, color: '#FF2D78' },
        { label: 'High',     count: severity.high,     color: '#F5A623' },
        { label: 'Medium',   count: severity.medium,   color: '#FEBC2E' },
      ].map(s => (
        <motion.div
          key={s.label}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-[10px] font-semibold"
          style={{
            background: `${s.color}12`,
            border: `1px solid ${s.color}30`,
            color: s.color,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }}
          />
          {s.count} {s.label}
        </motion.div>
      ))}
    </div>
  )
}

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition:  { duration: 0.6, delay },
  viewport:    { once: true },
})

export default function Experience() {
  const [expandedEng, setExpandedEng] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" ref={sectionRef} className="py-28 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div {...fadeUp()} className="mb-16">
          <p className="section-label mb-3">
            <span className="text-amber-400">02</span>&nbsp;/&nbsp;experience
          </p>
          <div className="flex items-end gap-4 flex-wrap">
            <h2 className="font-mono font-bold text-4xl md:text-5xl text-ink-100">
              Experience &amp; <span className="gradient-text">Engagements</span>
            </h2>
            <div className="h-px flex-1 min-w-16 bg-gradient-to-r from-amber-400/30 to-transparent mb-2.5" />
          </div>
        </motion.div>

        {/* Timeline layout */}
        <div className="relative">

          {/* Vertical scroll timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-terminal-border hidden sm:block">
            <motion.div
              className="absolute top-0 left-0 w-full origin-top"
              style={{
                height: lineHeight,
                background: 'linear-gradient(180deg, #F5A623, #00D4AA, #FF2D78)',
                boxShadow: '0 0 8px rgba(245,166,35,0.4)',
              }}
            />
          </div>

          <div className="space-y-10 sm:pl-20">

            {/* ── Work Experience (LinkedIn-style Grouped Company Career Graph) ──────────────── */}
            <motion.div {...fadeUp(0.1)}>
              {/* Timeline node */}
              <div className="hidden sm:flex absolute -left-3 items-center justify-center w-6 h-6 rounded-full border-2 border-amber-400 bg-terminal-bg"
                style={{ marginTop: 4 }}>
                <Briefcase size={11} className="text-amber-400" />
              </div>

              <div className="flex items-center gap-3 mb-4 sm:hidden">
                <div className="w-7 h-7 flex items-center justify-center rounded bg-amber-400/10 text-amber-400">
                  <Briefcase size={15} />
                </div>
                <p className="font-mono text-xs text-ink-400 uppercase tracking-widest">Work Experience</p>
              </div>
              <p className="hidden sm:block font-mono text-xs text-ink-400 uppercase tracking-widest mb-4">
                Work Experience
              </p>

              {/* Grouped Company Container */}
              <div
                className="rounded-xl p-6 sm:p-8 group transition-all duration-300 relative overflow-hidden"
                style={{
                  background: 'rgba(10,10,18,0.9)',
                  border: '1px solid rgba(245,166,35,0.15)',
                  borderLeft: '4px solid #F5A623',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {/* Company Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-xl text-ink-100">{epicorExperience.company}</h3>
                      <p className="font-mono text-xs text-ink-400 mt-0.5">{epicorExperience.location}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 font-mono text-xs">
                      <Calendar size={12} />
                      <span>{epicorExperience.totalDuration}</span>
                    </div>
                    <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-neon-teal/10 text-neon-teal border border-neon-teal/20">
                      Career Progression
                    </span>
                  </div>
                </div>

                {/* LinkedIn-Style Sub-Timeline Graph connecting roles */}
                <div className="mt-8 relative pl-6 sm:pl-8 space-y-10">

                  {/* Connecting Line Graph */}
                  <div className="absolute left-[9px] sm:left-[11px] top-3 bottom-6 w-0.5 bg-gradient-to-b from-amber-400 via-neon-teal to-neon-teal/30" />

                  {epicorExperience.roles.map((r) => (
                    <div key={r.role} className="relative">
                      {/* Node Dot */}
                      <div
                        className="absolute -left-[20px] sm:-left-[26px] top-1.5 w-4 h-4 rounded-full bg-black border-2 flex items-center justify-center z-10"
                        style={{
                          borderColor: r.color,
                          boxShadow: `0 0 10px ${r.color}50`,
                        }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: r.color }} />
                      </div>

                      {/* Role Card */}
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <h4 className="font-mono font-bold text-base text-ink-100">
                              {r.role}
                            </h4>
                            <p className="font-mono text-xs text-ink-400 mt-0.5">{r.duration}</p>
                          </div>
                          <span
                            className="font-mono text-[10px] px-2.5 py-0.5 rounded-full font-semibold border"
                            style={{
                              background: `${r.color}15`,
                              color: r.color,
                              borderColor: `${r.color}30`,
                            }}
                          >
                            {r.type}
                          </span>
                        </div>

                        <p className="text-ink-300 text-sm leading-6">{r.summary}</p>

                        {r.bullets.length > 0 && (
                          <div className="space-y-2.5 my-3 pl-1">
                            {r.bullets.map((b, i) => (
                              <div key={i} className="flex items-start gap-2.5">
                                <ChevronRight size={14} className="text-amber-400/60 flex-shrink-0 mt-0.5" />
                                <p className="font-mono text-xs text-ink-300 leading-5">{b}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {r.tags.map(t => (
                            <span key={t} className="tech-pill">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Security Engagements ─────────── */}
            <motion.div {...fadeUp(0.2)}>
              <div className="hidden sm:flex absolute -left-3 items-center justify-center w-6 h-6 rounded-full border-2 border-neon-pink bg-terminal-bg"
                style={{ marginTop: 4 }}>
                <Shield size={11} className="text-neon-pink" />
              </div>

              <div className="flex items-center gap-3 mb-4 sm:hidden">
                <div className="w-7 h-7 flex items-center justify-center rounded bg-neon-pink/10 text-neon-pink">
                  <Shield size={15} />
                </div>
                <p className="font-mono text-xs text-ink-400 uppercase tracking-widest">Security Engagements</p>
              </div>
              <p className="hidden sm:block font-mono text-xs text-ink-400 uppercase tracking-widest mb-4">
                Security Engagements
              </p>

              <div className="grid md:grid-cols-2 gap-5 items-start">
                {securityEngagements.map((eng, i) => {
                  const isExpanded = expandedEng === eng.id
                  return (
                    <motion.div
                      key={eng.id}
                      {...fadeUp(0.25 + i * 0.1)}
                      onClick={() => setExpandedEng(isExpanded ? null : eng.id)}
                      className="rounded-xl p-6 flex flex-col cursor-pointer group transition-all duration-300"
                      style={{
                        background: 'rgba(10,10,18,0.9)',
                        border: `1px solid ${eng.color}20`,
                        borderLeft: `3px solid ${eng.color}60`,
                        backdropFilter: 'blur(8px)',
                        boxShadow: isExpanded ? `0 0 30px ${eng.color}10` : undefined,
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg"
                          style={{ background: `${eng.color}14`, color: eng.color }}
                        >
                          {eng.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-mono font-bold text-sm text-ink-100">{eng.title}</h3>
                          <p className="font-mono text-xs mt-0.5" style={{ color: eng.color }}>
                            {eng.subtitle}
                          </p>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          className="flex-shrink-0"
                        >
                          <ChevronRight size={14} style={{ color: eng.color }} />
                        </motion.div>
                      </div>

                      <div className="flex items-center gap-1.5 mb-3">
                        <Calendar size={11} className="text-ink-400" />
                        <span className="font-mono text-xs text-ink-400">{eng.duration}</span>
                      </div>

                      <p className="text-ink-300 text-xs leading-5 mb-3">{eng.summary}</p>

                      {/* Severity badges */}
                      {eng.severity && <SeverityBadges severity={eng.severity} />}

                      {/* Expanded highlights */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 space-y-2"
                        >
                          <div className="h-px bg-terminal-border mb-4" />
                          {eng.highlights.map((h, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <span className="font-mono text-xs flex-shrink-0 mt-px" style={{ color: eng.color }}>▸</span>
                              <p className="font-mono text-xs text-ink-300 leading-5">{h}</p>
                            </div>
                          ))}
                        </motion.div>
                      )}

                      {/* Tools */}
                      <div className="mt-4">
                        <p className="font-mono text-[10px] text-ink-500 mb-2 uppercase tracking-widest">Tools used</p>
                        <div className="flex flex-wrap gap-1.5">
                          {eng.tools.map(t => (
                            <span
                              key={t}
                              className="font-mono text-[10px] px-2 py-0.5 rounded border"
                              style={{
                                borderColor: `${eng.color}22`,
                                background:  `${eng.color}08`,
                                color: eng.color,
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {!isExpanded && (
                        <p className="font-mono text-[10px] text-ink-500 mt-3 flex items-center gap-1">
                          <TrendingUp size={10} /> Click to view full highlights
                        </p>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
