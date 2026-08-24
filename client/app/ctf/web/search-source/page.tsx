'use client'

import { useState } from 'react'
import { WriteupShell, Step, Terminal, ZoomImage, ImageModal, FlagReveal, MindsetQuote } from '@/components/WriteupShell'

export default function SearchSourceWriteup() {
  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null)

  return (
    <>
      <WriteupShell
        title="Search Source"
        category="Web Exploitation"
        categoryHref="/ctf/web"
        difficulty="Medium"
        source="picoCTF"
      >
        <h2>Challenge Overview</h2>
        <div className="not-prose grid gap-3 mb-6">
          <div>
            <div className="text-gray-400 text-sm">Name</div>
            <div className="font-medium">Search Source</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Description</div>
            <p className="mt-1 text-gray-200">
              The developer of this website mistakenly left an important artifact in the website source, can you find it?{' '}
              <code className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 break-all text-xs sm:text-sm">
                http://saturn.picoctf.net:58065/
              </code>
              <br /><span className="text-gray-400 text-xs">(Note: URL differs per instance)</span>
            </p>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Hint</div>
            <p className="text-gray-200 text-sm mt-1">
              How could you mirror the website on your local machine so you could use more powerful tools for searching?
            </p>
          </div>
        </div>

        <Step n={1} label="Open the website and inspect source" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Launch the instance and open the website URL. Open the browser developer tools (right-click → Inspect or F12) and browse the source.
        </p>
        <ZoomImage
          src="/assets/source_code.png"
          alt="Website source code"
          caption="Source code viewed in browser DevTools"
          onOpen={setOpenImage}
        />

        <Step n={2} label="Spot the exposed API key" />
        <p className="text-gray-300 text-sm leading-relaxed">
          In the source code a Google Maps API key is visible:
        </p>
        <Terminal lines={['API Key: AIzaSyA8eaHt9Dh5H57Zh0xVTqxVdBFCvFMqFjQ']} />
        <p className="text-gray-300 text-sm leading-relaxed">
          Keep this aside - it may be useful later.
        </p>

        <Step n={3} label="Mirror the website locally with wget" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Download the entire site for offline grep searching:
        </p>
        <Terminal lines={['$ wget -r -np -k -E http://saturn.picoctf.net:58065/']} />
        <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside mt-2">
          <li><code className="bg-white/5 px-1 rounded text-xs">-r</code> - recursive download</li>
          <li><code className="bg-white/5 px-1 rounded text-xs">-np</code> - no parent (don&apos;t ascend)</li>
          <li><code className="bg-white/5 px-1 rounded text-xs">-k</code> - convert links for local viewing</li>
          <li><code className="bg-white/5 px-1 rounded text-xs">-E</code> - adjust HTML file extensions</li>
        </ul>

        <Step n={4} label="Grep for the flag" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Search all downloaded files for the flag format:
        </p>
        <Terminal lines={['$ grep -r "picoCTF" .']} />
        <p className="text-gray-300 text-sm leading-relaxed">
          This recursively searches all files in the current directory for the string <code className="bg-white/5 px-1 py-0.5 rounded text-xs">picoCTF</code>.
        </p>
        <ZoomImage
          src="/assets/grep_result.png"
          alt="grep result showing flag"
          caption="Flag found in grep search results"
          onOpen={setOpenImage}
        />

        <div className="mt-8" />
        <FlagReveal flag="picoCTF{1nsp3ti0n_0f_w3bpag3s_8de925a7}" label="So the flag is" />

        <MindsetQuote
          label="WEB SECURITY"
          quote="Never underestimate the power of inspection! Hidden secrets lurk in plain sight - developers must always encrypt sensitive data, shield API keys in secure vaults, and remember: the source code is your greatest teacher and your most dangerous adversary."
        />
      </WriteupShell>

      <ImageModal img={openImage} onClose={() => setOpenImage(null)} />
    </>
  )
}
