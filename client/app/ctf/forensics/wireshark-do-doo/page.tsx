'use client'

import { useState } from 'react'
import Image from 'next/image'
import { WriteupShell, Step, Terminal, ZoomImage, ImageModal, FlagReveal, MindsetQuote } from '@/components/WriteupShell'

export default function WiresharkDoDooWriteup() {
  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null)

  return (
    <>
      <WriteupShell
        title="Wireshark Do Doo"
        category="Forensics"
        categoryHref="/ctf/forensics"
        difficulty="Medium"
        source="picoCTF"
      >
        <h2>Challenge Overview</h2>
        <div className="not-prose grid gap-3 mb-6">
          <div>
            <div className="text-gray-400 text-sm">Name</div>
            <div className="font-medium">Wireshark Do Doo</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Description</div>
            <p className="mt-1 text-gray-200">
              Can you find the flag?{' '}
              <a
                href="https://mercury.picoctf.net/static/ae5b2bc07928fca272ff3900dc9a6cef/shark1.pcapng"
                className="text-blue-400 hover:underline"
              >
                shark1.pcapng
              </a>
            </p>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Hints</div>
            <ul className="list-disc list-inside mt-1">
              <li>[None]</li>
            </ul>
          </div>
        </div>

        <Step n={1} label="Open the capture in Wireshark" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Download the provided <code className="bg-white/5 px-1 py-0.5 rounded text-xs">shark1.pcapng</code> and open it in Wireshark.
          The capture contains 987 packets, 288 of which are HTTP.
        </p>
        <ZoomImage
          src="/assets/wireshark.png"
          alt="Wireshark overview"
          caption="Wireshark capture overview"
          onOpen={setOpenImage}
        />

        <Step n={2} label="Filter HTTP traffic" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Apply the <code className="bg-white/5 px-1 py-0.5 rounded text-xs">http</code> display filter to isolate HTTP packets.
        </p>

        <Step n={3} label="Export HTTP objects" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Navigate to <strong>File → Export Objects → HTTP</strong> and review each exported object. Two packets stand out as distinct from the others.
        </p>
        <ZoomImage
          src="/assets/export_wireshark.png"
          alt="HTTP object export dialog"
          caption="HTTP object extraction using Wireshark"
          onOpen={setOpenImage}
        />

        <Step n={4} label="Analyse packet 964" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Inspecting packet 964 leads to a dead end - no useful data.
        </p>
        <ZoomImage
          src="/assets/packet_analysis.png"
          alt="Packet 964 analysis"
          caption="Packet 964 - dead end"
          onOpen={setOpenImage}
        />

        <Step n={5} label="Analyse packet 827 - flag found" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Packet 827 contains the flag hidden as line-based text data (highlighted in the screenshot).
        </p>
        <ZoomImage
          src="/assets/packet_827.png"
          alt="Packet 827 with flag"
          caption="Packet 827 - flag visible as line-based text-data"
          onOpen={setOpenImage}
        />

        <Step n={6} label="Decode the Caesar cipher" />
        <p className="text-gray-300 text-sm leading-relaxed">
          The extracted text looks like a ROT-13 / Caesar cipher:
        </p>
        <Terminal lines={['Gur synt vf cvpbPGS{c33xno00_1_f33_h_qrnqorrs}']} />
        <p className="text-gray-300 text-sm leading-relaxed">
          Bruteforce with{' '}
          <a href="https://www.dcode.fr/caesar-cipher" className="text-blue-400 hover:underline">dcode.fr</a>{' '}
          or use{' '}
          <a href="https://github.com/HarshaBhat24/CipherCrack/" className="text-blue-400 hover:underline">CipherCrack</a>{' '}
          to decode it.
        </p>
        <ZoomImage
          src="/assets/caesar.png"
          alt="Caesar cipher solution"
          caption="Caesar cipher analysis and decryption"
          onOpen={setOpenImage}
        />

        <div className="mt-8" />
        <FlagReveal flag="picoCTF{p33kab00_1_s33_u_deadbeef}" label="So the flag is" />

        <MindsetQuote
          label="HACKER'S MINDSET"
          quote="Keep hacking, keep learning! Every packet tells a story, every flag is a lesson. The best hackers are the ones who never stop being curious."
        />
      </WriteupShell>

      <ImageModal img={openImage} onClose={() => setOpenImage(null)} />
    </>
  )
}
