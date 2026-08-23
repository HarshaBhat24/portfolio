'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Award, CheckCircle, ExternalLink, Shield, RotateCcw } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition:  { duration: 0.55, delay },
  viewport:    { once: true },
})

const certs = [
  {
    id:          'security-plus',
    name:        'CompTIA Security+',
    issuer:      'CompTIA',
    code:        'SY0-701',
    color:       '#F5A623',
    badge:       'SY0-701',
    year:        '2024',
    verifyUrl:   'https://www.credly.com/badges/534cb686-5237-4888-acaa-b4d44ae2b380/public_url',
    description:
      'Industry-standard certification validating baseline cybersecurity skills — covering threats, attacks, vulnerabilities, architecture, implementation, and operations & incident response.',
    domains: [
      'Threats & Vulnerabilities',
      'Architecture & Design',
      'Implementation',
      'Operations & Incident Response',
      'Governance, Risk & Compliance',
    ],
    backFact: 'Globally recognised baseline security cert. Covers 5 core domains with a heavy emphasis on practical threat identification and secure architecture.',
  },
  {
    id:          'isc2-cc',
    name:        'ISC2 Certified in Cybersecurity',
    issuer:      'ISC²',
    code:        'CC',
    color:       '#00D4AA',
    badge:       'CC',
    year:        '2024',
    verifyUrl:   'https://www.credly.com/badges/55776700-2542-4fd2-87ea-34204e021b0b/public_url',
    description:
      'Foundation certification from ISC² covering security principles, network security, access controls, and security operations — establishing a solid baseline for a cybersecurity career.',
    domains: [
      'Security Principles',
      'Business Continuity & DR',
      'Access Controls',
      'Network Security',
      'Security Operations',
    ],
    backFact: 'ISC²\'s entry-level cert designed to validate foundational knowledge in cybersecurity. Fully free to pursue — ISC² waived the exam fee.',
  },
]

function CertCard({ cert }: { cert: typeof certs[0] }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="group"
      style={{ perspective: '1000px', height: 340 }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d', height: '100%', position: 'relative', cursor: 'pointer' }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-xl p-7 flex flex-col transition-shadow duration-300"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'rgba(10,10,18,0.95)',
            border: `1px solid ${cert.color}22`,
            borderTop: `2px solid ${cert.color}`,
            backdropFilter: 'blur(12px)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${cert.color}12, 0 8px 32px rgba(0,0,0,0.4)`
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none'
          }}
        >
          {/* Top row */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-center gap-4">
              {/* Badge */}
              <div
                className="w-14 h-14 flex-shrink-0 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-xs border"
                style={{
                  background: `${cert.color}10`,
                  borderColor: `${cert.color}30`,
                  color: cert.color,
                  boxShadow: `0 0 24px ${cert.color}15`,
                }}
              >
                <Award size={20} />
                <span className="text-[9px] mt-1 opacity-70">{cert.badge}</span>
              </div>

              <div>
                <h3 className="font-mono font-bold text-base text-ink-100 leading-tight">{cert.name}</h3>
                <p className="font-mono text-xs mt-1" style={{ color: cert.color }}>{cert.issuer}</p>
                <p className="font-mono text-[10px] text-ink-500 mt-0.5">{cert.year}</p>
              </div>
            </div>

            {/* Verified */}
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-1.5">
                <CheckCircle size={13} style={{ color: cert.color }} />
                <span className="font-mono text-xs text-ink-400">Verified</span>
              </div>
              <div className="flex items-center gap-1 text-ink-500 font-mono text-[10px]">
                <RotateCcw size={9} />
                <span>Flip card</span>
              </div>
            </div>
          </div>

          <p className="text-ink-300 text-sm leading-6 mb-5 flex-1">{cert.description}</p>

          {/* Domains */}
          <div>
            <p className="font-mono text-[10px] text-ink-500 mb-2.5 uppercase tracking-widest">Domains covered</p>
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
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-xl p-7 flex flex-col items-center justify-center text-center gap-6"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, ${cert.color}12 0%, rgba(10,10,18,0.98) 60%)`,
            border: `1px solid ${cert.color}30`,
            backdropFilter: 'blur(12px)',
          }}
        >
          <div
            className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center"
            style={{
              background: `${cert.color}15`,
              border: `2px solid ${cert.color}40`,
              boxShadow: `0 0 40px ${cert.color}25`,
            }}
          >
            <Shield size={28} style={{ color: cert.color }} />
          </div>

          <div>
            <p className="font-mono font-bold text-lg text-ink-100 mb-2">{cert.name}</p>
            <p className="font-mono text-xs text-ink-300 max-w-xs leading-5">{cert.backFact}</p>
          </div>

          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`cert-verify-${cert.id}`}
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs border transition-all duration-300 hover:scale-105"
            style={{
              borderColor: `${cert.color}40`,
              background:  `${cert.color}10`,
              color: cert.color,
              boxShadow: `0 0 20px ${cert.color}15`,
            }}
          >
            <CheckCircle size={12} />
            Verify on Credly
            <ExternalLink size={10} style={{ opacity: 0.7 }} />
          </a>

          <p className="font-mono text-[10px] text-ink-500">Click card to flip back</p>
        </div>
      </motion.div>
    </div>
  )
}

export default function Certifications() {
  return (
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
          <p className="text-ink-300 text-sm mt-3 text-ink-400 font-mono">
            Click a card to flip it and see verification link
          </p>
        </motion.div>

        {/* Cert cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {certs.map((cert, i) => (
            <motion.div key={cert.id} {...fadeUp(0.1 + i * 0.12)}>
              <CertCard cert={cert} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
