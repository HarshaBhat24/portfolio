'use client'

import { useState } from 'react'
import { WriteupShell, Step, Terminal, ZoomImage, ImageModal, FlagReveal, MindsetQuote } from '@/components/WriteupShell'

export default function LoginWriteup() {
  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null)

  return (
    <>
      <WriteupShell
        title="Login"
        category="Web Exploitation"
        categoryHref="/ctf/web"
        difficulty="Medium"
        source="picoCTF"
      >
        <h2>Challenge Overview</h2>
        <div className="not-prose grid gap-3 mb-6">
          <div>
            <div className="text-gray-400 text-sm">Name</div>
            <div className="font-medium">Login</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Description</div>
            <p className="mt-1 text-gray-200">
              My dog-sitter&apos;s brother made this website but I can&apos;t get in; can you help?{' '}
              <code className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 break-all text-xs sm:text-sm">
                https://login.mars.picoctf.net/
              </code>
            </p>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Hints</div>
            <p className="text-gray-200 text-sm mt-1">There are no hints for this challenge.</p>
          </div>
        </div>

        <Step n={1} label="Visit the login page" />
        <p className="text-gray-300 text-sm leading-relaxed">
          The site presents a basic login form with username and password fields.
        </p>
        <ZoomImage
          src="/assets/login_page.png"
          alt="Login page screenshot"
          caption="Login page interface"
          onOpen={setOpenImage}
        />

        <Step n={2} label="Try random credentials" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Submitting random credentials shows an alert indicating incorrect password.
        </p>

        <Step n={3} label="View the page source" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Press <code className="bg-white/5 px-1 py-0.5 rounded text-xs">Ctrl+U</code> (or <code className="bg-white/5 px-1 py-0.5 rounded text-xs">Cmd+Option+U</code> on Mac) to view the page source.
        </p>
        <Terminal lines={[
          '<!doctype html>',
          '<html>',
          '  <head>',
          '    <link rel="stylesheet" href="styles.css">',
          '    <script src="index.js"></script>',
          '  </head>',
          '  <body>',
          '    <div>',
          '      <h1>Login</h1>',
          '      <form method="POST">',
          '      <label for="username">Username</label>',
          '      <input name="username" type="text"/>',
          '      <label for="username">Password</label>',
          '      <input name="password" type="password"/>',
          '      <input type="submit" value="Submit"/>',
          '      </form>',
          '    </div>',
          '  </body>',
          '</html>',
        ]} />

        <Step n={4} label="Dig into index.js" />
        <p className="text-gray-300 text-sm leading-relaxed">
          A <code className="bg-white/5 px-1 py-0.5 rounded text-xs">index.js</code> file is included. Inspecting it reveals base64-encoded credential checks:
        </p>
        <Terminal lines={[
          `(async()=>{await new Promise((e=>window.addEventListener`,
          `("load",e))),document.querySelector("form").addEventListener`,
          `("submit",(e=>{e.preventDefault();const r={u:"input[name=username]`,
          `",p:"input[name=password]"},t={};for(const e in r)t[e]=btoa`,
          `(document.querySelector(r[e]).value).replace(/=/g,"");`,
          `return"YWRtaW4"!==t.u?alert("Incorrect Username"):`,
          `"cGljb0NURns1M3J2M3JfNTNydjNyXzUzcnYzcl81M3J2M3JfNTNydjNyfQ"`,
          `!==t.p?alert("Incorrect Password"):void alert`,
          `(\`Correct Password! Your flag is \${atob(t.p)}.\`)}))})();`,
        ]} />

        <Step n={5} label="Decode the base64 password" />
        <p className="text-gray-300 text-sm leading-relaxed">
          The base64 string <code className="bg-white/5 px-1 py-0.5 rounded text-xs">cGljb0NURns1M3J2M3JfNTNydjNyXzUzcnYzcl81M3J2M3JfNTNydjNyfQ</code> decodes directly to the flag.
          The JS itself calls <code className="bg-white/5 px-1 py-0.5 rounded text-xs">atob(t.p)</code> and reveals it on correct submission.
        </p>
        <ZoomImage
          src="/assets/flag_login.png"
          alt="Flag displayed after successful login"
          caption="Flag displayed on dashboard"
          onOpen={setOpenImage}
        />

        <div className="mt-8" />
        <FlagReveal flag="picoCTF{53rv3r_53rv3r_53rv3r_53rv3r_53rv3r}" label="So the flag is" />

        <MindsetQuote
          label="WEB SECURITY"
          quote="Think like an attacker, build like a defender! Web exploitation teaches you to see beyond the surface. Every vulnerability is a teacher in disguise."
        />
      </WriteupShell>

      <ImageModal img={openImage} onClose={() => setOpenImage(null)} />
    </>
  )
}
