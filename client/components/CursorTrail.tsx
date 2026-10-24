'use client'

import { useEffect, useRef } from 'react'

// ─── Tuneable config ──────────────────────────────────────────────────────────
const CONFIG = {
  nebula: {
    speed:   0.011,
    opacity: 70,
    colorR:  80,
    colorG:  40,
    colorB:  8,
  },
  trail: {
    stampRadius:     22,
    fireProbability: 0.50,
    followLag:       0.30,
    minSize:         1.2,
    maxSize:         3.4,
    decayRate:       0.014,
    minMoveToStamp:  1.3,
    // Amber gradient
    colorMin: { r: 180, g: 80,  b: 0  },
    colorMax: { r: 255, g: 200, b: 60 },
    // Accent colours (teal + pink) injected at random
    accentColors: [
      { r: 0,   g: 212, b: 170 },
      { r: 255, g: 45,  b: 120 },
    ],
    accentProbability: 0.18,
  },
  burst: {
    count:      55,
    speedMin:   1.5,
    speedMax:   5.5,
    sizeMin:    1.5,
    sizeMax:    4.0,
    decayMult:  0.35,
  },
}

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number
  alpha: number
  decay: number
  color: string
}

function buildNoiseField(size: number, t: number): Float32Array {
  const field = new Float32Array(size * size)
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const u = col / size
      const v = row / size
      field[row * size + col] =
        Math.sin((u * 4 + t * 0.14) * Math.PI) *
        Math.cos((v * 3 - t * 0.09) * Math.PI) +
        Math.sin(u * 7 - v * 5 + t * 0.19) * 0.4
    }
  }
  return field
}

export default function CursorTrail() {
  const nebulaRef = useRef<HTMLCanvasElement>(null)
  const trailRef  = useRef<HTMLCanvasElement>(null)
  const burstRef  = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return

    const nebulaCanvas = nebulaRef.current
    const trailCanvas  = trailRef.current
    const burstCanvas  = burstRef.current
    if (!nebulaCanvas || !trailCanvas || !burstCanvas) return

    const nebulaCtx = nebulaCanvas.getContext('2d')
    const trailCtx  = trailCanvas.getContext('2d')
    const burstCtx  = burstCanvas.getContext('2d')
    if (!nebulaCtx || !trailCtx || !burstCtx) return

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      nebulaCanvas.width  = w; nebulaCanvas.height = h
      trailCanvas.width   = w; trailCanvas.height  = h
      burstCanvas.width   = w; burstCanvas.height  = h
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Nebula offscreen texture ──────────────────────────────────────────────
    const NOISE_SIZE = 64
    const offscreen  = document.createElement('canvas')
    offscreen.width  = NOISE_SIZE
    offscreen.height = NOISE_SIZE
    const offCtx     = offscreen.getContext('2d')!
    const imgData    = offCtx.createImageData(NOISE_SIZE, NOISE_SIZE)
    let nebulaTime   = 0

    const drawNebula = () => {
      nebulaTime += CONFIG.nebula.speed
      const field = buildNoiseField(NOISE_SIZE, nebulaTime)
      for (let i = 0; i < field.length; i++) {
        const norm = Math.max(0, Math.min(1, (field[i] + 1.6) / 3.2))
        imgData.data[i * 4 + 0] = Math.round(norm * CONFIG.nebula.colorR)
        imgData.data[i * 4 + 1] = Math.round(norm * CONFIG.nebula.colorG)
        imgData.data[i * 4 + 2] = Math.round(norm * CONFIG.nebula.colorB)
        imgData.data[i * 4 + 3] = Math.round(Math.max(0, norm - 0.4) * CONFIG.nebula.opacity)
      }
      offCtx.putImageData(imgData, 0, 0)
      nebulaCtx.clearRect(0, 0, nebulaCanvas.width, nebulaCanvas.height)
      nebulaCtx.drawImage(offscreen, 0, 0, nebulaCanvas.width, nebulaCanvas.height)
    }

    // ── Particle factory ──────────────────────────────────────────────────────
    const particles: Particle[] = []
    const bursts:    Particle[] = []

    const mkParticle = (x: number, y: number, vx: number, vy: number): Particle => {
      const t    = CONFIG.trail
      const size = t.minSize + Math.random() * (t.maxSize - t.minSize)
      const sT   = (size - t.minSize) / (t.maxSize - t.minSize)
      const rnd  = Math.random()
      let r: number, g: number, b: number
      if (Math.random() < t.accentProbability) {
        const acc = t.accentColors[Math.floor(Math.random() * t.accentColors.length)]
        r = acc.r; g = acc.g; b = acc.b
      } else {
        r = Math.round(t.colorMin.r + rnd * (t.colorMax.r - t.colorMin.r))
        g = Math.round(t.colorMin.g + rnd * (t.colorMax.g - t.colorMin.g))
        b = Math.round(t.colorMin.b + rnd * (t.colorMax.b - t.colorMin.b))
      }
      return {
        x, y,
        vx: vx + (Math.random() - 0.5) * 1.8,
        vy: vy + (Math.random() - 0.5) * 1.8,
        size,
        alpha: (1 - sT * 0.6) * (Math.random() * 0.5 + 0.5),
        decay: t.decayRate * (0.6 + Math.random() * 0.8),
        color: `rgba(${r},${g},${b},`,
      }
    }

    const mkBurst = (cx: number, cy: number, angle: number, speed: number): Particle => {
      const b    = CONFIG.burst
      const size = b.sizeMin + Math.random() * (b.sizeMax - b.sizeMin)
      const pal  = [
        { r: 245, g: 166, b: 35  },
        { r: 0,   g: 212, b: 170 },
        { r: 255, g: 45,  b: 120 },
      ]
      const col = pal[Math.floor(Math.random() * pal.length)]
      return {
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size,
        alpha: Math.random() * 0.6 + 0.5,
        decay: CONFIG.trail.decayRate * b.decayMult * (0.8 + Math.random() * 0.4),
        color: `rgba(${col.r},${col.g},${col.b},`,
      }
    }

    // ── Mouse tracking ────────────────────────────────────────────────────────
    let mouseX = -999, mouseY = -999
    let lerpX  = -999, lerpY  = -999
    let prevX  = -999, prevY  = -999
    let active = false

    const onMove = (x: number, y: number) => {
      mouseX = x; mouseY = y
      if (!active) { lerpX = x; lerpY = y; prevX = x; prevY = y; active = true }
    }
    const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY)
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]; if (t) onMove(t.clientX, t.clientY)
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    // ── Click burst on interactive elements ───────────────────────────────────
    const INTERACTIVE = 'button, a, [role="button"], input[type="submit"], input[type="button"], label'
    const spawnBurst = (rect: DOMRect) => {
      const cx = rect.left + rect.width  / 2
      const cy = rect.top  + rect.height / 2
      const { count, speedMin, speedMax } = CONFIG.burst
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = speedMin + Math.random() * (speedMax - speedMin)
        bursts.push(mkBurst(cx, cy, angle, speed))
      }
    }
    const onPointerDown = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(INTERACTIVE)
      if (el) spawnBurst(el.getBoundingClientRect())
    }
    window.addEventListener('pointerdown', onPointerDown)

    // ── Particle renderer ─────────────────────────────────────────────────────
    const drawParticles = (ctx: CanvasRenderingContext2D, list: Particle[]) => {
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i]
        p.alpha -= p.decay
        if (p.alpha <= 0) { list.splice(i, 1); continue }
        p.x += p.vx; p.y += p.vy
        p.vx *= 0.97; p.vy *= 0.97
        ctx.fillStyle = p.color + p.alpha.toFixed(3) + ')'
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size)
      }
    }

    // ── Animation loop ────────────────────────────────────────────────────────
    let raf = 0
    const frame = () => {
      drawNebula()

      trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height)
      if (active) {
        lerpX += (mouseX - lerpX) * CONFIG.trail.followLag
        lerpY += (mouseY - lerpY) * CONFIG.trail.followLag
        const dist = Math.hypot(lerpX - prevX, lerpY - prevY)
        if (dist >= CONFIG.trail.minMoveToStamp) {
          const vx = (lerpX - prevX) * 0.12
          const vy = (lerpY - prevY) * 0.12
          const count = Math.min(100, Math.floor(dist * CONFIG.trail.fireProbability * 3.5))
          for (let i = 0; i < count; i++) {
            const angle  = Math.random() * Math.PI * 2
            const radius = Math.pow(Math.random(), 2) * CONFIG.trail.stampRadius
            const px = prevX + (lerpX - prevX) * Math.random() + Math.cos(angle) * radius
            const py = prevY + (lerpY - prevY) * Math.random() + Math.sin(angle) * radius
            particles.push(mkParticle(px, py, vx, vy))
          }
          prevX = lerpX; prevY = lerpY
        }
      }
      drawParticles(trailCtx, particles)

      burstCtx.clearRect(0, 0, burstCanvas.width, burstCanvas.height)
      drawParticles(burstCtx, bursts)

      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize',      resize)
      window.removeEventListener('mousemove',   onMouseMove)
      window.removeEventListener('touchmove',   onTouchMove)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Layer 1 – animated amber nebula plasma */}
      <canvas ref={nebulaRef} className="absolute inset-0 h-full w-full" />
      {/* Layer 2 – mouse-trail ember particles */}
      <canvas ref={trailRef}  className="absolute inset-0 h-full w-full" />
      {/* Layer 3 – click burst, screen-blended for additive glow */}
      <canvas ref={burstRef}  className="absolute inset-0 h-full w-full" style={{ mixBlendMode: 'screen' }} />
    </div>
  )
}
