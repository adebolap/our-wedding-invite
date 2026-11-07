import { useEffect } from "react"
import Lenis from "lenis"

export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reduceMotion.matches) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    ;(window as Window & { __lenis?: Lenis }).__lenis = lenis

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      if ((window as Window & { __lenis?: Lenis }).__lenis === lenis) {
        delete (window as Window & { __lenis?: Lenis }).__lenis
      }
      lenis.destroy()
    }
  }, [enabled])
}
