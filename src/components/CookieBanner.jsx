import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Cookie } from 'lucide-react'
import { onOpenCookieSettings, readConsent, saveConsent } from '../lib/consent'
import { startAnalytics, stopAnalytics } from '../lib/analytics'
import { useT } from '../i18n'

const EASE = [0.23, 1, 0.32, 1]

// Aviso de cookies: aparece en la primera visita y desde "Preferencias de cookies" en el pie.
// Aceptar y rechazar tienen el mismo peso visual; sin respuesta, no se activa nada.
export default function CookieBanner() {
  const t = useT()
  const c = t.cookies
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const saved = readConsent()
    let timer
    if (saved?.analytics) startAnalytics()
    // Pequeña espera para no competir con la entrada del hero.
    if (!saved) timer = setTimeout(() => setOpen(true), 1200)
    const off = onOpenCookieSettings(() => setOpen(true))
    return () => {
      clearTimeout(timer)
      off()
    }
  }, [])

  function choose(analytics) {
    const before = readConsent()
    saveConsent(analytics)
    setOpen(false)
    if (analytics) startAnalytics()
    else if (before?.analytics) stopAnalytics()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-labelledby="cookies-title"
          aria-describedby="cookies-text"
          initial={{ opacity: 0, transform: 'translateY(16px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          exit={{ opacity: 0, transform: 'translateY(16px)' }}
          transition={{ duration: 0.3, ease: EASE }}
          className="fixed inset-x-3 bottom-3 z-60 rounded-[24px] bg-white p-5 shadow-[0_20px_60px_-15px_rgba(11,26,63,0.35)] ring-1 ring-black/6 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[400px] sm:p-6"
        >
          <p id="cookies-title" className="flex items-center gap-2 text-[17px] font-semibold text-ink">
            <Cookie className="h-5 w-5 text-brand" /> {c.title}
          </p>
          <p id="cookies-text" className="mt-2 text-[14px] leading-normal text-ink-muted">
            {c.body}{' '}
            <a href={`${t.paths.privacy}#cookies`} className="font-medium text-brand hover:underline">
              {c.more}
            </a>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => choose(false)}
              className="rounded-full bg-black/6 px-4 py-2.5 text-[15px] font-medium text-ink transition-[background-color,transform,scale] duration-150 ease-out hover:bg-black/10 active:scale-[0.97]"
            >
              {c.reject}
            </button>
            <button type="button" onClick={() => choose(true)} className="btn-primary justify-center px-4 py-2.5 text-[15px]">
              {c.accept}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
