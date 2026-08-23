import './globals.css'
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import Navbar          from '@/components/Navbar'
import CyberGrid       from '@/components/CyberGrid'
import CursorTrail     from '@/components/CursorTrail'
import ScrollProgress  from '@/components/ScrollProgress'
import CommandPalette  from '@/components/CommandPalette'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = {
  title:       'S Harsha Bhat - Security Researcher',
  description: 'Portfolio of S Harsha Bhat - Cybersecurity professional, VAPT specialist, CTF competitor, and offensive security researcher.',
  keywords:    'cybersecurity, penetration testing, VAPT, CTF, security research, bug bounty',
  openGraph: {
    title:       'S Harsha Bhat - Security Researcher',
    description: 'Offensive & Defensive Security Professional',
    type:        'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <body>
        <CyberGrid />
        <CursorTrail />
        <ScrollProgress />
        <CommandPalette />
        <Navbar />
        <main className="min-h-screen relative z-10">{children}</main>
      </body>
    </html>
  )
}
