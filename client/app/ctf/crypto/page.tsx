'use client'

import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import Link from 'next/link'

export default function CryptoCTFPage() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/#ctf" className="hover:text-white">CTF</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Cryptography</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">Cryptography Writeups</span>
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl">
            Notes and solutions focused on modern crypto primitives, math, and implementation flaws. Coming soon.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="glass-effect p-10 rounded-lg cyber-border relative isolate">
            <div className="text-center">
              <Lock className="h-16 w-16 text-primary-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Latest Crypto Writeups</h2>
              <p className="text-gray-400 mb-6">
                Expect RSA, ECC, lattice intros, padding oracles, and side-channel fun.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 pointer-events-auto">
              <Link href="/ctf/crypto/la-cifra-de" className="block rounded-lg border border-white/10 hover:border-primary-500/50 p-4 transition-colors relative z-20 pointer-events-auto">
                <div className="font-semibold mb-1">La Cifra De</div>
                <div className="text-sm text-gray-400">Classical cipher analysis</div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
