import { Hono } from "hono"
import { cors } from "hono/cors"
import {
  hasValidAlbumSession,
  lockAlbum,
  requireAlbumAccess,
  unlockAlbum,
} from "./auth.js"
import {
  ALLOWED_MIME,
  createGuestPhoto,
  getGuestPhoto,
  listGuestPhotos,
  MAX_PHOTO_BYTES,
  PhotoError,
} from "./photos.js"

const app = new Hono().basePath("/api")

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "X-Guest-Pin"],
    credentials: true,
  }),
)

app.get("/health", (c) => c.json({ ok: true }))

app.get("/photos/session", (c) =>
  c.json({ unlocked: hasValidAlbumSession(c) }),
)

app.post("/photos/unlock", async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const pin = typeof body?.pin === "string" ? body.pin.trim() : ""
  if (!pin) return c.json({ error: "Enter the guest album PIN." }, 400)
  if (!unlockAlbum(c, pin)) {
    return c.json({ error: "That PIN is not correct." }, 401)
  }
  return c.json({ unlocked: true })
})

app.post("/photos/lock", (c) => {
  lockAlbum(c)
  return c.json({ unlocked: false })
})

// Uploads are open to everyone. Viewing the album requires the PIN.
app.post("/photos", async (c) => {
  try {
    const form = await c.req.parseBody({ all: true })
    const file = form.photo
    if (!(file instanceof File)) {
      return c.json({ error: "Choose a photo to share." }, 400)
    }
    if (!ALLOWED_MIME.has(file.type)) {
      return c.json({ error: "Use a JPEG, PNG, or WebP photo." }, 400)
    }
    if (file.size > MAX_PHOTO_BYTES) {
      return c.json({ error: "Keep each photo under about 900 KB." }, 400)
    }

    const bytes = Buffer.from(await file.arrayBuffer())
    const guestName =
      typeof form.guestName === "string" ? form.guestName : ""
    const caption = typeof form.caption === "string" ? form.caption : ""

    const created = await createGuestPhoto({
      guestName,
      caption,
      mimeType: file.type,
      bytes,
    })

    return c.json(
      {
        photo: {
          id: created.id,
          guestName: created.guest_name,
          caption: created.caption,
          mimeType: created.mime_type,
          createdAt: created.created_at,
          url: `/api/photos/${created.id}`,
        },
      },
      201,
    )
  } catch (error) {
    if (error instanceof PhotoError) {
      return c.json({ error: error.message }, error.status)
    }
    console.error("create photo failed", error)
    return c.json({ error: "Could not save that photo." }, 500)
  }
})

app.get("/photos", requireAlbumAccess, async (c) => {
  try {
    const photos = await listGuestPhotos()
    return c.json({
      photos: photos.map((photo) => ({
        id: photo.id,
        guestName: photo.guest_name,
        caption: photo.caption,
        mimeType: photo.mime_type,
        createdAt: photo.created_at,
        url: `/api/photos/${photo.id}`,
      })),
    })
  } catch (error) {
    console.error("list photos failed", error)
    return c.json({ error: "Could not load guest photos." }, 500)
  }
})

app.get("/photos/:id", requireAlbumAccess, async (c) => {
  try {
    const photo = await getGuestPhoto(c.req.param("id"))
    if (!photo) return c.json({ error: "Photo not found." }, 404)
    return new Response(photo.bytes, {
      headers: {
        "Content-Type": photo.mime_type,
        "Cache-Control": "private, max-age=3600",
      },
    })
  } catch (error) {
    console.error("get photo failed", error)
    return c.json({ error: "Could not load that photo." }, 500)
  }
})

export default app
