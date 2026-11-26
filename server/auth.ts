import type { Context, Next } from "hono"
import { deleteCookie, getCookie, setCookie } from "hono/cookie"

const COOKIE_NAME = "ks_guest_album"
const COOKIE_PAYLOAD = "unlocked"

export function expectedAlbumPin(): string {
  return process.env.GUEST_ALBUM_PIN?.trim() ?? ""
}

function pinConfigured(): boolean {
  return expectedAlbumPin().length > 0
}

function encodeUtf8(value: string): Uint8Array {
  return new TextEncoder().encode(value)
}

function toHex(bytes: ArrayBuffer): string {
  return [...new Uint8Array(bytes)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}

function timingSafeEqualString(left: string, right: string): boolean {
  if (left.length !== right.length) return false
  let mismatch = 0
  for (let i = 0; i < left.length; i += 1) {
    mismatch |= left.charCodeAt(i) ^ right.charCodeAt(i)
  }
  return mismatch === 0
}

async function sessionToken(pin: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encodeUtf8(pin),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encodeUtf8(COOKIE_PAYLOAD),
  )
  return toHex(signature)
}

export function readProvidedPin(c: Context): string {
  const header = c.req.header("x-guest-pin")?.trim() ?? ""
  if (header) return header
  const formPin = c.get("formPin")
  return typeof formPin === "string" ? formPin.trim() : ""
}

export async function hasValidAlbumSession(c: Context): Promise<boolean> {
  const expected = expectedAlbumPin()
  if (!expected) return false
  const cookie = getCookie(c, COOKIE_NAME)
  if (!cookie) return false
  return timingSafeEqualString(cookie, await sessionToken(expected))
}

function requestIsHttps(c: Context): boolean {
  if (process.env.VERCEL === "1") return true
  const forwarded = c.req.header("x-forwarded-proto")?.split(",")[0]?.trim()
  if (forwarded) return forwarded === "https"
  try {
    return new URL(c.req.url, "http://localhost").protocol === "https:"
  } catch {
    return false
  }
}

export async function unlockAlbum(c: Context, pin: string): Promise<boolean> {
  const expected = expectedAlbumPin()
  if (!expected || !timingSafeEqualString(pin, expected)) return false

  setCookie(c, COOKIE_NAME, await sessionToken(expected), {
    httpOnly: true,
    secure: requestIsHttps(c),
    sameSite: "Lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  })
  return true
}

export function lockAlbum(c: Context) {
  deleteCookie(c, COOKIE_NAME, {
    path: "/",
    secure: requestIsHttps(c),
    sameSite: "Lax",
  })
}

export async function requireAlbumAccess(c: Context, next: Next) {
  if (!pinConfigured()) {
    return c.json(
      { error: "Guest album PIN is not configured on the server." },
      503,
    )
  }

  if (await hasValidAlbumSession(c)) {
    await next()
    return
  }

  const provided = readProvidedPin(c)
  if (provided && timingSafeEqualString(provided, expectedAlbumPin())) {
    await next()
    return
  }

  return c.json({ error: "Enter the guest album PIN to view photos." }, 401)
}
