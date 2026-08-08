'use client'

import { motion } from 'framer-motion'
import { Award, CheckCircle, ExternalLink } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 18 },
  whileInView:{ opacity: 1, y:  0 },
  transition: { duration: 0.55, delay },
  viewport:   { once: true },
})

const certs = [
  {
    id: 'security-plus',
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    code: 'SY0-701',
    color: '#F5A623',
    badge: 'SY0-701',
    verifyUrl: 'https://www.credly.com/badges/534cb686-5237-4888-acaa-b4d44ae2b380/public_url',
    description:
      'Industry-standard certification validating baseline cybersecurity skills - covering threats, attacks, vulnerabilities, architecture, implementation, and operations & incident response.',
    domains: [
      'Threats & Vulnerabilities',
      'Architecture & Design',
      'Implementation',
      'Operations & Incident Response',
      'Governance, Risk & Compliance',
    ],
  },
  {
    id: 'isc2-cc',
    name: 'ISC2 Certified in Cybersecurity',
    issuer: 'ISC²',
    code: 'CC',
    color: '#00D4AA',
    badge: 'CC',
    verifyUrl: 'https://www.credly.com/badges/55776700-2542-4fd2-87ea-34204e021b0b/public_url',
    description:
      'Foundation certification from ISC² covering security principles, network security, access controls, and security operations - establishing a solid baseline for a cybersecurity career.',
    domains: [
      'Security Principles',
      'Business Continuity & DR',
      'Access Controls',
      'Network Security',
      'Security Operations',
    ],
  },
]

const Certifications = () => (
  <section id="certifications" className="py-20 relative overflow-hidden">
    <div
      className="absolute bottom-0 left-0 w-72 h-72 pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.03) 0%, transparent 70%)' }}
    />

    <div className="max-w-6xl mx-auto px-6 lg:px-8">

      {/* Header */}
      <motion.div {...fadeUp()} className="mb-12">
        <p className="section-label mb-3">
          <span className="text-amber-400">03</span>&nbsp;/&nbsp;certifications
        </p>
        <div className="flex items-end gap-4 flex-wrap">
          <h2 className="font-mono font-bold text-4xl md:text-5xl text-ink-100">
            Industry <span className="gradient-text">Certifications</span>
          </h2>
          <div className="h-px flex-1 min-w-16 bg-gradient-to-r from-amber-400/30 to-transparent mb-2.5" />
        </div>
      </motion.div>

      {/* Cert cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {certs.map((cert, i) => (
          <motion.div
            key={cert.id}
            {...fadeUp(0.1 + i * 0.12)}
            className="terminal-card p-7 group hover:border-terminal-border-hi transition-all duration-300"
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-4">
                {/* Badge circle */}
                <div
                  className="w-14 h-14 flex-shrink-0 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-xs border"
                  style={{
                    background: `${cert.color}10`,
                    borderColor: `${cert.color}30`,
                    color: cert.color,
                  }}
                >
                  <Award size={20} />
                  <span className="text-[9px] mt-1 opacity-70">{cert.badge}</span>
                </div>

                <div>
                  <h3 className="font-mono font-bold text-base text-ink-100 leading-tight">
                    {cert.name}
                  </h3>
                  <p className="font-mono text-xs mt-1" style={{ color: cert.color }}>
                    {cert.issuer}
                  </p>
                </div>
              </div>

              {/* Verified badge */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <CheckCircle size={14} style={{ color: cert.color }} />
                <span className="font-mono text-xs text-ink-400">Certified</span>
              </div>
            </div>

            <p className="text-ink-300 text-sm leading-6 mb-5">{cert.description}</p>

            {/* Domain coverage */}
            <div>
              <p className="font-mono text-[10px] text-ink-500 mb-2.5 uppercase tracking-widest">
                Domains covered
              </p>
              <div className="flex flex-wrap gap-1.5">
                {cert.domains.map(d => (
                  <span
                    key={d}
                    className="font-mono text-[10px] px-2.5 py-1 rounded-full border"
                    style={{
                      borderColor: `${cert.color}25`,
                      background:  `${cert.color}08`,
                      color: cert.color,
                    }}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Credly verification link */}
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`cert-verify-${cert.id}`}
                className="group/verify mt-5 flex items-center justify-center gap-2 py-2.5 rounded-lg font-mono text-xs border transition-all duration-300"
                style={{
                  borderColor: `${cert.color}30`,
                  background: `${cert.color}06`,
                  color: cert.color,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 18px ${cert.color}22`
                  ;(e.currentTarget as HTMLAnchorElement).style.background = `${cert.color}12`
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'
                  ;(e.currentTarget as HTMLAnchorElement).style.background = `${cert.color}06`
                }}
              >
                <CheckCircle size={12} />
                <span>Verify on Credly</span>
                <ExternalLink size={10} style={{ opacity: 0.6, transition: 'opacity 0.2s, transform 0.2s' }} />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default Certifications
