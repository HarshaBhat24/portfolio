'use client'

import { useState } from 'react'
import Image from 'next/image'
import { WriteupShell, Step, Terminal, ZoomImage, ImageModal, FlagReveal, MindsetQuote, Badge } from '@/components/WriteupShell'

export default function FlagInFlameWriteup() {
  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null)

  return (
    <>
      <WriteupShell
        title="Flag in Flame"
        category="Forensics"
        categoryHref="/ctf/forensics"
        difficulty="Easy"
        source="picoCTF"
      >
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
              When they opened it, they found an enormous block of encoded text instead of
              typical logs. Could there be something hidden within? Your mission is to inspect
              the resulting file and reveal the real purpose of it.{' '}
              <a
                href="https://challenge-files.picoctf.net/c_amiable_citadel/5da19ac1eabba5f0b9287e4a5675612e5bbffc68aaa8fa54c58ebd5ce81e29fd/logs.txt"
                className="text-blue-400 hover:underline"
              >
                Download Logs Data
              </a>
            </p>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Hints</div>
            <ul className="list-disc list-inside mt-1 text-gray-200">
              <li>Use <a href="https://en.wikipedia.org/wiki/Base64" className="text-blue-400 hover:underline">base64</a> to decode the data and generate the image file.</li>
            </ul>
          </div>
        </div>

        <Step n={1} label="Download the file" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Download the provided <code className="bg-white/5 px-1 py-0.5 rounded text-xs">logs.txt</code> and inspect it - it contains a large block of encoded text instead of real log entries.
        </p>

        <Step n={2} label="Decode base64 to image" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Decode the base64 data and pipe it to a PNG file:
        </p>
        <Terminal lines={['$ base64 -d logs.txt > out.png']} />

        <Step n={3} label="Inspect the resulting image" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Opening <code className="bg-white/5 px-1 py-0.5 rounded text-xs">out.png</code> reveals hex numbers embedded in the image.
        </p>
        <ZoomImage
          src="/assets/converted-img.png"
          alt="base64 decoded image"
          caption="Decoded image containing hex data"
          onOpen={setOpenImage}
        />

        <Step n={4} label="Identify the hex content" />
        <p className="text-gray-300 text-sm leading-relaxed">
          The image shows hex-encoded bytes. Read them out and decode with <code className="bg-white/5 px-1 py-0.5 rounded text-xs">xxd</code>:
        </p>

        <Step n={5} label="Decode the hex to plaintext" />
        <Terminal lines={[
          '$ xxd -r -p <<< "7069636F4354467B666F72656E736963735F616E616C797369735F\\',
          '69735F616D617A696E675F62396163346362397D"',
        ]} />
        <ZoomImage
          src="/assets/hex_decode.png"
          alt="Hex decode output"
          caption="Flag recovered from hex decode"
          onOpen={setOpenImage}
        />
        <p className="text-gray-300 text-sm leading-relaxed">
          The decoded output is the flag.
        </p>

        <div className="mt-8" />
        <FlagReveal flag="picoCTF{forensics_analysis_is_amazing_b9ac4cb9}" label="So the flag is" />

        <MindsetQuote
          label="HACKER'S MINDSET"
          quote="The smallest detail can reveal the biggest secrets. Master the art of data analysis, and you'll uncover what others miss."
        />
      </WriteupShell>

      <ImageModal img={openImage} onClose={() => setOpenImage(null)} />
    </>
  )
}
