'use client'

import { motion } from 'framer-motion'
import {
  Mail, Github, Linkedin,
  ExternalLink, Copy, Check, Terminal, ArrowUpRight,
} from 'lucide-react'
import { useState } from 'react'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y:  0 },
  transition:  { duration: 0.55, delay },
  viewport:    { once: true },
})

const Contact = () => {
  const [copied, setCopied] = useState(false)
  const emailAddress = 'harshabhat666@gmail.com'

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // Fallback if clipboard API is blocked
      const textArea = document.createElement('textarea')
      textArea.value = emailAddress
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }

  const contactLinks = [
    {
      id: 'contact-email',
      href: `mailto:${emailAddress}`,
      icon: <Mail size={18} />,
      label: 'Email',
      value: emailAddress,
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
      {/* Background accents */}
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
            Have a project idea, want to collaborate on security research, or discuss opportunities? Feel free to reach out directly.
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
              <p className="font-mono text-xs text-ink-400 leading-relaxed">
                Open to internships, freelance security work, and interesting offensive &amp; defensive collaborations.
              </p>
            </div>
          </motion.div>

          {/* Right: Terminal Communication Card */}
          <motion.div {...fadeUp(0.2)} className="lg:col-span-3">
            <div className="terminal-card p-6 flex flex-col justify-between h-full">
              <div>
                {/* Terminal titlebar */}
                <div className="flex items-center gap-1.5 mb-6 pb-4 border-b border-terminal-border">
                  <span className="w-2.5 h-2.5 rounded-full bg-neon-pink/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neon-teal/60" />
                  <span className="ml-2 font-mono text-xs text-ink-400">~/contact/connect.sh</span>
                  <Terminal size={12} className="ml-auto text-ink-500" />
                </div>

                {/* Shell session */}
                <div className="font-mono text-xs space-y-4 mb-8">
                  <div>
                    <p className="text-amber-400/70 mb-1">
                      <span className="text-amber-400">❯</span> cat status.txt
                    </p>
                    <p className="text-ink-200 pl-4 border-l border-terminal-border/80">
                      Product Developer, Assoc at Epicor Software. Conducting offensive security research, VAPT engagements, and competing in CTFs.
                    </p>
                  </div>

                  <div>
                    <p className="text-amber-400/70 mb-1">
                      <span className="text-amber-400">❯</span> cat details.txt
                    </p>
                    <div className="text-ink-300 pl-4 border-l border-terminal-border/80 space-y-1">
                      <p>• <span className="text-ink-400">Email:</span> <span className="text-amber-300">{emailAddress}</span></p>
                      <p>• <span className="text-ink-400">Location:</span> Bengaluru, India (IST / UTC+5:30)</p>
                      <p>• <span className="text-ink-400">Response time:</span> Typically within 24 hours</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-amber-400/70 mb-1">
                      <span className="text-amber-400">❯</span> echo $PREFERRED_CHANNELS
                    </p>
                    <p className="text-neon-teal pl-4 border-l border-terminal-border/80">
                      Direct Email &amp; LinkedIn messages
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-6 border-t border-terminal-border">
                <p className="font-mono text-[11px] text-ink-400 uppercase tracking-widest mb-3">
                  Quick Actions
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    id="contact-send-email-btn"
                    href={`mailto:${emailAddress}?subject=Reaching%20out%20via%20portfolio`}
                    className="btn-primary flex-1 justify-center sm:flex-initial"
                  >
                    <Mail size={15} />
                    Send Direct Email
                  </a>

                  <button
                    id="contact-copy-email-btn"
                    type="button"
                    onClick={handleCopyEmail}
                    className="btn-ghost flex-1 justify-center sm:flex-initial"
                  >
                    {copied ? (
                      <>
                        <Check size={15} className="text-neon-teal" />
                        <span className="text-neon-teal">Email Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={15} />
                        Copy Email
                      </>
                    )}
                  </button>

                  <a
                    id="contact-linkedin-btn"
                    href="https://linkedin.com/in/s-harsha-bhat/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost flex-1 justify-center sm:flex-initial"
                  >
                    <Linkedin size={15} />
                    LinkedIn
                    <ArrowUpRight size={13} className="text-ink-500" />
                  </a>
                </div>
              </div>
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
              className="text-ink-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1"
            >
              view source <ExternalLink size={10} />
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
