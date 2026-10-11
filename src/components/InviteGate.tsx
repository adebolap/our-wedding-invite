import { useEffect, useState } from "react"
import { site } from "../site.config"

const STORAGE_KEY = "kelly-seun-invite-opened"

type InviteGateProps = {
  onOpen: () => void
}

export function InviteGate({ onOpen }: InviteGateProps) {
  const [visible, setVisible] = useState(() => {
    if (typeof sessionStorage === "undefined") return true
    return sessionStorage.getItem(STORAGE_KEY) !== "1"
  })
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (!visible) onOpen()
  }, [visible, onOpen])

  if (!visible) return null

  function openInvite() {
    setExiting(true)
    sessionStorage.setItem(STORAGE_KEY, "1")
    window.setTimeout(() => {
      setVisible(false)
    }, 900)
  }

  return (
    <div
      className={`invite-gate${exiting ? " invite-gate--exit" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="invite-gate-title"
    >
      <div className={`invite-box${exiting ? " invite-box--open" : ""}`}>
        <div className="invite-box__lid" aria-hidden="true">
          <span className="invite-box__hinge" />
        </div>
        <div className="invite-box__panel">
          <p className="invite-gate__eyebrow">Save the date</p>
          <div className="invite-gate__seal" aria-hidden="true">
            <span>{site.monogram}</span>
          </div>
          <h1 className="invite-gate__title" id="invite-gate-title">
            {site.partners.one.first}
            <span> & </span>
            {site.partners.two.first}
          </h1>
          <p className="invite-gate__date">{site.date.label}</p>
          <p className="invite-gate__place">{site.venue.name} · Lagos</p>
          <button
            type="button"
            className="btn btn--gold invite-gate__cta"
            onClick={openInvite}
          >
            Open the box
          </button>
        </div>
      </div>
    </div>
  )
}
