'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  pulse: number
  pulseSpeed: number
}

export default function CyberGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const animFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const colors = ['#F5A623', '#FF2D78', '#00D4AA', '#A8FF3E', '#F5A623']
    const particles: Particle[] = []
    const MAX_DIST = 130
    const MOUSE_RADIUS = 160

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create particles
    const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 10000), 80)
    for (let i = 0; i < count; i++) {
      particles.push({
        x:          Math.random() * canvas.width,
        y:          Math.random() * canvas.height,
        vx:         (Math.random() - 0.5) * 0.35,
        vy:         (Math.random() - 0.5) * 0.35,
        size:       Math.random() * 1.5 + 0.5,
        opacity:    Math.random() * 0.4 + 0.15,
        color:      colors[Math.floor(Math.random() * colors.length)],
        pulse:      Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      })
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update + draw particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.pulse += p.pulseSpeed

        // Bounce
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // Mouse repulsion
        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS) {
          const force = (1 - dist / MOUSE_RADIUS) * 1.5
          p.vx += (dx / dist) * force * 0.05
          p.vy += (dy / dist) * force * 0.05
        }

        const pulseOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.round(pulseOpacity * 255).toString(16).padStart(2, '0')
        ctx.fill()
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.12
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(245, 166, 35, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Mouse attraction lines
      for (const p of particles) {
        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS * 0.7) {
          const alpha = (1 - dist / (MOUSE_RADIUS * 0.7)) * 0.25
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.current.x, mouse.current.y)
          ctx.strokeStyle = `rgba(0, 212, 170, ${alpha})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }

      animFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
