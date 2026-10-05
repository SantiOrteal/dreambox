import { Cloud, Globe, Headset, Sparkles } from 'lucide-react'

export const EASE = [0.22, 1, 0.36, 1]

// Escenario de la caja en coordenadas fijas; se escala para caber en el espacio disponible.
export const STAGE_W = 520
export const STAGE_H = 468

// Soluciones que salen de la caja (sus nombres están en i18n: hero.pieces, en el mismo orden).
// x/y: posición final en px del escenario, relativa al centro. r: giro final. from: progreso de scroll en que aparece.
export const pieces = [
  { Icon: Headset, x: -192, y: -78, r: -6, from: 0.34 },
  { Icon: Globe, x: -68, y: -168, r: 3, from: 0.4 },
  { Icon: Sparkles, x: 68, y: -168, r: -3, from: 0.46 },
  { Icon: Cloud, x: 192, y: -78, r: 6, from: 0.52 },
]
