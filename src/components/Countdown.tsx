import { useEffect, useState } from "react"
import { site } from "../site.config"

type Parts = { days: number; hours: number; minutes: number; seconds: number }

function getParts(target: number): Parts | null {
  const diff = target - Date.now()
  if (diff <= 0) return null
  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  const minutes = Math.floor((diff % 3_600_000) / 60_000)
  const seconds = Math.floor((diff % 60_000) / 1000)
  return { days, hours, minutes, seconds }
}

export function Countdown() {
  const target = new Date(site.date.iso).getTime()
  const [parts, setParts] = useState<Parts | null>(() => getParts(target))

  useEffect(() => {
    const id = window.setInterval(() => setParts(getParts(target)), 1000)
    return () => window.clearInterval(id)
  }, [target])

  if (!parts) {
    return (
      <div className="countdown countdown--done" aria-live="polite">
        <p>Today is the day.</p>
      </div>
    )
  }

  const items: Array<[string, number]> = [
    ["Days", parts.days],
    ["Hours", parts.hours],
    ["Minutes", parts.minutes],
    ["Seconds", parts.seconds],
  ]

  return (
    <div className="countdown" aria-label="Countdown to the wedding">
      {items.map(([label, value]) => (
        <div className="countdown__cell" key={label}>
          <span className="countdown__value">{String(value).padStart(2, "0")}</span>
          <span className="countdown__label">{label}</span>
        </div>
      ))}
    </div>
  )
}
