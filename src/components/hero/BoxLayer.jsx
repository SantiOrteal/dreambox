// Una capa de la escena de la caja: todas comparten el mismo sistema de coordenadas (400 x 360) y quedan
// encimadas exactamente. Separar la escena en capas permite que lo que se anima sin parar (flotar, respirar,
// balancearse) se mueva con transform u opacidad sobre la capa entera, que la GPU compone sin volver a dibujar
// su contenido. Así los desenfoques y degradados se dibujan una sola vez, lo que importa sobre todo en celulares.
export default function BoxLayer({ label, className = '', style, children }) {
  return (
    <svg
      viewBox="0 0 400 360"
      className={`pointer-events-none absolute inset-x-0 bottom-0 w-full overflow-visible ${className}`}
      style={style}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    >
      {children}
    </svg>
  )
}
