import { neon, type NeonQueryFunction } from "@neondatabase/serverless"

const databaseUrl = process.env.DATABASE_URL?.trim() ?? ""
const isNode = typeof process !== "undefined" && Boolean(process.versions?.node)

let neonSql: NeonQueryFunction<false, false> | null = null
let neonInitError: string | null = null

if (databaseUrl !== "") {
  try {
    neonSql = neon(databaseUrl)
  } catch (error) {
    neonInitError =
      error instanceof Error
        ? error.message
        : "DATABASE_URL is not a valid Postgres connection string."
    neonSql = null
  }
}

export async function sql<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  if (neonInitError) {
    throw new Error(neonInitError)
  }

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
