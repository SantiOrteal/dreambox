import { motion, useTransform } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { useT } from '../../i18n'
import { CHARGE_AT, CHARGE_DURATION, OPEN_DURATION } from './constants'

// Invita a seguir hacia los servicios: aparece cuando la caja ya terminó de abrirse
// y desaparece en cuanto el usuario empieza a deslizar.
export default function ScrollCue({ progress }) {
  const { hero } = useT()
  const opacity = useTransform(progress, [0, 0.08], [1, 0])

  return (
    <motion.a
      href="#servicios"
      style={{ opacity }}
      className="relative z-10 mt-8 max-sm:[@media(max-height:620px)]:mt-3 [@media(min-width:640px)_and_(max-height:800px)]:mt-4 shrink-0 text-[13px] font-medium text-ink-muted transition-colors hover:text-ink"
      aria-label={hero.cueLabel}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: CHARGE_AT + CHARGE_DURATION + OPEN_DURATION * 0.6, duration: 0.6 }}
        className="flex flex-col items-center gap-1.5"
      >
        {hero.cue}
        <span className="grid h-8 w-8 animate-nudge place-items-center rounded-full bg-black/5 motion-reduce:animate-none">
          <ChevronDown className="h-4 w-4" />
        </span>
      </motion.span>
    </motion.a>
  )
}
