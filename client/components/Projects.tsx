'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Github, ExternalLink, Trophy, Layers } from 'lucide-react'
import { useRef } from 'react'

interface Project {
  num:          string
  title:        string
  tagline:      string
  description:  string
  technologies: string[]
  github:       string
  demo:         string | null
  badge?:       string
  color?:       string
  year?:        string
}

const projects: Project[] = [
  {
    num:          '01',
    title:        'VigiLynx',
    tagline:      'Phishing & Malware Detector',
    description:
      'Real-time cybersecurity tool with a threat dashboard and Chrome extension for detecting malicious URLs and files. Analyses indicators of compromise and blocks phishing attempts at the browser layer.',
    technologies: ['Threat Detection', 'Chrome Extension', 'Supabase', 'React.js', 'Node.js'],
    github:       'https://github.com/HarshaBhat24/Vigilynx-Web',
    demo:         'https://vigilynx-web.vercel.app/',
    badge:        "🏆 HackAthena'25 — Track Champion",
    color:        '#F5A623',
    year:         '2025',
  },
  {
    num:          '02',
    title:        'CipherCrack',
    tagline:      'CTF Cryptographic Toolkit',
    description:
      'Offline CLI toolkit for automating encryption, decryption, and analysis of common CTF ciphers. Built for speed during competitions — supports Caesar, Vigenère, XOR, Base64, and custom ciphers.',
    technologies: ['Python', 'Cryptanalysis', 'Argparse', 'CLI', 'CTF'],
    github:       'https://github.com/HarshaBhat24/CipherCrack',
    demo:         null,
    color:        '#00D4AA',
    year:         '2024',
  },
  {
    num:          '03',
    title:        'BodyBuddy',
    tagline:      'Computer Vision Posture Analyser',
    description:
      'CV-based tool that tracks joint angles and body keypoints in real time to detect improper posture during workouts. Demonstrates applied computer vision and spatial pattern recognition.',
    technologies: ['Python', 'OpenCV', 'MediaPipe', 'Computer Vision', 'CLI'],
    github:       'https://github.com/HarshaBhat24/BodyBuddy',
    demo:         null,
    color:        '#FF2D78',
    year:         '2024',
  },
]

function TiltCard({ children, color }: { children: React.ReactNode; color: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotX = useTransform(y, [-0.5, 0.5], [8, -8])
  const rotY = useTransform(x, [-0.5, 0.5], [-8, 8])
  const springX = useSpring(rotX, { stiffness: 300, damping: 30 })
  const springY = useSpring(rotY, { stiffness: 300, damping: 30 })
  const glowX = useTransform(x, [-0.5, 0.5], ['0%', '100%'])
  const glowY = useTransform(y, [-0.5, 0.5], ['0%', '100%'])

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top)  / rect.height - 0.5)
  }
  const onMouseLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      className="relative"
    >
      {/* Moving highlight */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, ${color}15 0%, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  )
}

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition:  { duration: 0.6, delay },
  viewport:    { once: true },
})

export default function Projects() {
  return (
    <section id="projects" className="py-28 relative">
      <div
        className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div {...fadeUp()} className="mb-16">
          <p className="section-label mb-3">
            <span className="text-amber-400">05</span>&nbsp;/&nbsp;projects
          </p>
          <div className="flex items-end gap-4 flex-wrap">
            <h2 className="font-mono font-bold text-4xl md:text-5xl text-ink-100">
              Security <span className="gradient-text">Projects</span>
            </h2>
            <div className="h-px flex-1 min-w-16 bg-gradient-to-r from-amber-400/30 to-transparent mb-2.5" />
          </div>
          <p className="text-ink-300 text-sm mt-4 max-w-lg">
            Tools and research built at the intersection of offensive security and practical problem-solving.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.num}
              {...fadeUp(0.08 + i * 0.1)}
              className="group"
              style={{ perspective: 800 }}
            >
              <TiltCard color={project.color || '#F5A623'}>
                <article
                  className="relative overflow-hidden rounded-xl p-6 flex flex-col h-full transition-all duration-300"
                  style={{
                    background: 'rgba(10,10,18,0.95)',
                    border: `1px solid ${project.color || '#F5A623'}22`,
                    borderLeft: `3px solid ${project.color || '#F5A623'}`,
                    boxShadow: `0 4px 24px rgba(0,0,0,0.3)`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px ${project.color || '#F5A623'}15, 0 4px 24px rgba(0,0,0,0.4)`
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 24px rgba(0,0,0,0.3)`
                  }}
                >
                  {/* Scanlines overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.02] rounded-xl"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,1) 3px, rgba(255,255,255,1) 4px)',
                    }}
                  />

                  {/* Champion banner */}
                  {project.badge && (
                    <div
                      className="relative flex items-center gap-2 -mx-6 -mt-6 mb-5 px-6 py-2.5 overflow-hidden"
                      style={{
                        background: `linear-gradient(90deg, ${project.color}20 0%, ${project.color}08 60%, transparent 100%)`,
                        borderBottom: `1px solid ${project.color}22`,
                      }}
                    >
                      <div className="absolute left-0 top-0 h-full w-0.5" style={{ background: project.color }} />
                      <Trophy size={12} style={{ color: project.color }} className="flex-shrink-0 z-10" />
                      <span className="font-mono text-[10px] font-semibold z-10" style={{ color: project.color }}>
                        {project.badge}
                      </span>
                    </div>
                  )}

                  {/* Number + year */}
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-mono text-5xl font-bold leading-none select-none"
                      style={{ color: `${project.color}15`, transition: 'color 0.3s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = `${project.color}28` }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = `${project.color}15` }}
                    >
                      {project.num}
                    </span>
                    {project.year && (
                      <span className="font-mono text-[10px] text-ink-500 px-2 py-0.5 rounded border border-terminal-border">
                        {project.year}
                      </span>
                    )}
                  </div>

                  {/* Title + tagline */}
                  <h3 className="font-mono font-bold text-xl text-ink-100 mb-1">{project.title}</h3>
                  <p className="font-mono text-xs mb-4" style={{ color: `${project.color}90` }}>{project.tagline}</p>

                  {/* Description */}
                  <p className="text-ink-300 text-sm leading-6 mb-5 flex-1">{project.description}</p>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.map(t => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2 py-0.5 rounded border transition-all duration-200"
                        style={{
                          borderColor: `${project.color}25`,
                          background:  `${project.color}08`,
                          color:        project.color,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 border-t pt-4"
                    style={{ borderColor: `${project.color}18` }}>
                    <a
                      id={`project-github-${project.num}`}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-xs text-ink-400 hover:text-ink-100 transition-colors"
                    >
                      <Github size={13} /> Source
                    </a>
                    {project.demo && (
                      <a
                        id={`project-demo-${project.num}`}
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded border transition-all duration-200"
                        style={{
                          borderColor: `${project.color}40`,
                          color:        project.color,
                          background:  `${project.color}08`,
                        }}
                        onMouseEnter={e => {
                          const el = e.currentTarget as HTMLAnchorElement
                          el.style.background  = `${project.color}16`
                          el.style.boxShadow   = `0 0 16px ${project.color}30`
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget as HTMLAnchorElement
                          el.style.background  = `${project.color}08`
                          el.style.boxShadow   = 'none'
                        }}
                      >
                        <ExternalLink size={11} /> Live Demo
                      </a>
                    )}
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div {...fadeUp(0.5)} className="mt-12 text-center">
          <a
            href="https://github.com/HarshaBhat24"
            target="_blank"
            rel="noopener noreferrer"
            id="projects-github-all"
            className="inline-flex items-center gap-2 font-mono text-sm px-6 py-3 rounded-lg border border-terminal-border text-ink-300 hover:text-amber-400 hover:border-amber-400/30 transition-all duration-200 hover:shadow-[0_0_20px_rgba(245,166,35,0.1)]"
          >
            <Layers size={15} />
            View all projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
