'use client'

import { motion } from 'framer-motion'
import { Lock, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, ReactNode } from 'react'

/* ─────────────────────────────────────────────
   Badge - coloured category / difficulty chip
───────────────────────────────────────────── */
export function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span
      className="inline-block text-xs font-mono px-2 py-0.5 rounded border"
      style={{ color, borderColor: `${color}55`, background: `${color}11` }}
    >
      {text}
    </span>
  )
}

/* ─────────────────────────────────────────────
   Step - numbered section heading
───────────────────────────────────────────── */
export function Step({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex items-center gap-3 mt-8 mb-3">
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-500/20 border border-primary-500/40 flex items-center justify-center font-mono text-xs text-primary-400 font-bold">
        {n}
      </span>
      <span className="font-semibold text-gray-200 text-base">{label}</span>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Terminal - green-on-dark command block
───────────────────────────────────────────── */
export function Terminal({ lines }: { lines: string[] }) {
  return (
    <pre className="bg-black/40 border border-white/10 rounded-lg p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed my-3 text-green-400 whitespace-pre">
      {lines.join('\n')}
    </pre>
  )
}

/* ─────────────────────────────────────────────
   CodeBlock - syntax-highlighted inline block
   (green text, kept for inline code snippets)
───────────────────────────────────────────── */
export function CodeBlock({ children }: { children: string }) {
  return (
    <div className="bg-black/40 p-3 rounded-lg border border-white/10 mt-3 overflow-x-auto">
      <pre className="text-xs sm:text-sm text-green-400 whitespace-pre-wrap break-words">
        {children}
      </pre>
    </div>
  )
}

/* ─────────────────────────────────────────────
   ZoomImage - click-to-expand image button
───────────────────────────────────────────── */
export function ZoomImage({
  src,
  alt,
  caption,
  onOpen,
}: {
  src: string
  alt: string
  caption?: string
  onOpen: (img: { src: string; alt: string }) => void
}) {
  return (
    <div className="my-3">
      <button
        type="button"
        onClick={() => onOpen({ src, alt })}
        className="block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in w-full"
        aria-label={`Expand: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={1400}
          height={900}
          className="w-full h-auto max-w-full object-contain"
        />
      </button>
      {caption && (
        <div className="text-gray-400 text-xs mt-1">{caption}</div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   ImageModal - fullscreen lightbox overlay
───────────────────────────────────────────── */
export function ImageModal({
  img,
  onClose,
}: {
  img: { src: string; alt: string } | null
  onClose: () => void
}) {
  if (!img) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Expanded image preview"
    >
      <div
        className="relative max-w-5xl w-full my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 md:-top-4 md:-right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white z-10"
          aria-label="Close preview"
        >
          <X className="h-5 w-5" />
        </button>
        <Image
          src={img.src}
          alt={img.alt}
          width={1600}
          height={1000}
          className="w-full h-auto rounded-lg border border-white/10 shadow-2xl max-h-[90vh] object-contain"
        />
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   MindsetQuote - hacker / category closing callout
───────────────────────────────────────────── */
export function MindsetQuote({
  label,
  quote,
  accentColor = 'primary',
}: {
  label: string
  quote: string
  accentColor?: 'primary' | 'red' | 'amber'
}) {
  const borderMap = {
    primary: 'border-primary-500',
    red: 'border-red-500',
    amber: 'border-amber-400',
  }
  const bgMap = {
    primary: 'from-primary-500/5 via-purple-500/5',
    red: 'from-red-500/5 via-orange-500/5',
    amber: 'from-amber-400/5 via-yellow-500/5',
  }
  const labelMap = {
    primary: 'text-primary-400',
    red: 'text-red-400',
    amber: 'text-amber-400',
  }
  const quoteMap = {
    primary: 'text-primary-300',
    red: 'text-red-300',
    amber: 'text-amber-300',
  }

  return (
    <div
      className={`mt-8 p-6 rounded-lg border-l-4 ${borderMap[accentColor]} bg-gradient-to-r ${bgMap[accentColor]} to-transparent not-prose`}
    >
      <div className="flex items-start gap-3">
        <div>
          <p className={`text-sm font-medium ${labelMap[accentColor]} mb-1`}>{label}</p>
          <p className="text-base text-gray-300 leading-relaxed">
            <span className={`italic ${quoteMap[accentColor]}`}>&quot;{quote}&quot;</span>
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   FlagReveal - masked flag with show/hide toggle
───────────────────────────────────────────── */
export function FlagReveal({ flag, label = 'Flag' }: { flag: string; label?: string }) {
  const [show, setShow] = useState(false)
  const mask = '*'.repeat(Math.max(flag.length, 20))
  return (
    <div className="not-prose">
      <h3 className="font-bold text-gray-100 text-lg mb-3">{label}</h3>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <span className="break-all font-mono text-sm bg-black/40 px-3 py-1.5 rounded border border-white/10">
          {show ? flag : mask}
        </span>
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded border border-white/10 bg-white/5 hover:bg-white/10 text-primary-300 hover:text-primary-200 self-start"
          aria-pressed={show}
          aria-label={show ? 'Hide flag' : 'Show flag'}
        >
          {show ? 'Hide flag' : 'Show flag'}
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   WriteupShell - full page layout wrapper
   Props:
     title        - challenge name
     category     - e.g. "Forensics"
     categoryHref - e.g. "/ctf/forensics"
     difficulty   - e.g. "Medium"
     source       - e.g. "picoCTF" | "TryHackMe"
     icon         - optional lucide icon element (defaults to Lock)
     children     - the body content
───────────────────────────────────────────── */

type CrumbSegment = { label: string; href: string }

// Map source strings to badge colors
const sourceColor: Record<string, string> = {
  picoctf: '#FF2D78',
  picoCTF: '#FF2D78',
  tryhackme: '#00D4AA',
  TryHackMe: '#00D4AA',
}
// Map difficulty to badge colors
const diffColor: Record<string, string> = {
  Easy: '#A8FF3E',
  Medium: '#F5A623',
  Hard: '#FF2D78',
}
// Map category to badge color
const catColor: Record<string, string> = {
  Forensics: '#A8FF3E',
  Cryptography: '#FF2D78',
  'Web Exploitation': '#00D4AA',
  General: '#F5A623',
  'Binary Exploitation': '#F5A623',
  OSINT: '#A8FF3E',
}

export interface WriteupShellProps {
  title: string
  category: string
  categoryHref: string
  difficulty: string
  source: string
  icon?: ReactNode
  children: ReactNode
}

export function WriteupShell({
  title,
  category,
  categoryHref,
  difficulty,
  source,
  icon,
  children,
}: WriteupShellProps) {
  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null)

  // Provide openImage handler via context-like prop drilling through a render function
  // We expose it as a prop of children via React.cloneElement pattern - simpler: pass it via context
  // Instead, we re-export it as a hook (below). Children use useImageModal().

  const crumbs: CrumbSegment[] = [
    { label: 'Home', href: '/' },
    { label: 'CTF', href: '/ctf' },
    { label: category, href: categoryHref },
  ]

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-400 mb-4 overflow-x-auto">
            {crumbs.map((c, i) => (
              <span key={c.href}>
                <Link href={c.href} className="hover:text-white">
                  {c.label}
                </Link>
                <span className="mx-2">/</span>
              </span>
            ))}
            <span className="text-white">{title}</span>
          </nav>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            <span className="gradient-text">{title}</span>
          </h1>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge
              text={category}
              color={catColor[category] ?? '#A8FF3E'}
            />
            <Badge
              text={difficulty}
              color={diffColor[difficulty] ?? '#F5A623'}
            />
            <Badge
              text={source}
              color={sourceColor[source] ?? '#00D4AA'}
            />
          </div>
        </motion.div>

        {/* Card */}
        <div className="glass-effect p-4 sm:p-6 md:p-8 rounded-lg cyber-border relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            {icon ?? <Lock className="h-6 w-6 text-primary-500" />}
            <div className="text-gray-300">Writeup</div>
          </div>

          <div className="prose prose-invert max-w-none relative z-20 pointer-events-auto select-text">
            {/* Inject openImage handler via render props pattern */}
            {typeof children === 'function'
              ? (children as (o: typeof setOpenImage) => ReactNode)(setOpenImage)
              : children}
          </div>
        </div>

        {/* Lightbox */}
        <ImageModal img={openImage} onClose={() => setOpenImage(null)} />
      </div>
    </section>
  )
}
