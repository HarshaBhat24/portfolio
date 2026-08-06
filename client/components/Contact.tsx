'use client'

import { motion } from 'framer-motion'
import {
  Mail, Github, Linkedin,
  Send, CheckCircle, AlertCircle, Loader2,
} from 'lucide-react'
import { useState } from 'react'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 18 },
  whileInView:{ opacity: 1, y:  0 },
  transition: { duration: 0.55, delay },
  viewport:   { once: true },
})

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null, message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: null, message: '' })

    try {
      const apiUrl =
        typeof window !== 'undefined' && window.location.hostname === 'localhost'
          ? 'http://localhost:5000/api/contact'
          : '/api/contact'

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({ type: 'success', message: data.message || "Message sent! I'll get back to you soon." })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to send. Please try again.' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error. Please check your connection.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactLinks = [
    {
      id: 'contact-email',
      href: 'mailto:harshabhat666@gmail.com',
      icon: <Mail size={18} />,
      label: 'Email',
      value: 'harshabhat666@gmail.com',
      color: '#F5A623',
    },
    {
      id: 'contact-github',
      href: 'https://github.com/HarshaBhat24',
      icon: <Github size={18} />,
      label: 'GitHub',
      value: '@HarshaBhat24',
      color: '#00D4AA',
      external: true,
    },
    {
      id: 'contact-linkedin',
      href: 'https://linkedin.com/in/s-harsha-bhat/',
      icon: <Linkedin size={18} />,
      label: 'LinkedIn',
      value: 'S Harsha Bhat',
      color: '#FF2D78',
      external: true,
    },
  ]

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      {/* bg accents */}
      <div
        className="absolute top-0 left-0 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.04) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,45,120,0.03) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div {...fadeUp()} className="mb-16">
          <p className="section-label mb-3">
            <span className="text-amber-400">08</span>&nbsp;/&nbsp;contact
          </p>
          <div className="flex items-end gap-4 flex-wrap">
            <h2 className="font-mono font-bold text-4xl md:text-5xl text-ink-100">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <div className="h-px flex-1 min-w-16 bg-gradient-to-r from-amber-400/30 to-transparent mb-2.5" />
          </div>
          <p className="text-ink-300 text-sm mt-4 max-w-md">
            Have a project idea, want to collaborate, or just want to chat about security and tech? I&apos;m all ears.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">

          {/* Left: Contact links */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-2 flex flex-col gap-4">
            {contactLinks.map(link => (
              <a
                key={link.id}
                id={link.id}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="terminal-card p-5 flex items-center gap-4 group hover:border-terminal-border-hi transition-all duration-300"
              >
                <div
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg transition-all duration-200 group-hover:scale-110"
                  style={{ background: `${link.color}14`, color: link.color }}
                >
                  {link.icon}
                </div>
                <div>
                  <p className="font-mono text-xs text-ink-400 mb-0.5">{link.label}</p>
                  <p className="font-mono text-sm text-ink-100 group-hover:text-amber-300 transition-colors">
                    {link.value}
                  </p>
                </div>
                <div
                  className="ml-auto w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: link.color, boxShadow: `0 0 8px ${link.color}` }}
                />
              </a>
            ))}

            {/* Availability badge */}
            <div className="terminal-card p-5 mt-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-neon-teal animate-pulse" />
                <span className="font-mono text-xs text-neon-teal">Available</span>
              </div>
              <p className="font-mono text-xs text-ink-400">
                Open to internships, freelance security work, and interesting collaborations.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div {...fadeUp(0.2)} className="lg:col-span-3">
            <div className="terminal-card p-6">
              {/* Terminal titlebar */}
              <div className="flex items-center gap-1.5 mb-6 pb-5 border-b border-terminal-border">
                <span className="w-2.5 h-2.5 rounded-full bg-neon-pink/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-neon-teal/60" />
                <span className="ml-2 font-mono text-xs text-ink-400">send-message.sh</span>
              </div>

              {/* Status banner */}
              {status.type && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2.5 p-3 rounded-md mb-5 font-mono text-xs border ${
                    status.type === 'success'
                      ? 'bg-neon-teal/8 border-neon-teal/20 text-neon-teal'
                      : 'bg-neon-pink/8 border-neon-pink/20 text-neon-pink'
                  }`}
                >
                  {status.type === 'success'
                    ? <CheckCircle size={14} />
                    : <AlertCircle size={14} />}
                  {status.message}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block font-mono text-xs text-amber-400/70 mb-2">
                    <span className="text-amber-400/40">$</span> name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="Your name"
                    autoComplete="name"
                    className="terminal-input"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block font-mono text-xs text-amber-400/70 mb-2">
                    <span className="text-amber-400/40">$</span> email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="terminal-input"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block font-mono text-xs text-amber-400/70 mb-2">
                    <span className="text-amber-400/40">$</span> message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    rows={5}
                    placeholder="What's on your mind?"
                    className="terminal-input resize-none"
                  />
                </div>

                <button
                  id="contact-submit"
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div {...fadeUp(0.4)} className="mt-16 pt-8 border-t border-terminal-border text-center">
          <p className="font-mono text-xs text-ink-500">
            Designed &amp; built by{' '}
            <span className="text-amber-400">S Harsha Bhat</span>
            {' '}·{' '}
            <a
              href="https://github.com/HarshaBhat24/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-400 hover:text-amber-400 transition-colors"
            >
              view source
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
