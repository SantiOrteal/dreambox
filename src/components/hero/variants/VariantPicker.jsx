import { useEffect, useState } from 'react'
import { RotateCcw } from 'lucide-react'

// TEMPORAL: selector para comparar animaciones del hero. Quitar al elegir una.
export const VARIANTS = [
  { id: 'caja', label: '0 · Caja (actual)' },
  { id: 'dashboard', label: '1 · Dashboard vivo' },
  { id: 'red', label: '2 · Red de nodos' },
  { id: 'orbe', label: '3 · Orbe con servicios' },
  { id: 'bento', label: '4 · Bento grid' },
  { id: 'logo', label: '5 · Logo de circuitos' },
]

const KEY = 'hero-variant'

// Variante elegida: ?hero=<id> en la URL, si no la última elegida (localStorage), si no la primera.
export function useHeroVariant() {
  const [variant, setVariant] = useState(VARIANTS[0].id)

  useEffect(() => {
    let saved = null
    try {
      saved = new URLSearchParams(location.search).get('hero') || localStorage.getItem(KEY)
    } catch {
      /* sin almacenamiento: se queda la primera */
    }
    if (VARIANTS.some((v) => v.id === saved)) setVariant(saved)
  }, [])

  function choose(id) {
    setVariant(id)
    try {
      localStorage.setItem(KEY, id)
    } catch {
      /* sin almacenamiento */
    }
  }

  return [variant, choose]
}

export default function VariantPicker({ value, onChange, onReplay }) {
  return (
    <div className="fixed bottom-4 left-1/2 z-60 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-ink/90 p-1.5 pl-4 text-[13px] text-white shadow-xl backdrop-blur-md">
      <label htmlFor="hero-variant" className="font-medium text-white/70">
        Animación
      </label>
      <select
        id="hero-variant"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer rounded-full bg-white/10 px-3 py-1.5 font-semibold text-white outline-none hover:bg-white/15 [&>option]:text-ink"
      >
        {VARIANTS.map((v) => (
          <option key={v.id} value={v.id}>
            {v.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={onReplay}
        className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20"
        aria-label="Repetir animación"
        title="Repetir animación"
      >
        <RotateCcw className="h-4 w-4" />
      </button>
    </div>
  )
}
