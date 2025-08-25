'use client'

import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import Link from 'next/link'

const CTFWriteups = () => {
  return (
    <section id="ctf" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">CTF Writeups</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore detailed writeups of CTF challenges by category on the
            {' '}<Link href="/ctf" className="text-primary-300 hover:text-primary-200 underline underline-offset-2">CTF hub</Link>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-effect p-12 rounded-lg cyber-border">
            <div className="mb-6">
              <FileText className="h-16 w-16 text-primary-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">CTF Writeups Coming Soon</h3>
              <p className="text-gray-400 text-lg mb-6">
                I just have started documenting my CTF experiences and I have only made one writeup as of now
                you can check that by clicking the link above
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">
                <p>
                  {' '}<Link href="/ctf/web" className="hover:text-primary-200">Web Exploitation</Link>
                </p>
                </span>
                <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">
                  <Link href="/ctf/crypto" className="hover:text-primary-200">Cryptography</Link>
                </span>
                <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">
                <p>
                  <Link href="/ctf/binary" className="hover:text-primary-200">Binary Exploitation</Link>
                </p>
                </span>
                <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">
                <p>
                  <Link href="/ctf/forensics" className="hover:text-primary-200">Forensics</Link>
                </p>
                </span>
                <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">
                <p>
                  <Link href="/ctf/osint" className="hover:text-primary-200">OSINT</Link>
                </p>
                </span>
                <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">
                <p>
                  <Link href="/ctf/general-skills" className="hover:text-primary-200">General Skills</Link>
                </p>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTFWriteups