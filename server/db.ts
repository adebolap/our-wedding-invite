import { readdir, readFile } from "node:fs/promises"
import pg from "pg"

const databaseUrl = process.env.DATABASE_URL?.trim() ?? ""
let pool: pg.Pool | undefined
let local: Promise<import("@electric-sql/pglite").PGlite> | undefined

export async function sql<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  if (databaseUrl !== "") {
    pool ??= new pg.Pool({
      connectionString: databaseUrl,
      // Neon pooled connections on Vercel: keep the pool tiny.
      max: 1,
      idleTimeoutMillis: 5_000,
      connectionTimeoutMillis: 10_000,
      ssl: databaseUrl.includes("sslmode=require")
        ? { rejectUnauthorized: false }
        : undefined,
    })
    return (await pool.query(text, params)).rows as T[]
  }
  local ??= startLocal().catch((error: unknown) => {
    local = undefined
    throw error
  })
  return (await (await local).query<T>(text, params)).rows
}

async function startLocal() {
  const { PGlite } = await import("@electric-sql/pglite")
  const db = new PGlite()
  const files = (await readdir("migrations").catch(() => []))
    .filter((file) => file.endsWith(".sql"))
    .sort()
  for (const file of files) {
    await db.exec(await readFile(`migrations/${file}`, "utf8"))
  }
  return db
}
