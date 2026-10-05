import { motion } from 'motion/react'
import { Check, ChevronRight } from 'lucide-react'
import { useT } from '../../i18n'
import SplitText from '../SplitText'
import { EASE } from './constants'

// Aparece después de que las letras del título terminan de caer.
const rise = (delay) => ({
  initial: { opacity: 0, transform: 'translateY(12px)' },
  animate: { opacity: 1, transform: 'translateY(0px)' },
  transition: { duration: 1, delay, ease: EASE },
})

export default function HeroCopy() {
  const t = useT()
  return (
    <div className="wrap relative z-10 shrink-0 text-center">
      <motion.p {...rise(0)} className="text-[15px] font-semibold text-brand sm:text-[19px]">
        {t.hero.eyebrow}
      </motion.p>

      <SplitText as="h1" text={t.hero.title} trigger="load" delay={0.15} className="display mx-auto mt-3 max-w-[23ch] max-sm:[@media(max-height:620px)]:text-[2.1rem] [@media(min-width:640px)_and_(max-height:800px)]:text-[3.25rem]" />

      <motion.p
        {...rise(1.1)}
        className="mx-auto mt-5 max-w-[34rem] text-[18px] leading-[1.45] text-ink-muted sm:text-[21px] [@media(min-width:640px)_and_(max-height:800px)]:mt-3 [@media(min-width:640px)_and_(max-height:800px)]:text-[19px] max-sm:[@media(max-height:760px)]:hidden"
      >
        {t.hero.subtitle}
      </motion.p>

      <motion.div {...rise(1.25)} className="mt-7 max-sm:[@media(max-height:620px)]:mt-4 [@media(min-width:640px)_and_(max-height:800px)]:mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-8">
        <a href="#contacto" className="btn-primary px-5 py-3 text-[16px] sm:px-6 sm:text-[17px]">
          {t.common.cta}
        </a>
        <a href="#servicios" className="link text-[16px] sm:text-[17px]">
          {t.hero.secondary} <ChevronRight className="h-4 w-4" />
        </a>
      </motion.div>

      {/* Compromisos concretos junto al CTA: confianza antes de pedir el contacto. Se ocultan en pantallas bajas. */}
      <motion.ul
        {...rise(1.4)}
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
    </div>
  )
}
