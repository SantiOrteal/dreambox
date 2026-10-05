import { motion, useTransform } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { useT } from '../../i18n'

// Invita a seguir: conecta la caja con lo que hay dentro (los servicios) y desaparece al empezar a deslizar.
// Al hacer clic, desliza hasta el punto en que la caja queda abierta.
export default function ScrollCue({ progress, sectionRef }) {
  const { hero } = useT()
  // Desde el valor suavizado: la versión acelerada nativa calcula mal el rango con este offset.
  const opacity = useTransform(progress, [0, 0.05], [1, 0])

  function openBox(e) {
    const el = sectionRef.current
    if (!el) return
    e.preventDefault()
    const end = el.offsetTop + el.offsetHeight - window.innerHeight
    window.scrollTo({ top: end * 0.75, behavior: 'smooth' })
  }

  return (
    <motion.a
      href="#servicios"
      onClick={openBox}
      style={{ opacity }}
      className="relative z-10 mt-8 max-sm:[@media(max-height:620px)]:mt-3 [@media(min-width:640px)_and_(max-height:800px)]:mt-4 shrink-0 text-[13px] font-medium text-ink-muted transition-colors hover:text-ink"
      aria-label={hero.cueLabel}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="flex flex-col items-center gap-1.5"
      >
        {hero.cue}
        <span className="grid h-8 w-8 animate-nudge place-items-center rounded-full bg-black/[0.05] motion-reduce:animate-none">
          <ChevronDown className="h-4 w-4" />
        </span>
      </motion.span>
    </motion.a>
  )
}
