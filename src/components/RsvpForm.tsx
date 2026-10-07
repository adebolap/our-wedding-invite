import { useState } from "react"
import type { FormEvent } from "react"
import { site } from "../site.config"

type Status = { tone: "idle" | "success" | "error"; message: string }

const initialStatus: Status = { tone: "idle", message: "" }

export function RsvpForm() {
  const [status, setStatus] = useState<Status>(initialStatus)
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setStatus(initialStatus)

    const form = event.currentTarget
    const data = new FormData(form)

    try {
      if (site.rsvp.endpoint) {
        const response = await fetch(site.rsvp.endpoint, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        })
        if (!response.ok) {
          throw new Error("Could not send RSVP")
        }
      } else {
        // Local success path until an RSVP endpoint is configured.
        await new Promise((resolve) => setTimeout(resolve, 450))
      }

      form.reset()
      setStatus({
        tone: "success",
        message: "Thank you — your reply has been received.",
      })
    } catch {
      setStatus({
        tone: "error",
        message: "Something went wrong. Please try again in a moment.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="rsvp__form" onSubmit={onSubmit} noValidate={false}>
      <div className="field-row">
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="attending">Will you attend?</label>
          <select id="attending" name="attending" required defaultValue="">
            <option value="" disabled>
              Select an option
            </option>
            <option value="yes">Joyfully yes</option>
            <option value="no">Regretfully no</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="guests">Number of guests</label>
          <input
            id="guests"
            name="guests"
            type="number"
            min={1}
            max={6}
            defaultValue={1}
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">Note for the couple</label>
        <textarea
          id="message"
          name="message"
          placeholder="Dietary needs, song requests, or a warm wish"
        />
      </div>

      <button className="btn btn--ink" type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Send RSVP"}
      </button>

      <p
        className="form-status"
        data-tone={status.tone === "error" ? "error" : undefined}
        role="status"
        aria-live="polite"
      >
        {status.message}
      </p>
    </form>
  )
}
