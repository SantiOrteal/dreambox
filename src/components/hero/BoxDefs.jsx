// Gradientes, recortes y filtros de la caja. Los ids son globales en el documento.
export const RIM_OUT = 'M200 54 360 144 200 234 40 144Z'
export const RIM_IN = 'M200 64 342 144 200 224 58 144Z'

function Linear({ id, x1 = 0, y1 = 0, x2 = 0, y2 = 1, stops }) {
  return (
    <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2}>
      {stops.map(([offset, color, opacity = 1]) => (
        <stop key={offset} offset={offset} stopColor={color} stopOpacity={opacity} />
      ))}
    </linearGradient>
  )
}

function Radial({ id, cx = 0.5, cy = 0.5, r = 0.5, stops }) {
  return (
    <radialGradient id={id} cx={cx} cy={cy} r={r}>
      {stops.map(([offset, color, opacity = 1]) => (
        <stop key={offset} offset={offset} stopColor={color} stopOpacity={opacity} />
      ))}
    </radialGradient>
  )
}

function Blur({ id, amount }) {
  return (
    <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation={amount} />
    </filter>
  )
}

export default function BoxDefs() {
  return (
    <defs>
      {/* Tapa */}
      <Linear id="lidTop" x1={0.1} x2={0.9} stops={[[0, '#f4f6ff'], [0.5, '#bccbff'], [1, '#7393f7']]} />
      <Radial id="lidShine" cx={0.3} cy={0.28} stops={[[0, '#ffffff', 0.9], [1, '#ffffff', 0]]} />
      <Linear id="lidSideL" stops={[[0, '#7d9dff'], [0.25, '#4f7cff'], [1, '#3158e3']]} />
      <Linear id="lidSideR" stops={[[0, '#3653ad'], [0.25, '#1f3a8a'], [1, '#14295f']]} />

      {/* Cuerpo */}
      <Linear id="faceLeft" x2={0.7} stops={[[0, '#5f8bff'], [0.5, '#3b66ef'], [1, '#2445c2']]} />
      <Linear id="faceRight" x1={0.1} x2={0.9} stops={[[0, '#2b4ba8'], [0.55, '#162d70'], [1, '#0b1a3f']]} />
      <Linear id="lidAO" stops={[[0, '#0b1a3f', 0.45], [0.22, '#0b1a3f', 0]]} />
      <Linear id="edgeV" stops={[[0, '#ffffff', 0.85], [1, '#ffffff', 0]]} />
      <Linear id="rim" x2={1} stops={[[0, '#eef2ff'], [1, '#9fb5ff']]} />

      {/* Interior azul */}
      <Linear id="wallL" stops={[[0, '#7b9dff'], [1, '#3d68f0']]} />
      <Linear id="wallR" stops={[[0, '#2f4fb5'], [1, '#14295f']]} />
      <Radial id="floorLight" r={0.55} stops={[[0, '#4f7cff'], [0.6, '#2f5bea'], [1, '#1e3a8a']]} />
      <Radial id="floorGlow" stops={[[0, '#a9bfff', 0.85], [1, '#4f7cff', 0]]} />

      {/* Luz al abrir */}
      <Linear id="ray" y1={1} y2={0} stops={[[0, '#ffffff', 0.9], [1, '#c7d4ff', 0]]} />
      <Radial id="halo" stops={[[0, '#7b9dff', 0.5], [1, '#7b9dff', 0]]} />

      <clipPath id="opening">
        <path d={RIM_IN} />
      </clipPath>
      <Blur id="softShadow" amount={12} />
      <Blur id="contactShadow" amount={4} />
      <Blur id="rayBlur" amount={5} />
    </defs>
  )
}
