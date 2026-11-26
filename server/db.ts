import { neon, type NeonQueryFunction } from "@neondatabase/serverless"

type SqlFn = <T = Record<string, unknown>>(
  text: string,
  params?: unknown[],
) => Promise<T[]>

const databaseUrl = process.env.DATABASE_URL?.trim() ?? ""

let neonSql: NeonQueryFunction<false, false> | null = null
let neonInitError: string | null = null
let overrideSql: SqlFn | null = null

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

/** Local Node fallback (PGlite) — only wired from scripts/dev-api.mjs. */
export function setSqlOverride(fn: SqlFn | null) {
  overrideSql = fn
}

export async function sql<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  if (overrideSql) {
    return overrideSql<T>(text, params)
  }

  if (neonInitError) {
    throw new Error(neonInitError)
  }

  if (neonSql) {
    const rows = await neonSql.query(text, params)
    return rows as T[]
  }

  throw new Error("DATABASE_URL is required in this environment.")
}
