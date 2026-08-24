'use client'

import { useState } from 'react'
import { WriteupShell, Step, Terminal, ZoomImage, ImageModal, FlagReveal, MindsetQuote } from '@/components/WriteupShell'

export default function LaCifraDeWriteup() {
  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null)

  return (
    <>
      <WriteupShell
        title="La Cifra De"
        category="Cryptography"
        categoryHref="/ctf/crypto"
        difficulty="Medium"
        source="picoCTF"
      >
        <h2>Challenge Overview</h2>
        <div className="not-prose grid gap-3 mb-6">
          <div>
            <div className="text-gray-400 text-sm">Name</div>
            <div className="font-medium">la cifra de</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Description</div>
            <p className="mt-1 text-gray-200">
              I found this cipher in an old book. Can you figure out what it says? Connect with{' '}
              <code className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 break-all text-xs sm:text-sm">
                nc jupiter.challenges.picoctf.org 58295
              </code>
            </p>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Hints</div>
            <ul className="list-disc list-inside mt-1 text-gray-200 text-sm space-y-0.5">
              <li>There are tools that make this easy.</li>
              <li>Perhaps looking at history will help.</li>
            </ul>
          </div>
        </div>

        <Step n={1} label="Connect with netcat" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Connect to the remote service using netcat:
        </p>
        <Terminal lines={['$ nc jupiter.challenges.picoctf.org 58295']} />
        <p className="text-gray-300 text-sm leading-relaxed">
          You will have a different port number — check the challenge page.
        </p>

        <Step n={2} label="Inspect the ciphertext" />
        <ZoomImage
          src="/assets/netcat_res.png"
          alt="Netcat response for La Cifra De"
          caption="Ciphertext received via netcat"
          onOpen={setOpenImage}
        />
        <p className="text-gray-300 text-sm leading-relaxed">
          The output is clearly some form of encryption. The next task is to identify which cipher it is.
        </p>

        <Step n={3} label="Identify the cipher" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Use the cipher identifier at{' '}
          <a href="https://www.dcode.fr/cipher-identifier" target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-primary-200 underline underline-offset-2">dcode.fr</a>:
        </p>
        <ZoomImage
          src="/assets/cipher_identifier.png"
          alt="Cipher identifier result"
          caption="dcode.fr cipher identifier output"
          onOpen={setOpenImage}
        />
        <p className="text-gray-300 text-sm leading-relaxed">
          Top candidates: Vigenère, Autokey, Beaufort, Rozier. We&apos;ll check them one by one.
        </p>

        <Step n={4} label="Spot the flag format in the ciphertext" />
        <p className="text-gray-300 text-sm leading-relaxed">
          In the ciphertext one line contains a partial flag format:
        </p>
        <Terminal lines={[
          'Ltc tnj tmvqpmkseaznzn uk ehox nivmpr g ylbrj ts ltcmki my yqtdosr tnj wocjc hgqq ol fy',
          'oxitngwj arusahje fuw ln guaaxjytrd catizm tzxbkw zf vqlckx hizm ceyupcz yz tnj fpvjc',
          'hgqqpohzCZK{m311a50_0x_a1rn3x3_h1ah3xf966878l}',
        ]} />
        <p className="text-gray-300 text-sm leading-relaxed">
          We can see the flag format <code className="bg-white/5 px-1 py-0.5 rounded text-xs">hgqqpohzCZK&#123;...&#125;</code>. In picoCTF the format is{' '}
          <code className="bg-white/5 px-1 py-0.5 rounded text-xs">picoCTF&#123;...&#125;</code> — so this line contains the encoded flag.
        </p>

        <Step n={5} label="Decode with Vigenère" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Use{' '}
          <a href="https://www.dcode.fr/vigenere-cipher" target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-primary-200 underline underline-offset-2">Vigenère decoder</a>{' '}
          on the flag line to extract the plaintext flag.
        </p>
        <ZoomImage
          src="/assets/vignere_sol.png"
          alt="Vigenère solution"
          caption="Vigenère cipher decoded — flag recovered"
          onOpen={setOpenImage}
        />

        <div className="mt-8" />
        <FlagReveal flag="picoCTF{b311a50_0r_v1gn3r3_c1ph3ra966878a}" label="So the flag is" />

        <MindsetQuote
          label="CRYPTO MASTERY"
          quote="Crypto is poetry in code! Master the classics, break the ciphers, and remember: every algorithm has a weakness waiting to be discovered."
        />
      </WriteupShell>

      <ImageModal img={openImage} onClose={() => setOpenImage(null)} />
    </>
  )
}
