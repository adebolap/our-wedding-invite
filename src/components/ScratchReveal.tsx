import { useEffect, useRef, useState } from "react"
import { site } from "../site.config"

type ScratchRevealProps = {
  open: boolean
  onClose: () => void
}

export function ScratchReveal({ open, onClose }: ScratchRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (!open) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ratio = window.devicePixelRatio || 1
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    canvas.width = width * ratio
    canvas.height = height * ratio

    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.scale(ratio, ratio)

    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, "#6d866f")
    gradient.addColorStop(0.5, "#9a7a45")
    gradient.addColorStop(1, "#4a6b54")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = "rgba(245, 248, 244, 0.92)"
    ctx.font = "600 15px Manrope, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Scratch to reveal", width / 2, height / 2)
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  function scratch(clientX: number, clientY: number) {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(x, y, 22, 0, Math.PI * 2)
    ctx.fill()

    const sample = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let clear = 0
    for (let i = 3; i < sample.length; i += 16) {
      if (sample[i] < 128) clear += 1
    }
    const total = sample.length / 16
    if (clear / total > 0.45) setRevealed(true)
  }

  return (
    <div className="scratch-modal" role="dialog" aria-modal="true" aria-labelledby="scratch-title">
      <div className="scratch-modal__backdrop" onClick={onClose} />
      <div className="scratch-modal__panel">
        <button type="button" className="scratch-modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <p className="section__eyebrow">A note for you</p>
        <h2 className="scratch-modal__title" id="scratch-title">
          Scratch to open our thank-you
        </h2>
        <div className={`scratch-card${revealed ? " scratch-card--done" : ""}`}>
          <div className="scratch-card__message">
            <p>We cannot wait to celebrate with you.</p>
            <p className="scratch-card__names">
              {site.partners.one.first} & {site.partners.two.first}
            </p>
            <p className="scratch-card__date">{site.date.label}</p>
          </div>
          <canvas
            ref={canvasRef}
            className="scratch-card__canvas"
            aria-label="Scratchable reveal layer"
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
            onPointerLeave={() => {
              drawing.current = false
            }}
          />
        </div>
        {revealed ? (
          <p className="scratch-modal__hint" role="status">
            See you there.
          </p>
        ) : (
          <p className="scratch-modal__hint">Use your finger or mouse to scratch.</p>
        )}
      </div>
    </div>
  )
}
