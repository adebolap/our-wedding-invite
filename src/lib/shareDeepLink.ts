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

/** Scroll the Share upload block into view after the invite unlocks. */
export function scrollToShareSection(behavior: ScrollBehavior = "smooth"): void {
  const target = document.getElementById(SHARE_SECTION_ID)
  if (!target) return

  const lenis = (
    window as Window & {
      __lenis?: { scrollTo: (el: HTMLElement, opts?: object) => void }
    }
  ).__lenis
  if (lenis) {
    lenis.scrollTo(target, { offset: -24, immediate: behavior === "auto" })
    return
  }

  target.scrollIntoView({ behavior, block: "start" })
}
