'use client'

import { motion } from 'framer-motion'
import { FileText, Award, Clock, Target } from 'lucide-react'

const CTFWriteups = () => {
  const writeups = [
    {
      title: 'HackTheBox: Precious Walkthrough',
      category: 'Web Exploitation',
      difficulty: 'Medium',
      date: '2024-01-15',
      description: 'Complete walkthrough of the Precious machine focusing on Ruby deserialization vulnerabilities and privilege escalation.',
      tags: ['Ruby', 'Deserialization', 'PrivEsc', 'Linux']
    },
    {
      title: 'TryHackMe: Buffer Overflow Series',
      category: 'Binary Exploitation',
      difficulty: 'Hard',
      date: '2024-01-10',
      description: 'Detailed analysis of buffer overflow techniques including stack canaries bypass and ROP chain construction.',
      tags: ['Buffer Overflow', 'ROP', 'Assembly', 'Exploit Development']
    },
    {
      title: 'Crypto Challenge: RSA Implementation',
      category: 'Cryptography',
      difficulty: 'Medium',
      date: '2024-01-05',
      description: 'Breaking a weak RSA implementation using factorization techniques and mathematical analysis.',
      tags: ['RSA', 'Cryptography', 'Number Theory', 'Python']
    },
    {
      title: 'Network Forensics: PCAP Analysis',
      category: 'Forensics',
      difficulty: 'Easy',
      date: '2023-12-28',
      description: 'Analyzing network traffic to identify malicious activities and extract hidden information.',
      tags: ['Wireshark', 'Network Analysis', 'Forensics', 'PCAP']
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20'
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20'
      case 'Hard': return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

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
            Detailed writeups of cybersecurity challenges and competitions - Coming Soon!
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
                I&apos;m currently working on documenting my CTF experiences and challenge solutions. 
                Check back soon for detailed writeups covering various cybersecurity topics!
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">
                  Web Exploitation
                </span>
                <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">
                  Cryptography
                </span>
                <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">
                  Binary Exploitation
                </span>
                <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">
                  Forensics
                </span>
                <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">
                  OSINT
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
