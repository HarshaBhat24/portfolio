'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Terminal } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { name: 'home',       href: '/#home'       },
  { name: 'about',      href: '/#about'      },
  { name: 'experience', href: '/#experience' },
  { name: 'skills',     href: '/#skills'     },
  { name: 'projects',   href: '/#projects'   },
  { name: 'ctf',        href: '/#ctf'        },
  { name: 'contact',    href: '/#contact'    },
]

export default function Navbar() {
  const [isOpen,        setIsOpen]        = useState(false)
  const [scrolled,      setScrolled]      = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sectionIds = navItems.map(i => i.name).concat(['certifications', 'hobbies'])
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id)
        if (el) {
          const { top } = el.getBoundingClientRect()
          if (top <= 140) {
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
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-terminal-border/60'
          : 'bg-transparent'
      }`}
      style={scrolled ? {
        background: 'rgba(5, 5, 8, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      } : {}}
    >
      {/* Glow line under nav */}
      {scrolled && (
        <div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(245,166,35,0.2), transparent)',
          }}
        />
      )}

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/#home" className="flex items-center gap-1.5 group" id="nav-logo">
            <Terminal size={14} className="text-amber-400/60 group-hover:text-amber-400 transition-colors" />
            <span className="font-mono text-base font-medium">
              <span className="text-amber-400/40">~/</span>
              <span className="text-amber-400 group-hover:text-amber-300 transition-colors">harsha</span>
            </span>
            <span className="w-[7px] h-[16px] bg-amber-400 rounded-sm animate-cursor-blink" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map(item => {
              const isActive = activeSection === item.name
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative font-mono text-xs px-3.5 py-5 transition-colors duration-200 group ${
                    isActive ? 'text-amber-400' : 'text-ink-400 hover:text-ink-100'
                  }`}
                >
                  {item.name}
                  {/* Active underline with animation */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-3.5 left-2 right-2 h-px rounded-full"
                      style={{ background: 'linear-gradient(90deg, #F5A623, #00D4AA)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Hover dot */}
                  {!isActive && (
                    <span className="absolute bottom-3.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400/40 transition-all duration-200" />
                  )}
                </a>
              )
            })}

            {/* CTF link external pill */}
            <a
              href="/ctf"
              className="ml-2 font-mono text-xs px-3 py-1.5 rounded-full border border-amber-400/25 text-amber-400/80 hover:text-amber-400 hover:border-amber-400/50 hover:bg-amber-400/06 transition-all duration-200"
            >
              /ctf
            </a>
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-terminal-border"
            style={{
              background: 'rgba(5, 5, 8, 0.97)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="px-6 py-4 space-y-0.5">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 font-mono text-sm py-3 border-b border-terminal-border/50 last:border-0 transition-colors ${
                    activeSection === item.name ? 'text-amber-400' : 'text-ink-300 hover:text-ink-100'
                  }`}
                >
                  <span className="text-amber-400/30 text-xs">{'>'}</span>
                  {item.name}
                  {activeSection === item.name && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
