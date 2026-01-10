'use client'

import { motion } from 'framer-motion'
import { Lock, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function FlagInFlameWriteup() {
  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null)
  const [showFlag, setShowFlag] = useState(false)
  const flag = 'picoCTF{forensics_analysis_is_amazing_b9ac4cb9}'

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
            <Link href="/ctf/forensics" className="hover:text-white">Forensics</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Flag in Flame</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">Flag in Flame</span>
          </h1>
          <div className="text-gray-400 text-sm">Category: Forensics</div>
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
                <div className="font-medium">Flag in Flame</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Description</div>
                <p className="mt-1 text-gray-200">
                  The SOC team discovered a suspiciously large log file after a recent breach.
                  When they opened it, they found an enormous block  of encoded text instead of 
                  typical logs. Could there be something hidden within? Your mission is to inspect 
                  the resulting file and reveal the real purpose of it. The team is relying on your 
                  skills to uncover any concealed information within this unusual log. <br /> <br />
                  Download the encoded data here:<a href="https://challenge-files.picoctf.net/c_amiable_citadel/5da19ac1eabba5f0b9287e4a5675612e5bbffc68aaa8fa54c58ebd5ce81e29fd/logs.txt" className='text-blue-500'>Logs Data</a>. <br />
                  <br />Be prepared—the file is large, and 
                  examining it thoroughly is crucial.
                  <br></br>
                </p>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Hints</div>
                <ul className="list-disc list-inside mt-1">
                  <li>Use <a href="https://en.wikipedia.org/wiki/Base64" className='text-blue-500'>base64</a> to decode the data and generate the image file.</li>
                </ul>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Step 1</div>
                <p className="mt-1 text-gray-200">
                To begin, you&apos;ll need to download the provided txt file.
                  <br></br> 
                </p>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Step 2</div>
                <p className="mt-1 text-gray-200">
                    Next we will decode the base64 encoded data in the file and convert that to image using the command below <br />
                    <pre className="bg-black/20 p-4 rounded-lg overflow-x-auto text-sm mt-2">{`base64 -d logs.txt > out.png`}</pre>
                </p>
              </div>

              <div>
                <div className="text-gray-400 text-sm">Step 3</div>
                <p>
                    We'll get the image after performing the above command.
                </p>
                <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/converted-img.png', alt: 'base64 text to image (expanded)' })}
                  className="mt-2 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="base64 text to image"
                >
                  <Image
                    src="/assets/converted-img.png"
                    alt="base64 text to image"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button>
                </div>
              <div>
                <div className="text-gray-400 text-sm">Step 4</div>
                <p>
                  Here we can see the hex numbers in the image, so we will decode the hex code.
                  <br />
                </p>
                <div className="text-gray-400 text-xs mt-1">HTTP object extraction using Wireshark</div>
                <br />
                <div className="text-gray-400 text-sm">Step 5</div>
                <p className="mt-3 text-gray-200">
                  We can decode the hex by following command <br />
                    <pre className="bg-black/20 p-4 rounded-lg overflow-x-auto text-sm mt-2 whitespace-pre-wrap break-words">
                    {`xxd -r -p <<< "7069636F4354467B666F72656E736963735F616E616C797369735F\n69735F616D617A696E675F62396163346362397D"`}</pre>
                </p>
                <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/hex_decode.png', alt: 'Hex decode image (expanded)' })}
                  className="mt-2 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="Expand Hex decode image screenshot"
                >
                  <Image
                    src="/assets/hex_decode.png"
                    alt="Hex decode image"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button>
                <div className="text-gray-400 text-xs mt-1">Packet 964</div>
                <p className="mt-3 text-gray-200">
                  From the screenshot above we found the flag.
                  </p>
              </div>
            </div>

            <h3>So the flag is</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="break-all font-mono text-sm bg-black/40 px-2 py-1 rounded border border-white/10">{showFlag ? flag : '***********************************************'}</span>
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

            <div className="mt-8 p-6 rounded-lg border-l-4 border-primary-500 bg-gradient-to-r from-primary-500/5 via-purple-500/5 to-transparent">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1 h-full bg-primary-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-primary-400 mb-1">HACKER&apos;S MINDSET</p>
                    <p className="text-base text-gray-300 leading-relaxed">
                      <span className="italic text-primary-300">"The smallest detail can reveal the biggest secrets. Master the art of data analysis, and you'll uncover what others miss."</span>
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
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900"
      onClick={() => setOpenImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Expanded image preview"
          >
            <div className="relative max-w-5xl w-full my-auto" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
        onClick={() => setOpenImage(null)}
                className="absolute -top-3 -right-3 md:-top-4 md:-right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white z-10"
                aria-label="Close preview"
              >
                <X className="h-5 w-5" />
              </button>
              <Image
                src={openImage.src}
                alt={openImage.alt}
                width={1600}
                height={1000}
                className="w-full h-auto rounded-lg border border-white/10 shadow-2xl max-h-[90vh] object-contain"
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
