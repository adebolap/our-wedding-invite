import { useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { site } from "../site.config"

type Audience = "her" | "him" | null

type LenisLike = {
  stop: () => void
  start: () => void
}

function getLenis() {
  return (window as Window & { __lenis?: LenisLike }).__lenis
}

export function StyleInspiration() {
  const [open, setOpen] = useState(false)
  const [audience, setAudience] = useState<Audience>(null)
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    getLenis()?.stop()
    closeRef.current?.focus()
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
        setAudience(null)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      getLenis()?.start()
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  function close() {
    setOpen(false)
    setAudience(null)
  }

  const guide = site.styleGuide
  const board =
    audience === "her" ? guide.forHer : audience === "him" ? guide.forHim : null

  const dialog = open ? (
    <div className="style-inspire__overlay" role="presentation" onClick={close}>
      <div
        className="style-inspire__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="style-inspire__top">
          <p className="section__eyebrow">Style guide</p>
          <button
            ref={closeRef}
            type="button"
            className="style-inspire__close"
            onClick={close}
          >
            Close
          </button>
        </div>

        {!audience ? (
          <>
            <h3 className="style-inspire__title" id={titleId}>
              {guide.prompt}
            </h3>
            <p className="style-inspire__lede">{guide.lede}</p>
            <p className="style-inspire__outdoor">{guide.outdoorNote}</p>
            <div className="style-inspire__choices">
              <button
                type="button"
                className="style-inspire__choice"
                onClick={() => setAudience("her")}
              >
                <span className="style-inspire__choice-kicker">Ladies</span>
                <span className="style-inspire__choice-label">For her</span>
              </button>
              <button
                type="button"
                className="style-inspire__choice"
                onClick={() => setAudience("him")}
              >
                <span className="style-inspire__choice-kicker">Gentlemen</span>
                <span className="style-inspire__choice-label">For him</span>
              </button>
            </div>
            <a
              className="style-inspire__pdf"
              href={guide.pdf}
              target="_blank"
              rel="noreferrer"
            >
              Open full style guide PDF
            </a>
          </>
        ) : (
          <>
            <div className="style-inspire__board-head">
              <button
                type="button"
                className="style-inspire__back"
                onClick={() => setAudience(null)}
              >
                ← Choose again
              </button>
              <h3 className="style-inspire__title" id={titleId}>
                {board?.label}
              </h3>
              <p className="style-inspire__lede">{guide.themeLine}</p>
            </div>
            <figure className="style-inspire__board">
              <img
                src={board?.image}
                alt={board?.alt}
                width={840}
                height={1190}
              />
            </figure>
            <div className="style-inspire__notes">
              <div>
                <p className="style-inspire__note-title">Do</p>
                <ul>
                  {guide.dos.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="style-inspire__note-title">Don&apos;t</p>
                <ul>
                  {guide.donts.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <a
              className="style-inspire__pdf"
              href={guide.pdf}
              target="_blank"
              rel="noreferrer"
            >
              Open full style guide PDF
            </a>
          </>
        )}
      </div>
    </div>
  ) : null

  return (
    <div className="style-inspire">
      <button
        type="button"
        className="style-inspire__trigger"
        onClick={() => setOpen(true)}
      >
        Need inspiration on what to wear?
      </button>
      <p className="style-inspire__hint">
        Open look ideas for her or for him.
      </p>
      {typeof document !== "undefined" && dialog
        ? createPortal(dialog, document.body)
        : null}
    </div>
  )
}
