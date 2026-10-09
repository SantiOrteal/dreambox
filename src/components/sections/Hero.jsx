import { useRef } from 'react'
import { useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import CircuitLines from '../hero/CircuitLines'
import HeroCopy from '../hero/HeroCopy'
import HeroParticles from '../hero/HeroParticles'
import ScrollCue from '../hero/ScrollCue'
import BoxVisual from '../hero/variants/BoxVisual'
import DashboardVisual from '../hero/variants/DashboardVisual'
import NetworkVisual from '../hero/variants/NetworkVisual'
import OrbVisual from '../hero/variants/OrbVisual'
import BentoVisual from '../hero/variants/BentoVisual'
import LogoVisual from '../hero/variants/LogoVisual'
// import VariantPicker, { useHeroVariant } from '../hero/variants/VariantPicker'

// Animaciones disponibles para el hero. Se conservan todas por si se quieren volver a comparar.
const visuals = {
  caja: BoxVisual,
  dashboard: DashboardVisual,
  red: NetworkVisual,
  orbe: OrbVisual,
  bento: BentoVisual,
  logo: LogoVisual,
}
// Variantes que usan los circuitos de fondo.
const withCircuits = new Set(['caja', 'logo'])

// Por ahora se usa la caja. Para volver a comparar variantes: descomenta el import de VariantPicker,
// cambia esta constante por `const [variant, setVariant] = useHeroVariant()`, agrega
// `const [run, setRun] = useState(0)` (para el botón de repetir, usando `${variant}-${run}` como key de cada capa)
// y descomenta <VariantPicker /> abajo.
const variant = 'caja'

// Hero de una pantalla: texto arriba y la caja abajo, sobre un fondo de partículas y circuitos.
// Después de entrar sigue al cursor con parallax. Al hacer scroll solo el texto se desvanece;
// la caja se queda en su lugar flotando.
export default function Hero() {
  const section = useRef(null)
  const reduce = useReducedMotion()
  const Visual = visuals[variant]

  // Cursor en -1..1 respecto al centro del hero (solo con mouse; en táctil se queda en 0).
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const pointer = {
    x: useSpring(px, { stiffness: 60, damping: 18, mass: 0.8 }),
    y: useSpring(py, { stiffness: 60, damping: 18, mass: 0.8 }),
  }
  function onPointerMove(e) {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set(((e.clientX - r.left) / r.width) * 2 - 1)
    py.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  function onPointerLeave() {
    px.set(0)
    py.set(0)
  }

  // Salida al hacer scroll: solo el texto sube y se desvanece.
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] })
  const copyStyle = {
    y: useTransform(scrollYProgress, [0, 0.6], [0, -60]),
    opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]),
  }

  return (
    <section ref={section} id="inicio" className="relative">
      <div
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative flex h-dvh min-h-[560px] flex-col items-center justify-center overflow-hidden pb-5 pt-18 max-sm:[@media(max-height:620px)]:pb-3 max-sm:[@media(max-height:620px)]:pt-16"
      >
        <HeroParticles />
        {withCircuits.has(variant) && <CircuitLines pointer={pointer} />}
        <HeroCopy style={reduce ? undefined : copyStyle} />
        <Visual pointer={pointer} />
        <ScrollCue progress={scrollYProgress} />
      </div>
      {/* <VariantPicker value={variant} onChange={setVariant} onReplay={() => setRun((n) => n + 1)} /> */}
    </section>
  )
}
