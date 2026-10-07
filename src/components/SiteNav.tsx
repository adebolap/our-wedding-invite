import { useEffect, useState } from "react"
import { site } from "../site.config"

const links = [
  { href: "#story", label: "Story", id: "story" },
  { href: "#day", label: "Day", id: "day" },
  { href: "#venue", label: "Venue", id: "venue" },
  { href: "#moments", label: "Moments", id: "moments" },
] as const

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState<string>("")

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

  useEffect(() => {
    const targets = links
      .map((link) => document.getElementById(link.id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (top?.target.id) setActiveId(top.target.id)
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.2, 0.45] },
    )

    for (const target of targets) observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`nav${scrolled ? " nav--solid" : ""}`}
      aria-label="Primary"
    >
      <a className="nav__brand" href="#main">
        {site.monogram}
      </a>
      <ul className="nav__links">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              aria-current={activeId === link.id ? "true" : undefined}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </header>
  )
}
