import { Cloud, Globe, Headset, Sparkles } from 'lucide-react'

export const EASE = [0.22, 1, 0.36, 1]

// Coreografía de entrada (segundos desde que carga la página):
// título → circuitos que se dibujan → pulso de luz que llega a la caja → la caja se abre.
export const TRACE_AT = 0.3
export const CHARGE_AT = 1.05
export const CHARGE_DURATION = 0.55
export const OPEN_AT = CHARGE_AT + CHARGE_DURATION - 0.05
export const OPEN_DURATION = 1.7

// Escenario de la caja en coordenadas fijas; se escala para caber en el espacio disponible.
export const STAGE_W = 520
export const STAGE_H = 468

// Soluciones que salen de la caja (sus nombres están en i18n: hero.pieces, en el mismo orden).
// x/y: posición final en px del escenario, relativa al centro. r: giro final. from: progreso de apertura en que sale.
// depth: cuánto se mueve con el cursor (parallax); más alto = más cerca de la pantalla.
// service: el servicio que abre la tarjeta al hacer clic (id de i18n services).
export const pieces = [
  { Icon: Headset, service: 'soporte', x: -192, y: -78, r: -6, from: 0.3, depth: 26 },
  { Icon: Globe, service: 'web', x: -68, y: -168, r: 3, from: 0.38, depth: 16 },
  { Icon: Sparkles, service: 'automatizacion', x: 68, y: -168, r: -3, from: 0.46, depth: 20 },
  { Icon: Cloud, service: 'cloud', x: 192, y: -78, r: 6, from: 0.54, depth: 30 },
]
