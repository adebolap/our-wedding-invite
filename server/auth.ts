import { createHmac, timingSafeEqual } from "node:crypto"
import type { Context, Next } from "hono"
import { getCookie, setCookie, deleteCookie } from "hono/cookie"

const COOKIE_NAME = "ks_guest_album"
const COOKIE_PAYLOAD = "unlocked"

export function expectedAlbumPin(): string {
  return process.env.GUEST_ALBUM_PIN?.trim() ?? ""
}

function pinConfigured(): boolean {
  return expectedAlbumPin().length > 0
}

function pinsMatch(provided: string, expected: string): boolean {
  const left = Buffer.from(provided)
  const right = Buffer.from(expected)
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

function sessionToken(pin: string): string {
  return createHmac("sha256", pin).update(COOKIE_PAYLOAD).digest("hex")
}

export function readProvidedPin(c: Context): string {
  const header = c.req.header("x-guest-pin")?.trim() ?? ""
  if (header) return header
  const formPin = c.get("formPin")
  return typeof formPin === "string" ? formPin.trim() : ""
}

export function hasValidAlbumSession(c: Context): boolean {
  const expected = expectedAlbumPin()
  if (!expected) return false
  const cookie = getCookie(c, COOKIE_NAME)
  if (!cookie) return false
  const want = sessionToken(expected)
  const left = Buffer.from(cookie)
  const right = Buffer.from(want)
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

export function unlockAlbum(c: Context, pin: string): boolean {
  const expected = expectedAlbumPin()
  if (!expected || !pinsMatch(pin, expected)) return false
  const secure = new URL(c.req.url).protocol === "https:"
  setCookie(c, COOKIE_NAME, sessionToken(expected), {
    httpOnly: true,
    secure,
    sameSite: "Lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  })
  return true
}

export function lockAlbum(c: Context) {
  deleteCookie(c, COOKIE_NAME, { path: "/" })
}

export async function requireAlbumAccess(c: Context, next: Next) {
  const path = c.req.path
  if (
    path.endsWith("/photos/session") ||
    path.endsWith("/photos/unlock") ||
    path.endsWith("/photos/lock")
  ) {
    await next()
    return
  }

  if (!pinConfigured()) {
    return c.json(
      { error: "Guest album PIN is not configured on the server." },
      503,
    )
  }

  if (hasValidAlbumSession(c)) {
    await next()
    return
  }

  const provided = readProvidedPin(c)
  if (provided && pinsMatch(provided, expectedAlbumPin())) {
    await next()
    return
  }

  return c.json({ error: "Enter the guest album PIN to continue." }, 401)
}
