import { readFileSync, existsSync } from "node:fs"
import { resolve } from "node:path"
import { serve } from "@hono/node-server"
import app from "../server/app.ts"
import { setSqlOverride } from "../server/db.ts"

function loadEnvFile(fileName) {
  const filePath = resolve(process.cwd(), fileName)
  if (!existsSync(filePath)) return
  for (const line of readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eq = trimmed.indexOf("=")
    if (eq <= 0) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!(key in process.env)) process.env[key] = value
  }
}

loadEnvFile(".env.local")
loadEnvFile(".env")

if (!process.env.DATABASE_URL?.trim()) {
  const { localSql } = await import("../server/db-local.ts")
  setSqlOverride(localSql)
}

const port = Number(process.env.API_PORT || 8787)
serve({ fetch: app.fetch, port }, () => {
  console.log(`guest photo api on http://127.0.0.1:${port}`)
})
