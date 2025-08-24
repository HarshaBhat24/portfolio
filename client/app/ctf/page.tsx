'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CtfIndexPage() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">CTF Categories</span>
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Browse the categories to find focused writeups. More content on the way.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { href: '/ctf/web', label: 'Web', icon: '🌐', status: 'Coming soon' },
            { href: '/ctf/crypto', label: 'Cryptography', icon: '🔐', status: 'Available' },
            { href: '/ctf/binary', label: 'Binary', icon: '🧱', status: 'Coming soon' },
            { href: '/ctf/forensics', label: 'Forensics', icon: '🕵️', status: 'Coming soon' },
            { href: '/ctf/osint', label: 'OSINT', icon: '🔎', status: 'Coming soon' },
            { href: '/ctf/general', label: 'General', icon: '📚', status: 'Coming soon' }
          ].map(item => (
            <Link key={item.href} href={item.href} className="glass-effect p-6 rounded-lg cyber-border hover:translate-y-[-2px] transition-transform">
              <div className="flex items-center gap-4">
                <span className="text-2xl" aria-hidden>{item.icon}</span>
                <div>
                  <div className="font-semibold text-lg">{item.label}</div>
                  <div className="text-gray-400 text-sm">{item.status}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
