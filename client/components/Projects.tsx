'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, Trophy } from 'lucide-react'

interface Project {
  num: string
  title: string
  tagline: string
  description: string
  technologies: string[]
  github: string
  demo: string | null
  badge?: string
}

const projects: Project[] = [
  {
    num: '01',
    title: 'VigiLynx',
    tagline: 'Phishing & Malware Detector',
    description:
      'Real-time cybersecurity tool with a threat dashboard and Chrome extension for detecting malicious URLs and files. Analyses indicators of compromise and blocks phishing attempts at the browser layer.',
    technologies: ['Threat Detection', 'Chrome Extension', 'Supabase', 'React.js', 'Node.js'],
    github: 'https://github.com/HarshaBhat24/Vigilynx-Web',
    demo: 'https://vigilynx-web.vercel.app/',
    badge: '🏆 HackAthena\'25 - Track Champion',
  },
  {
    num: '02',
    title: 'CipherCrack',
    tagline: 'CTF Cryptographic Toolkit',
    description:
      'Offline CLI toolkit for automating encryption, decryption, and analysis of common CTF ciphers. Built for speed during competitions - supports Caesar, Vigenère, XOR, Base64, and custom ciphers.',
    technologies: ['Python', 'Cryptanalysis', 'Argparse', 'CLI', 'CTF'],
    github: 'https://github.com/HarshaBhat24/CipherCrack',
    demo: null,
  },
  {
    num: '03',
    title: 'BodyBuddy',
    tagline: 'Computer Vision Posture Analyser',
    description:
      'CV-based tool that tracks joint angles and body keypoints in real time to detect improper posture during workouts. Demonstrates applied computer vision and spatial pattern recognition.',
    technologies: ['Python', 'OpenCV', 'MediaPipe', 'Computer Vision', 'CLI'],
    github: 'https://github.com/HarshaBhat24/BodyBuddy',
    demo: null,
  },
]

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  whileInView:{ opacity: 1, y:  0 },
  transition: { duration: 0.6, delay },
  viewport:   { once: true },
})

const Projects = () => (
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
          <motion.article
            key={project.num}
            {...fadeUp(0.08 + i * 0.1)}
            className="amber-left-card p-6 group hover:border-amber-400/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,166,35,0.06)] flex flex-col"
          >
            {/* Number + badge */}
            <div className="flex items-start justify-between mb-3 gap-2">
              <span className="font-mono text-4xl font-bold text-amber-400/10 select-none leading-none group-hover:text-amber-400/18 transition-colors">
                {project.num}
              </span>
              {project.badge && (
                <span className="flex items-center gap-1 font-mono text-[10px] px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 text-right leading-tight">
                  {project.badge}
                </span>
              )}
            </div>

            {/* Title + tagline */}
            <h3 className="font-mono font-bold text-xl text-ink-100 mb-1">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-amber-400/60 mb-4">{project.tagline}</p>

            {/* Description */}
            <p className="text-ink-300 text-sm leading-6 mb-5 flex-1">
              {project.description}
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.technologies.map(t => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-3 border-t border-terminal-border pt-4">
              <a
                id={`project-github-${project.num}`}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost py-2 px-4 text-xs"
              >
                <Github size={13} />
                Source
              </a>
              {project.demo && (
                <a
                  id={`project-demo-${project.num}`}
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary py-2 px-4 text-xs"
                >
                  <ExternalLink size={13} />
                  Live Demo
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      {/* GitHub CTA */}
      <motion.div {...fadeUp(0.5)} className="mt-10 text-center">
        <a
          href="https://github.com/HarshaBhat24"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost inline-flex"
          id="projects-github-all"
        >
          <Github size={15} />
          More on GitHub
        </a>
      </motion.div>
    </div>
  </section>
)

export default Projects
