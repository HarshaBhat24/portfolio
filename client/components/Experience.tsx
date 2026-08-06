'use client'

import { motion } from 'framer-motion'
import { Briefcase, Shield, Search, Calendar, ChevronRight } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  whileInView:{ opacity: 1, y:  0 },
  transition: { duration: 0.6, delay },
  viewport:   { once: true },
})

/* ── Data ──────────────────────────────────────── */

const workExperience = {
  role:     'Product Development Intern',
  company:  'Epicor Software',
  location: 'Bengaluru, India',
  duration: 'Oct 2025 – Present',
  type:     'Full-time Internship',
  summary:  'Worked within an enterprise software product development organisation, authoring and maintaining CI/CD pipeline-as-code definitions and automating build and test environment provisioning.',
  bullets: [
    'Authored Jenkins (Jenkinsfile) and Azure Pipelines (YAML) CI/CD definitions; led migration from Jenkins to Azure DevOps, mapping build stages, triggers, and parameters across toolchains.',
    'Developed PowerShell and Batch scripts to fully automate build and test environment provisioning - compiler setup, dependency installation, and tool configuration - eliminating manual misconfiguration risk.',
    'Performed log-based root cause analysis of pipeline and script execution failures across Linux environments, applying systematic execution tracing transferable to incident investigation workflows.',
  ],
  tags: ['Jenkins', 'Azure Pipelines', 'PowerShell', 'Bash', 'Linux', 'CI/CD', 'DevSecOps'],
}

const securityEngagements = [
  {
    id: 'vapt-saas',
    title: 'Freelance VAPT Engagement',
    subtitle: 'Enterprise SaaS Platform - Multi-tenant',
    duration: 'Jul 2026 – Aug 2026',
    icon: <Shield size={18} />,
    color: '#F5A623',
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
    id: 'bb-assessment',
    title: 'Black-Box Security Assessment',
    subtitle: 'Authorized Web Application Assessment',
    duration: 'Individual Assessment',
    icon: <Search size={18} />,
    color: '#00D4AA',
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

/* ── Component ─────────────────────────────────── */

const Experience = () => (
  <section id="experience" className="py-28 relative overflow-hidden">
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

      {/* ── Work Experience ───────────────────── */}
      <motion.div {...fadeUp(0.1)} className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-7 h-7 flex items-center justify-center rounded bg-amber-400/10 text-amber-400">
            <Briefcase size={15} />
          </div>
          <p className="font-mono text-xs text-ink-400 uppercase tracking-widest">Work Experience</p>
        </div>

        <div className="terminal-card p-7">
          {/* Title row */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
            <div>
              <h3 className="font-mono font-bold text-lg text-ink-100">{workExperience.role}</h3>
              <p className="font-mono text-sm text-amber-400 mt-0.5">{workExperience.company}</p>
              <p className="font-mono text-xs text-ink-400 mt-1">{workExperience.location}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5 justify-end">
                <Calendar size={12} className="text-ink-400" />
                <span className="font-mono text-xs text-ink-400">{workExperience.duration}</span>
              </div>
              <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-neon-teal/10 text-neon-teal border border-neon-teal/20 mt-2 inline-block">
                {workExperience.type}
              </span>
            </div>
          </div>

          <p className="text-ink-300 text-sm leading-6 mb-5">{workExperience.summary}</p>

          {/* Bullets */}
          <div className="space-y-3 mb-6">
            {workExperience.bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <ChevronRight size={14} className="text-amber-400/60 flex-shrink-0 mt-0.5" />
                <p className="font-mono text-xs text-ink-300 leading-5">{b}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {workExperience.tags.map(t => (
              <span key={t} className="tech-pill">{t}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Security Engagements ─────────────── */}
      <motion.div {...fadeUp(0.2)}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-7 h-7 flex items-center justify-center rounded bg-neon-pink/10 text-neon-pink">
            <Shield size={15} />
          </div>
          <p className="font-mono text-xs text-ink-400 uppercase tracking-widest">Security Engagements</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {securityEngagements.map((eng, i) => (
            <motion.div
              key={eng.id}
              {...fadeUp(0.25 + i * 0.1)}
              className="terminal-card p-6 flex flex-col"
              style={{ borderLeft: `2px solid ${eng.color}22` }}
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
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
              </div>

              {/* Duration badge */}
              <div className="flex items-center gap-1.5 mb-4">
                <Calendar size={11} className="text-ink-400" />
                <span className="font-mono text-xs text-ink-400">{eng.duration}</span>
              </div>

              <p className="text-ink-300 text-xs leading-5 mb-4">{eng.summary}</p>

              {/* Highlights */}
              <div className="space-y-2.5 mb-5 flex-1">
                {eng.highlights.map((h, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <span className="font-mono text-xs flex-shrink-0 mt-px" style={{ color: eng.color }}>▸</span>
                    <p className="font-mono text-xs text-ink-300 leading-5">{h}</p>
                  </div>
                ))}
              </div>

              {/* Tools */}
              <div>
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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
)

export default Experience
