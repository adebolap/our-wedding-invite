import { useEffect, useMemo, useState, type FormEvent } from "react"
import QRCode from "qrcode"
import { site } from "../site.config"

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

export function GuestShare() {
  const [photos, setPhotos] = useState<GuestPhoto[]>([])
  const [status, setStatus] = useState<Status>("loading")
  const [message, setMessage] = useState("")
  const [qrDataUrl, setQrDataUrl] = useState("")
  const [guestName, setGuestName] = useState("")
  const [caption, setCaption] = useState("")
  const [fileName, setFileName] = useState("")

  const shareUrl = useMemo(() => {
    if (site.share.publicUrl) return `${site.share.publicUrl}#share`
    if (typeof window === "undefined") return "#share"
    return `${window.location.origin}${window.location.pathname}#share`
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

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const response = await fetch("/api/photos")
        if (!response.ok) throw new Error("Could not load guest photos.")
        const data = (await response.json()) as { photos?: GuestPhoto[] }
        if (!cancelled) {
          setPhotos(data.photos ?? [])
          setStatus("ready")
          setMessage("")
        }
      } catch {
        if (!cancelled) {
          setPhotos([])
          setStatus("error")
          setMessage("Guest photos will appear once the database is connected.")
        }
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const input = form.elements.namedItem("photo") as HTMLInputElement | null
    const file = input?.files?.[0]
    if (!file) {
      setMessage("Choose a photo to share.")
      return
    }

    setStatus("uploading")
    setMessage("Uploading…")
    try {
      const compressed = await compressImage(file)
      const body = new FormData()
      body.append("photo", compressed, "guest.jpg")
      body.append("guestName", guestName)
      body.append("caption", caption)

      const response = await fetch("/api/photos", {
        method: "POST",
        body,
      })
      const data = (await response.json()) as {
        photo?: GuestPhoto
        error?: string
      }
      if (!response.ok || !data.photo) {
        throw new Error(data.error || "Could not save that photo.")
      }

      setPhotos((current) => [data.photo!, ...current])
      setGuestName("")
      setCaption("")
      setFileName("")
      form.reset()
      setStatus("ready")
      setMessage("Thank you — your photo is in the album.")
    } catch (error) {
      setStatus("ready")
      setMessage(
        error instanceof Error ? error.message : "Could not save that photo.",
      )
    }
  }

  return (
    <div className="guest-share">
      <div className="guest-share__intro">
        <p className="section__eyebrow">{site.share.eyebrow}</p>
        <h2 className="section__title" id="share-title">
          {site.share.headline}
        </h2>
        <p className="section__body">{site.share.body}</p>
      </div>

      <div className="guest-share__layout">
        <figure className="guest-share__qr">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="QR code to share your wedding photos" />
          ) : (
            <div className="guest-share__qr-fallback" aria-hidden="true" />
          )}
          <figcaption>
            Scan to open this page, then upload a photo.
            <a className="guest-share__link" href={shareUrl}>
              {shareUrl.replace(/^https?:\/\//, "")}
            </a>
          </figcaption>
        </figure>

        <form className="guest-share__form" onSubmit={onSubmit}>
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
          <label className="guest-share__file">
            <span className="btn btn--ink guest-share__file-btn">
              {fileName || "Choose a photo"}
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
          <button
            className="btn btn--gold"
            type="submit"
            disabled={status === "uploading"}
          >
            {status === "uploading" ? "Uploading…" : "Share photo"}
          </button>
          {message ? (
            <p className="guest-share__message" role="status">
              {message}
            </p>
          ) : null}
        </form>
      </div>

      <div className="guest-share__album">
        <h3 className="guest-share__album-title">Guest album</h3>
        {photos.length === 0 ? (
          <p className="guest-share__empty">
            {status === "loading"
              ? "Loading guest photos…"
              : "Be the first to add a moment."}
          </p>
        ) : (
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
                      {photo.guestName ? <strong>{photo.guestName}</strong> : null}
                      {photo.caption ? <span>{photo.caption}</span> : null}
                    </figcaption>
                  )}
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
