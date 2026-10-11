import { useEffect } from 'react'

// Sección fija que avanza por pasos (como "¿Se cayó el sistema otra vez?"): mientras está fija en pantalla,
// cada gesto de scroll (rueda, trackpad o deslizar el dedo) avanza un solo paso, aunque el gesto sea largo.
// La página se detiene en el paso y espera a que entre antes de aceptar otro gesto.
// En el primer y el último paso el scroll se libera para poder salir de la sección hacia arriba o hacia abajo.
// Solo reacciona a lo que hace la persona: los enlaces a otras secciones (#servicios, el menú) pasan de largo.
//
// count: número de pasos. density: el mismo factor con el que la sección calcula su paso a partir del scroll
// (paso = floor(progreso * count * density)); cada paso se detiene a la mitad de su tramo.
const MIN_LOCK = 750 // ms que se espera a que entre el paso antes de aceptar otro
const GESTURE_GAP = 180 // ms sin eventos de rueda para considerar que empezó un gesto nuevo
const SWIPE = 30 // px de dedo para avanzar un paso
const INPUT_WINDOW = 1500 // ms después de tocar o girar la rueda en que el scroll se considera de la persona (inercia)

export default function useScrollSteps(ref, count, { enabled = true, density = 1 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!enabled || !el) return

    let lockedAt = -Infinity
    let target = null
    let lastWheel = -Infinity
    let lastInput = -Infinity
    let consumed = false // el gesto actual ya avanzó un paso
    let touch = null

    const geometry = () => {
      const top = el.getBoundingClientRect().top + window.scrollY
      const run = el.offsetHeight - window.innerHeight
      const stops = Array.from({ length: count }, (_, i) => top + run * ((i + 0.5) / (count * density)))
      return { top, run, stops }
    }
    const isPinned = (g, y = window.scrollY) => y >= g.top - 2 && y <= g.top + g.run + 2
    const nearest = (g, y = window.scrollY) =>
      g.stops.reduce((best, s, i) => (Math.abs(s - y) < Math.abs(g.stops[best] - y) ? i : best), 0)
    const isLocked = () => performance.now() - lockedAt < MIN_LOCK
    const jump = (y) => window.scrollTo({ top: y, behavior: 'instant' })
    const go = (g, i) => {
      target = g.stops[i]
      lockedAt = performance.now()
      jump(target)
    }

    function onWheel(e) {
      if (e.ctrlKey) return // zoom con la rueda
      const now = performance.now()
      const newGesture = now - lastWheel >= GESTURE_GAP
      lastWheel = now
      lastInput = now
      const g = geometry()
      const dir = Math.sign(e.deltaY)
      if (!dir) return
      if (!isPinned(g)) {
        // Un solo movimiento grande de rueda puede cruzar la sección entera: se detiene al entrar.
        const y = window.scrollY
        const unit = e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? window.innerHeight : 1
        const to = y + e.deltaY * unit
        const end = g.top + g.run
        const enters = dir > 0 ? y < g.top && to >= g.top : y > end && to <= end
        if (enters) {
          e.preventDefault()
          consumed = true
          go(g, dir > 0 ? 0 : count - 1)
        }
        return
      }
      if (newGesture) consumed = false
      // El mismo gesto (o la inercia del trackpad) ya avanzó, o el paso todavía está entrando: se detiene aquí.
      if (consumed || isLocked()) {
        e.preventDefault()
        return
      }
      const next = nearest(g) + dir
      if (next < 0 || next >= count) return // primer o último paso: se libera el scroll
      e.preventDefault()
      consumed = true
      go(g, next)
    }

    function onTouchStart(e) {
      lastInput = performance.now()
      // hold: este toque se frena entero. next: el paso al que avanza al deslizar lo suficiente.
      touch = { y: e.touches[0].clientY, decided: false, hold: false, next: null, done: false }
    }

    function onTouchMove(e) {
      lastInput = performance.now()
      if (!touch) return
      const dy = touch.y - e.touches[0].clientY // > 0: avanzar
      // Hay que decidir en el primer movimiento: después el navegador ya no deja frenar el scroll.
      if (!touch.decided) {
        const g = geometry()
        const dir = Math.sign(dy)
        if (!isPinned(g) || !dir) return
        touch.decided = true
        if (isLocked()) touch.hold = true // el paso todavía está entrando
        else {
          const next = nearest(g) + dir
          if (next < 0 || next >= count) return // primer o último paso: se libera el scroll
          touch.next = next
        }
      }
      if (!touch.hold && touch.next === null) return
      e.preventDefault()
      if (touch.next !== null && !touch.done && Math.abs(dy) > SWIPE) {
        touch.done = true
        go(geometry(), touch.next)
      }
    }

    function onTouchEnd() {
      lastInput = performance.now()
      touch = null
    }

    // Entrar a la sección con un gesto largo o con inercia: se detiene en el primer paso (o en el último si viene
    // de abajo), y mientras el paso entra se mantiene ahí (eso también corta la inercia en celulares).
    let lastY = window.scrollY
    let wasPinned = isPinned(geometry())
    function onScroll() {
      const y = window.scrollY
      const g = geometry()
      const pinned = isPinned(g, y)
      const byPerson = performance.now() - lastInput < INPUT_WINDOW
      if (target !== null && isLocked() && byPerson) {
        if (Math.abs(y - target) > 2) jump(target)
      } else if (pinned && !wasPinned && byPerson) {
        consumed = true
        go(g, y > lastY ? 0 : count - 1)
      }
      lastY = window.scrollY
      wasPinned = isPinned(g, lastY)
    }

    // Un clic en un enlace a otra sección (menú, "Ver servicios") viaja libre aunque se acabe de usar la rueda.
    function onClick(e) {
      if (!e.target.closest?.('a[href^="#"]')) return
      lastInput = -Infinity
      target = null
    }

    const active = { passive: false }
    document.addEventListener('click', onClick)
    window.addEventListener('wheel', onWheel, active)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, active)
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('wheel', onWheel, active)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove, active)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('scroll', onScroll)
    }
  }, [ref, count, enabled, density])
}
