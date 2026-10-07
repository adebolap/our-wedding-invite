import { useEffect, useState } from "react"

const steps = [
  { id: "hero", href: "#main", label: "Invite" },
  { id: "story", href: "#story", label: "Story" },
  { id: "day", href: "#day", label: "Day" },
  { id: "venue", href: "#venue", label: "Venue" },
  { id: "rsvp", href: "#rsvp", label: "RSVP" },
] as const

type StepId = (typeof steps)[number]["id"]

export function JourneyRail({ active }: { active: boolean }) {
  const [current, setCurrent] = useState<StepId>("hero")

  useEffect(() => {
    if (!active) return

    const sections = steps
      .map((step) => {
        const el = document.getElementById(step.id)
        return el ? { id: step.id, el } : null
      })
      .filter(Boolean) as Array<{ id: StepId; el: HTMLElement }>

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setCurrent(visible[0].target.id as StepId)
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.15, 0.35, 0.55],
      },
    )

    for (const section of sections) observer.observe(section.el)
    return () => observer.disconnect()
  }, [active])

  if (!active) return null

  return (
    <nav className="journey" aria-label="Invitation journey">
      <ol className="journey__list">
        {steps.map((step, index) => {
          const isActive = current === step.id
          const isPast =
            steps.findIndex((item) => item.id === current) > index
          return (
            <li
              key={step.id}
              className={`journey__step${isActive ? " journey__step--active" : ""}${isPast ? " journey__step--past" : ""}`}
            >
              <a href={step.href}>
                <span className="journey__dot" aria-hidden="true" />
                <span className="journey__label">{step.label}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
