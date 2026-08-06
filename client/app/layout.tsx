import './globals.css'
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import Navbar from '@/components/Navbar'

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
  title: 'S Harsha Bhat',
  description:
    'Portfolio of S Harsha Bhat - Cybersecurity professional, VAPT specialist, and CTF competitor.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
