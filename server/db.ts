import { neon } from "@neondatabase/serverless"

const databaseUrl = process.env.DATABASE_URL?.trim() ?? ""
const neonSql = databaseUrl !== "" ? neon(databaseUrl) : null

export async function sql<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  if (neonSql) {
    const rows = await neonSql.query(text, params)
    return rows as T[]
  }

  // Local fallback only when DATABASE_URL is unset.
  const { localSql } = await import("./db-local.js")
  return localSql<T>(text, params)
}
