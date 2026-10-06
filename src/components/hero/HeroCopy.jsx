import { motion } from 'motion/react'
import { Check, ChevronRight } from 'lucide-react'
import { useT } from '../../i18n'
import HeroTitle from './HeroTitle'
import { EASE } from './constants'

// Aparece mientras el título termina de revelarse.
const rise = (delay) => ({
  initial: { opacity: 0, transform: 'translateY(12px)' },
  animate: { opacity: 1, transform: 'translateY(0px)' },
  transition: { duration: 1, delay, ease: EASE },
})

export default function HeroCopy({ style }) {
  const t = useT()
  return (
    <motion.div style={style} className="wrap relative z-10 shrink-0 text-center">
      <motion.p
        {...rise(0)}
        className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-[14px] font-semibold text-brand ring-1 ring-brand/15 backdrop-blur-md sm:text-[16px]"
      >
        {/* Punto "en línea": el equipo está disponible */}
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-light opacity-60 motion-reduce:animate-none" />
          <span className="relative h-2 w-2 rounded-full bg-brand" />
        </span>
        {t.hero.eyebrow}
      </motion.p>

      <HeroTitle text={t.hero.title} delay={0.1} className="display mx-auto mt-3 max-w-[23ch] max-sm:[@media(max-height:620px)]:text-[2.1rem] [@media(min-width:640px)_and_(max-height:800px)]:text-[3.25rem]" />

      <motion.p
        {...rise(0.7)}
        className="mx-auto mt-5 max-w-136 text-[18px] leading-[1.45] text-ink-muted sm:text-[21px] [@media(min-width:640px)_and_(max-height:800px)]:mt-3 [@media(min-width:640px)_and_(max-height:800px)]:text-[19px] max-sm:[@media(max-height:760px)]:hidden"
      >
        {t.hero.subtitle}
      </motion.p>

      <motion.div {...rise(0.85)} className="mt-7 max-sm:[@media(max-height:620px)]:mt-4 [@media(min-width:640px)_and_(max-height:800px)]:mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-8">
        <a href="#contacto" className="btn-primary px-5 py-3 text-[16px] sm:px-6 sm:text-[17px]">
          {t.common.cta}
        </a>
        <a href="#servicios" className="link text-[16px] sm:text-[17px]">
          {t.hero.secondary} <ChevronRight className="h-4 w-4" />
        </a>
      </motion.div>

      {/* Compromisos concretos junto al CTA: confianza antes de pedir el contacto. Se ocultan en pantallas bajas. */}
      <motion.ul
        {...rise(1)}
        aria-label={t.hero.trustLabel}
        className="mt-6 hidden flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] font-medium text-ink-muted [@media(min-height:860px)]:flex"
      >
        {t.hero.trust.map((item) => (
          <li key={item} className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-brand" strokeWidth={2.5} aria-hidden="true" />
            {item}
          </li>
        ))}
      </motion.ul>
    </motion.div>
  )
}
