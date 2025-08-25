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
          <div className="glass-effect p-12 rounded-lg cyber-border relative">
            <div className="mb-6 relative z-10">
              <FileText className="h-16 w-16 text-primary-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">CTF Writeups of different categories</h3>
              <p className="text-gray-400 text-lg mb-6">
                I just have started documenting my CTF experiences and I have only made one writeup as of now
                you can check that by clicking the link above
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-6 relative z-20">
                {[
                  { href: '/ctf/web', label: 'Web Exploitation' },
                  { href: '/ctf/crypto', label: 'Cryptography' },
                  { href: '/ctf/binary', label: 'Binary Exploitation' },
                  { href: '/ctf/forensics', label: 'Forensics' },
                  { href: '/ctf/osint', label: 'OSINT' },
                  { href: '/ctf/general', label: 'General Skills' }
                ].map((category) => (
                  <Link 
                    key={category.href}
                    href={category.href} 
                    className="group px-4 py-2 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium hover:bg-primary-500/30 hover:text-primary-200 transition-all duration-200 border border-primary-500/30 hover:border-primary-500/50 hover:scale-105 active:scale-95 cursor-pointer relative z-30 pointer-events-auto"
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTFWriteups