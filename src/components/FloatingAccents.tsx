import { useEffect, useRef } from "react"

const accents = [
  { className: "float-accent float-accent--a", depth: 0.08 },
  { className: "float-accent float-accent--b", depth: 0.14 },
  { className: "float-accent float-accent--c", depth: 0.1 },
  { className: "float-accent float-accent--d", depth: 0.18 },
]

export function FloatingAccents() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-depth]"))

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = window.scrollY
        for (const node of nodes) {
          const depth = Number(node.dataset.depth || 0)
          node.style.transform = `translate3d(0, ${y * depth}px, 0)`
        }
      })
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <div className="float-accents" ref={rootRef} aria-hidden="true">
      {accents.map((accent) => (
        <span
          key={accent.className}
          className={accent.className}
          data-depth={accent.depth}
        />
      ))}
    </div>
  )
}
