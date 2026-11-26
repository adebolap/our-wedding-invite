import { neon } from "@neondatabase/serverless"

const databaseUrl = process.env.DATABASE_URL?.trim() ?? ""
const neonSql = databaseUrl !== "" ? neon(databaseUrl) : null
const isNode = typeof process !== "undefined" && Boolean(process.versions?.node)

export async function sql<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  if (neonSql) {
    const rows = await neonSql.query(text, params)
    return rows as T[]
  }

  if (!isNode) {
    throw new Error("DATABASE_URL is required in this environment.")
  }

  // Node-only local fallback for `npm run dev` without Neon.
  const { localSql } = await import("./db-local.js")
  return localSql<T>(text, params)
}
