/** Path guests should land on after scanning the table QR. */
export const SHARE_PATH = "/share"

/** Section id used for in-page nav anchors. */
export const SHARE_SECTION_ID = "share"

/**
 * True when the guest arrived via the Share QR / deep link.
 * Prefers `/share`; still accepts legacy `#share` hashes.
 */
export function isShareDeepLink(
  location: Pick<Location, "pathname" | "hash"> = window.location,
): boolean {
  const path = location.pathname.replace(/\/+$/, "") || "/"
  if (path === SHARE_PATH || path.endsWith(SHARE_PATH)) return true
  const hash = location.hash.replace(/^#/, "").split(/[?/]/)[0]
  return hash === SHARE_SECTION_ID
}

/** Canonical public URL encoded into the printable QR. */
export function buildShareQrUrl(publicUrl: string, originFallback?: string): string {
  const base = (publicUrl || originFallback || "").replace(/\/+$/, "")
  if (!base) return SHARE_PATH
  return `${base}${SHARE_PATH}`
}

/** Keep the standalone share path clean (drop leftover #share hashes). */
export function normalizeShareUrl(): void {
  const path = window.location.pathname.replace(/\/+$/, "") || "/"
  const nextPath =
    path === SHARE_PATH || path.endsWith(SHARE_PATH) ? path : SHARE_PATH
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`
  if (current !== nextPath) {
    window.history.replaceState(null, "", nextPath)
  }
}
