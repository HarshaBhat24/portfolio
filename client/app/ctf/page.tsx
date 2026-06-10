'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CtfIndexPage() {
  const writeups = [
    {
      title: 'Agent T',
      href: '/ctf/web/AgentT',
      category: 'Web Exploitation',
      difficulty: 'Easy',
      source: 'tryhackme'
    },
    {
      title: 'Search Source',
      href: '/ctf/web/search-source',
      category: 'Web Exploitation',
      difficulty: 'Medium',
      source: 'picoctf'
    },
    {
      title: 'Login',
      href: '/ctf/web/login',
      category: 'Web Exploitation',
      difficulty: 'Medium',
      source: 'picoctf'
    },
    {
      title: 'Corridor',
      href: '/ctf/web/corridor',
      category: 'Web Exploitation',
      difficulty: 'Easy',
      source: 'tryhackme'
    },
    {
      title: 'La Cifra De',
      href: '/ctf/crypto/la-cifra-de',
      category: 'Cryptography',
      difficulty: 'Medium',
      source: 'picoctf'
    },
    {
      title: 'Flag in Flame',
      href: '/ctf/forensics/flag-in-flame',
      category: 'Forensics',
      difficulty: 'Easy',
      source: 'picoctf'
    },
    {
      title: 'Wireshark Do Doo',
      href: '/ctf/forensics/wireshark-do-doo',
      category: 'Forensics',
      difficulty: 'Medium',
      source: 'picoctf'
    },
    {
      title: "Don't You Love Banners",
      href: '/ctf/general/dont-you-love-banners',
      category: 'General',
      difficulty: 'Medium',
      source: 'picoctf'
    }
  ]

  const categoryOrder = [
    'Web Exploitation',
    'Cryptography',
    'Forensics',
    'Binary Exploitation',
    'OSINT',
    'General'
  ]

  const difficultyOrder = ['Easy', 'Medium', 'Hard', 'Unrated']

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

        <div className="space-y-4">
          <details className="glass-effect rounded-lg cyber-border p-6 group" open>
            <summary className="flex items-start justify-between cursor-pointer list-none">
              <div>
                <div className="text-xl font-semibold">Category-wise Writeups</div>
                <div className="text-gray-400 text-sm mt-1">Every writeup grouped by category.</div>
              </div>
              <span className="text-primary-400 text-sm mt-1 group-open:rotate-180 transition-transform">▾</span>
            </summary>

            <div className="mt-6 space-y-6">
              {categoryOrder.map((category) => {
                const items = writeups.filter((item) => item.category === category)

                return (
                  <div key={category}>
                    <div className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
                      {category}
                    </div>
                    {items.length === 0 ? (
                      <div className="text-gray-400">No writeups yet.</div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="glass-effect p-6 rounded-lg cyber-border hover:translate-y-[-2px] transition-transform"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="font-semibold text-lg">{item.title}</div>
                                <div className="text-gray-400 text-sm">{item.category}</div>
                              </div>
                              <span className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded text-xs">
                                {item.difficulty}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </details>

          <details className="glass-effect rounded-lg cyber-border p-6 group">
            <summary className="flex items-start justify-between cursor-pointer list-none">
              <div>
                <div className="text-xl font-semibold">picoCTF</div>
                <div className="text-gray-400 text-sm mt-1">Writeups grouped by difficulty.</div>
              </div>
              <span className="text-primary-400 text-sm mt-1 group-open:rotate-180 transition-transform">▾</span>
            </summary>

            <div className="mt-6 space-y-6">
              {difficultyOrder.map((difficulty) => {
                const items = writeups.filter(
                  (item) => item.source === 'picoctf' && item.difficulty === difficulty
                )

                return (
                  <div key={difficulty}>
                    <div className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
                      {difficulty}
                    </div>
                    {items.length === 0 ? (
                      <div className="text-gray-400">No writeups yet.</div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="glass-effect p-6 rounded-lg cyber-border hover:translate-y-[-2px] transition-transform"
                          >
                            <div className="font-semibold text-lg">{item.title}</div>
                            <div className="text-gray-400 text-sm">{item.category}</div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </details>

          <details className="glass-effect rounded-lg cyber-border p-6 group">
            <summary className="flex items-start justify-between cursor-pointer list-none">
              <div>
                <div className="text-xl font-semibold">Others</div>
                <div className="text-gray-400 text-sm mt-1">Non-picoCTF writeups.</div>
              </div>
              <span className="text-primary-400 text-sm mt-1 group-open:rotate-180 transition-transform">▾</span>
            </summary>

            <div className="mt-6">
              {writeups.some((item) => item.source !== 'picoctf') ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {writeups
                    .filter((item) => item.source !== 'picoctf')
                    .map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="glass-effect p-6 rounded-lg cyber-border hover:translate-y-[-2px] transition-transform"
                      >
                        <div className="font-semibold text-lg">{item.title}</div>
                        <div className="text-gray-400 text-sm">{item.category}</div>
                      </Link>
                    ))}
                </div>
              ) : (
                <div className="text-gray-400">No writeups in this section yet.</div>
              )}
            </div>
          </details>
        </div>
      </div>
    </section>
  )
}
