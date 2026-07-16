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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Link href="/ctf/crypto/la-cifra-de" className="block h-full">
              <div className="glass-effect p-6 rounded-lg cyber-border hover:bg-primary-500/5 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <Lock className="h-8 w-8 text-primary-500" />
                  <span className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded text-xs">Classical</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">La Cifra De</h3>
                <p className="text-gray-400 text-sm flex-grow">
                  Classical cipher analysis using cipher identification and Vigenère decryption techniques.
                </p>
                <div className="mt-4 text-primary-400 text-sm font-medium">
                  Read writeup →
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/ctf/crypto/Mini-RSA" className="block h-full">
              <div className="glass-effect p-6 rounded-lg cyber-border hover:bg-primary-500/5 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <Lock className="h-8 w-8 text-primary-500" />
                  <span className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded text-xs">Number Theory</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Mini RSA</h3>
                <p className="text-gray-400 text-sm flex-grow">
                  Small-exponent RSA with a tiny wrap count and an exact integer root attack.
                </p>
                <div className="mt-4 text-primary-400 text-sm font-medium">
                  Read writeup →
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="glass-effect p-6 rounded-lg cyber-border opacity-50 h-full flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <Lock className="h-8 w-8 text-gray-500" />
                <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">Coming Soon</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-400">More Writeups</h3>
              <p className="text-gray-500 text-sm flex-grow">
                Additional cryptography writeups covering RSA, ECC, padding oracles, and more coming soon.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
