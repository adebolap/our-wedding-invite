import { useEffect, useMemo, useState, type FormEvent } from "react"
import QRCode from "qrcode"
import { site } from "../site.config"
import { buildShareQrUrl } from "../lib/shareDeepLink"

type GuestPhoto = {
  id: string
  guestName: string
  caption: string
  mimeType: string
  createdAt: string
  url: string
}

type Status = "idle" | "loading" | "uploading" | "error" | "ready"

const MAX_EDGE = 1600
const JPEG_QUALITY = 0.78
const TARGET_BYTES = 850_000

async function readApiJson<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") || ""
  const raw = await response.text()
  if (!contentType.includes("application/json")) {
    throw new Error(
      response.ok
        ? "The guest album API returned a non-JSON response. Please try again shortly."
        : `Guest album API error (${response.status}). Please try again shortly.`,
    )
  }
  try {
    return JSON.parse(raw) as T
  } catch {
    throw new Error(
      `Guest album API returned invalid JSON (${response.status}). Please try again shortly.`,
    )
  }
}

async function compressImage(file: File): Promise<Blob> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Choose a photo to share.")
  }

  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height))
  const width = Math.max(1, Math.round(bitmap.width * scale))
  const height = Math.max(1, Math.round(bitmap.height * scale))
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Could not prepare that photo.")
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  let quality = JPEG_QUALITY
  let blob: Blob | null = null
  for (let attempt = 0; attempt < 5; attempt += 1) {
    blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality),
    )
    if (!blob) break
    if (blob.size <= TARGET_BYTES) break
    quality = Math.max(0.45, quality - 0.1)
  }

  if (!blob) throw new Error("Could not prepare that photo.")
  if (blob.size > TARGET_BYTES) {
    throw new Error("That photo is still a little large. Try another frame.")
  }
  return blob
}

type GuestShareProps = {
  /** When true, guests arrived from the table QR — emphasize upload. */
  focusUpload?: boolean
}

export function GuestShare({ focusUpload = false }: GuestShareProps) {
  const [photos, setPhotos] = useState<GuestPhoto[]>([])
  const [unlocked, setUnlocked] = useState(false)
  const [pin, setPin] = useState("")
  const [status, setStatus] = useState<Status>("loading")
  const [uploadMessage, setUploadMessage] = useState("")
  const [viewMessage, setViewMessage] = useState("")
  const [qrDataUrl, setQrDataUrl] = useState("")
  const [guestName, setGuestName] = useState("")
  const [caption, setCaption] = useState("")
  const [fileName, setFileName] = useState("")

  const shareUrl = useMemo(() => {
    const origin =
      typeof window === "undefined"
        ? undefined
        : `${window.location.origin}${window.location.pathname.replace(/\/share\/?$/, "") || ""}`
    return buildShareQrUrl(site.share.publicUrl, origin)
  }, [])

  useEffect(() => {
    let cancelled = false
    QRCode.toDataURL(shareUrl, {
      margin: 1,
      width: 280,
      color: { dark: "#2a1820", light: "#fbf6f0" },
    })
      .then((url) => {
        if (!cancelled) setQrDataUrl(url)
      })
      .catch(() => {
        if (!cancelled) setQrDataUrl("")
      })
    return () => {
      cancelled = true
    }
  }, [shareUrl])

  async function loadPhotos() {
    const response = await fetch("/api/photos", { credentials: "include" })
    if (response.status === 401) {
      setUnlocked(false)
      setPhotos([])
      setStatus("ready")
      return
    }
    const data = await readApiJson<{ photos?: GuestPhoto[]; error?: string }>(
      response,
    )
    if (!response.ok) {
      throw new Error(data.error || "Could not load guest photos.")
    }
    setPhotos(data.photos ?? [])
    setUnlocked(true)
    setStatus("ready")
    setViewMessage("")
  }

  useEffect(() => {
    let cancelled = false
    async function boot() {
      try {
        const session = await fetch("/api/photos/session", {
          credentials: "include",
        })
        const data = await readApiJson<{ unlocked?: boolean }>(session)
        if (cancelled) return
        if (data.unlocked) {
          await loadPhotos()
        } else {
          setUnlocked(false)
          setStatus("ready")
        }
      } catch (error) {
        if (!cancelled) {
          setUnlocked(false)
          setStatus("error")
          setViewMessage(
            error instanceof Error
              ? error.message
              : "Guest album will appear once the server is ready.",
          )
        }
      }
    }
    void boot()
    return () => {
      cancelled = true
    }
  }, [])

  async function onUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setViewMessage("")
    setStatus("loading")
    try {
      const response = await fetch("/api/photos/unlock", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      })
      const data = await readApiJson<{ error?: string }>(response)
      if (!response.ok) {
        throw new Error(data.error || "That PIN is not correct.")
      }
      setPin("")
      await loadPhotos()
      setViewMessage("Album unlocked on this device.")
    } catch (error) {
      setUnlocked(false)
      setStatus("ready")
      setViewMessage(
        error instanceof Error ? error.message : "That PIN is not correct.",
      )
    }
  }

  async function onLock() {
    await fetch("/api/photos/lock", {
      method: "POST",
      credentials: "include",
    })
    setUnlocked(false)
    setPhotos([])
    setViewMessage("Album locked on this device.")
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const input = form.elements.namedItem("photo") as HTMLInputElement | null
    const file = input?.files?.[0]
    if (!file) {
      setUploadMessage("Choose a photo to share.")
      return
    }

    setStatus("uploading")
    setUploadMessage("Uploading…")
    try {
      const compressed = await compressImage(file)
      const body = new FormData()
      body.append("photo", compressed, "guest.jpg")
      body.append("guestName", guestName)
      body.append("caption", caption)

      const response = await fetch("/api/photos", {
        method: "POST",
        credentials: "include",
        body,
      })
      const data = await readApiJson<{
        photo?: GuestPhoto
        error?: string
      }>(response)
      if (!response.ok || !data.photo) {
        throw new Error(data.error || "Could not save that photo.")
      }

      if (unlocked) {
        setPhotos((current) => [data.photo!, ...current])
      }
      setGuestName("")
      setCaption("")
      setFileName("")
      form.reset()
      setStatus("ready")
      setUploadMessage(
        unlocked
          ? "Thank you — your photo is in the album."
          : "Thank you — your photo was shared. Unlock the album with the PIN to view everyone's photos.",
      )
    } catch (error) {
      setStatus("ready")
      setUploadMessage(
        error instanceof Error ? error.message : "Could not save that photo.",
      )
    }
  }

  const displayUrl = shareUrl.replace(/^https?:\/\//, "")

  const album = (
    <>
      <div className="guest-share__album-head">
        <h3 className="guest-share__album-title">Guest album</h3>
        {unlocked ? (
          <button
            type="button"
            className="guest-share__lock-btn"
            onClick={() => void onLock()}
          >
            Lock album
          </button>
        ) : null}
      </div>

      {!unlocked ? (
        <form
          className="guest-share__form guest-share__form--view"
          onSubmit={onUnlock}
        >
          <p className="guest-share__lock-copy">
            Anyone can upload. Enter the PIN to view the shared album.
          </p>
          <label className="guest-share__field">
            <span>Album PIN</span>
            <input
              type="password"
              name="pin"
              inputMode="numeric"
              autoComplete="off"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              placeholder="Enter PIN"
              required
            />
          </label>
          <button
            className="btn btn--ink"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Checking…" : "View album"}
          </button>
          {viewMessage ? (
            <p className="guest-share__message" role="status">
              {viewMessage}
            </p>
          ) : null}
        </form>
      ) : photos.length === 0 ? (
        <p className="guest-share__empty">
          {status === "loading"
            ? "Loading guest photos…"
            : "Be the first to add a moment."}
        </p>
      ) : (
        <>
          {viewMessage ? (
            <p className="guest-share__message" role="status">
              {viewMessage}
            </p>
          ) : null}
          <ul className="guest-share__grid">
            {photos.map((photo) => (
              <li key={photo.id}>
                <figure className="guest-share__card">
                  <img
                    src={photo.url}
                    alt={
                      photo.caption ||
                      (photo.guestName
                        ? `Photo from ${photo.guestName}`
                        : "Guest wedding photo")
                    }
                    loading="lazy"
                  />
                  {(photo.guestName || photo.caption) && (
                    <figcaption>
                      {photo.guestName ? (
                        <strong>{photo.guestName}</strong>
                      ) : null}
                      {photo.caption ? <span>{photo.caption}</span> : null}
                    </figcaption>
                  )}
                </figure>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )

  return (
    <div
      className={`guest-share${focusUpload ? " guest-share--focus-upload" : ""}`}
    >
      <div className="guest-share__intro">
        {focusUpload ? null : (
          <p className="section__eyebrow">{site.share.eyebrow}</p>
        )}
        <h2 className="section__title" id="share-title">
          {focusUpload ? "Share a photo" : site.share.headline}
        </h2>
        <p className="section__body">
          {focusUpload
            ? "Take a new shot or choose one from your camera roll. Name and note are optional."
            : site.share.body}
        </p>
      </div>

      <div className="guest-share__layout">
        {focusUpload ? null : (
          <figure className="guest-share__qr">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="QR code to open Share and upload wedding photos"
              />
            ) : (
              <div className="guest-share__qr-fallback" aria-hidden="true" />
            )}
            <figcaption>
              Scan to open Share and upload. Viewing the album needs the PIN.
              <a className="guest-share__link" href={shareUrl}>
                {displayUrl}
              </a>
            </figcaption>
          </figure>
        )}

        <form
          className="guest-share__form"
          id="guest-share-upload"
          tabIndex={-1}
          onSubmit={onSubmit}
        >
          <label className="guest-share__file">
            <span className="btn btn--ink guest-share__file-btn">
              {fileName || "Take or choose a photo"}
            </span>
            <input
              type="file"
              name="photo"
              accept="image/jpeg,image/png,image/webp,image/*"
              required
              onChange={(event) =>
                setFileName(event.target.files?.[0]?.name ?? "")
              }
            />
          </label>

          <div className="guest-share__optional">
            <p className="guest-share__optional-label">Optional details</p>
            <label className="guest-share__field">
              <span>Your name</span>
              <input
                type="text"
                name="guestName"
                autoComplete="name"
                maxLength={60}
                value={guestName}
                onChange={(event) => setGuestName(event.target.value)}
                placeholder="Optional"
              />
            </label>
            <label className="guest-share__field">
              <span>A short note</span>
              <input
                type="text"
                name="caption"
                maxLength={140}
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
                placeholder="Optional"
              />
            </label>
          </div>

          <button
            className="btn btn--gold guest-share__submit"
            type="submit"
            disabled={status === "uploading"}
          >
            {status === "uploading" ? "Uploading…" : "Share photo"}
          </button>
          {uploadMessage ? (
            <p className="guest-share__message" role="status">
              {uploadMessage}
            </p>
          ) : null}
        </form>
      </div>

      {focusUpload ? (
        <details className="guest-share__album guest-share__album--secondary">
          <summary className="guest-share__album-summary">
            View guest album (PIN)
          </summary>
          {album}
        </details>
      ) : (
        <div className="guest-share__album">{album}</div>
      )}
    </div>
  )
}
