import { useEffect, useRef, useState } from "react"
import { site } from "../site.config"

export function MomentsScratch() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const [revealed, setRevealed] = useState(false)
  const cover = site.moments.scratchImage

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
      gradient.addColorStop(0, "#4A2028")
      gradient.addColorStop(0.5, "#8B5E3C")
      gradient.addColorStop(1, "#6B2E3A")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = "rgba(248, 241, 234, 0.95)"
      ctx.font = "600 15px Outfit, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("Scratch to reveal", width / 2, height / 2 - 8)
      ctx.font = "500 12px Outfit, sans-serif"
      ctx.fillStyle = "rgba(248, 241, 234, 0.78)"
      ctx.fillText("a favourite frame from our story", width / 2, height / 2 + 14)
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

  return (
    <div className={`moments-scratch${revealed ? " moments-scratch--done" : ""}`}>
      <div className="moments-scratch__reveal">
        <img src={cover.src} alt={cover.alt} width={1200} height={1600} />
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
            <p className="moments-scratch__note">Keep scrolling for more of our story.</p>
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
          ? "Our chapters continue below."
          : "Use your finger or mouse to scratch."}
      </p>
    </div>
  )
}
