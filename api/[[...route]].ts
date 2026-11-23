import { handle } from "hono/vercel"
import app from "../server/app.js"

export const config = {
  runtime: "nodejs",
  maxDuration: 30,
}

const handler = handle(app)

export default handler
export const GET = handler
export const POST = handler
export const OPTIONS = handler
