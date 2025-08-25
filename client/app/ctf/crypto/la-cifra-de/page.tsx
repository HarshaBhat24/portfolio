'use client'

import { motion } from 'framer-motion'
import { Lock, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function LaCifraDeWriteup() {
  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null)
  const [showFlag, setShowFlag] = useState(false)
  const flag = 'picoCTF{b311a50_0r_v1gn3r3_c1ph3ra966878a}'

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
            <span className="text-white">La Cifra De</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">La Cifra De</span>
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
            <div className="not-prose grid gap-3 mb-6">`
              <div>
                <div className="text-gray-400 text-sm">Name</div>
                <div className="font-medium">la cifra de</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Description</div>
                <p className="mt-1 text-gray-200">
                  I found this cipher in an old book. Can you figure out what it says? Connect with
                  <br></br>{' '}<code className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 break-all text-xs sm:text-sm">nc jupiter.challenges.picoctf.org 58295</code>.
                </p>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Hints</div>
                <ul className="list-disc list-inside mt-1">
                  <li>There are tools that make this easy.</li>
                  <li>Perhaps looking at history will help</li>
                </ul>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Step 1</div>
                <p className="mt-1 text-gray-200">
                To begin, you&apos;ll need to connect to the remote service using netcat as shown below.
                  <br></br>{' '}<code className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 break-all text-xs sm:text-sm">nc jupiter.challenges.picoctf.org 58295</code>.
                <br />
                You will have different port number for netcat connection, check with the problem 
                </p>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Step 2</div>
                <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/netcat_res.png', alt: 'Netcat response for La Cifra De (expanded)' })}
                  className="mt-2 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="Expand netcat response screenshot"
                >
                  <Image
                    src="/assets/netcat_res.png"
                    alt="Netcat response for La Cifra De"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button>
                <div className="text-gray-400 text-xs mt-1">Netcat response</div>
                <p className="mt-3 text-gray-200">
                  From this output, it looks like some kind of encryption. Our next task is to identify which cipher it is.
                </p>
              </div>

              <div>
                <div className="text-gray-400 text-sm">Step 3</div>
                <p>
                    Now we will use cipher identifier from <a href="https://www.dcode.fr/cipher-identifier" target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-primary-200 underline underline-offset-2">dcode.fr</a>
                </p>
                <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/cipher_identifier.png', alt: 'Cipher identifier for La Cifra De (expanded)' })}
                  className="mt-2 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="Expand cipher identifier response screenshot"
                >
                  <Image
                    src="/assets/cipher_identifier.png"
                    alt="Cipher identifier for La Cifra De"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button>
                <div className="text-gray-400 text-xs mt-1">Cipher identifier</div>
                <p className="mt-3 text-gray-200">
                  From this output, our chances are Vigenère, Autokey, Beaufort, Rozier we&apos;ll check them one by one 
                </p>
              </div>
                <div>
                <div className="text-gray-400 text-sm">Step 4</div>
                <div className="text-gray-200">
                    <p className="mb-3">In the ciphertext the line:</p>
                    
                    <div className="bg-black/40 p-3 rounded-lg border border-white/10 mb-4 overflow-x-auto">
                      <pre className="text-xs sm:text-sm text-green-400 whitespace-pre-wrap break-words">
                        Ltc tnj tmvqpmkseaznzn uk ehox nivmpr g ylbrj ts ltcmki my yqtdosr tnj wocjc hgqq ol fy oxitngwj arusahje fuw ln guaaxjytrd catizm tzxbkw zf vqlckx hizm ceyupcz yz tnj fpvjc hgqqpohzCZK&#123;m311a50_0x_a1rn3x3_h1ah3xf966878l&#125;
                      </pre>
                    </div>

                    <p className="mb-3">
                      Looking at the above line we can see the flag format <code className="bg-white/5 px-1 py-0.5 rounded text-xs">hgqqpohzCZK&#123;...&#125;</code> and in picoCTF, the flag format will be <code className="bg-white/5 px-1 py-0.5 rounded text-xs">picoCTF&#123;...&#125;</code>
                    </p>
                    
                    <p>
                      So we can assume that line consists the flag and we will use that to extract the flag using <a href="https://www.dcode.fr/vigenere-cipher" target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-primary-200 underline underline-offset-2">Vigenère</a>.
                    </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/vignere_sol.png', alt: 'Vigenère solution for La Cifra De (expanded)' })}
                  className="mt-2 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="Expand Vigenère solution screenshot"
                >
                  <Image
                    src="/assets/vignere_sol.png"
                    alt="Vigenère solution for La Cifra De"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button>
                <div className="text-gray-400 text-xs mt-1">Vigenère solution</div>
                <p className="mt-3 text-gray-200">
                  From this output, we found the flag, happy hunting!
                </p>
              </div>
            </div>

            <h3>So the flag is</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="break-all font-mono text-sm bg-black/40 px-2 py-1 rounded border border-white/10">{showFlag ? flag : '******************************************'}</span>
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
