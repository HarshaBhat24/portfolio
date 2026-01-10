'use client'

import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import Link from 'next/link'

export default function ForensicsCTFPage() {
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
            <span className="text-white">Forensics</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">Forensics Writeups</span>
          </h1>
            <p className="text-gray-400 mt-3 max-w-2xl">
            Notes and solutions focused on digital forensics techniques, including file analysis, memory forensics, and artifact recovery.
            </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Link href="/ctf/forensics/flag-in-flame" className="block h-full">
              <div className="glass-effect p-6 rounded-lg cyber-border hover:bg-primary-500/5 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <Lock className="h-8 w-8 text-primary-500" />
                  <span className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded text-xs">Easy-picoCTF</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Flag in Flame</h3>
                <p className="text-gray-400 text-sm flex-grow">
                  Solving base64 string and cryptanalysis.
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
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Link href="/ctf/forensics/wireshark-do-doo" className="block h-full">
              <div className="glass-effect p-6 rounded-lg cyber-border hover:bg-primary-500/5 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <Lock className="h-8 w-8 text-primary-500" />
                  <span className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded text-xs">Medium-picoCTF</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Wireshark Do Doo</h3>
                <p className="text-gray-400 text-sm flex-grow">
                  Basic packet analysis using wireshark and its functionalities.
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
            <div className="glass-effect p-6 rounded-lg cyber-border opacity-50 h-full flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <Lock className="h-8 w-8 text-gray-500" />
                <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">Coming Soon</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-400">More Writeups</h3>
              <p className="text-gray-500 text-sm flex-grow">
                Additional Forensics writeups covering file analysis, memory forensics, artifact recovery, and more coming soon.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
