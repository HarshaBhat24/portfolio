'use client'

import { useState } from 'react'
import { Terminal as TerminalIcon } from 'lucide-react'
import { WriteupShell, Step, Terminal, ZoomImage, ImageModal, FlagReveal, MindsetQuote } from '@/components/WriteupShell'

export default function DontYouLoveBannersWriteup() {
  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null)

  return (
    <>
      <WriteupShell
        title="Don't You Love Banners"
        category="General"
        categoryHref="/ctf/general"
        difficulty="Medium"
        source="picoCTF"
        icon={<TerminalIcon className="h-6 w-6 text-primary-500" />}
      >
        <h2>Challenge Overview</h2>
        <div className="not-prose grid gap-3 mb-6">
          <div>
            <div className="text-gray-400 text-sm">Name</div>
            <div className="font-medium">don&apos;t-you-love-banners</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Description</div>
            <p className="mt-1 text-gray-200">
              Can you abuse the banner? The server has been leaking some crucial information on{' '}
              <code className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 break-all text-xs sm:text-sm">
                tethys.picoctf.net &lt;YOUR PORT&gt;
              </code>.
              Use the leaked information to get to the server. To connect to the running application use{' '}
              <code className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 break-all text-xs sm:text-sm">
                nc tethys.picoctf.net &lt;YOUR_PORT&gt;
              </code>.
              Note: the second port changes for each user session.
            </p>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Hints</div>
            <ul className="list-disc list-inside mt-1 text-gray-200 text-sm space-y-0.5">
              <li>Do you know about symlinks?</li>
              <li>Maybe some small password cracking or guessing.</li>
            </ul>
          </div>
        </div>

        <Step n={1} label="Connect to the leak service" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Start by connecting to the banner leak service to see what it exposes:
        </p>
        <Terminal lines={['$ nc tethys.picoctf.net <YOUR-PORT>']} />
        <ZoomImage
          src="/assets/dont-you-love-banners.png"
          alt="Banner leak output"
          caption="Password leaked in the banner"
          onOpen={setOpenImage}
        />

        <Step n={2} label="Use the leaked credentials" />
        <p className="text-gray-300 text-sm leading-relaxed">
          The banner leaks the password. Use it to connect to the main service (replace the port with the one shown in the challenge):
        </p>
        <Terminal lines={['$ nc tethys.picoctf.net <YOUR_PORT>']} />

        <Step n={3} label="Answer the security questions" />
        <p className="text-gray-300 text-sm leading-relaxed">
          After providing the correct password, the server asks two cybersecurity questions. Answer them correctly to proceed.
        </p>
        <ZoomImage
          src="/assets/dylb-nc.png"
          alt="Login prompts and symlink creation"
          caption="Login prompts after correct password"
          onOpen={setOpenImage}
        />

        <Step n={4} label="Investigate files — hit the permission wall" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Once inside, look around. Trying to read the flag directly returns permission denied — hint 2 nudges us toward a symlink trick.
        </p>
        <ZoomImage
          src="/assets/dylb-files.png"
          alt="File listing in working directory"
          caption="Files available in the working directory"
          onOpen={setOpenImage}
        />

        <Step n={5} label="Symlink the banner to the flag, then relogin" />
        <p className="text-gray-300 text-sm leading-relaxed">
          Replace the banner file with a symlink pointing to the flag, then reconnect so the service reads and prints it as the banner:
        </p>
        <Terminal lines={[
          '$ rm -f banner.txt',
          '$ ln -s /root/flag.txt banner.txt',
        ]} />
        <ZoomImage
          src="/assets/dylb-flag-banner.png"
          alt="Flag revealed via symlink banner"
          caption="Flag printed as the banner on reconnect"
          onOpen={setOpenImage}
        />

        <div className="mt-8" />
        <FlagReveal flag="picoCTF{b4nn3r_gr4bb1n9_su((3sfu11y_ed6f9c71}" label="So the flag is" />

        <MindsetQuote
          label="TAKEAWAY"
          quote="Writable paths plus symlinks are a classic combo. Always validate what files a service reads, not just where it reads from."
        />
      </WriteupShell>

      <ImageModal img={openImage} onClose={() => setOpenImage(null)} />
    </>
  )
}
