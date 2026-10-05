import { STAGE_H, pieces } from './constants'

// Medidas de la tarjeta (px del escenario) y punto de salida dentro de la caja.
const CARD_W = 108
const CARD_H = 92
const ANCHOR_Y = STAGE_H * 0.42
const EDGE = 8 // px libres contra el borde de la pantalla y bajo los botones

const maxX = Math.max(...pieces.map((p) => Math.abs(p.x)))
const maxY = Math.max(...pieces.map((p) => Math.abs(p.y)))
// Separación horizontal mínima entre centros de tarjetas vecinas (en las posiciones base).
const xs = [...new Set(pieces.map((p) => p.x))].sort((a, b) => a - b)
const minStep = Math.min(...xs.slice(1).map((x, i) => x - xs[i]))

// Calcula cómo abrir las tarjetas según el espacio real:
//  boost: cuánto se agrandan (para leerse en pantallas chicas)
//  spread: cuánto se separan en horizontal (sin salirse de la pantalla ni encimarse)
//  lift: cuánto suben (sin tapar los botones de arriba)
export default function pieceLayout({ scale, frameH, viewportW, gapAbove }) {
  const halfRoom = (viewportW / 2 - EDGE) / scale // medio ancho disponible, en px del escenario

  let boost = Math.min(1.9, Math.max(1, 0.82 / scale))
  // Si no caben separadas, se reduce el tamaño hasta que quepan.
  const boostFits = (minStep * halfRoom - EDGE * maxX) / (CARD_W * maxX + (CARD_W / 2) * minStep)
  boost = Math.max(0.7, Math.min(boost, boostFits))

  const need = (CARD_W * boost + 6) / minStep
  const room = (halfRoom - (CARD_W / 2) * boost) / maxX
  const spread = Math.max(need, Math.min(Math.max(boost, need), room))

  // Borde superior permitido para las tarjetas, en px del escenario medidos desde arriba del escenario.
  const stageTop = frameH - STAGE_H * scale // px desde arriba del recuadro (negativo si sobresale)
  const minTop = (-(gapAbove - EDGE) - stageTop) / scale
  const lift = Math.max(0, Math.min(1.15, (ANCHOR_Y - (CARD_H / 2) * boost - minTop) / maxY))

  return { boost, spread, lift }
}
