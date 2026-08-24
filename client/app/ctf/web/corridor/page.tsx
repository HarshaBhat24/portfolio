'use client'

import { useState } from 'react'
import { WriteupShell, Step, Terminal, ZoomImage, ImageModal, FlagReveal, MindsetQuote } from '@/components/WriteupShell'

export default function CorridorWriteup() {
  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null)

  return (
    <>
      <WriteupShell
        title="Corridor"
        category="Web Exploitation"
        categoryHref="/ctf/web"
        difficulty="Easy"
        source="TryHackMe"
      >
        <h2>Challenge Overview</h2>
        <div className="not-prose grid gap-3 mb-6">
          <div>
            <div className="text-gray-400 text-sm">Name</div>
            <div className="font-medium">Corridor</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Description</div>
            <p className="mt-1 text-gray-200">
              You have found yourself in a strange corridor. Can you find your way back to where you came?
              Examine the URL endpoints you access as you navigate the website and note the hexadecimal values you find
              (they look an awful lot like a hash, don&apos;t they?).
            </p>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Vulnerability Type</div>
            <p className="mt-1 text-gray-200">Insecure Direct Object Reference (IDOR) / Predictable Resource Location</p>
          </div>
        </div>

        <hr className="border-white/10 my-4" />

        <Step n={1} label="Surface Enumeration" />
        <p className="text-gray-300 text-sm leading-relaxed">
          The application presents a visual corridor with multiple interactive doors. Clicking a door routes the application to an endpoint that looks like a 32-character hexadecimal string.
        </p>
        <ZoomImage
          src="/assets/hash_corridor.png"
          alt="Corridor doors interface"
          caption="Corridor application with hash-based door URLs"
          onOpen={setOpenImage}
        />

        <Step n={2} label="Pattern Recognition" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Analyzing the endpoints reveals the hash format is <strong>MD5</strong>. Cracking the hashes shows they map to sequential integers:{' '}
          <code className="bg-white/5 px-1 py-0.5 rounded text-xs">1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13</code> (and a random <code className="bg-white/5 px-1 py-0.5 rounded text-xs">35</code>).
          Testing hash for <code className="bg-white/5 px-1 py-0.5 rounded text-xs">7</code> confirms no access controls exist.
        </p>

        <Step n={3} label="Logic Deduction" />
        <p className="text-gray-300 text-sm leading-relaxed">
          The objective states: <em>&quot;find your way back to where you came.&quot;</em> The sequence iterates forward.
          In computing, array indexes originate at <code className="bg-white/5 px-1 py-0.5 rounded text-xs">0</code> — the space before the first door is the root index.
        </p>

        <Step n={4} label="Payload Generation & Execution" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Generate the MD5 hash for the string <code className="bg-white/5 px-1 py-0.5 rounded text-xs">0</code>:
        </p>
        <Terminal lines={[
          '$ echo -n "0" | md5sum',
          'cfcd208495d565ef66e7dff9f98764da',
        ]} />
        <p className="text-gray-300 text-sm leading-relaxed">
          Append this hash to the base URL of the target application to bypass the intended boundaries.
        </p>
        <ZoomImage
          src="/assets/zero_hash.png"
          alt="Flag displayed after successful IDOR"
          caption="Flag revealed by navigating to hash of '0'"
          onOpen={setOpenImage}
        />

        <Step n={5} label="Extraction" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Accessing the crafted endpoint drops us into the origin room, exposing the flag.
        </p>

        <div className="mt-8" />
        <FlagReveal flag="flag{enter_your_flags}" label="Target Compromised" />

        <MindsetQuote
          label="SENTINAL LOG"
          quote="Security by obscurity is a failure in design. Predictable resource locations allow adversaries to map your entire application logic. Always check index zero."
          accentColor="red"
        />
      </WriteupShell>

      <ImageModal img={openImage} onClose={() => setOpenImage(null)} />
    </>
  )
}