import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { MessageCircle } from 'lucide-react'
import { site } from '../content/site'
import { useT } from '../i18n'

// Acceso directo a WhatsApp; aparece al dejar atrás el hero para no competir con su CTA.
export default function WhatsAppButton() {
  const t = useT()
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 900))

  const text = encodeURIComponent(t.common.whatsappMessage)

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={`https://wa.me/${site.whatsapp}?text=${text}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          className="material fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full px-4 py-2.5 text-[14px] font-medium text-ink shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06] transition-transform active:scale-95"
        >
          <MessageCircle className="h-4 w-4 text-[#1faa53]" strokeWidth={2} />
          WhatsApp
        </motion.a>
      )}
    </AnimatePresence>
  )
}
