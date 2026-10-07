import { useEffect, useRef, useState } from "react"
import { site } from "../site.config"

export function MomentsScratch() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const paint = () => {
      const ratio = window.devicePixelRatio || 1
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      if (!width || !height) return

      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)

      const ctx = canvas.getContext("2d")
      if (!ctx) return
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)

      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, "#5f7563")
      gradient.addColorStop(0.55, "#9a7a45")
      gradient.addColorStop(1, "#3d5645")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = "rgba(245, 248, 244, 0.92)"
      ctx.font = "600 15px Manrope, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("Scratch to reveal", width / 2, height / 2 - 8)
      ctx.font = "500 12px Manrope, sans-serif"
      ctx.fillStyle = "rgba(245, 248, 244, 0.75)"
      ctx.fillText("a few of our favourite frames", width / 2, height / 2 + 14)
    }

    paint()
    window.addEventListener("resize", paint)
    return () => window.removeEventListener("resize", paint)
  }, [])

  function scratch(clientX: number, clientY: number) {
    const canvas = canvasRef.current
    if (!canvas || revealed) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    const ratio = window.devicePixelRatio || 1
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(x, y, 26, 0, Math.PI * 2)
    ctx.fill()

    const sample = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let clear = 0
    for (let i = 3; i < sample.length; i += 20) {
      if (sample[i] < 128) clear += 1
    }
    const total = sample.length / 20
    if (clear / total > 0.42) setRevealed(true)
  }

  const cover = site.moments.images[0]

  return (
    <div className={`moments-scratch${revealed ? " moments-scratch--done" : ""}`}>
      <div className="moments-scratch__reveal">
        <img src={cover.src} alt={cover.alt} width={1200} height={900} />
        <div className="moments-scratch__caption">
          <p className="moments-scratch__names">
            {site.partners.one.first} & {site.partners.two.first}
          </p>
          {site.moments.websiteUrl ? (
            <a
              className="btn btn--solid moments-scratch__link"
              href={site.moments.websiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              {site.moments.websiteLabel}
            </a>
          ) : (
            <p className="moments-scratch__note">More photos coming soon.</p>
          )}
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="moments-scratch__canvas"
        aria-label="Scratchable photo reveal"
        onPointerDown={(event) => {
          drawing.current = true
          event.currentTarget.setPointerCapture(event.pointerId)
          scratch(event.clientX, event.clientY)
        }}
        onPointerMove={(event) => {
          if (!drawing.current) return
          scratch(event.clientX, event.clientY)
        }}
        onPointerUp={() => {
          drawing.current = false
        }}
        onPointerCancel={() => {
          drawing.current = false
        }}
      />
      <p className="moments-scratch__hint" role="status" aria-live="polite">
        {revealed
          ? "Keep scrolling for more moments below."
          : "Use your finger or mouse to scratch."}
      </p>
    </div>
  )
}
