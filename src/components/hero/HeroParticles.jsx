import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

// Fondo del hero: partículas que flotan y se enlazan cuando están cerca (tomado de la variante "Red de nodos").
// Con el mouse, las cercanas se apartan y se conectan con el cursor. Solo se anima mientras el hero se ve;
// con movimiento reducido se dibujan una vez, quietas.
const LINK = 120 // distancia máxima para unir dos partículas
const REPEL = 140 // radio en el que el cursor las aparta
const CURSOR_LINK = 180 // radio en el que se enlazan con el cursor

export default function HeroParticles() {
  const canvasRef = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    const mouse = { x: 0, y: 0, active: false }

    function measure() {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    measure()

    const dots = Array.from({ length: w < 640 ? 18 : 56 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1.2 + Math.random() * 1.4,
    }))

    function step() {
      for (const p of dots) {
        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const d = Math.hypot(dx, dy)
          if (d < REPEL && d > 0.1) {
            const f = (1 - d / REPEL) * 0.6
            p.vx += (dx / d) * f
            p.vy += (dy / d) * f
          }
        }
        p.vx *= 0.96
        p.vy *= 0.96
        // Nunca se quedan quietas del todo
        if (Math.hypot(p.vx, p.vy) < 0.18) {
          p.vx += (Math.random() - 0.5) * 0.05
          p.vy += (Math.random() - 0.5) * 0.05
        }
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i]
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK) {
            ctx.strokeStyle = `rgba(47,91,234,${(1 - d / LINK) * 0.18})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        if (mouse.active) {
          const d = Math.hypot(a.x - mouse.x, a.y - mouse.y)
          if (d < CURSOR_LINK) {
            ctx.strokeStyle = `rgba(109,92,255,${(1 - d / CURSOR_LINK) * 0.4})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      }
      ctx.fillStyle = 'rgba(47,91,234,0.4)'
      for (const p of dots) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function frame() {
      step()
      draw()
      raf = visible ? requestAnimationFrame(frame) : 0
    }

    if (reduce) draw()
    else raf = requestAnimationFrame(frame)

    // Fuera de pantalla no se anima (ahorra batería); al volver, sigue donde iba.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !reduce && !raf) raf = requestAnimationFrame(frame)
    })
    io.observe(canvas)

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
    const ro = new ResizeObserver(() => {
      measure()
      if (reduce) draw()
    })
    ro.observe(canvas)
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [reduce])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
}
