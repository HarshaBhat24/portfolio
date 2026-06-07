'use client'

import { motion } from 'framer-motion'
import { Lock, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function CorridorWriteup() {
  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null)
  const [showFlag, setShowFlag] = useState(false)
  const flag = 'flag{enter_your_flags}'

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <nav className="text-sm text-gray-400 mb-4 overflow-x-auto">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/ctf" className="hover:text-white">CTF</Link>
            <span className="mx-2">/</span>
            <Link href="/ctf/web" className="hover:text-white">Web Exploitation</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Corridor</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">Corridor</span>
          </h1>
          <div className="text-gray-400 text-sm">Category: Web Exploitation</div>
        </motion.div>

        <div className="glass-effect p-4 sm:p-6 md:p-8 rounded-lg cyber-border relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-6 w-6 text-primary-500" />
            <div className="text-gray-300">Attack Report</div>
          </div>

          <div className="prose prose-invert max-w-none relative z-20 pointer-events-auto select-text overflow-hidden">
            <h2>Challenge Overview</h2>
            <div className="not-prose grid gap-3 mb-6">
              <div>
                <div className="text-gray-400 text-sm">Name</div>
                <div className="font-medium">Corridor</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Description</div>
                <p className="mt-1 text-gray-200">
                  You have found yourself in a strange corridor. Can you find your way back to where you came? In this challenge, you will explore potential vulnerabilities. Examine the URL endpoints you access as you navigate the website and note the hexadecimal values you find (they look an awful lot like a hash, don&apos;t they?).
                </p>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Vulnerability Type</div>
                <p className="mt-1 text-gray-200">
                  Insecure Direct Object Reference (IDOR) / Predictable Resource Location
                </p>
              </div>

              <hr className="border-white/10 my-4" />

              <div>
                <div className="text-gray-400 text-sm">Step 1: Surface Enumeration</div>
                <p className="mt-1 text-gray-200">
                  The application presents a visual corridor with multiple interactive doors. Clicking a door routes the application to an endpoint that looks like a 32-character hexadecimal string.
                </p>
                <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/hash_corridor.png', alt: 'Corridor doors interface' })}
                  className="mt-2 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="Expand corridor page screenshot"
                >
                  <Image
                    src="/assets/hash_corridor.png"
                    alt="Corridor doors interface"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button>
              </div>

              <div>
                <div className="text-gray-400 text-sm">Step 2: Pattern Recognition</div>
                <p className="mt-1 text-gray-200">
                  By analyzing the endpoints, we identify the hash format as <strong>MD5</strong>. Cracking the hashes reveals they map to sequential integers: <code>1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13</code> (and a random <code>35</code>). Testing a custom payload—hashing the number <code>7</code> and navigating to that endpoint—results in a valid, empty room, confirming the lack of access controls.
                </p>
              </div>

              <div>
                <div className="text-gray-400 text-sm">Step 3: Logic Deduction</div>
                  <p className="mt-1 text-gray-200">
                    The objective states: <em>&quot;find your way back to where you came.&quot;</em> The current sequence is iterating forward. In computer science, array indexes originate at <code>0</code>. The space before the first door is the root index.
                  </p>
              </div>

              <div>
                <div className="text-gray-400 text-sm">Step 4: Payload Generation & Execution</div>
                <p className="mt-1 text-gray-200">
                  Generate the MD5 hash for the string <code>0</code>:
                </p>
                <div className="bg-black/40 p-3 rounded-lg border border-white/10 mt-3 overflow-x-auto">
                  <pre className="text-xs sm:text-sm text-green-400 whitespace-pre-wrap break-words">
$ echo -n &quot;0&quot; | md5sum
cfcd208495d565ef66e7dff9f98764da
                  </pre>
                </div>
                <p className="mt-3 text-gray-200">
                  Append this hash to the base URL of the target application to bypass the intended boundaries.
                </p>
                <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/zero_hash.png', alt: 'Flag displayed after successful IDOR' })}
                  className="mt-2 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="Expand flag screenshot"
                >
                  <Image
                    src="/assets/zero_hash.png"
                    alt="Flag displayed after successful IDOR"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Step 5: Extraction</div>
                <p className="mt-1 text-gray-200">
                  Accessing the crafted endpoint drops us into the origin room, exposing the flag.
                </p>
              </div>
            </div>

            <h3>Target Compromised:</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="break-all font-mono text-sm bg-black/40 px-2 py-1 rounded border border-white/10">{showFlag ? flag : '**********************'}</span>
              <button
                type="button"
                onClick={() => setShowFlag((v) => !v)}
                className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded border border-white/10 bg-white/5 hover:bg-white/10 text-primary-300 hover:text-primary-200 self-start"
                aria-pressed={showFlag}
                aria-label={showFlag ? 'Hide flag' : 'Show flag'}
              >
                {showFlag ? 'Hide flag' : 'Show flag'}
              </button>
            </div>

            <div className="mt-8 p-6 rounded-lg border-l-4 border-red-500 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-transparent">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1 h-full bg-red-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-red-400 mb-1">SENTINAL LOG</p>
                  <p className="text-base text-gray-300 leading-relaxed">
                    <span className="italic text-red-300">&quot;Security by obscurity is a failure in design. Predictable resource locations allow adversaries to map your entire application logic. Always check index zero.&quot;</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {openImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setOpenImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Expanded image preview"
          >
            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setOpenImage(null)}
                className="absolute -top-3 -right-3 md:-top-4 md:-right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white"
                aria-label="Close preview"
              >
                <X className="h-5 w-5" />
              </button>
              <Image
                src={openImage.src}
                alt={openImage.alt}
                width={1600}
                height={1000}
                className="w-full h-auto rounded-lg border border-white/10 shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}