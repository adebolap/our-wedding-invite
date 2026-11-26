import { sql } from "./db.js"

export const MAX_PHOTO_BYTES = 900_000
export const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
])

export type GuestPhotoMeta = {
  id: string
  guest_name: string
  caption: string
  mime_type: string
  created_at: string
}

type GuestPhotoRow = {
  mime_type: string
  bytes: unknown
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = ""
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]!)
  }
  return btoa(binary)
}

function coerceBytes(value: unknown): Uint8Array {
  if (value instanceof Uint8Array) return value
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(value)) {
    return new Uint8Array(value)
  }
  if (typeof value === "string") {
    if (value.startsWith("\\x")) {
      const hex = value.slice(2)
      const out = new Uint8Array(hex.length / 2)
      for (let i = 0; i < out.length; i += 1) {
        out[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16)
      }
      return out
    }
    const binary = atob(value)
    const out = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i += 1) {
      out[i] = binary.charCodeAt(i)
    }
    return out
  }
  throw new PhotoError(500, "Could not read that photo.")
}

export async function listGuestPhotos(limit = 48): Promise<GuestPhotoMeta[]> {
  const safeLimit = Math.min(Math.max(limit, 1), 96)
  return sql<GuestPhotoMeta>(
    `select id::text, guest_name, caption, mime_type, created_at::text
     from guest_photos
     order by created_at desc
     limit $1`,
    [safeLimit],
  )
}

export async function getGuestPhoto(
  id: string,
): Promise<{ mime_type: string; bytes: Uint8Array } | null> {
  const rows = await sql<GuestPhotoRow>(
    `select mime_type, bytes from guest_photos where id = $1::uuid`,
    [id],
  )
  const row = rows[0]
  if (!row) return null
  return { mime_type: row.mime_type, bytes: coerceBytes(row.bytes) }
}

export async function createGuestPhoto(input: {
  guestName: string
  caption: string
  mimeType: string
  bytes: Uint8Array
}): Promise<GuestPhotoMeta> {
  if (!ALLOWED_MIME.has(input.mimeType)) {
    throw new PhotoError(400, "Use a JPEG, PNG, or WebP photo.")
  }
  if (input.bytes.byteLength === 0 || input.bytes.byteLength > MAX_PHOTO_BYTES) {
    throw new PhotoError(400, "Keep each photo under about 900 KB.")
  }

  const guestName = input.guestName.trim().slice(0, 60)
  const caption = input.caption.trim().slice(0, 140)
  const payload = bytesToBase64(input.bytes)

  const rows = await sql<GuestPhotoMeta>(
    `insert into guest_photos (guest_name, caption, mime_type, bytes)
     values ($1, $2, $3, decode($4, 'base64'))
     returning id::text, guest_name, caption, mime_type, created_at::text`,
    [guestName, caption, input.mimeType, payload],
  )
  const created = rows[0]
  if (!created) throw new PhotoError(500, "Could not save that photo.")
  return created
}

export class PhotoError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}
