'use client'

import { motion } from 'framer-motion'
import { Lock, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function SearchSourceWriteup() {
  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null)
  const [showFlag, setShowFlag] = useState(false)
  const flag = 'picoCTF{1nsp3ti0n_0f_w3bpag3s_8de925a7}'

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
            <span className="text-white">Search Source</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">Search Source</span>
          </h1>
          <div className="text-gray-400 text-sm">Category: Web Exploitation</div>
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
                <div className="font-medium">Search Source</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Description</div>
                <p className="mt-1 text-gray-200">
                  The developer of this website mistakenly left an important artifact in the website source, can you find it?
                  <br />{' '}<code className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 break-all text-xs sm:text-sm">http://saturn.picoctf.net:58065/</code>
                  <br />&quot;(Note: This URL will be different when you do it by yourself)&quot;
                </p>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Hint</div>
                <p>
                    How could you mirror the website on your local machine so you could use more powerful tools for searching?
                </p>
              </div>

              <div>
                <div className="text-gray-400 text-sm">Step 1: Open the website</div>
                <p className="mt-1 text-gray-200">
                    We should start the instance which will give the website URL. <br />
                    <br />
                  Once the website is loaded, we can open the souce code by using browser&apos;s developer tools (right click &gt; Inspect or F12).
                </p>
                <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/source_code.png', alt: 'source code screenshot' })}
                  className="mt-2 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="Expand source code screenshot"
                >
                  <Image
                    src="/assets/source_code.png"
                    alt="source code"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button>
                <div className="text-gray-400 text-xs mt-1">Source code</div>
              </div>

              <div>
                <div className="text-gray-400 text-sm">Step 2: Inspect the source code</div>
                <p className="mt-1 text-gray-200">
                  In the source code we can see there is a API key for google maps 
                  <br /> API Key : <code className="text-green-600">AIzaSyA8eaHt9Dh5H57Zh0xVTqxVdBFCvFMqFjQ</code>
                  <br />Lets keep this information aside for now as it might be useful later.
                </p>
              </div>

              <div>
                <div className="text-gray-400 text-sm">Step 3: Webpage local mirroring</div>
                  <p className="mt-3 text-gray-200">
                    To mirror the webpage on our local machine, we can use a tool called <code className="text-green-500">wget</code>.
                    <br />Using the following command we can download the entire webpage: <br />
                    <code className='bg-white/5 px-1.5 py-0.5 rounded border border-white/10 break-all text-xs sm:text-sm text-green-400'>wget -r -np -k -E http://saturn.picoctf.net:58065/</code>
                    <br />Here, <br />
                    <code className='text-green-400'>-r</code> : Recursive download <br />
                    <code className='text-green-400'>-np</code> : No parent (don&apos;t ascend to the parent directory) <br />
                    <code className='text-green-400'>-k</code> : Convert links to make them suitable for local viewing <br />
                    <code className='text-green-400'>-E</code> : Adjust extensions of HTML files to .html
                  </p>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Step 4: Getting the Flag</div>
                <p className="mt-1 text-gray-200">
                  Once we have mirrored the webpage, we can perform grep search to find the flag.
                  <br />Using the following command: <br />
                  <code className='bg-white/5 px-1.5 py-0.5 rounded border border-white/10 break-all text-xs sm:text-sm text-green-400'>grep -r &quot;picoCTF&quot; .</code>
                  <br />Here, <br />
                  <code className='text-green-400'>-r</code> : Recursive search in all files and subdirectories <br />
                  <code className='text-green-400'>&quot;picoCTF&quot;</code> : The string we are searching for <br />
                  <code className='text-green-400'>.</code> : Current directory
                  <br />This will search for the string &quot;picoCTF&quot; in all files in the current directory and its subdirectories.
                  <br />After performing the search we will find the flag in one of the files.
                </p>
                <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/grep_result.png', alt: 'Displayed flag after grep search' })}
                  className="mt-2 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="Displayed flag after grep search"
                >
                  <Image
                    src="/assets/grep_result.png"
                    alt="Displayed flag after grep search"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button>
                <div className="text-gray-400 text-xs mt-1">Found flag in grep search</div>
              </div>
            </div>

            <h3>So the flag is</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="break-all font-mono text-sm bg-black/40 px-2 py-1 rounded border border-white/10">{showFlag ? flag : '***************************************'}</span>
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
                  <p className="text-sm font-medium text-primary-400 mb-1">WEB SECURITY</p>
                  <p className="text-base text-gray-300 leading-relaxed">
                    <span className="italic text-primary-300">&quot;Never underestimate the power of inspection! Hidden secrets lurk in plain sight – developers must always encrypt sensitive data, shield API keys in secure vaults, and remember: <span className="font-bold text-primary-400 animate-pulse">the source code is your greatest teacher and your most dangerous adversary</span>.&quot;</span>
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
