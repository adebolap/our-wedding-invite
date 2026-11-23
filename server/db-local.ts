import { readdir, readFile } from "node:fs/promises"
import { PGlite } from "@electric-sql/pglite"

let local: Promise<PGlite> | undefined

async function startLocal(): Promise<PGlite> {
  const db = new PGlite()
  const files = (await readdir("migrations").catch(() => []))
    .filter((file) => file.endsWith(".sql"))
    .sort()
  for (const file of files) {
    await db.exec(await readFile(`migrations/${file}`, "utf8"))
  }
  return db
}

export async function localSql<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  local ??= startLocal().catch((error: unknown) => {
    local = undefined
    throw error
  })
  return (await (await local).query<T>(text, params)).rows
}
