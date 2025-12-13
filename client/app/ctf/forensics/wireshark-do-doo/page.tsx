'use client'

import { motion } from 'framer-motion'
import { Lock, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function WiresharkDoDooWriteup() {
  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null)
  const [showFlag, setShowFlag] = useState(false)
  const flag = 'picoCTF{p33kab00_1_s33_u_deadbeef}'

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
            <span className="text-white">Wireshark Do Doo</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">Wireshark Do Doo</span>
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
                <div className="font-medium">Wireshark Do Doo</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Description</div>
                <p className="mt-1 text-gray-200">
                   Can you find the flag?<a href="https://mercury.picoctf.net/static/ae5b2bc07928fca272ff3900dc9a6cef/shark1.pcapng" className="text-blue-500"> shark1.pcapng</a>
                  <br></br>
                </p>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Hints</div>
                <ul className="list-disc list-inside mt-1">
                  <li>[None]</li>
                </ul>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Step 1</div>
                <p className="mt-1 text-gray-200">
                To begin, you&apos;ll need to download the provided pcapng file and open it using Wireshark.
                  <br></br> 
                </p>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Step 2</div>
                <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/wireshark.png', alt: 'Wireshark screenshot (expanded)' })}
                  className="mt-2 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="Expand Wireshark screenshot"
                >
                  <Image
                    src="/assets/wireshark.png"
                    alt="Wireshark screenshot"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button>
                <div className="text-gray-400 text-xs mt-1">Wireshark screenshot</div>
                <p className="mt-3 text-gray-200">
                  From this screenshot we have obeserved that there is some HTTP traffic, and also there are total of 987 packets oin which 288 packets are HTTP packets. So we will filter the HTTP packets using filter <code className="bg-white/5 px-1 py-0.5 rounded text-xs">http</code>
                </p>
              </div>

              <div>
                <div className="text-gray-400 text-sm">Step 3</div>
                <p>
                    Now lets try exporting the objects and analyse them <br />
                    Steps: File -&gt; Export Objects -&gt; choose your all of those one by one and analyse the difference.
                </p>
                </div>
              <div>
                <div className="text-gray-400 text-sm">Step 4</div>
                <p>
                  Here we have understood that the objects that can be exported only from HTTP traffic, so we can think that the flag is hidden in one of those objects. So we will export all the objects one by one and analyse them.
                  <br />
                  <br />
                  Once we enter exporting page we will see something like below screenshot, this tells that there are two packets which are distinct from the others, so we will export those two packets and analyse them.
                </p>
                <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/export_wireshark.png', alt: 'Export Wireshark objects (expanded)' })}
                  className="mt-2 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="Expand export Wireshark objects screenshot"
                >
                  <Image
                    src="/assets/export_wireshark.png"
                    alt="Export Wireshark objects"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button>
                <div className="text-gray-400 text-xs mt-1">HTTP object extraction using Wireshark</div>
                <br />
                <div className="text-gray-400 text-sm">Step 5</div>
                <p className="mt-3 text-gray-200">
                  First we&apos;ll go with packet 964 
                </p>
                <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/packet_analysis.png', alt: 'Export Wireshark objects (expanded)' })}
                  className="mt-2 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="Expand export Wireshark objects screenshot"
                >
                  <Image
                    src="/assets/packet_analysis.png"
                    alt="Export Wireshark objects"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button>
                <div className="text-gray-400 text-xs mt-1">Packet 964</div>
                <p className="mt-3 text-gray-200">
                  From the screenshot above we might be hitting a dead end with this packet, lets move on to packet 827.
                  </p>
              </div>
                <div>
                  <br />  
                <div className="text-gray-400 text-sm">Step 6</div>
                <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/packet_827.png', alt: 'Packet 827 analysis (expanded)' })}
                  className="mt-2 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="Expand packet 827 analysis screenshot"
                >
                  <Image
                    src="/assets/packet_827.png"
                    alt="Packet 827 analysis"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button>
                <div className="text-gray-400 text-xs mt-1">Packet 827  </div>
                <p className="mt-3 text-gray-200">
                  And in this packet we can see that flag is hidden as line based text-data as I highlighted in the screenshot above.
                </p>
              </div>
            </div>

            <div className="text-gray-400 text-sm">Step 7</div>
            <p>
              Now we got the below text and it looks like a caesar cipher.
            </p>
            <pre className="bg-black/20 p-4 rounded-lg overflow-x-auto text-sm mt-2">{`Gur synt vf cvpbPGS{c33xno00_1_f33_h_qrnqorrs}\\n`}</pre>
            <p>
              lets bruteforce it using <a href="https://www.dcode.fr/caesar-cipher" className="text-blue-500">dcode.fr</a> and we will get our flag.
              you can also use my command line tool <a href="https://github.com/HarshaBhat24/CipherCrack/" className="text-blue-500">CipherCrack</a> to decode it.
            </p>
            <div>
            <br />  
            <button
              type="button"
              onClick={() => setOpenImage({ src: '/assets/caesar.png', alt: 'Caesar cipher analysis (expanded)' })}
              className="mt-2 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
              aria-label="Expand caesar cipher analysis screenshot"
            >
              <Image
                src="/assets/caesar.png"
                alt="Caesar cipher analysis"
                width={1400}
                height={900}
                className="w-full h-auto max-w-full object-contain"
              />
            </button>
            <div className="text-gray-400 text-xs mt-1">Caesar cipher analysis</div>
          </div>

            <h3>So the flag is</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="break-all font-mono text-sm bg-black/40 px-2 py-1 rounded border border-white/10">{showFlag ? flag : '**********************************'}</span>
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
                    Keep hacking, keep learning! Every packet tells a story, every flag is a lesson. The best hackers are the ones who never stop being curious.
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
