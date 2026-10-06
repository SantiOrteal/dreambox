import { MotionConfig } from 'motion/react'
import Header from './components/sections/Header'
import Hero from './components/sections/Hero'
import Statement from './components/sections/Statement'
import Services from './components/sections/Services'
import Commitments from './components/sections/Commitments'
import Process from './components/sections/Process'
import About from './components/sections/About'
import Testimonials from './components/sections/Testimonials'
import Faq from './components/sections/Faq'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import CookieBanner from './components/CookieBanner'
import Backdrop from './components/Backdrop'
import { useT } from './i18n'

// Historia de la página: promesa → problema → servicios → compromisos → proceso → quiénes somos → dudas → acción.
export default function App() {
  const t = useT()
  return (
    <MotionConfig reducedMotion="user">
      <Backdrop />
      <div className="relative min-h-dvh overflow-x-clip">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-70 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          {t.common.skipToContent}
        </a>
        <Header />
        <main id="contenido">
          <Hero />
          <Statement />
          <Services />
          <Commitments />
          <Process />
          <About />
          <Testimonials />
          <Faq />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
      </div>
    </MotionConfig>
  )
}
