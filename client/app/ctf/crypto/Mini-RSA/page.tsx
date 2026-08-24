'use client'

import { useState } from 'react'
import { WriteupShell, Step, Terminal, ZoomImage, ImageModal, FlagReveal, MindsetQuote } from '@/components/WriteupShell'

export default function MiniRSAWriteup() {
  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null)

  return (
    <>
      <WriteupShell
        title="Mini RSA"
        category="Cryptography"
        categoryHref="/ctf/crypto"
        difficulty="Medium"
        source="picoCTF"
      >
        <h2>Challenge Overview</h2>
        <div className="not-prose grid gap-3 mb-6">
          <div>
            <div className="text-gray-400 text-sm">Name</div>
            <div className="font-medium">Mini RSA</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Description</div>
            <p className="mt-1 text-gray-200">
              What happens if you have a small exponent? There is a twist though, we padded the plaintext so that{' '}
              <code className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 break-all text-xs sm:text-sm">M ** e</code>{' '}
              is just barely larger than{' '}
              <code className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 break-all text-xs sm:text-sm">N</code>.
              Let&apos;s decrypt this.
            </p>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Hints</div>
            <ul className="list-disc list-inside mt-1 text-gray-200 text-sm space-y-0.5">
              <li>RSA tutorial</li>
              <li>How could having too small of an <em>e</em> affect the security of this key?</li>
              <li>Make sure you don&apos;t lose precision — the numbers are pretty big (besides the e value)</li>
              <li>You shouldn&apos;t have to make too many guesses</li>
              <li>pico is in the flag, but not at the beginning</li>
            </ul>
          </div>
        </div>

        <Step n={1} label="Inspect the key material" />
        <p className="text-gray-300 text-sm leading-relaxed">
          The RSA public exponent is only <code className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 break-all text-xs sm:text-sm">e = 3</code>,
          meaning the message only needs a tiny wrap-around count to land back in a perfect cube.
        </p>
        <ZoomImage
          src="/assets/values_RSA.png"
          alt="RSA values and ciphertext"
          caption="RSA public values (e, N, c)"
          onOpen={setOpenImage}
        />

        <Step n={2} label="Brute-force the wrap count" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Instead of factoring the modulus, we test small values of <code className="bg-white/5 px-1 py-0.5 rounded text-xs">k</code> in{' '}
          <code className="bg-white/5 px-1 py-0.5 rounded text-xs">M³ = c + kN</code> until the result becomes a perfect cube:
        </p>
        <ZoomImage
          src="/assets/python_script.png"
          alt="Python brute-force script"
          caption="Python script testing wrap counts"
          onOpen={setOpenImage}
        />

        <Step n={3} label="Recover the plaintext" />
        <p className="text-gray-300 text-sm leading-relaxed">
          The exact integer cube root lands immediately, so the plaintext drops out cleanly once we convert
          the recovered integer back into bytes.
        </p>
        <ZoomImage
          src="/assets/flag_RSA.png"
          alt="Recovered Mini RSA flag"
          caption="Recovered flag from cube root attack"
          onOpen={setOpenImage}
        />

        <div className="mt-8" />
        <FlagReveal flag="picoCTF{e_sh0uld_b3_lArg3r_92f4d5a5}" label="So the flag is" />

        <MindsetQuote
          label="RSA ATTACK SURFACE"
          quote="Small exponents are only safe when the message is padded correctly. If the plaintext can be coaxed into a low-degree root, the math gives the flag away."
        />
      </WriteupShell>

      <ImageModal img={openImage} onClose={() => setOpenImage(null)} />
    </>
  )
}
