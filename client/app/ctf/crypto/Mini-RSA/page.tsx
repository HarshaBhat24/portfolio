'use client'

import { motion } from 'framer-motion'
import { Lock, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function MiniRSAWriteup() {
  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null)
  const [showFlag, setShowFlag] = useState(false)
  const flag = 'picoCTF{e_sh0uld_b3_lArg3r_92f4d5a5}'

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
            <Link href="/ctf/crypto" className="hover:text-white">Cryptography</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Mini RSA</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">Mini RSA</span>
          </h1>
          <div className="text-gray-400 text-sm">Category: Cryptography</div>
        </motion.div>

        <div className="glass-effect p-4 sm:p-6 md:p-8 rounded-lg cyber-border relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-6 w-6 text-primary-500" />
            <div className="text-gray-300">Writeup</div>
          </div>

          <div className="prose prose-invert max-w-none relative z-20 pointer-events-auto select-text overflow-hidden">
            <h2>Challenge Overview</h2>
            <div className="not-prose grid gap-3 mb-6">
              <div>
                <div className="text-gray-400 text-sm">Name</div>
                <div className="font-medium">Mini RSA</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Description</div>
                <p className="mt-1 text-gray-200">
                  What happens if you have a small exponent? There is a twist though, we padded the plaintext so that <code className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 break-all text-xs sm:text-sm">M ** e</code> is just barely larger than <code className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 break-all text-xs sm:text-sm">N</code>. Let&apos;s decrypt this.
                </p>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Hints</div>
                <ul className="list-disc list-inside mt-1 text-gray-200 space-y-1">
                  <li>RSA tutorial</li>
                  <li>How could having too small of an e affect the security of this key?</li>
                  <li>Make sure you don&apos;t lose precision, the numbers are pretty big (besides the e value)</li>
                  <li>You shouldn&apos;t have to make too many guesses</li>
                  <li>pico is in the flag, but not at the beginning</li>
                </ul>
              </div>

              <div>
                <div className="text-gray-400 text-sm">Step 1: Inspect the key material</div>
                <p className="mt-1 text-gray-200">
                  The RSA public exponent is only <code className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 break-all text-xs sm:text-sm">e = 3</code>, which means the message only needs a tiny wrap-around count to land back in a perfect cube.
                </p>
                <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/values_RSA.png', alt: 'RSA values and ciphertext screenshot' })}
                  className="mt-2 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="Expand RSA values screenshot"
                >
                  <Image
                    src="/assets/values_RSA.png"
                    alt="RSA values and ciphertext"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button>
                <div className="text-gray-400 text-xs mt-1">RSA public values</div>
              </div>

              <div>
                <div className="text-gray-400 text-sm">Step 2: Brute-force the wrap count</div>
                <p className="mt-1 text-gray-200">
                  Instead of trying to factor the modulus, we test small values of <code className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 break-all text-xs sm:text-sm">k</code> in <code className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 break-all text-xs sm:text-sm">M^3 = c + kN</code> until the right one becomes a perfect cube.
                </p>
                <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/python_script.png', alt: 'Python brute-force script screenshot' })}
                  className="mt-2 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="Expand Python script screenshot"
                >
                  <Image
                    src="/assets/python_script.png"
                    alt="Python brute-force script"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button>
                <div className="text-gray-400 text-xs mt-1">Python brute-force script</div>
              </div>

              <div>
                <div className="text-gray-400 text-sm">Step 3: Recover the plaintext</div>
                <p className="mt-1 text-gray-200">
                  The exact integer cube root lands immediately, so the plaintext drops out cleanly once we convert the recovered integer back into bytes.
                </p>
                <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/flag_RSA.png', alt: 'Recovered Mini RSA flag screenshot' })}
                  className="mt-2 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="Expand recovered flag screenshot"
                >
                  <Image
                    src="/assets/flag_RSA.png"
                    alt="Recovered Mini RSA flag"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button>
                <div className="text-gray-400 text-xs mt-1">Recovered flag</div>
              </div>
            </div>

            <h3>So the flag is</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="break-all font-mono text-sm bg-black/40 px-2 py-1 rounded border border-white/10">{showFlag ? flag : '************************************'}</span>
              <button
                type="button"
                onClick={() => setShowFlag((value) => !value)}
                className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded border border-white/10 bg-white/5 hover:bg-white/10 text-primary-300 hover:text-primary-200 self-start"
                aria-pressed={showFlag}
                aria-label={showFlag ? 'Hide flag' : 'Show flag'}
              >
                {showFlag ? 'Hide flag' : 'Show flag'}
              </button>
            </div>

            <div className="mt-8 p-6 rounded-lg border-l-4 border-primary-500 bg-gradient-to-r from-primary-500/5 via-purple-500/5 to-transparent">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1 h-full bg-primary-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-primary-400 mb-1">RSA ATTACK SURFACE</p>
                  <p className="text-base text-gray-300 leading-relaxed">
                    <span className="italic text-primary-300">&quot;Small exponents are only safe when the message is padded correctly. If the plaintext can be coaxed into a low-degree root, the math gives the flag away.&quot;</span>
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
            <div className="relative max-w-5xl w-full" onClick={(event) => event.stopPropagation()}>
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
