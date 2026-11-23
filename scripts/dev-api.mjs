import { serve } from "@hono/node-server"
import app from "../server/app.ts"

const port = Number(process.env.API_PORT || 8787)
serve({ fetch: app.fetch, port }, () => {
  console.log(`guest photo api on http://127.0.0.1:${port}`)
})
