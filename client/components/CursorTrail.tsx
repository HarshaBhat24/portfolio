'use client'

import { useEffect, useRef } from 'react'

/**
 * Zero-React-re-render cursor:
 * - The trail is drawn on a canvas via requestAnimationFrame
 * - The main dot + ring are plain DOM elements mutated directly via refs
 * This bypasses React state entirely → no jank, buttery smooth at 60fps
 */
export default function CursorTrail() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const dotRef     = useRef<HTMLDivElement>(null)
  const ringRef    = useRef<HTMLDivElement>(null)
  const rafRef     = useRef<number>(0)

  useEffect(() => {
    // Only on pointer devices
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return

    const canvas = canvasRef.current
    const dot    = dotRef.current
    const ring   = ringRef.current
    if (!canvas || !dot || !ring) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Size canvas to full viewport
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Shared mutable state - no React useState
    const mouse     = { x: -300, y: -300 }
    let   hovering  = false

    // Trail: circular buffer of {x, y, age} objects
    const TRAIL_LEN = 20
    const trail: { x: number; y: number; age: number }[] = []

    const colors = ['#F5A623', '#00D4AA', '#FF2D78']

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY

      const target = e.target as HTMLElement
      hovering =
        target.tagName === 'A'      ||
        target.tagName === 'BUTTON' ||
        !!target.closest('a')       ||
        !!target.closest('button')

      // Move dot + ring directly (no React re-render)
      if (dot) {
        dot.style.left = `${mouse.x}px`
        dot.style.top  = `${mouse.y}px`
      }
      if (ring) {
        ring.style.left   = `${mouse.x}px`
        ring.style.top    = `${mouse.y}px`
        ring.style.width  = hovering ? '38px' : '26px'
        ring.style.height = hovering ? '38px' : '26px'
        ring.style.borderColor = hovering
          ? 'rgba(0,212,170,0.75)'
          : 'rgba(245,166,35,0.6)'
        ring.style.boxShadow = hovering
          ? '0 0 10px rgba(0,212,170,0.35)'
          : '0 0 6px rgba(245,166,35,0.25)'
      }

      // Push to trail
      trail.push({ x: mouse.x, y: mouse.y, age: 0 })
      if (trail.length > TRAIL_LEN) trail.shift()
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Age all trail points and draw
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i]
        p.age += 1

        const progress = i / trail.length          // 0 = oldest, 1 = newest
        const alpha    = progress * progress * 0.55 // quadratic fade
        const radius   = 2 + progress * 3

        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = colors[i % 3] + Math.round(alpha * 255).toString(16).padStart(2, '0')
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      {/* Canvas trail - drawn purely in canvas, zero React updates */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
        aria-hidden="true"
      />

      {/* Ring - mutated directly via ref */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed pointer-events-none z-[9999]"
        style={{
          width:         26,
          height:        26,
          borderRadius:  '50%',
          border:        '1px solid rgba(245,166,35,0.6)',
          transform:     'translate(-50%, -50%)',
          transition:    'width 0.18s ease, height 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease',
          left:          -300,
          top:           -300,
          pointerEvents: 'none',
        }}
      />

      {/* Core dot - mutated directly via ref */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed pointer-events-none z-[9999]"
        style={{
          width:         5,
          height:        5,
          borderRadius:  '50%',
          background:    '#F5A623',
          transform:     'translate(-50%, -50%)',
          boxShadow:     '0 0 6px #F5A623',
          left:          -300,
          top:           -300,
          pointerEvents: 'none',
        }}
      />
    </>
  )
}
