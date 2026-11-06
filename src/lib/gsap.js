import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Punto único para GSAP: los plugins se registran una sola vez y solo en el navegador
// (el pre-render de SEO corre en Node, donde no hay window).
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger, useGSAP)

export { gsap, ScrollTrigger, useGSAP }
