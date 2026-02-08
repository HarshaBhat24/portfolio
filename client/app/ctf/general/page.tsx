'use client'

import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import Link from 'next/link'

export default function generalCTFPage() {
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
            <span className="text-white">General</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">General Writeups</span>
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl">
            Notes and solutions that sharpen CTF fundamentals, from file abuse to service misconfigurations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/ctf/general/dont-you-love-banners" className="block h-full">
              <div className="glass-effect p-6 rounded-lg cyber-border hover:bg-primary-500/5 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <Lock className="h-8 w-8 text-primary-500" />
                  <span className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded text-xs">Medium-picoCTF</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Don&apos;t You Love Banners</h3>
                <p className="text-gray-400 text-sm flex-grow">
                  Leak banner info, authenticate, then abuse a symlinked banner to read the flag.
                </p>
                <div className="mt-4 text-primary-400 text-sm font-medium">Read writeup →</div>
              </div>
            </Link>

            <div className="glass-effect p-6 rounded-lg cyber-border opacity-50 h-full flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <Lock className="h-8 w-8 text-gray-500" />
                <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">Coming Soon</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-400">More Writeups</h3>
              <p className="text-gray-500 text-sm flex-grow">
                Additional general challenges covering reconnaissance, metadata, and OSINT are on the way.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
