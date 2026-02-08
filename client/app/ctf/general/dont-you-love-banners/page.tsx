'use client'

import { motion } from 'framer-motion'
import { Terminal, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function DontYouLoveBannersWriteup() {
  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null)
  const [showFlag, setShowFlag] = useState(false)
  const flag = 'picoCTF{b4nn3r_gr4bb1n9_su((3sfu11y_ed6f9c71}'

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
            <Link href="/ctf/general" className="hover:text-white">General</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Don&apos;t You Love Banners</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">Don&apos;t You Love Banners</span>
          </h1>
          <div className="text-gray-400 text-sm">Category: General</div>
        </motion.div>

        <div className="glass-effect p-4 sm:p-6 md:p-8 rounded-lg cyber-border relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="h-6 w-6 text-primary-500" />
            <div className="text-gray-300">Writeup</div>
          </div>

          <div className="prose prose-invert max-w-none relative z-20 pointer-events-auto select-text overflow-hidden">
            <h2>Challenge Overview</h2>
            <div className="not-prose grid gap-3 mb-6">
              <div>
                <div className="text-gray-400 text-sm">Name</div>
                <div className="font-medium">don&apos;t-you-love-banners</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Description</div>
                <p className="mt-1 text-gray-200">
                  Can you abuse the banner? The server has been leaking some crucial information on
                  <br />
                  <code className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 break-all text-xs sm:text-sm">tethys.picoctf.net &lt;YOUR PORT&gt;</code>.
                  Use the leaked information to get to the server. To connect to the running application use
                  <br />
                  <code className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 break-all text-xs sm:text-sm">nc tethys.picoctf.net &lt;YOUR_PORT&gt;</code>.
                  <br />
                  Note: the second port changes for each user session.
                </p>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Hints</div>
                <p className="text-gray-200">Do you know about symlinks?</p>
                <p className="text-gray-200">Maybe some small password cracking or guessing.</p>
              </div>

              <div>
                <div className="text-gray-400 text-sm">Step 1: Connect to the leak service</div>
                <p className="mt-1 text-gray-200">
                  Start by connecting to the banner leak service. It may provide us some info.
                </p>
                <div className="bg-black/40 p-3 rounded-lg border border-white/10 mt-3 overflow-x-auto">
                  <pre className="text-xs sm:text-sm text-green-400 whitespace-pre-wrap break-words">{`nc tethys.picoctf.net <YOUR-PORT>`}</pre>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/dont-you-love-banners.png', alt: 'Banner leak output' })}
                  className="mt-3 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="Expand banner leak output"
                >
                  <Image
                    src="/assets/dont-you-love-banners.png"
                    alt="Banner leak output"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button>
              </div>

              <div>
                <div className="text-gray-400 text-sm">Step 2: Use the leaked credentials</div>
                <p className="mt-1 text-gray-200">
                  The leak gives the password. Use it to connect to the main service.
                  Remember the port is unique per user, so replace it with the one you see in the challenge.
                </p>
                <div className="bg-black/40 p-3 rounded-lg border border-white/10 mt-3 overflow-x-auto">
                  <pre className="text-xs sm:text-sm text-green-400 whitespace-pre-wrap break-words">{`nc tethys.picoctf.net <YOUR_PORT>`}</pre>
                </div>
              </div>

                <div>
                <div className="text-gray-400 text-sm">Step 3: Here we try with the password</div>
                <p className="mt-1 text-gray-200">
                    The password is correct and we&apos;re asked with two questions about cybersecurity.
                    Answer them correctly to proceed.
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpenImage({ src: '/assets/dylb-nc.png', alt: 'Login prompts and symlink creation' })}
                    className="mt-3 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                    aria-label="Expand login and symlink output"
                  >
                    <Image
                    src="/assets/dylb-nc.png"
                    alt="Login prompts and symlink creation"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                    />
                  </button>
                  <p className="mt-2 text-gray-200">
                    Once found a way in investigating the files
                  </p>
                  </div>

              <div>
                <div className="text-gray-400 text-sm">Step 4: Investigate files and hit the wall</div>
                <p className="mt-1 text-gray-200">
                  Once inside, I looked around and tried to read the flag directly, but access is denied. This is
                  where hint 2 nudges us toward a small trick.
                </p>
                <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/dylb-files.png', alt: 'Listing files in the working directory' })}
                  className="mt-3 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="Expand file listing output"
                >
                  <Image
                    src="/assets/dylb-files.png"
                    alt="File listing output"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button>
                {/* <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/dylb-flag-denied.png', alt: 'Permission denied when reading flag.txt' })}
                  className="mt-3 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="Expand permission denied output"
                >
                  <Image
                    src="/assets/dylb-flag-denied.png"
                    alt="Permission denied output"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button> */}
              </div>

              <div>
                <div className="text-gray-400 text-sm">Step 5: Symlink banner and relogin</div>
                <p className="mt-1 text-gray-200">
                  Using the symlink hint, replace the banner file with a symlink to the flag, then reconnect so the
                  service prints it when it reads the banner.
                </p>
                <div className="bg-black/40 p-3 rounded-lg border border-white/10 mt-3 overflow-x-auto">
                  <pre className="text-xs sm:text-sm text-green-400 whitespace-pre-wrap break-words">{`rm -f banner.txt
ln -s /root/flag.txt banner.txt`}</pre>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/dylb-flag-banner.png', alt: 'Flag revealed after relogin' })}
                  className="mt-3 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="Expand flag reveal output"
                >
                  <Image
                    src="/assets/dylb-flag-banner.png"
                    alt="Flag reveal output"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button>
              </div>
            </div>

            <h3>So the flag is</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="break-all font-mono text-sm bg-black/40 px-2 py-1 rounded border border-white/10">{showFlag ? flag : '*********************************************'}</span>
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
                  <p className="text-sm font-medium text-primary-400 mb-1">TAKEAWAY</p>
                  <p className="text-base text-gray-300 leading-relaxed">
                    <span className="italic text-primary-300">&quot;Writable paths plus symlinks are a classic combo. Always validate what files a service reads, not just where it reads from.&quot;</span>
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
