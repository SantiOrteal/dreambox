import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import Logo from '../Logo'
import LangSwitch from '../LangSwitch'
import { useT } from '../../i18n'

// Barra fina a todo el ancho, como apple.com: material translúcido y una línea inferior.
export default function Header() {
  const t = useT()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="material fixed inset-x-0 top-0 z-50 border-b border-black/[0.08]">
      <div className="wrap flex h-12 items-center justify-between">
        <Logo animated />

        <nav aria-label={t.header.mainNav} className="hidden items-center gap-8 md:flex">
          {t.nav.map((item) => (
            <a key={item.href} href={item.href} className="py-3 text-[13px] text-ink/80 transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <LangSwitch className="mr-1" />
          <a href="#contacto" className="btn-primary hit hidden px-3.5 py-1.5 text-[13px] sm:inline-flex">
            {t.common.cta}
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="-mr-2 grid h-11 w-11 place-items-center text-ink md:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? t.header.closeMenu : t.header.openMenu}
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-movil"
            aria-label={t.header.mobileNav}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100dvh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.45 }}
            className="overflow-hidden bg-white md:hidden"
          >
            <div className="wrap pt-6">
              {t.nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                  className="block py-2.5 text-[28px] font-semibold tracking-tight text-ink"
                >
                  {item.label}
                </motion.a>
              ))}
              <a href="#contacto" onClick={() => setOpen(false)} className="btn-primary mt-8 w-full py-3">
                {t.common.cta}
              </a>
              <LangSwitch variant="full" className="mt-6" />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
