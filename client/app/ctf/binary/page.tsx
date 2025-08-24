'use client'

import { motion } from 'framer-motion'
import { Cpu } from 'lucide-react'
import Link from 'next/link'

export default function BinaryCTFPage() {
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
            <span className="text-white">Binary</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">Binary Exploitation Writeups</span>
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl">
            pwning, ROP chains, heap feng shui, mitigations. Deep dives coming soon.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="glass-effect p-10 rounded-lg cyber-border text-center">
            <Cpu className="h-16 w-16 text-primary-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Binary writeups coming soon</h2>
            <p className="text-gray-400 mb-6">
              Coverage of stack/heap, canaries, PIE/ASLR/NX bypass, and tooling.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['BOF', 'ROP', 'Heap', 'FmtStr', 'GDB', 'pwntools'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">{tag}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
