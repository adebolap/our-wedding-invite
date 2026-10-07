import { useEffect, useState } from "react"
import { site } from "../site.config"

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero")
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting)
      },
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`nav${scrolled ? " nav--solid" : ""}`}
      aria-label="Primary"
    >
      <div className="nav__brand">{site.monogram}</div>
      <ul className="nav__links">
        <li>
          <a href="#story">Story</a>
        </li>
        <li>
          <a href="#day">Day</a>
        </li>
        <li>
          <a href="#venue">Venue</a>
        </li>
        <li>
          <a href="#rsvp">RSVP</a>
        </li>
      </ul>
    </header>
  )
}
