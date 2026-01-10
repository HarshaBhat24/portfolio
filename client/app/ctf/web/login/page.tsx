'use client'

import { motion } from 'framer-motion'
import { Lock, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function LoginWriteup() {
  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null)
  const [showFlag, setShowFlag] = useState(false)
  const flag = 'picoCTF{53rv3r_53rv3r_53rv3r_53rv3r_53rv3r}'

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
            <span className="text-white">Login</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">Login</span>
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
                <div className="font-medium">Login</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Description</div>
                <p className="mt-1 text-gray-200">
                  My dog-sitter&apos;s brother made this website but I can&apos;t get in; can you help?
                  <br />{' '}<code className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 break-all text-xs sm:text-sm">https://login.mars.picoctf.net/</code>
                </p>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Hints</div>
                <p>
                    There are no hints for this challenge.      
                </p>
              </div>

              <div>
                <div className="text-gray-400 text-sm">Step 1: Visit the webpage</div>
                <p className="mt-1 text-gray-200">
                  First, let&apos;s visit the website and examine the login form. We see a basic login page with username and password fields.
                </p>
                {/* Add image button here when you have a screenshot */}
                <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/login_page.png', alt: 'Login page screenshot' })}
                  className="mt-2 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="Expand login page screenshot"
                >
                  <Image
                    src="/assets/login_page.png"
                    alt="Login page"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button>
                <div className="text-gray-400 text-xs mt-1">Login page interface</div>
              </div>

              <div>
                <div className="text-gray-400 text-sm">Step 2: Try random login</div>
                <p className="mt-1 text-gray-200">
                  After trying random credentials, we see an alert indication incorrect password.
                </p>
              </div>

              <div>
                <div className="text-gray-400 text-sm">Step 3: View Page Source</div>
                  <p className="mt-3 text-gray-200">
                    Now lets take a look at the HTML source code of the login page to see if there are any clues or hints. <br />
                    Press ctrl + U (or cmd + option + U on Mac) to view the page source.
                  </p>

                  <div className="bg-black/40 p-3 rounded-lg border border-white/10 mt-3 overflow-x-auto">
                    <pre className="text-xs sm:text-sm text-green-400 whitespace-pre-wrap break-words">
          {`<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="styles.css">
    <script src="index.js"></script>
  </head>
  <body>
    <div>
      <h1>Login</h1>
      <form method="POST">
      <label for="username">Username</label>
      <input name="username" type="text"/>
      <label for="username">Password</label>
      <input name="password" type="password"/>
      <input type="submit" value="Submit"/>
      </form>
    </div>
  </body>
</html>`}
                    </pre>
                  </div>
              </div>

              <div>
                <div className="text-gray-400 text-sm">Step 4: Digging through</div>
                <p className="mt-1 text-gray-200">
                  We can see there is a js file included in the page. Let&apos;s check it out to see if there are any clues.
                </p>
                <div className="bg-black/40 p-3 rounded-lg border border-white/10 mt-3 overflow-x-auto">
                  <pre className="text-xs sm:text-sm text-green-400 whitespace-pre-wrap break-words">
{`(async()=>{await new Promise((e=>window.addEventListener
("load",e))),document.querySelector("form").addEventListener
("submit",(e=>{e.preventDefault();const r={u:"input[name=username]
",p:"input[name=password]"},t={};for(const e in r)t[e]=btoa
(document.querySelector(r[e]).value).replace(/=/g,"");
return"YWRtaW4"!==t.u?alert("Incorrect Username"):
"cGljb0NURns1M3J2M3JfNTNydjNyXzUzcnYzcl81M3J2M3JfNTNydjNyfQ"
!==t.p?alert("Incorrect Password"):void alert
(\`Correct Password! Your flag is \${atob(t.p)}.\`)}))})();
`}
                  </pre>
                </div>
              </div>

              <div>
                <div className="text-gray-400 text-sm">Step 4: Getting the Flag</div>
                <p className="mt-1 text-gray-200">
                  Here we got a base64 encoded string: <code className="text-green-400">cGljb0NURns1M3J2M3JfNTNydjNyXzUzcnYzcl81M3J2M3JfNTNydjNyfQ</code>.
                  <br />We can decode it using command line or online tools.
                </p>
                <button
                  type="button"
                  onClick={() => setOpenImage({ src: '/assets/flag_login.png', alt: 'Flag displayed after successful login' })}
                  className="mt-2 block rounded-lg overflow-hidden border border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-zoom-in pointer-events-auto relative z-20 w-full"
                  aria-label="Expand flag screenshot"
                >
                  <Image
                    src="/assets/flag_login.png"
                    alt="Flag page"
                    width={1400}
                    height={900}
                    className="w-full h-auto max-w-full object-contain"
                  />
                </button>
                <div className="text-gray-400 text-xs mt-1">Flag displayed on dashboard</div>
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
                  <p className="text-sm font-medium text-primary-400 mb-1">WEB SECURITY</p>
                  <p className="text-base text-gray-300 leading-relaxed">
                    <span className="italic text-primary-300">&quot;Think like an attacker, build like a defender! Web exploitation teaches you to see beyond the surface. Every vulnerability is a teacher in disguise.&quot;</span>
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
