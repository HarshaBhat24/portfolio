'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

const navItems = [
  { name: 'home',           href: '/#home' },
  { name: 'about',          href: '/#about' },
  { name: 'experience',     href: '/#experience' },
  { name: 'skills',         href: '/#skills' },
  { name: 'projects',       href: '/#projects' },
  { name: 'ctf',            href: '/#ctf' },
  { name: 'contact',        href: '/#contact' },
]

const Navbar = () => {
  const [isOpen,        setIsOpen]        = useState(false)
  const [scrolled,      setScrolled]      = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sectionIds = navItems.map(i => i.name).concat(['certifications', 'hobbies'])
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const { top, bottom } = el.getBoundingClientRect()
          if (top <= 120 && bottom >= 120) {
            // Map certifications/hobbies to their nearest nav item
            setActiveSection(
              id === 'certifications' ? 'experience' :
              id === 'hobbies'        ? 'contact'    : id
            )
            break
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-terminal-bg/95 backdrop-blur-md border-b border-terminal-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/#home" className="flex items-center gap-1.5 group">
            <span className="font-mono text-base font-medium">
              <span className="text-amber-400/40">~/</span>
              <span className="text-amber-400 group-hover:text-amber-300 transition-colors">harsha</span>
            </span>
            <span className="w-[7px] h-[18px] bg-amber-400 rounded-sm animate-cursor-blink" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center">
            {navItems.map((item) => {
              const isActive = activeSection === item.name
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative font-mono text-xs px-3 py-5 transition-colors duration-200 ${
                    isActive ? 'text-amber-400' : 'text-ink-300 hover:text-ink-100'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-px bg-amber-400 rounded-full" />
                  )}
                </a>
              )
            })}
          </div>

          {/* Mobile toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(prev => !prev)}
            className="md:hidden p-2 text-ink-300 hover:text-amber-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-terminal-surface border-t border-terminal-border">
          <div className="px-6 py-4 space-y-0.5">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 font-mono text-sm py-3 border-b border-terminal-border last:border-0 transition-colors ${
                  activeSection === item.name ? 'text-amber-400' : 'text-ink-300'
                }`}
              >
                <span className="text-amber-400/40 text-xs">$</span>
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
