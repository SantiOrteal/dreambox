import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import FitStage from './FitStage'

// Variante 2: red viva de nodos en todo el hero. Al cargar, parte de los nodos vuela a su lugar
// y forma la marca de DreamBox (esquinas de circuito + chip). Los demás siguen flotando conectados.
// Con el cursor, los nodos cercanos se apartan y se enlazan con él.

// Trazos de la marca (mismas coordenadas 32x32 que LogoMark).
const LOGO = [
  [[4, 12], [4, 4], [12, 4]],
  [[28, 12], [28, 4], [20, 4]],
  [[4, 20], [4, 28], [12, 28]],
  [[28, 20], [28, 28], [20, 28]],
  [[12, 16], [8, 16]],
  [[20, 16], [24, 16]],
  [[12, 12], [20, 12], [20, 20], [12, 20], [12, 12]],
]
const STEP = 2 // separación entre nodos de la marca, en unidades del logo

function samplePolyline(pts) {
  const out = []
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i]
    const [x2, y2] = pts[i + 1]
    const n = Math.max(1, Math.round(Math.hypot(x2 - x1, y2 - y1) / STEP))
    for (let k = 0; k < n; k++) out.push([x1 + ((x2 - x1) * k) / n, y1 + ((y2 - y1) * k) / n])
  }
  if (pts.at(-1).join() !== pts[0].join()) out.push(pts.at(-1))
  return out
}
const LOGO_POINTS = LOGO.flatMap(samplePolyline)

const LINK = 120 // distancia máxima para unir dos nodos libres
const easeOut = (t) => 1 - Math.pow(1 - t, 4)

export default function NetworkVisual({ style }) {
  const canvasRef = useRef(null)
  const targetRef = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w = 0
    let h = 0
    let logo = { cx: 0, cy: 0, s: 8 }
    let raf = 0
    const mouse = { x: 0, y: 0, active: false }
    const start = performance.now()

    function measure() {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    // La marca se centra en la zona bajo el texto (que cambia de escala y se mueve con el scroll).
    function locateLogo() {
      const r = canvas.getBoundingClientRect()
      const t = targetRef.current.getBoundingClientRect()
      const size = Math.min(t.width, t.height) * 0.62
      logo = { cx: t.left - r.left + t.width / 2, cy: t.top - r.top + t.height * 0.52, s: size / 32 }
    }
    measure()
    locateLogo()

    const free = Array.from({ length: w < 640 ? 34 : 70 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1.2 + Math.random() * 1.4,
    }))
    const bound = LOGO_POINTS.map(([lx, ly], i) => ({
      lx,
      ly,
      sx: Math.random() * w,
      sy: Math.random() * h,
      delay: 0.5 + (i / LOGO_POINTS.length) * 0.6 + Math.random() * 0.25,
      phase: Math.random() * Math.PI * 2,
    }))

    function frame(now) {
      const t = reduce ? 99 : (now - start) / 1000
      locateLogo()
      ctx.clearRect(0, 0, w, h)

      // Nodos libres: flotan, rebotan en los bordes y se apartan del cursor.
      for (const p of free) {
        if (!reduce) {
          if (mouse.active) {
            const dx = p.x - mouse.x
            const dy = p.y - mouse.y
            const d = Math.hypot(dx, dy)
            if (d < 140 && d > 0.1) {
              const f = (1 - d / 140) * 0.6
              p.vx += (dx / d) * f
              p.vy += (dy / d) * f
            }
          }
          p.vx *= 0.96
          p.vy *= 0.96
          const sp = Math.hypot(p.vx, p.vy)
          if (sp < 0.18) {
            p.vx += (Math.random() - 0.5) * 0.05
            p.vy += (Math.random() - 0.5) * 0.05
          }
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
        }
      }

      // Nodos de la marca: viajan desde su punto inicial hasta su lugar y luego "respiran".
      let settled = 1
      const pts = bound.map((b) => {
        const k = Math.min(1, Math.max(0, (t - b.delay) / 1.4))
        settled = Math.min(settled, k)
        const e = easeOut(k)
        const tx = logo.cx + (b.lx - 16) * logo.s
        const ty = logo.cy + (b.ly - 16) * logo.s
        const wob = k === 1 ? Math.sin(t * 1.6 + b.phase) * 0.8 : 0
        return { x: b.sx + (tx - b.sx) * e, y: b.sy + (ty - b.sy) * e + wob, k }
      })

      // Enlaces entre nodos libres (y con el cursor).
      for (let i = 0; i < free.length; i++) {
        const a = free[i]
        for (let j = i + 1; j < free.length; j++) {
          const b = free[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK) {
            ctx.strokeStyle = `rgba(47,91,234,${(1 - d / LINK) * 0.22})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        if (mouse.active) {
          const d = Math.hypot(a.x - mouse.x, a.y - mouse.y)
          if (d < 180) {
            ctx.strokeStyle = `rgba(109,92,255,${(1 - d / 180) * 0.45})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      }

      // Trazos de la marca: se encienden cuando sus nodos ya llegaron.
      const glow = Math.min(1, Math.max(0, (t - 2.2) / 0.6))
      if (glow > 0) {
        const grad = ctx.createLinearGradient(logo.cx - 16 * logo.s, logo.cy - 16 * logo.s, logo.cx + 16 * logo.s, logo.cy + 16 * logo.s)
        grad.addColorStop(0, '#2f5bea')
        grad.addColorStop(1, '#6d5cff')
        ctx.save()
        ctx.globalAlpha = glow
        ctx.strokeStyle = grad
        ctx.lineWidth = logo.s * 1.1
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.shadowColor = 'rgba(79,124,255,0.55)'
        ctx.shadowBlur = 18 + Math.sin(t * 2) * 6
        for (const line of LOGO) {
          ctx.beginPath()
          line.forEach(([lx, ly], i) => {
            const x = logo.cx + (lx - 16) * logo.s
            const y = logo.cy + (ly - 16) * logo.s
            if (i) ctx.lineTo(x, y)
            else ctx.moveTo(x, y)
          })
          ctx.stroke()
        }
        // Chip central relleno
        ctx.fillStyle = grad
        const c = 4 * logo.s
        ctx.beginPath()
        ctx.roundRect(logo.cx - c, logo.cy - c, c * 2, c * 2, logo.s * 2)
        ctx.fill()
        ctx.restore()

        // Pulso que recorre el contorno de la marca
        if (!reduce) {
          const loop = ((t - 2.2) % 3) / 3
          const ring = 1 + loop * 0.6
          ctx.strokeStyle = `rgba(79,124,255,${(1 - loop) * 0.35 * glow})`
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.roundRect(logo.cx - 13 * logo.s * ring, logo.cy - 13 * logo.s * ring, 26 * logo.s * ring, 26 * logo.s * ring, 6 * logo.s * ring)
          ctx.stroke()
        }
      }

      // Puntos: libres tenues, los de la marca más marcados mientras viajan.
      for (const p of free) {
        ctx.fillStyle = 'rgba(47,91,234,0.45)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      for (const p of pts) {
        ctx.fillStyle = `rgba(79,92,240,${0.35 + p.k * 0.5 * (1 - glow * 0.6)})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.6 + p.k * 0.8, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!reduce || settled < 1) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    function onMove(e) {
      if (e.pointerType !== 'mouse') return
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
      mouse.active = mouse.y >= 0 && mouse.y <= r.height
    }
    function onLeave() {
      mouse.active = false
    }
    const ro = new ResizeObserver(measure)
    ro.observe(canvas)
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [reduce])

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
      {/* Solo reserva el espacio bajo el texto y marca dónde se forma la marca */}
      <FitStage width={420} height={360} style={style} innerRef={targetRef} />
    </>
  )
}
