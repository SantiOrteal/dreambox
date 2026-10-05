// Fondo ambiental de toda la página: fijo detrás del contenido.
// Retícula de puntos tenue + manchas de color de la marca que se desplazan muy despacio.
// Solo transform en animación (compuesto en GPU); con movimiento reducido queda estático.
export default function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#fbfbfd]">
      <div className="absolute -left-[10%] -top-[15%] h-[70vmax] w-[70vmax] animate-drift rounded-full bg-[radial-gradient(circle,rgba(79,124,255,0.16),transparent_62%)] [animation-duration:34s] motion-reduce:animate-none" />
      <div className="absolute -right-[15%] top-[20%] h-[65vmax] w-[65vmax] animate-drift rounded-full bg-[radial-gradient(circle,rgba(109,92,255,0.12),transparent_62%)] [animation-delay:-12s] [animation-duration:42s] motion-reduce:animate-none" />
      <div className="absolute -bottom-[25%] left-[20%] h-[60vmax] w-[60vmax] animate-drift rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.10),transparent_62%)] [animation-delay:-20s] [animation-duration:38s] motion-reduce:animate-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(15,23,42,0.075)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_40%,#000_35%,transparent_80%)]" />
    </div>
  )
}
